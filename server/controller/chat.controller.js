import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
import chalk from "chalk";
import axios from "axios";
dotenv.config();
import Post from "../mongodb/models/post.model.js";
import UserModel from "../mongodb/models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const serper_api_key = process.env.SERPER_API_KEY;
const search_route = process.env.SEARCH_ROUTE;
const huggingface_api_key = process.env.HUGGINGFACE_MODEL_URL;

// openai configuration
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);
let context = [];

async function getSummarizedContext(summaryText) {
  let inputContext, summaryToken;
  try {
    const summarizedContextWithOpenAI = await summarizeFunctionWithOpenAI(
      summaryText
    );
    inputContext = summarizedContextWithOpenAI.inputContext;
    summaryToken = summarizedContextWithOpenAI.summaryToken;
  } catch (error) {
    console.log(chalk.red(`Summarization failed with error: ${error}`));
    throw new Error("Summarization failed!");
  }
  if (!inputContext || !summaryToken) {
    console.log(
      chalk.red("Summarization failed: missing input context or summary token")
    );
    throw new Error(
      "Summarization failed: missing input context or summary token"
    );
  }

  return { inputContext, summaryToken };
}

async function summarizeFunctionWithOpenAI(summaryText) {
  const summarizedContext = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are very professional copywriter",
      },
      {
        role: "user",
        content: `Please summarize the following context and also include the most important parts in: ${summaryText}`,
      },
    ],
    max_tokens: 50,
    temperature: 0,
    presence_penalty: 0,
    frequency_penalty: 0,
  });

  const inputContext = summarizedContext.data.choices[0].message.content;
  const summaryToken = summarizedContext.data.usage.total_tokens;

  return { inputContext, summaryToken };
}

async function getChatResponse(
  inputPrompt,
  age,
  region,
  inputContext,
  summaryToken
) {
  const totalInput = `I am ${age} years old and live in ${region}. The summarized context of our previous conversation is ${inputContext} And I want to know about ${inputPrompt}`;

  console.log(
    chalk.blueBright("Using OpenAI to generate response to user input...")
  );

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an helpful Assistant. Answer shortly when chatting normally but answer well-informed when asked a question. And if you don't know the answer, say so.",
        },
        {
          role: "user",
          content: `${totalInput}`,
        },
      ],
      max_tokens: 1024,
      temperature: 0,
      presence_penalty: 0,
      frequency_penalty: 0,
    });
    const generatedText = response.data.choices[0].message;
    const chatToken = response.data.usage.total_tokens;
    const tokenUsage = chatToken + summaryToken;
    context.push(generatedText.content.slice(0, 500));
    if (context.length > 3) {
      context.shift();
    }
    return { message: generatedText, tokenUsage };
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.error("Rate limit exceeded. Try again later.");
      throw new Error("Rate limit exceeded. Try again later.");
    } else {
      console.error(error.stack);
      throw new Error("Something went wrong!");
    }
  }
}

// Chat route
export async function chat(req, res) {
  try {
    const { messages, age, region } = req.body;
    let summaryText = context.join(" ");
    if (summaryText.trim() === "") {
      summaryText = "I am codepix your AI Assistant";
    }
    const contextData = await getSummarizedContext(summaryText);
    const inputContext = contextData.inputContext;
    const summaryToken = contextData.summaryToken;
    const inputPrompt = `${messages}`;
    const response = await getChatResponse(
      inputPrompt,
      age,
      region,
      inputContext,
      summaryToken
    );
    res.json(response);
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.error("Rate limit exceeded. Try again later.");
      throw new Error("Rate limit exceeded. Try again later.");
    } else {
      console.error(error.stack);
      throw new Error("Something went wrong!");
    }
  }
}
// Google Search route
export async function googleSearch(req, res) {
  const { messages } = req.body;
  let data = JSON.stringify({
    q: `${messages}`,
    gl: "in",
  });
  try {
    let config = {
      method: "post",
      url: search_route,
      headers: {
        "X-API-KEY": serper_api_key,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios(config);
    const organicResults = response.data["organic"];
    let concatenatedSnippets = "";

    for (const result of organicResults) {
      const snippet = result["snippet"];
      concatenatedSnippets += snippet + " ";
    }
    const searchToken = 800;
    console.log("Search Results, generating answer...");
    try {
      const inputPrompt = `The context is ${concatenatedSnippets} And I want to know about ${messages}`;
      const generateAnswer = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are an helpful Assistant with awesome finding capabilities. Follow the context for finding the answer of the question,then generate an factual answer. Answer well-informed but concisely. if you are not able to find the answer, then you can ask the user to rephrase the question.",
          },
          {
            role: "user",
            content: `${inputPrompt}`,
          },
        ],
        max_tokens: 200,
        temperature: 0.2,
        top_p: 1,
        presence_penalty: 0,
        frequency_penalty: 0,
      });
      const generatedText = generateAnswer.data.choices[0].message;
      const chatToken = generateAnswer.data.usage.total_tokens;
      const tokenUsage = chatToken + searchToken;
      res.json({
        status: "Google Search Successful",
        message: generatedText,
        tokenUsage: tokenUsage,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    console.log(error);
  }
}

// image generation implementation
export async function searchimage(req, res) {
  const { messages } = req.body;
  try {
    async function query(data) {
      const response = await fetch(huggingface_api_key, {
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_API_STABLE_IMAGE}`,
        },
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.blob();
        return result;
      } else {
        throw new Error(`API call failed with status ${response.status}`);
      }
    }
    try {
      const result = await query({ inputs: messages });
      const arrayBuffer = await result.arrayBuffer();
      const base64Image = Buffer.from(arrayBuffer).toString("base64");
      res.json({ image: base64Image });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while processing the image." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while calling the API." });
  }
}

// image generation implementation
export async function generateImage(req, res) {
  try {
    const { prompt, username } = req.body;
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "512x512",
      response_format: "b64_json",
    });
    const image = aiResponse.data.data[0].b64_json;

    // Deduct 1 imgtokens from user's imgtoken
    const user = await UserModel.findOne({ username });
    if (user) {
      user.imgtoken -= 1;
      await user.save();
    }
    res.status(200).json({ photo: image, credits: user.imgtoken });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(error?.response.data.error.message || "Something went wrong");
  }
}

export async function getImage(req, res) {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Fetching posts failed, please try again",
    });
  }
}

export async function postImage(req, res) {
  try {
    const { username, prompt, photo } = req.body;

    // Validate required parameters
    if (!username || !prompt || !photo) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameters: username, prompt, or photo",
      });
    }

    // Upload photo to Cloudinary
    const photoUrl = await cloudinary.uploader.upload(photo);

    // Validate Cloudinary upload
    if (!photoUrl) {
      return res.status(400).json({
        success: false,
        message: "Invalid photo or upload failed",
      });
    }

    // Create a new post
    const newPost = await Post.create({
      name: username,
      prompt,
      photo: photoUrl.secure_url,
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Unable to create a post, please try again",
    });
  }
}
