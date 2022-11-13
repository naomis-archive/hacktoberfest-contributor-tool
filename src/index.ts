import { getPullData } from "./modules/getPullData";
import { getRepos } from "./modules/getRepos";
import { getTopic } from "./modules/getTopic";
import { parsePullData } from "./modules/parsePullData";
import { writePullData } from "./modules/writePullData";
import { logHandler, runBreaks } from "./utils/logHandler";

(async () => {
  runBreaks.log("info", "==RUN START==");
  logHandler.log("info", "Beginning process...");
  const repoNames = await getRepos();
  for (const repoName of repoNames) {
    const hasTopic = await getTopic(repoName);
    const pulls = await getPullData(repoName, 1);
    const authors = parsePullData(pulls, hasTopic);
    await writePullData(repoName, authors);
  }
  logHandler.log("info", "Process complete.");
  runBreaks.log("info", "==RUN END==");
})();
