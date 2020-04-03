---
id: guides-publish
title: Publish to aragonPM
sidebar_label: Publish to aragonPM
---

#####

This guide will show you how to publish an app to [aragonPM](/docs/package-management) on different environments.

> **Note**<br>
> Publishing your app requires an on-chain action so you must connect an Ethereum account with enough funds on the selected environment to send a publish transaction.
>
> Secondly, your app's frontend content is uploaded to IPFS and it becomes **your responsibility** to ensure that it stays available to users. Click [here](https://docs.ipfs.io/introduction/overview/) to learn more about IPFS and [pinning files](https://docs.ipfs.io/guides/concepts/pinning/).

## Setup

We'll start from the Aragon [React boilerplate](https://github.com/aragon/aragon-react-boilerplate).

```sh
npx create-aragon-app app
```

This will create a new directory named `app`, with everything you need.

To interact with aragonPM we will use the [`Aragon Buidler plugin`](https://github.com/aragon/buidler-aragon) already installed in the boilerplate repository. 

We will also need a running [IPFS server](https://docs.ipfs.io/guides/guides/install/). For this tutorial, we will assume that the IPFS server is running locally with its API port set to `5001` and gateway to `8080`. 

## Introduction to environments

This app has 3 environments defined:

| Environment | Network   |
| ----------- | --------- |
| default     | localhost |
| rinkeby     | rinkeby   |
| mainnet     | mainnet   |

It is a prerequisite to have a ENS Registry address defined.

Environments are defined in [`arapp.json`](/docs/cli-global-confg#the-arappjson-file), for example `rinkeby` points to:

- An ENS registry: `0x98df287b6c145399aaa709692c8d308357bc085d`
- An app name (repository and registry of aragonPM): `app.aragonpm.eth`
- An Ethereum network: `rinkeby`

> **Note**<br>
> The `default` environment which points to `localhost` does not have an ENS Registry address specified because the Buidler plugin will default the value to `0xB9462EF3441346dBc6E49236Edbb0dF207db09B7` (the ENS Registry pre-deployed on the local development chain).

## Publish a major version: content + contract

To publish on aragonPM we will use the following buidler task:

```sh
npx buidler publish major --network rinkeby
```

This will:

- Apply version bump (major).
- _Compile_ and _deploy_ the app's contract (by default the output lives in `build`)
- _Build_ the app's [frontend (by default the output lives in `dist`)](#building-frontends)
- Generate application artifact.
- Publish the app to the **rinkeby** environment.
- Upload the app's frontend to the IPFS server.

Sample output:

```sh
main     |   App name:          app.aragonpm.eth
main     |   Initial version:   1.0.0
main     |   Manager address:   0x5Ddb5ec4fF143fDaBCCD0a47F30FF2ce319C2a01
main     |   Contract address:  0x2e25c8F88c5cCcbC9400e5bc86cF9C58C7604327
main     |   ContentURI:        QmTBapuxxzFHzxdbxxZUmdEmyRxQohxoK7qiXiJ6id36tu
main     | 
main     |   http://localhost:8080/ipfs/QmTBapuxxzFHzxdbxxZUmdEmyRxQohxoK7qiXiJ6id36tu
main     | 
main     | 
main     |   Tx sent
main     | 
main     |   Tx hash:  0x954fa737215152d2c9be5893bcda91cf889b30dd5e26bada10b657e87b89692f
main     |   
main     | 
main     |   Tx mined
main     |   
main     |   Status:        Success
main     |   Block number:  78
main     |   Gas used:      960591
```

> **Note**<br>
> You can also deploy a major version with only frontend changes by passing `--only-content`.
>
> The contract location is defined in `arapp.json` under `path`.


## Task syntax and options

The publish task has the following syntax:

```sh
npx buidler publish [global options] <bump> [task options]
```

Where `global options` are Buidler's [global options](https://buidler.dev/getting-started/#quick-start) and `bump` is the version bump (either `major`, `minor` or `patch`) or the semantic version. E.g. `minor` would increase version `1.2.0` to `1.3.0`.

The following task options are available:

- `contract`: Contract address previously deployed.
- `manager-address`: Owner of the APM repo. Must be provided in the initial release.
- `ipfs-api-url` (default: `http://localhost:5001`): IPFS API URL to connect to an ipfs daemon API server.
- `only-content` (flag): Prevents contract compilation, deployment and artifact generation.
- `verify` (flag): Enables Etherscan verification.
- `dry-run` (flag): Output tx data without broadcasting.


## Check published versions

To fetch the versions published on aragonPM, we can use the [`aragon apm versions`](https://hack.aragon.org/docs/cli-apm-commands#aragon-apm-versions) command with aragonCLI.

Command:

```sh
aragon apm versions --environment rinkeby
```

Sample output:

```sh
 ℹ app.aragonpm.eth has 2 published versions
 ✔ 1.0.0: 0xE636bcA5B95e94F749F63E322a04DB59362299F1 ipfs:QmR695Wu5KrHNec7pRP3kPvwYihABDAyVYdX5D5vwLgxCn
 ✔ 1.0.1: 0xE636bcA5B95e94F749F63E322a04DB59362299F1 ipfs:QmUYv9cjyNVxCyAJGK2YXjkbzh6u4iW2ak81Z9obdefM1q
```

### Fetch other packages versions

We will fetch the published versions of the official `voting` app on the rinkeby (`rinkeby` network) environment.

Command:

```sh
aragon apm versions voting.aragonpm.eth --environment rinkeby
```

Sample output:

```sh
ℹ voting.aragonpm.eth has 24 published versions
 ✔ 1.0.0: 0x8C06aEBF29F20A2e09b32F5d44cEa49Db3EC2eE0 ipfs:QmQHhcbZRoTKkbjWdwXwqqWZzTNHUFzECPrfqie8f8oq45
 ✔ 1.1.0: 0x8C06aEBF29F20A2e09b32F5d44cEa49Db3EC2eE0 ipfs:QmT27VvGNiNeWj4tsZ5omDCc6KxaHU3N9uebFCsoxSAEpL
 ✔ 1.1.1: 0x8C06aEBF29F20A2e09b32F5d44cEa49Db3EC2eE0 ipfs:QmYmQVKj44FNjaY2qT4iWMWGSpKmnoseUw7idJkh9mtjei
 ✔ 1.1.2: 0x8C06aEBF29F20A2e09b32F5d44cEa49Db3EC2eE0 ipfs:QmWsfxKYLTUyVokhEWEQG9w3Y8VgGbaNGnrL7yx72yPVan
 ✔ 1.1.3: 0x8C06aEBF29F20A2e09b32F5d44cEa49Db3EC2eE0 ipfs:QmU6kD8qo4HDnqBmka16DTA61FBUkttarVJumZxrizvduP
 ✔ 1.1.4: 0x8C06aEBF29F20A2e09b32F5d44cEa49Db3EC2eE0 ipfs:QmUJoRBNYebTLQu62fmPUjrGQxrA2reWNfiBxKxcf9ydRc
 ✔ 1.1.5: 0x8C06aEBF29F20A2e09b32F5d44cEa49Db3EC2eE0 ipfs:QmW3URtbrnZeVQkMP2bLTBe2uF4Eyz9uu2818kVvgJ76c7
 ✔ 1.1.6: 0x8C06aEBF29F20A2e09b32F5d44cEa49Db3EC2eE0 ipfs:QmcE6bw5WVwGL6Ewc5qYym6KPCeQfE2xbqeRXESmUuEssC
 ✔ 1.1.7: 0x8C06aEBF29F20A2e09b32F5d44cEa49Db3EC2eE0 ipfs:QmTCYzgvrjtV4ETkhM3ZNgrVYNi2roXhNxCRmwsePNqL1B
 ✔ 2.0.0: 0xb4fa71b3352D48AA93D34d085f87bb4aF0cE6Ab5 ipfs:QmVpxvSBWY4dLqPzW33UhLXeL17kej1VQJSopaKWjBnu4u
 ✔ 2.0.1: 0xb4fa71b3352D48AA93D34d085f87bb4aF0cE6Ab5 ipfs:QmeJq7vK5wUg7AsjTsr6oe8bNDGJzAYuZyk4yY2XBhSdVC
 ✔ 2.0.2: 0xb4fa71b3352D48AA93D34d085f87bb4aF0cE6Ab5 ipfs:QmZJbfNXwV5RrRNmKJUsabMzJsupMM7pqtGdcetnb2CHQz
 ✔ 2.0.3: 0xb4fa71b3352D48AA93D34d085f87bb4aF0cE6Ab5 ipfs:QmcgUz9PXaZwvA3m7fXPgjsEVKteuivLNSCDvxKGv8ztMa
```

## Building frontends

Your application's frontend will have another build script associated with it, to transpile, bundle, and pack all of its assets (e.g. scripts, images, fonts, etc) together.

If you've used the Aragon react boilerplate, this has already been set up for you with [`parcel-bundler`](https://parceljs.org) and [aragonUI](/docs/aragonui-intro).

If you need to add, modify, or remove assets or the way the frontend is built, it's important to remember to **always** use **relative paths** to serve those assets. Usually, this can be accomplished by adding a `./` in front of the path.

This is important because in production, the Aragon client usually fetches all of an app's assets via an IPFS gateway, and non-relative paths break gateway resolutions. You can test this for yourself by attempting to access your app when it's published by going to an IPFS gateway and making sure its assets are being loaded correctly.
