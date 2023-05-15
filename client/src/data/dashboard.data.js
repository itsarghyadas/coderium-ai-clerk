export default [
  {
    id: "CODERIUM - Just like ChatGPT",
    version: "v1.0.1",
    title: "CODERIUM",
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
        description:
          "AI will generate an answer for your question.",
      },
    ],
  },
  {
    id: "IMAGIPIX - Just like DALL-E",
    version: "v1.0",
    title: "IMAGIPIX",
    details:
      "We have used OpenAI API DALL-E model to make an AI Art Generator with prompt like DALL-E.2 which can generate AI Art based on the prompt. And also it can edit your existing images which is a great feature but not available for now in this version.",
    linkName: "Try Imagipix",
    link: "/",
    test: [
      {
        step: "Human",
        description:
          "Write your Prompt in the input box and click on the generate button.",
      },
      {
        step: "AI Magic",
        description:
          "AI will generate an image based on your prompt.",
      },
    ],
  },
];
