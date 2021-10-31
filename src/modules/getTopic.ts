import { Octokit } from "@octokit/rest";

import { logHandler } from "../utils/logHandler";

/**
 * Module to check if the repository has the Hacktoberfest topic.
 *
 * @returns {boolean} Whether the `hacktoberfest` topic is found on the repo.
 */
export const getTopic = async (): Promise<boolean> => {
  logHandler.log("info", "Checking topics...");
  const octokit = new Octokit({ auth: process.env.GH_TOKEN });

  const topics = await octokit.rest.repos.getAllTopics({
    owner: process.env.OWNER as string,
    repo: process.env.REPO as string,
  });

  const hasTopic = topics.data.names.includes("hacktoberfest");

  if (hasTopic) {
    logHandler.log("info", "Repository has hacktoberfest topic.");
  } else {
    logHandler.log(
      "warn",
      "Repository does not have hacktoberfest topic, and might not be participating."
    );
  }

  return hasTopic;
};
