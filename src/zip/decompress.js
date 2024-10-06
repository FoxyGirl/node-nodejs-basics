import { createReadStream, createWriteStream } from "fs";
import { createGunzip } from "zlib";
import { pipeline } from "stream";
import { fileURLToPath } from "url";
import path from "path";
import { promisify } from "util";

const decompress = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const sourceFilePath = `${__dirname}/files/archive.gz`;
  const destinationFilePath = `${__dirname}/files/fileToCompress.txt`;

  const source = createReadStream(sourceFilePath);
  const destination = createWriteStream(destinationFilePath);
  const gunzip = createGunzip();

  const pipe = promisify(pipeline);

  //   pipeline(source, gunzip, destination, (err) => {
  //     if (err) {
  //       console.error("FS operation failed");
  //     }
  //   });

  // ******  Promises flow

  //   pipe(source, gunzip, destination)
  //     .then((data) => {
  //       console.log("=== data", data);
  //     })
  //     .catch((err) => console.error("FS operation failed"));

  try {
    await pipe(source, gunzip, destination);
  } catch {
    console.error("FS operation failed");
  }
};

await decompress();
