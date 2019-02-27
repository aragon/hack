---
id: cli-apm-commands
title: aragonPM commands
sidebar_label: aragonPM commands
---

[//]: # "TODO: apm grant"

### aragon apm versions

The `aragon apm versions` command shows all the previously published versions of this package.


### aragon apm publish

The `aragon apm publish` command publishes  a new version to the aragonPM repo.

```
aragon apm publish <patch|minor|major|version_number> [contract-address|contract-name]
```

The `aragon apm publish` command bumps the version number and publishes your app.

If a major version is being published then the contract address for your app has to be provided or the contract name so the contract can be deployed. If it is not provided it will default to the contract specified in the `arapp.json` file.

If a minor or patch version is being published then the command can be run with the `--only-content` flag which will just perform an update to the content of the app (the webapp and its artifacts).

The command has the following parameters:

- `--only-content`: For minor and patch upgrades; avoids deploying contract.
- `--provider`: The provider where the files of the package will be published to. Defaults to `ipfs`.
- `--files`: The path to the files that will be published. Defaults to the current directory.
- `--ignore`: A gitignore pattern of files to ignore. Specify multiple times to add multiple patterns. Defaults to just the `node_modules` directory.
- `--publish-dir`: The path to the directory where all the files and generated artifacts will be copied to before publishing. If it is not specified, it will create a temporary directory.
- `--build [true|false]`: A flag to specify whether the webapp should be built while publishing. Defaults to `true`.
- `--build-script`: The name of the NPM script in your app that will be used for building the webapp.
- `--http`: The URI for the HTTP server that will be serving your app files. See [instructions on running from HTTP](#running-your-app-from-a-development-http-server) for more information.
- `http-served-from`: Path to the directory that the HTTP server exposes. Some artifacts are generated and placed in this directory during the publishing process of your app.
