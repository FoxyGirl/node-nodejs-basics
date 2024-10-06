import { createReadStream, createWriteStream } from "fs";
import { createGunzip } from "zlib";
import { pipeline } from "stream";
import { fileURLToPath } from "url";
import path from "path";

const decompress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const sourceFilePath = `${__dirname}/files/archive.gz`;
  const destinationFilePath = `${__dirname}/files/fileToCompress_2.txt`;

  const source = createReadStream(sourceFilePath);
  const destination = createWriteStream(destinationFilePath);
  const gunzip = createGunzip();

  pipeline(source, gunzip, destination, (err) => {
    if (err) {
      console.error("FS operation failed");
    }
  });
};

await decompress();
