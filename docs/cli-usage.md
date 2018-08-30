---
id: cli-usage
title: Using the Aragon CLI
---

The Aragon CLI is used to create and develop Aragon apps.

## Install

The Aragon CLI can be installed directly from NPM, which will download the newest version.

```
npm install -g @aragon/cli
```

It can also be installed directly from source:

```
git clone https://github.com/aragon/aragon-cli.git
cd aragon-cli
npm install 
npm link
```

After installing, the main `aragon` executable will be available for use. It will also install the `dao` and `apm` aliases that are a shortcut for `aragon dao` and `aragon apm` respectively.

## Main commands

### `aragon init`

The `init` command will set up an Aragon app project so you can start building your app from a functional boilerplate.

```sh
aragon init [app-name] [boilerplate]
```

- `app-name`: The name or ENS domain name for your app in an APM Registry (e.g. `voting` or `voting.aragonpm.eth`). If only the name is provided, by default it will create your app on the default `aragonpm.eth` registry.

- `boilerplate`: the github repo name or alias for a boilerplate to set up your app. The currently available boilerplates are:

	- `react`: this boilerplate contains a very basic Counter app and a webapp for interacting with it. If using react for building your app's frontend using this boilerplate is the best option, as it showcases the end-to-end interaction with an Aragon app, from the contracts to the webapp.
	- `aragon/aragon-react-kit-boilerplate`: it is a variation of the `react` boilerplate, but also comes with a DAO kit which will allow for using your app interacting with other Aragon apps like the Voting app. You can read more about DAO Kits [here](TODO: link).
	- `bare`: this boilerplate will just set up your app directory structure, but contains no functional code.

### aragon run

### aragon devchain

### aragon ipfs

## DAO commands

## APM commands

## Troubleshooting/FAQ

### Resetting the devchain

### Metamask issues