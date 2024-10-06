import { createReadStream } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = `${__dirname}/files/fileToRead.txt`;

  const readStream = createReadStream(filePath);
  readStream.pipe(process.stdout);

  readStream.on("error", () => {
    console.error("FS operation failed");
  });
};

await read();
