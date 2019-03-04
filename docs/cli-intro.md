---
id: cli-intro
title: Using the aragonCLI
sidebar_label: Introduction
hide_title: true
---

[//]: # "TODO: write global options"

![](/docs/assets/brand/aragoncli.png)

The aragonCLI (Command Line Interface) is used to create and develop Aragon apps.

## Install

The aragonCLI can be installed directly from NPM:

```
npm install -g @aragon/cli
```

It can also be installed directly from source:

```
git clone https://github.com/aragon/aragon-cli.git
cd packages/aragon-cli
npm install
npm link
```

After installing, the main `aragon` executable will be available for use. It will also install the `dao` alias which is a shortcut for `aragon dao` commands.

## Global options

Global options we can pass to anycommand to setup diferent configurations.

- Silent, Debug, cwd, use-frame, environment, apm.ens-registry (Address of the ENS registry. This will be overwritten if the selected '--environment' from your arapp.json includes a `registry` property), apm.ipfs.rpc, eth-rpc(?)


## create-aragon-app

This command will set up an Aragon app project so you can start building your app from a functional boilerplate.

```
npx create-aragon-app <app-name> [boilerplate]
```

- `app-name`: The name or ENS domain name for your app in an aragonPM Registry (e.g. `myapp` or `myapp.aragonpm.eth`). If only the name is provided it will create your app on the default `aragonpm.eth` registry.

- `boilerplate`: (optional) the Github repo name or alias for a boilerplate to set up your app. The currently available boilerplates are:

	- `react`: this boilerplate contains a very basic Counter app and a webapp for interacting with it. It showcases the end-to-end interaction with an Aragon app, from the contracts to the webapp.
	- `react-kit`: it is a variation of the `react` boilerplate that also comes with a DAO Kit which will allow for using your app to interact with other Aragon apps like the Voting app. You can read more about DAO Kits [here](https://github.com/aragon/hack/blob/master/docs/kits-intro.md).
	- `bare`: this boilerplate will just set up your app directory structure but contains no functional code.

> **Note**<br>
> This is an independent package so it's not necessary to have `@aragon/cli` installed to use it.
> [npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) comes with npm 5.2+. If you use npm 5.1 or earlier, you can't use `npx`. Instead, install `create-aragon-app` globally.
