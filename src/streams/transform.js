import { Transform } from "stream";

const transform = async () => {
  const reverseStream = new Transform({
    transform(chunk, _, callback) {
      const reversedChunk = chunk.toString().split("").reverse().join("");
      this.push(reversedChunk);
      callback();
    },
  });

  process.stdin.pipe(reverseStream).pipe(process.stdout);

  reverseStream.on("error", () => {
    console.error("FS operation failed");
  });
};

await transform();
