import { TestPullRequest } from "../interfaces/TestPullRequest";

/* Configuration Data */

const validDate = "2021-10-15T00:00:00.000Z";
const earlyDate = "2020-10-15T00:00:00.000Z";
const lateDate = "2022-10-15T00:00:00.000Z";

const realUser = { type: "User", login: "nhcarrigan" };
const spamLabel = { name: "spam" };
const hfLabel = { name: "hacktoberfest-accepted" };

/* Invalid Data Examples */

/**
 * User is bot, should not count.
 */
export const pullFromBot: TestPullRequest = {
  number: 1,
  created_at: validDate,
  merged_at: validDate,
  closed_at: validDate,
  user: {
    type: "Bot",
    login: "bot",
  },
  labels: [],
};

/**
 * PR was opened prior to start of event.
 */
export const pullTooEarly: TestPullRequest = {
  number: 2,
  created_at: earlyDate,
  merged_at: validDate,
  closed_at: validDate,
  user: realUser,
  labels: [],
};

/**
 * PR was opened after the end of the event.
 */
export const pullTooLate: TestPullRequest = {
  number: 3,
  created_at: lateDate,
  merged_at: validDate,
  closed_at: validDate,
  user: realUser,
  labels: [],
};

/**
 * PR does not have the user property.
 */
export const pullWithoutUser: TestPullRequest = {
  number: 4,
  created_at: validDate,
  merged_at: validDate,
  closed_at: validDate,
};

/**
 * PR does not have the hacktoberfest-accepted label.
 *
 * @see The test call for this MUST have hasTopic set to false.
 */
export const pullWithoutLabel: TestPullRequest = {
  number: 5,
  created_at: validDate,
  merged_at: validDate,
  closed_at: validDate,
  user: realUser,
};

/**
 * PR was merged after the event has ended.
 */
export const pullMergedLate: TestPullRequest = {
  number: 6,
  created_at: validDate,
  merged_at: lateDate,
  closed_at: lateDate,
  user: {
    type: "User",
    login: "nhcarrigan",
  },
  labels: [],
};

/**
 * PR was marked as spam.
 */
export const pullIsSpam: TestPullRequest = {
  number: 7,
  created_at: validDate,
  merged_at: validDate,
  closed_at: validDate,
  user: realUser,
  labels: [spamLabel],
};

/**
 * PR was closed but not merged, and does not have hacktoberfest-accepted.
 */

export const pullIsClosedUnmerged: TestPullRequest = {
  number: 8,
  created_at: validDate,
  merged_at: null,
  closed_at: validDate,
  user: realUser,
};

/* Valid Data Examples */

/**
 * This PR was opened and merged during the event.
 *
 * @see The test call for this MUST have hasTopic set to true.
 */
export const pullIsMerged: TestPullRequest = {
  number: 9,
  created_at: validDate,
  merged_at: validDate,
  closed_at: validDate,
  user: realUser,
};

/**
 * This PR was closed but has the `hacktoberfest-accepted` label.
 */
export const pullIsClosedButLabelled: TestPullRequest = {
  number: 10,
  created_at: validDate,
  merged_at: validDate,
  closed_at: validDate,
  user: realUser,
  labels: [hfLabel],
};

/**
 * This PR was opened during the event, is not merged, but has the `hacktoberfest-accepted` label.
 */

export const pullIsNotMergedButLabelled: TestPullRequest = {
  number: 11,
  created_at: validDate,
  merged_at: null,
  closed_at: null,
  user: realUser,
  labels: [hfLabel],
};
