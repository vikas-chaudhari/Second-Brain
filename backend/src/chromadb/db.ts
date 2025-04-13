import { ChromaClient } from "chromadb";
import { getChunks } from "../utils/chunks";
export const client = new ChromaClient({ path: "http://localhost:8000" }); // using docker to run locally

export const connectVectorDb = async () => {
  const brainlyCollection = await client.getOrCreateCollection({
    name: "brainly_collection",
  });
  return brainlyCollection;
};
export const brainlyCollection = connectVectorDb();

export const addData = async () => {
  const bc = await brainlyCollection;
  const chunks = await getChunks("./src/pdfs/samplepdf.pdf");
  console.log("collection = ", bc);
  const data = await bc.add({
    documents: [...chunks],
    ids: chunks.map((doc, index) => `chunk_${index}`),
  });
  console.log("data added to vec db");
};

export const getResult = async () => {
  const bc = await brainlyCollection;

  const count = await bc.count();
  console.log("count = ", count);

  const results = await bc.query({
    queryTexts: "what is this file about?", // Chroma will embed this for you
    // nResults: 1, // how many results to return
  });

  console.log("result = ", results);
  return results;
};
