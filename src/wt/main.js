import { Worker } from "worker_threads";
import { fileURLToPath } from "url";
import path from "path";
import { cpus } from "os";

const performCalculations = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const workerFilePath = `${__dirname}/worker.js`;

  const workersNumber = cpus().length;
  const initialN = 10;

  const promises = [...new Array(workersNumber)].map(
    (_, index) =>
      new Promise((resolve, reject) => {
        const worker = new Worker(workerFilePath, {
          workerData: { n: initialN + index },
        });

        worker.on("message", ({ result }) => resolve(result));

        worker.on("error", reject);
      })
  );

  const allResults = await Promise.allSettled(promises);
  const result = allResults.map((item) =>
    item.status === "fulfilled"
      ? { status: "resolved", data: item.value }
      : { status: "error", data: null }
  );

  console.log(result);
};

await performCalculations();
