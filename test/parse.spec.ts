import { assert } from "chai";

import {
  pullFromBot,
  pullTooEarly,
  pullTooLate,
  pullWithoutUser,
  pullWithoutLabel,
  pullMergedLate,
  pullIsSpam,
  pullIsClosedUnmerged,
  pullIsMerged,
  pullIsClosedButLabelled,
  pullIsNotMergedButLabelled,
} from "../src/config/mockPullData";
import { parsePullData } from "../src/modules/parsePullData";

suite("Invalid PRs", () => {
  suite("Pull request from a bot", () => {
    const result = parsePullData([pullFromBot], true);

    test("should not count the PR", () => {
      assert.isEmpty(result, "The pull request was counted!");
    });
  });

  suite("Pull request made too early", () => {
    const result = parsePullData([pullTooEarly], true);

    test("should not count the PR", () => {
      assert.isEmpty(result, "The pull request was counted!");
    });
  });

  suite("Pull request made too late", () => {
    const result = parsePullData([pullTooLate], true);

    test("should not count the PR", () => {
      assert.isEmpty(result, "The pull request was counted!");
    });
  });

  suite("Pull request missing user property", () => {
    const result = parsePullData([pullWithoutUser], true);

    test("should not count the PR", () => {
      assert.isEmpty(result, "The pull request was counted!");
    });
  });

  suite("Pull request to non-participating repo", () => {
    const result = parsePullData([pullWithoutLabel], false);

    test("should not count the PR", () => {
      assert.isEmpty(result, "The pull request was counted!");
    });
  });

  suite("Pull request merged late", () => {
    const result = parsePullData([pullMergedLate], true);

    test("should not count the PR", () => {
      assert.isEmpty(result, "The pull request was counted!");
    });
  });

  suite("Pull request was labelled as spam", () => {
    const result = parsePullData([pullIsSpam], true);

    test("should not count the PR", () => {
      assert.isEmpty(result, "The pull request was counted!");
    });
  });

  suite("Pull request is closed as unmerged", () => {
    const result = parsePullData([pullIsClosedUnmerged], true);

    test("should not count the PR", () => {
      assert.isEmpty(result, "The pull request was counted!");
    });
  });
});

suite("Valid PRs", () => {
  suite("Pull request is merged", () => {
    const result = parsePullData([pullIsMerged], true);

    test("should count the PR", () => {
      assert.deepEqual(
        result,
        { nhcarrigan: 1 },
        "The pull request was counted!"
      );
    });
  });

  suite("Pull request is closed with label", () => {
    const result = parsePullData([pullIsClosedButLabelled], true);

    test("should count the PR", () => {
      assert.deepEqual(
        result,
        { nhcarrigan: 1 },
        "The pull request was counted!"
      );
    });
  });

  suite("Pull request is open but has label", () => {
    const result = parsePullData([pullIsNotMergedButLabelled], true);

    test("should count the PR", () => {
      assert.deepEqual(
        result,
        { nhcarrigan: 1 },
        "The pull request was counted!"
      );
    });
  });
});

/* Put everything else above this one please */

suite("Mixed PRs", () => {
  suite("Handles all of the test data at once", () => {
    const result = parsePullData(
      [
        pullFromBot,
        pullTooEarly,
        pullTooLate,
        pullWithoutUser,
        pullWithoutLabel,
        pullMergedLate,
        pullIsSpam,
        pullIsClosedUnmerged,
        pullIsMerged,
        pullIsClosedButLabelled,
        pullIsNotMergedButLabelled,
      ],
      true
    );

    test("should return the correct data", () => {
      assert.deepEqual(result, { nhcarrigan: 4 });
    });
  });
});
