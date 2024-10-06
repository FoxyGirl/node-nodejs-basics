import { createHash } from "crypto";
import { createReadStream } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const calculateHash = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = `${__dirname}/files/fileToCalculateHashFor.txt`;

  const stream = createReadStream(filePath);
  const hash = createHash("sha256");

  stream.on("data", (chunk) => {
    hash.update(chunk);
  });

  stream.on("end", () => {
    const hexHash = hash.digest("hex");
    console.log(`SHA256 hash: ${hexHash}`);
  });

  stream.on("error", () => {
    console.error("FS operation failed");
  });
};

await calculateHash();
