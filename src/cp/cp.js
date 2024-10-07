import { fileURLToPath } from "url";
import path from "path";
import { spawn } from "child_process";

const spawnChildProcess = async (args) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const scriptFilePath = `${__dirname}/files/script.js`;

  const child = spawn("node", [scriptFilePath, ...args]);

  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);

  child.on("error", (err) => {
    console.error("Failed to start child process:", err);
  });
};

// Put your arguments in function call to test this functionality
// spawnChildProcess(/* [someArgument1, someArgument2, ...] */);
spawnChildProcess([11, "someArgument2", { a: 5, b: "dill" }]);
