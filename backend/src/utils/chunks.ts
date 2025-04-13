import pdfParse from "pdf-parse";
import fs from "fs";

export const getChunks = async (filePath: string) => {
  const pdfFile = fs.readFileSync(filePath);
  const data = await pdfParse(pdfFile).then(function (data) {
    return data;
  });

  const chunkText = (text: string, chunkSize = 500) => {
    const chunks = [];
    for (let i = 0; i < text.length; i += chunkSize) {
      chunks.push(text.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const chunks = await chunkText(data.text);
  return chunks;
};
