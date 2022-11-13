import { Octokit } from "@octokit/rest";

import { startTime } from "../config/dates";
import { PullRequest } from "../interfaces/PullRequest";
import { logHandler } from "../utils/logHandler";

/**
 * Module to fetch paginated pull request data until a PR is found
 * which was created before Hacktoberfest started.
 *
 * @param {string} repoName The name of the repository to check.
 * @param {number} page The page number to query.
 * @returns {PullRequest[]} Array of pull request data from GitHub.
 */
export const getPullData = async (
  repoName: string,
  page: number
): Promise<PullRequest[]> => {
  logHandler.log("info", `Fetching data for page ${page}`);
  const octokit = new Octokit({ auth: process.env.GH_TOKEN });

  const pullData = await octokit.rest.pulls.list({
    owner: process.env.OWNER as string,
    repo: repoName,
    state: "all",
    sort: "created",
    direction: "desc",
    per_page: 100,
    page: page,
  });
  const pulls: PullRequest[] = pullData.data;

  logHandler.log("info", `Got ${pulls.length} pulls.`);
  if (!pulls.length) {
    logHandler.log("info", "No more pulls found.");
    return [];
  }
  logHandler.log(
    "info",
    `Got data until ${pulls[pulls.length - 1].created_at}`
  );

  if (
    pulls.length === 100 &&
    new Date(pulls[pulls.length - 1].created_at).getTime() >= startTime
  ) {
    const nextPage = await getPullData(repoName, page + 1);
    return [...pulls, ...nextPage];
  }
  return pulls;
};
