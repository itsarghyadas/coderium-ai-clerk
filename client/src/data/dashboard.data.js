export default [
  {
    id: "CODERIUM - Just like ChatGPT",
    version: "v1.0.1",
    title: "CODERIUM",
    image:
      "https://res.cloudinary.com/dzzhtacky/image/upload/v1684381191/coderium-ai-chat_ll5w8s.png",
    details:
      "We have used OpenAI API to make a chatbot like ChatGPT which can answer followup questions, admit its mistakes, challenge incorrect premises, and reject inappropriate requests.",
    linkName: "Try Coderium",
    link: "/chat",
    test: [
      {
        step: "Human",
        description: "Ask your question in the input box and press enter.",
      },
      {
        step: "AI Magic",
        description: "AI will generate an answer for your question.",
      },
    ],
  },
  {
    id: "IMAGIPIX - Just like DALL-E",
    version: "v1.0",
    title: "IMAGIPIX",
    image:
      "https://res.cloudinary.com/dzzhtacky/image/upload/v1684381192/dall-e-ui_brkowg.png",
    details:
      "We have used OpenAI API DALL-E model to make an AI Art Generator with prompt like DALL-E.2 which can generate AI Art based on the prompt. And also it can edit your existing images which is a great feature but not available for now in this version.",
    linkName: "Try Imagipix",
    link: "/imagica",
    test: [
      {
        step: "Human",
        description:
          "Write your Prompt in the input box and click on the generate button.",
      },
      {
        step: "AI Magic",
        description: "AI will generate an image based on your prompt.",
      },
    ],
  },
];
