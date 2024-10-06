import { createWriteStream } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const write = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const fileWritePath = `${__dirname}/files/fileToWrite.txt`;

  const stream = createWriteStream(fileWritePath);
  process.stdin.pipe(stream);

  stream.on("finish", () => {
    console.log("File written");
  });

  stream.on("error", () => {
    console.error("FS operation failed");
  });
};

await write();
