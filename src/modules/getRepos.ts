import { Octokit } from "@octokit/rest";

import { logHandler } from "../utils/logHandler";

/**
 * Gets all repositories under an organisation or user.
 *
 * @returns {string[]} An array of repository names.
 */
export const getRepos = async (): Promise<string[]> => {
  logHandler.log("info", "Getting repositories...");
  const octokit = new Octokit({ auth: process.env.GH_TOKEN });

  const repos =
    process.env.IS_ORG === "true"
      ? await octokit.rest.repos.listForOrg({
          org: process.env.OWNER as string,
          per_page: 100,
        })
      : await octokit.rest.repos.listForUser({
          username: process.env.OWNER as string,
          per_page: 100,
        });

  const repoNames = repos.data.map((repo) => repo.name);

  logHandler.log("info", "Repositories found: " + repoNames.join(", "));

  return repoNames;
};
