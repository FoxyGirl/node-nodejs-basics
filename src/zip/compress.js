import { createReadStream, createWriteStream } from "fs";
import { createGzip } from "zlib";
import { pipeline } from "stream";
import { fileURLToPath } from "url";
import path from "path";

const compress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const fileToCompressPath = `${__dirname}/files/fileToCompress.txt`;
  const fileCompressedPath = `${__dirname}/files/archive.gz`;

  const source = createReadStream(fileToCompressPath);
  const destination = createWriteStream(fileCompressedPath);

  const gzip = createGzip();

  pipeline(source, gzip, destination, (err) => {
    if (err) {
      console.error("FS operation failed");
    }
  });
};

await compress();
