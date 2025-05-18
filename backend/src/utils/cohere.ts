import { CohereClientV2, CohereClient } from "cohere-ai";
import dotenv from "dotenv";
dotenv.config();

const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY,
});

const textToTextHandler = async (prompt: string) => {
  const response = await cohere.chat({
    model: "command-a-03-2025",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  if (!response.message.content) {
    throw new Error("No response from Cohere");
  } else {
    // console.log(response.message.content[0].text);
    return response.message.content[0].text;
  }
};

const cohereClient = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

const genearteEmbeddings = async (data: string[]) => {
  const response = await cohereClient.v2.embed({
    texts: data,
    model: "embed-v4.0",
    inputType: "classification",
    embeddingTypes: ["float"],
  });

  return response.embeddings;
};

export { genearteEmbeddings, textToTextHandler };
