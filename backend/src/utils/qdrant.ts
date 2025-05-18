import { QdrantClient } from "@qdrant/js-client-rest";
import dotenv from "dotenv";
import { genearteEmbeddings } from "./cohere";
dotenv.config();

const qdrantClient = new QdrantClient({
  url: process.env.QDRANT_URL!,
  apiKey: process.env.QDRANT_API_KEY!,
});

async function getCollection() {
  const result = await qdrantClient.getCollections();
  console.log("List of collections:", result.collections);
  return result.collections;
}

const createCollection = async (collectionName: string) => {
  const collection = await qdrantClient.collectionExists(collectionName);

  if (collection.exists) {
    console.log("Collection already exists");
    return;
  } else {
    console.log("Creating collection...");
    await qdrantClient.createCollection(collectionName, {
      vectors: { size: 1536, distance: "Cosine" },
    });
  }
};

interface ChunkInterface {
  id: string;
  text: string;
}

async function upsertPoints(
  collectionName: string,
  chunks: ChunkInterface[],
  vectors: number[][]
) {
  // Prepare points for upsert
  const points = chunks.map((chunk, idx) => ({
    id: chunk.id,
    vector: vectors[idx],
    payload: { text: chunk.text },
  }));

  // Upsert all points in one request
  await qdrantClient.upsert(collectionName, { points });
}

async function searchSimilar(collectionName: string, query: string) {
  const queryVector = await genearteEmbeddings([query]);
  const response = await qdrantClient.query(collectionName, {
    query: queryVector.float![0],
    limit: 3,
    with_payload: true,
  });

  return response;
}

export { upsertPoints, createCollection, getCollection, searchSimilar };
