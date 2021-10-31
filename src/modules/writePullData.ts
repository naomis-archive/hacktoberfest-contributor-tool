import { mkdir, stat, writeFile } from "fs/promises";
import { join } from "path";

import { logHandler } from "../utils/logHandler";

/**
 * Writes the parsed pull data to a file.
 *
 * @param {Object} data The parsed pull request data from GitHub.
 */
export const writePullData = async (data: {
  [key: string]: number;
}): Promise<void> => {
  const entries = Object.entries(data);
  const sorted = entries.sort((a, b) => b[1] - a[1]);

  const title = `**Hacktoberfest Contributions for __${process.env.OWNER}/${process.env.REPO}__**`;
  const body = sorted
    .map(
      ([user, count]) =>
        `- ${user} made ${count} valid ${
          count === 1 ? "contribution" : "contributions"
        }`
    )
    .join("\n");

  logHandler.log("info", "Writing data!");

  const resultsExist = await stat(join(process.cwd() + "/results"))
    .then((stat) => stat.isDirectory())
    .catch(() => false);
  if (!resultsExist) {
    logHandler.log("info", "Creating results directory.");
    await mkdir(join(process.cwd() + "/results"));
  }

  const ownerDirExists = await stat(
    join(process.cwd() + "/results/" + process.env.OWNER)
  )
    .then((stat) => stat.isDirectory())
    .catch(() => false);

  if (!ownerDirExists) {
    logHandler.log("info", `Creating ${process.env.OWNER} directory.`);
    await mkdir(join(process.cwd() + "/results/" + process.env.OWNER));
  }

  await writeFile(
    join(
      process.cwd() + `/results/${process.env.OWNER}/${process.env.REPO}.md`
    ),
    `${title}\n\n${body}`,
    "utf-8"
  );
};
