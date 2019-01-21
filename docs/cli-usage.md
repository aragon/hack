---
id: cli-usage
title: Using the aragonCLI
sidebar_label: Usage
hide_title: true
---

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
cd aragon-cli
npm install
npm link
```

After installing, the main `aragon` executable will be available for use. It will also install the `dao` alias which is a shortcut for `aragon dao` commands.


## Main commands


### aragon init

The `init` command will set up an Aragon app project so you can start building your app from a functional boilerplate.

```
aragon init [app-name] [boilerplate]
```

- `app-name`: The name or ENS domain name for your app in an aragonPM Registry (e.g. `myapp` or `myapp.aragonpm.eth`). If only the name is provided it will create your app on the default `aragonpm.eth` registry.

- `boilerplate`: the Github repo name or alias for a boilerplate to set up your app. The currently available boilerplates are:

	- `react`: this boilerplate contains a very basic Counter app and a webapp for interacting with it. It showcases the end-to-end interaction with an Aragon app, from the contracts to the webapp.
	- `react-kit`: it is a variation of the `react` boilerplate that also comes with a DAO Kit which will allow for using your app to interact with other Aragon apps like the Voting app. You can read more about DAO Kits [here](kits-intro.md).
	- `bare`: this boilerplate will just set up your app directory structure but contains no functional code.


### aragon run

The `run` command takes care of completely setting up the environment needed for running your Aragon app. These are all the things that running `aragon run` will do for you:

1. It checks whether **IPFS** and a local **Ethereum development chain** (devchain) are running and if not it will start them. Once aragon is terminated, any IPFS or dev chain it started will also be terminated.
2. It will **publish your app** to the local aragonPM registry running in your devchain. This step executes the `aragon apm publish` internally. You can check the options and how the command works in depth [here](#aragon-apm-publish).
3. Once the package is published it will **create a DAO** with your app installed. If you are running your app without a Kit it will grant permissions to the first account printed in the console to perform all the actions protected by the ACL in your app.
4. After the DAO is created it will download the [Aragon client](https://github.com/aragon/aragon), install its dependencies and start it up so you can interact with the DAO in your web browser.

Some available options to customize the `run` command:

- `--reset`: If reset is present it will reset the devchain before running. The chain will then start from scratch and all published packages will need to be recreated.
- `--port`: The port where the devchain will be started.
- `--kit`: The name of the contract that will be deployed as the [DAO kit](kits-intro.md) that will be used to create your DAO. If no Kit is provided it will use a default Kit that sets up the DAO with just your app.
- `--kit-init [argument1 ... argumentN]`: The constructor arguments for the Kit contract, each separated by a space. See the [deploy command](#aragon-deploy) for more information on constructor arguments.
- `--build-script`: The name of the NPM script in your app that will be used for building the webapp.
- `--client [true|false]`: Can be used to disable starting the Aragon client. Defaults to `true`.


#### Running your app from a development HTTP server

`aragon run` by default will replicate Aragon's production environment and publish your app using IPFS. However, when developing the webapp part of your Aragon app, using IPFS would require you to repeat the entire publishing process every time you make a change and want to try it out.

Using the HTTP mode for running your app requires starting an HTTP server to serve your app files before executing `aragon run` or `aragon apm publish`

```
# start your app server before
aragon run --http [server-uri] --http-served-from [path]
```

- `http`: This is the flag that indicates that you wish to run your app using HTTP. The URI of the server must be provided here (e.g. `localhost:4001`)
- `http-served-from`: Path to the directory that the HTTP server exposes. Some artifacts are generated and placed in this directory during the publishing process of your app. The server needs serve these new files when they are created and the server is already running.

If your HTTP server supports hot-reloading your app's frontend will be hot-reloaded inside the Aragon client.

However, when **making changes to the background script** of your app, a refresh of the client is required so the new script can be loaded. Also, depending on how the background script of your app is being built, you may need to manually trigger the compilation of the script.

The [React boilerplate](https://github.com/aragon/aragon-react-boilerplate) supports serving your app using HTTP.


### aragon devchain

The `devchain` command is used for starting a local development testnet with all the required components already deployed and ready to use. It uses [aragen](https://github.com/aragon/aragen) for setting up the snapshot from which the chain starts. At any point `aragon devchain --reset` can be run which will reset the devchain to the original snapshot.

This snapshot contains a local instance of ENS (used as an aragonPM registry `aragonpm.eth` and [aragon-id](https://github.com/aragon/aragon-id) `aragonid.eth`), the first-party [Aragon apps](https://github.com/aragon/aragon-apps) published to aragonPM (e.g. `voting.aragonpm.eth` or `token-manager.aragonpm.eth`) and the first-party [DAO Kits](https://github.com/aragon/dao-kits) (e.g. `bare-kit.aragonpm.eth`)

Devchains can be started on different ports and will keep their state independent from other chains.

Options:
- `--reset`: Resets the devchain to the snapshot.
- `--port`: The port number where the devchain will be started.


### aragon ipfs

The `ipfs` command is used to start an IPFS daemon. It adds some files that are needed for the first-party Aragon apps to work.


### aragon deploy

The `deploy` command can be used for deploying an Ethereum contract to the devchain.

```
aragon deploy [contract-name] [--init argument1 ... argumentN]
```

Running `aragon deploy` will compile your contracts using `truffle compile` and will deploy the contract with the constructor arguments provided.

The `--init` arguments need to be separated by a space. They will be passed to the contract constructor on deploy. The `@ARAGON_ENS` alias can be used and it will be replaced by the address of the ENS registry in the devchain.


### aragon contracts

The `aragon contracts` command can be used to execute commands using the same [truffle](https://github.com/trufflesuite/truffle) version that the CLI uses behind the scenes to assist in compiling your app's contracts.

```
aragon contracts [command]
```

It is equivalent to executing `npx truffle [command]`


## DAO commands

The `aragon dao` commands can be used for interacting with your DAO directly from the command line. These commands are also available directly using the `dao` alias.


### dao new

Uses a DAO Kit to create a new DAO and prints its address.

Options:
- `--kit`: The aragonPM repo name of the kit that is used to create the DAO. Defaults to `bare-kit.aragonpm.eth`.
- `--kit-version [version-number|latest]`: The version of the repo that will be used to create the DAO. Defaults to `latest`.
- `--fn`: The function on the kit that is called to create a new DAO. Defaults to the `newBareInstance` function for `bare-kit.aragonpm.eth`.
- `--fn-args`: The arguments that the function to create the kit is called with. Defaults to an array of arguments.
- `--deploy-event`: The name of the event that is emitted when the DAO is created. The DAO address must be a return argument in the event log named `dao`. Defaults to `DeployInstance`.


### dao upgrade

The `dao upgrade` command upgrades all instances of an app to a newer version.

```
dao upgrade [dao-addr] [app-apm-repo] [repo-version]
```

- `dao-addr`: The main address of the DAO (Kernel).
- `app-apm-repo`: The repo name of the app being upgraded (e.g. `voting` or `voting.aragonpm.eth`).
- `repo-version`: Version of the repo that the app will be upgraded to; can be a version number or `latest` for the newest published version (defaults to `latest`).

aragonOS protects against having different instances of a particular app running with different versions (e.g. all the Voting app instances run the same version).  Performing a `dao upgrade` will upgrade all instances of the app to the version specified.


### dao install

The `dao install` command installs an instance of an app in the DAO.

```
dao install [dao-addr] [app-apm-repo] [repo-version]
```


- `dao-addr`: The main address of the DAO (Kernel).
- `app-apm-repo`: The repo name of the app being installed (e.g. `voting` or `voting.aragonpm.eth`).
- `repo-version`: Version of the repo that will be installed; can be a version number or `latest` for the newest published version (defaults to `latest`).

In aragonOS an app is considered to be installed in a DAO if it uses the DAO Kernel as its Kernel and there are references to the app in the ACL of the DAO.

The `dao install` command will create an instance of the app and assign permissions to the main account to perform all the protected actions in the app.

By default it will initialize the app using `initialize` function, which can be changed with `--app-init` option, and with arguments provided in `--app-init-args`. If you want to skip app initialization (which is not generally recommended), you can do it by setting `--app-init` to `none`.

As explained in the [upgrade command](#dao-upgrade), all app instances of the same app in DAO must run the same version, so installing an app with a version will effectively upgrade all app instances to this version.


### dao apps

Used to inspect all the installed apps in a DAO.

```
dao apps [dao-addr]
```

- `dao-addr`: The main address of the DAO (Kernel).


### dao exec

Performs transactions in your DAO directly from the CLI. It supports [transaction pathing](forwarding-intro.md) so if your account cannot perform the action directly it will try to find how to do it (e.g. creating a vote).

```
dao exec [dao-addr] [app-proxy-addr] [method] [argument1 ... argumentN]
```

- `dao-addr`: The main address of the DAO (Kernel).
- `app-proxy-addr`: The address of the app where the action is being performed. You can find the proxy address by checking [`dao apps`](#dao-apps).
- `method`: Name of the method being executed in the app (e.g. `withdrawTokens`).
- `arguments`: The arguments that the method will be executed with (each separated by a space).


### dao acl

Used to inspect the ACL state in a DAO to check its permissions.

```
dao acl [dao-addr]
```
- `dao-addr`: The main address of the DAO (Kernel).


### dao acl create

Used to create a permission in the ACL. Can only be used if the permission hasn't been created before. The `manager` of the permission can use `dao acl grant` and `dao acl revoke` to manage the permission.

```
dao acl create [dao-addr] [app-proxy-addr] [role] [entity] [manager]
```

- `dao-addr`: The main address of the DAO (Kernel).
- `app-proxy-addr`: The address of the app whose permissions are being managed. You can find the proxy address by checking [`dao apps`](#dao-apps).
- `role`: The identifier for the role. Can be the `bytes32` identifier of the role or its name (e.g. `INCREMENT_ROLE`).
- `entity`: The address of the entity that is being granted the permission by creating it.
- `manager`: The address of the entity that will be able to grant that permission or revoke it.


### dao acl grant

Used to grant a permission in the ACL.

```
dao acl grant [dao-addr] [app-proxy-addr] [role] [entity]
```

- `dao-addr`: The main address of the DAO (Kernel).
- `app-proxy-addr`: The address of the app whose permissions are being managed. You can find the proxy address by checking [`dao apps`](#dao-apps).
- `role`: The identifier for the role. Can be the `bytes32` identifier of the role or its name (e.g. `INCREMENT_ROLE`).
- `entity`: The address of entity that is being granted the permission.


### dao acl revoke

Used to revoke a permission in the ACL.

```
dao acl revoke [dao-addr] [app-proxy-addr] [role] [entity]
```

- `dao-addr`: The main address of the DAO (Kernel).
- `app-proxy-addr`: The address of the app whose permissions are being managed. You can find the proxy address by checking [`dao apps`](#dao-apps).
- `role`: The identifier for the role. Can be the `bytes32` identifier of the role or its name (e.g. `INCREMENT_ROLE`).
- `entity`: The address of entity that is being revoked the permission.


### dao acl set-manager

Used to change the manager of a permission in the ACL.

```
dao acl set-manager [dao-addr] [app-proxy-addr] [role] [manager]
```

- `dao-addr`: The main address of the DAO (Kernel).
- `app-proxy-addr`: The address of the app whose permissions are being managed. You can find the proxy address by checking [`dao apps`](#dao-apps).
- `role`: The identifier for the role. Can be the `bytes32` identifier of the role or its name (e.g. `INCREMENT_ROLE`).
- `manager`: The new manager for the permission.


### dao acl remove-manager

Used to remove the manager of a permission in the ACL. The permission can be created again after removing its manager.

```
dao acl remove-manager [dao-addr] [app-proxy-addr] [role]
```

- `dao-addr`: The main address of the DAO (Kernel).
- `app-proxy-addr`: The address of the app whose permissions are being managed. You can find the proxy address by checking [`dao apps`](#dao-apps).
- `role`: The identifier for the role. Can be the `bytes32` identifier of the role or its name (e.g. `INCREMENT_ROLE`).


## aragonPM commands


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


## Global configuration


### The arapp.json file

The arapp.json file contains metadata for your app. You can check an [example arapp.json](https://github.com/aragon/aragon-apps/blob/master/apps/voting/arapp.json) file to see what fields need to be present:

- `path`: The path to the main contract in your app.
- `roles`: An array of all the roles that your app has. Each role has the following properties:
  - `id`: The identifier of the role as it is defined in the contract.
  - `name`: A description of the role in the app.
  - `params`: The names of any parameters for the role.
- `environments`: An object containing deploy environment configurations.
  - `env_name`: An object containing the configuration for a specific environment. `env_name` can be any name you choose.
    - `appName`: The ENS name of your app where the aragonPM repo can be located.
    - `network`: The network to use for this environment.
    - `registry`: (optional) The address of the ENS registry for this environment. Defaults to the default ENS registry for this network.


## Troubleshooting/FAQ


### Resetting the devchain

After upgrading the CLI, or if unexpected errors are being experienced, [resetting the devchain](#aragon-devchain) (by doing `aragon devchain --reset` or `aragon run --reset`) is sometimes useful as it will restart the chain from the snapshot.


### Using Metamask

The easiets way to interact with your DAO is using [Metamask](https://metamask.io/). In order to do so, you must make sure that:

- It's unlocked
- Private network (_Localhost 8545_) is chosen
- The first account provided by `aragon run` or `aragon devchain` is imported and selected. To import the account, copy the private key (something like `a8a54b2d8197bc0b19bb8a084031be71835580a01e70a45a13babd16c9bc1563`), go to the Metamask accounts upper icon (to the left of the hamburguer button), scroll down, click on "Import account" and paste the value you copied.


### Issues sending transactions

Because of the way that Metamask caches the account nonces for the different networks, you may be getting the following error when interacting with your app:

```
Error: the tx doesn't have the correct nonce. account has nonce of: 157 tx has nonce of: 158
```

The workaround is to switch to a different network (e.g. Rinkeby) and then switch back to the _Localhost 8545_ network.  This will refresh Metamask's account nonce cache. Sending transactions should now succeed.


### The ~/.aragon directory

The aragonCLI creates the `.aragon` directory under the user directory where it saves the state of the devchain and the Aragon client.

In case the client is not loading properly, deleting the `~/.aragon` directory will make `aragon run` recreate the environment the next time it is used and may solve the issue.
