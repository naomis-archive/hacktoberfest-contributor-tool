import { endTime } from "../config/dates";
import { PullRequest } from "../interfaces/PullRequest";
import { logHandler } from "../utils/logHandler";

/**
 * Module to parse the pull request data into a list of authors + counts. Validates that each pull
 * in the data meets the requirements.
 *
 * @param {PullRequest[]} pulls The list of pull request objects from GitHub.
 * @param {boolean} hasTopic Whether the repository has the hacktoberfest topic.
 * @returns {Object} Map of pull authors + their counts.
 */
export const parsePullData = (
  pulls: PullRequest[],
  hasTopic: boolean
): { [key: string]: number } => {
  logHandler.log("info", "Parsing pull data...");
  const authors: { [key: string]: number } = {};

  pulls.forEach((pull) => {
    if (pull.user?.type === "Bot") {
      logHandler.log(
        "warn",
        `Pull #${pull.number} was created by a bot and is omitted.`
      );
      return;
    }

    if (
      new Date(pull.created_at).getTime() <
      new Date("2021-10-01T00:00:00Z").getTime()
    ) {
      logHandler.log(
        "warn",
        `Pull ${pull.number} was created before the event started.`
      );
      return;
    }

    const username = pull.user?.login;
    if (!username) {
      logHandler.log(
        "warn",
        `Pull #${pull.number} does not have a user attached and cannot be recorded.`
      );
      return;
    }

    const hasLabel = pull.labels?.find(
      (label) => label.name === "hacktoberfest-accepted"
    );

    if (!hasTopic && !hasLabel) {
      logHandler.log(
        "warn",
        `Pull #${pull.number} does not have the hacktoberfest-accepted label and the repo does not have the topic.`
      );
      return;
    }

    const mergedTime = pull.merged_at
      ? new Date(pull.merged_at).getTime()
      : null;

    if ((!mergedTime || mergedTime > endTime) && !hasLabel) {
      logHandler.log(
        "warn",
        `Pull #${pull.number} does not have the label and was not merged prior to the end of the event.`
      );
      return;
    }

    logHandler.log(
      "info",
      `Pull #${pull.number} appears to be valid and has been counted!`
    );
    username in authors ? authors[username]++ : (authors[username] = 1);
  });

  return authors;
};
