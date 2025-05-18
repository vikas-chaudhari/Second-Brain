import { YoutubeTranscript } from "youtube-transcript";
import { genearteEmbeddings } from "./cohere";
import { v4 as uuidv4 } from "uuid";

function cleanTranscript(transcript: string): string {
  // Replace HTML entities
  let cleaned = transcript
    .replace(/&amp;#39;/g, "'")
    .replace(/&amp;quot;/g, '"')
    .replace(/&amp;gt;/g, ">")
    .replace(/&amp;lt;/g, "<")
    .replace(/&amp;amp;/g, "&")

    // Fix common transcript issues
    .replace(/\s+/g, " ") // Replace multiple spaces with a single space
    .replace(/(\w)\.(\w)/g, "$1. $2") // Add space after period between words if missing
    .replace(/\s+\./g, ".") // Remove spaces before periods
    .trim(); // Remove leading/trailing whitespace

  return cleaned;
}

function processTranscriptSegments(
  transcript: Array<{ text: string; duration: number; offset: number }>,
  maxChunkSize: number = 1000,
  overlapSize: number = 150
): string[] {
  const chunks: string[] = [];
  let currentChunk = "";
  let previousEndText = ""; // Store text for overlap

  // Process each segment
  for (const segment of transcript) {
    // Clean the segment text
    const cleanedSegment = cleanTranscript(segment.text);

    // If adding this segment would exceed chunk size, start a new chunk
    if (
      currentChunk.length + cleanedSegment.length > maxChunkSize &&
      currentChunk.length > 0
    ) {
      // Save current chunk
      chunks.push(currentChunk);

      // Start new chunk with overlap from previous chunk
      previousEndText = currentChunk.substring(
        Math.max(0, currentChunk.length - overlapSize)
      );
      currentChunk = previousEndText + " " + cleanedSegment;
    } else {
      // Add to current chunk with a space
      if (currentChunk.length > 0) {
        currentChunk += " ";
      }
      currentChunk += cleanedSegment;
    }
  }

  // Add the last chunk if it's not empty
  if (currentChunk.length > 0) {
    chunks.push(currentChunk);
  }

  return chunks;
}

interface ChunkInterface {
  id: string;
  text: string;
}

const transcribeYoutube = async (
  videoUrl: string,
  maxChunkSize: number = 1000,
  overlapSize: number = 150
) => {
  // Extract video ID from URL
  const videoId = videoUrl.split("v=")[1]?.split("&")[0];
  console.log("Processing video ID:", videoId);

  if (!videoId) {
    throw new Error("Invalid YouTube URL");
  }

  try {
    // Fetch transcript from YouTube
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);

    // Process transcript segments directly
    const chunks = processTranscriptSegments(
      transcript,
      maxChunkSize,
      overlapSize
    );
    const NewChunks: ChunkInterface[] = [];
    chunks.forEach((chunk, index) => {
      NewChunks.push({ id: uuidv4(), text: chunk });
    });

    return NewChunks;
  } catch (error) {
    console.error("Error processing transcript:", error);
    throw error;
  }
};

// Export functions for use in other modules
export { cleanTranscript, processTranscriptSegments, transcribeYoutube };
