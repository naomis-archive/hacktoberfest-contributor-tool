# Hacktoberfest Contributor Generator

This is a Node.js tool to generate a list of GitHub users who made valid contributions to a project for Hacktoberfest. The list will be sorted by number of contributions, and will provide a formatted Markdown document with the list of contributors.

## How to Use

This project is intended to run locally. Start by cloning the project, switching to your project directory, and running `npm ci` to install the dependencies.

Then, `cp sample.env .env` (or copy manually) to get the environment variable file. You will need to set three values:

- `GH_TOKEN`: This is a [GitHub API Token](https://github.com/settings/tokens). While this is not _technically_ required to use the API to view public pull requests, it is required for private repositories, provides higher rate limits, and is generally polite API use.
- `OWNER`: This is the owner for the repository you wish to query. This should be the user or organization name.
- `REPO`: This is the name of the repository you wish to query.

When you have everything set up, run `npm run build` to compile the TypeScript into JavaScript, then `npm run start` to launch the process!

You will see some output in the terminal - the script will check if the repository has the `hacktoberfest` topic, will query PRs that were created after the event started, and will check each PR against the logic that determines if a contribution is valid. Once this list is compiled, the process will create a `results` directory and save your list to a `owner/repo` Markdown file.

## Logging

The results of a run will also be written to `/results/_runLog.log` so you can audit any excluded PRs if needed. Note that this is a running log, which means if you run this script more than once each run will be appended to the file.

For convenience, runs are broken up by `==RUN BEGIN==` and `==RUN END==`.

## Feedback and Bugs

If you have feedback or a bug report, please feel free to open a GitHub issue!

## Contributing

If you would like to contribute to the project, you may create a Pull Request containing your proposed changes and we will review it as soon as we are able! Please review our [contributing guidelines](CONTRIBUTING.md) first.

## Code of Conduct

Before interacting with our community, please read our [Code of Conduct](CODE_OF_CONDUCT.md).

## Licensing

Copyright (C) 2021 Nicholas Carrigan

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

The full license terms may be viewed in the [LICENSE.md file](./LICENSE.md)

## Contact

We may be contacted through our [Chat Server](http://chat.nhcarrigan.com) or via [email form](https://contact.nhcarrigan.com).
