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
> Secondly, your app's frontend content is uploaded to IPFS and it becomes **your responsibility** to ensure that it stays available to users. We have [some tips and tricks on propagating this content](/docs/guides-faq#propagating-your-content-hash-through-ipfs) but ultimately someone will have to [pin](https://docs.ipfs.io/guides/concepts/pinning/) it.

## Setup

We'll start from the [React boilerplate](https://github.com/aragon/aragon-react-boilerplate).

```sh
npx create-aragon-app app
```

This will create a new directory named `app`, with everything you need.

To interact with aragonPM we will use the [`aragon apm`](/docs/cli-apm-commands) commands.

## Introduction to environments

This app has 3 environments defined:

| Environment | Network   |
| ----------- | --------- |
| default     | localhost |
| staging     | rinkeby   |
| production  | mainnet   |

Is a prerequisite to have a ENS Registry address defined.

Environments are defined in [`arapp.json`](/docs/cli-global-confg#the-arappjson-file), for example `staging` points to:

- An ENS registry: `0x98df287b6c145399aaa709692c8d308357bc085d`
- An app name (repository and registry of aragonPM): `app.open.aragonpm.eth`
- An Ethereum websockets provider: `wss://rinkeby.eth.aragon.network/ws` - to **read** from the blockchain
- An Ethereum network: `rinkeby`

The `rinkeby` network is further defined in `truffle.js`, and has:

- An Ethereum provider address: `https://rinkeby.infura.io` (to **write** to the blockchain)
- An Ethereum account: `0xb41...6eE7` (which is the first account generated from the `DEFAULT_MNEMONIC` variable, to learn how to use a different account follow the [troubleshooting guide](/docs/guides-faq.html#set-a-private-key))

> **Note**<br>
> The `default` environment which points to `localhost` does not have an ENS Registry address specified because aragonCLI will default the value to `0xB9462EF3441346dBc6E49236Edbb0dF207db09B7` (the ENS Registry pre-deployed on the local development chain).

## Publish a major version: content + contract

To publish on aragonPM we will use [`aragon apm publish`](/docs/cli-apm-commands#aragon-apm-publish) command.

Command:

```sh
npx aragon apm publish major --environment staging
```

This will:

<span>![*](/docs/assets/check.svg) Apply version bump (major).</span>

<span>![*](/docs/assets/check.svg) _Compile_ and _deploy_ the app's contract (by default the output lives in `build`)</span>

<span>![*](/docs/assets/check.svg) _Build_ the app's [frontend (by default the output lives in `dist`)](#building-frontends)</span>

<span>![*](/docs/assets/check.svg) Generate application artifact.</span>

<span>![*](/docs/assets/check.svg) Publish the app to the **staging** environment.</span>

Sample output:

```sh
 > npx aragon apm publish major --environment staging

 ✔ Successfully published app.open.aragonpm.eth v1.0.0:
 ℹ Contract address: 0xE636bcA5B95e94F749F63E322a04DB59362299F1
 ℹ Content (ipfs): QmR695Wu5KrHNec7pRP3kPvwYihABDAyVYdX5D5vwLgxCn
 ℹ Transaction hash: 0x3d752db29cc106e9ff98b260a90615921eb32471425a29ead8cbb830fb224d8
```

> **Note**<br>
> You can also deploy a major version with only frontend changes by passing `--only-content`.
>
> You can also just generate artifacts file without publishing by passing `--only-artifacts`.
>
> The contract location is defined in `arapp.json` under `path`.

## Publish a minor or patch version: content only

Command:

```sh
npx aragon apm publish patch --environment staging
```

This will:

<span>![*](/docs/assets/check.svg) Apply version bump (patch).</span>

<span>![*](/docs/assets/check.svg) _Build_ the app's [frontend (by default the output lives in `dist`)](#building-frontends)</span>

<span>![*](/docs/assets/check.svg) Generate application artifact.</span>

<span>![*](/docs/assets/check.svg) Publish the app to the **staging** environment.</span>

Sample output:

```sh
 ✔ Successfully published app.open.aragonpm.eth v1.0.1:
 ℹ Contract address: 0xE636bcA5B95e94F749F63E322a04DB59362299F1
 ℹ Content (ipfs): QmUYv9cjyNVxCyAJGK2YXjkbzh6u4iW2ak81Z9obdefM1q
 ℹ Transaction hash: 0x57864d8efd8d439008621b494b19a3e8f876a8a46b38475f9626802f0a1403c2
```

## Check published versions

To fetch the versions published on aragonPM we will use [`aragon apm versions`](https://hack.aragon.org/docs/cli-apm-commands#aragon-apm-versions) command.

Command:

```sh
npx aragon apm versions --environment staging
```

Sample output:

```sh
 ℹ app.open.aragonpm.eth has 2 published versions
 ✔ 1.0.0: 0xE636bcA5B95e94F749F63E322a04DB59362299F1 ipfs:QmR695Wu5KrHNec7pRP3kPvwYihABDAyVYdX5D5vwLgxCn
 ✔ 1.0.1: 0xE636bcA5B95e94F749F63E322a04DB59362299F1 ipfs:QmUYv9cjyNVxCyAJGK2YXjkbzh6u4iW2ak81Z9obdefM1q
```

### Fetch other packages versions

We will fetch the published versions of the official `voting` app on the staging (`rinkeby` network) environment.

Command:

```sh
npx aragon apm voting.aragonpm.eth --environment staging
```

Sample output:

```sh
ℹ voting.aragonpm.eth has 13 published versions
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

## More about environments

The default environments used by aragonCLI are defined in [`environments.default.json`](https://github.com/aragon/aragon-cli/blob/master/packages/aragon-cli/config/environments.default.json). This file has 4 environments:

| Environment    | Network   |
| -------------- | --------- |
| aragon:local   | localhost |
| aragon:rinkeby | rinkeby   |
| aragon:staging | rinkeby   |
| aragon:mainnet | mainnet   |

In case you have an `arapp.json` file in your app directory, aragonCLI will use your local configuration over the default.

## Building frontends

Your application's frontend will have another build script associated with it, to transpile, bundle, and pack all of its assets (e.g. scripts, images, fonts, etc) together.

If you've used one of the boilerplates, it's likely this has already been set up for you with [`parcel-bundler`](https://parceljs.org) and [aragonUI](/docs/aragonui-intro).

If you need to add, modify, or remove assets or the way the frontend is built, it's important to remember to **always** use **relative paths** to serve those assets. Usually, this can be accomplished by adding a `./` in front of the path.

This is important because the Aragon client usually fetches all of an app's assets via an IPFS gateway, and non-relative paths break gateway resolutions. You can test this for yourself by attempting to access your app when it's published by going to an IPFS gateway (see [tips and tricks of propagating IPFS content](/docs/guides-faq#propagating-your-content-hash-through-ipfs)) and making sure its assets are being loaded correctly.
