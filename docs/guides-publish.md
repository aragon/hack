---
id: guides-publish
title: Publish
sidebar_label: Publish
---

This guide will show you how to publish your app to an [aragonPM](/docs/package-management) instance on different environments.

> **Note**<br>
> Publishing your app requires an on-chain action so you must connect an Ethereum account with enough funds on the selected environment to send a publish transaction.
>
> Secondly, your app's frontend content is uploaded to IPFS and it becomes **your responsibility** to ensure that it stays available to users. We have [some tips and tricks on propagating this content](/docs/guides-faq#propagating-your-content-hash-through-ipfs) but ultimately someone will have to [pin](https://docs.ipfs.io/guides/concepts/pinning/) it.

## Setup

We'll start from the [React boilerplate](https://github.com/aragon/aragon-react-boilerplate).

```sh
npx create-aragon-app app react
```

This will create a new directory named `app`, with everything you need.

## Introduction to environments

This app has 3 environments defined in `arapp.json`:

| Environment   | Network   |
|---            |---        |
| default       | localhost |
| staging       | rinkeby   |
| production    | mainnet   |

Is a prerequisite to have a ENS Registry address defined.

Environments are defined in `arapp.json`, for example `staging` points to:
- an ENS registry: `0x314159265dd8dbb310642f98f50c066173c1259b`
- an APM registry: `open.aragonpm.eth`
- an APM repository: `app`
- an Ethereum network: `rinkeby`
- an Ethereum websockets provider: `wss://rinkeby.eth.aragon.network/ws` - to **read** from the blockchain

The `rinkeby` network is further defined in `truffle.js`, an has an Ethereum provider (to **write** to the blockchain), which define:
- an address: `https://rinkeby.infura.io`
- an Ethereum account: `0xb41...6eE7` (which is the first account generated from the `DEFAULT_MNEMONIC` variable, to use a different account see the [troubleshooting guide](/docs/guides-faq.html#set-a-private-key)

## Major version: content + contract

Command:

```sh
npm run publish:major --environment staging
```

This will:
1. [_build_ the app's frontend (by default the output lives in `dist`)](#building-frontends)
2. _compile_ the app's contract (by default the output lives in `build`)
3. publish the app to the **staging** environment.

Sample output:
```sh
 > aragon apm publish major "--environment" "staging"

 ✔ Successfully published app.open.aragonpm.eth v1.0.0:
 ℹ Contract address: 0xE636bcA5B95e94F749F63E322a04DB59362299F1
 ℹ Content (ipfs): QmR695Wu5KrHNec7pRP3kPvwYihABDAyVYdX5D5vwLgxCn
 ℹ Transaction hash: 0x3d752db29cc106e9ff98b260a90615921eb32471425a29ead8cbb830fb224d8
```

> **Note**<br>
> You can also deploy a major version with only frontend changes by passing `--only-content`.
> The contract location is defined in `arapp.json` under `path`.

## Minor/patch version: content only

Command:
```sh
npm run publish:patch -- --environment staging
```

This will:
1. [_build_ the app's frontend (by default the output lives in `dist`)](#building-frontends)
2. publish the app to the **staging** environment.

Sample output:
```sh
 ✔ Successfully published app.open.aragonpm.eth v1.1.1:
 ℹ Contract address: 0xE636bcA5B95e94F749F63E322a04DB59362299F1
 ℹ Content (ipfs): QmUYv9cjyNVxCyAJGK2YXjkbzh6u4iW2ak81Z9obdefM1q
 ℹ Transaction hash: 0x57864d8efd8d439008621b494b19a3e8f876a8a46b38475f9626802f0a1403c2
```

## Check published versions

Command:
```sh
npm run versions -- --environment staging
```

Sample output:
```sh
 ℹ app.open.aragonpm.eth has 4 published versions
 ✔ 1.0.0: 0xE636bcA5B95e94F749F63E322a04DB59362299F1 ipfs:QmR695Wu5KrHNec7pRP3kPvwYihABDAyVYdX5D5vwLgxCn
 ✔ 1.1.0: 0xE636bcA5B95e94F749F63E322a04DB59362299F1 ipfs:QmSwjUZFpv2c2e9fLoxtgFrAsAmBN4DyQGJp4RcqQcW3z3
 ✔ 1.1.1: 0xE636bcA5B95e94F749F63E322a04DB59362299F1 ipfs:QmUYv9cjyNVxCyAJGK2YXjkbzh6u4iW2ak81Z9obdefM1q
 ✔ 2.0.0: 0x74CBbbC932d7C344FCd789Eba24BfD40e52980c9 ipfs:Qmadb3hzwLDKtb93fF367Vg1epkdsLZF4dhpapNYynjgZF
```

## More about environments

The default environments used by aragonCLI are defined in [`environments.default.json`](https://github.com/aragon/aragon-cli/blob/master/packages/aragon-cli/config/environments.default.json). This file has 4 environments:

| Environment       | Network   |
|---                |---        |
| aragon:local      | localhost |
| aragon:rinkeby    | rinkeby   |
| aragon:staging    | rinkeby   |
| aragon:mainnet    | mainnet   |

In case you have an `arapp.json` file in your app directory, aragonCLI will use your local configuration over the default.

> **Note**<br>
> The `aragon:local` environment which points to `localhost` does not have an ENS Registry address specified because aragonCLI will default the value to `0xB9462EF3441346dBc6E49236Edbb0dF207db09B7` (the ENS Registry pre-deployed on the local development chain).

## Building frontends

Your application's frontend will have another build script associated with it, to transpile, bundle, and pack all of its assets (e.g. scripts, images, fonts, etc) together.

If you've used one of the boilerplates, it's likely this has already been set up for you with
[`parcel-bundler`](https://parceljs.org) and [aragonUI](/docs/aragonui-intro).

If you need to add, modify, or remove assets or the way the frontend is built, it's important to remember to **always** use **relative paths** to serve those assets. Usually, this can be accomplished by adding a `./` in front of the path.

This is important because the Aragon client usually fetches all of an app's assets via an IPFS
gateway, and non-relative paths break gateway resolutions. You can test this for yourself by
attempting to access your app when it's published by going to an IPFS gateway (see [tips and tricks of propagating IPFS content](/docs/guides-faq#propagating-your-content-hash-through-ipfs)) and making sure its assets are being loaded correctly.
