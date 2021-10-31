import { getPullData } from "./modules/getPullData";
import { getTopic } from "./modules/getTopic";
import { parsePullData } from "./modules/parsePullData";
import { writePullData } from "./modules/writePullData";
import { logHandler, runBreaks } from "./utils/logHandler";

(async () => {
  runBreaks.log("info", "==RUN START==");
  logHandler.log("info", "Beginning process...");
  const hasTopic = await getTopic();
  const pulls = await getPullData(1);
  const authors = parsePullData(pulls, hasTopic);
  await writePullData(authors);
  logHandler.log("info", "Process complete.");
  runBreaks.log("info", "==RUN END==");
})();
