---
id: guides-publish
title: Publish to aragonPM
sidebar_label: Publish to aragonPM
---

#####

This guide will show you how to publish an app to [aragonPM](/docs/advanced/apm-ref.md) on different environments.

> **Note**<br>
> Publishing your app requires an on-chain action so you must connect an Ethereum account with enough funds on the selected environment to send a publish transaction.
>
> Secondly, your app's frontend content is uploaded to IPFS and it becomes **your responsibility** to ensure that it stays available to users. We have [some tips and tricks on propagating this content](/docs/faq/propagation.md) but ultimately someone will have to [pin](https://docs.ipfs.io/guides/concepts/pinning/) it.

## Setup

We'll start from the [React boilerplate](https://github.com/aragon/aragon-react-boilerplate).

```sh
npx create-aragon-app app
```

This will create a new directory named `app`, with everything you need.

To interact with aragonPM we will use the [`aragon apm`](/docs/aragon-cli/cli-apm-commands) commands.

## Introduction to environments

This app has 4 environments defined:

| Environment | Network   |
| ----------- | --------- |
| default     | localhost |
| rinkeby     | rinkeby   |
| staging     | staging   |
| mainnet     | mainnet   |

Is a prerequisite to have a ENS Registry address defined.

Environments are defined in [`arapp.json`](/docs/aragon-cli/cli-global-confg.html#the-arappjson-file), for example `rinkeby` points to:

- An ENS registry: `0x98df287b6c145399aaa709692c8d308357bc085d`
- An app name (repository and registry of aragonPM): `app.open.aragonpm.eth`
- An Ethereum websockets provider: `wss://rinkeby.eth.aragon.network/ws` - to **read** from the blockchain
- An Ethereum network: `rinkeby`

The `rinkeby` network is further defined in `truffle.js` using our [contract-helper package](https://github.com/aragon/contract-helpers/blob/master/packages/truffle-config-v5/truffle-config.js) and has:

- An Ethereum provider address: `https://rinkeby.eth.aragon.network` (to **write** to the blockchain)
- An Ethereum account: `0xb41...6eE7` (which is the first account generated from the `DEFAULT_MNEMONIC` variable, to learn how to set a different private-key follow the [FAQ](/docs/faq/set-private-key.md))

> **Note**<br>
> The `default` environment which points to `localhost` does not have an ENS Registry address specified because aragonCLI will default the value to `0xB9462EF3441346dBc6E49236Edbb0dF207db09B7` (the ENS Registry pre-deployed on the local development chain).

## Publish a major version: content + contract

To publish on aragonPM we will use [`aragon apm publish`](/docs/aragon-cli/cli-apm-commands#aragon-apm-publish) command.

Command:

```sh
npx aragon apm publish major --environment rinkeby
```

This will:

<span>![*](/docs/assets/check.svg) Apply version bump (major).</span>

<span>![*](/docs/assets/check.svg) _Compile_ and _deploy_ the app's contract (by default the output lives in `build`)</span>

<span>![*](/docs/assets/check.svg) _Build_ the app's [frontend (by default the output lives in `dist`)](#building-frontends)</span>

<span>![*](/docs/assets/check.svg) Generate application artifact.</span>

<span>![*](/docs/assets/check.svg) Publish the app to the **rinkeby** environment.</span>

Sample output:

```sh
 The following information will be published:
 Contract address: 0x1378Fb9fB89E243b4EFc7abdA410F8D407278da6
 Content (ipfs): Qmaum1Jg5t5PyGZG6vWkx1zkjgz9Qd1tsEVx7g7ypYrH32

? Publish to app.open.aragonpm.eth repo Yes

  ✔ Publish app.open.aragonpm.eth

 Successfully published benchmark.open.aragonpm.eth v1.0.0:

Transaction hash: 0xb751ccf8d95a9af81ebd4337ed29fe72292d5a9b0833287c6ead1a288703bd91
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
npx aragon apm publish patch --environment rinkeby
```

This will:

<span>![*](/docs/assets/check.svg) Apply version bump (patch).</span>

<span>![*](/docs/assets/check.svg) _Build_ the app's [frontend (by default the output lives in `dist`)](#building-frontends)</span>

<span>![*](/docs/assets/check.svg) Generate application artifact.</span>

<span>![*](/docs/assets/check.svg) Publish the app to the **rinkeby** environment.</span>

Sample output:

```sh
 The following information will be published:
 Contract address: 0x1378Fb9fB89E243b4EFc7abdA410F8D407278da6
 Content (ipfs): QmPBqLC5hHbZLLkRZBUamqYeP4B6XFEugdXWg65mrDjSYY

? Publish to app.open.aragonpm.eth repo Yes

  ✔ Publish app.open.aragonpm.eth

 Successfully published benchmark.open.aragonpm.eth v1.0.1 :

Transaction hash: 0x23bbcfdc61bce4eb0ccc0e2e1c8c08486cf08d3b5c492180f7b97e3f9783b7ce
```

## Check published versions

To fetch the versions published on aragonPM we will use [`aragon apm versions`](/docs/aragon-cli/cli-apm-commands.html#aragon-apm-versions) command.

Command:

```sh
npx aragon apm versions --environment rinkeby
```

Sample output:

```sh
 ℹ app.open.aragonpm.eth has 2 published versions
 ✔ 1.0.0: 0x1378Fb9fB89E243b4EFc7abdA410F8D407278da6 ipfs:Qmaum1Jg5t5PyGZG6vWkx1zkjgz9Qd1tsEVx7g7ypYrH32
 ✔ 1.0.1: 0x1378Fb9fB89E243b4EFc7abdA410F8D407278da6 ipfs:QmPBqLC5hHbZLLkRZBUamqYeP4B6XFEugdXWg65mrDjSYY
```

### Fetch other packages versions

We will fetch the published versions of the official `vault` app on the rinkeby (`rinkeby` network) environment.

Command:

```sh
npx aragon apm vault.aragonpm.eth --environment rinkeby
```

Sample output:

```sh
ℹ vault.aragonpm.eth has 6 published versions
✔ 1.0.0: 0x9153d1D442D79E09717462c2A04F92ac6cFFa462 ipfs:QmcgWR8u3oiCRFn7xCR8oenk85k5vXvimNwzxJNJKGWuhz
✔ 2.0.0: 0x31637C26Ab193cf12402F3FC5265ae916a1cFb89 ipfs:QmYG19A2PB437K5PDnqnxK4i25zCGQTrCjNQsyJ3j8UJmZ
✔ 2.0.1: 0x31637C26Ab193cf12402F3FC5265ae916a1cFb89 ipfs:Qmf4n8SU86dkqep4cjcUG1jGsR9RNmXQToUSMAuUpTtWoS
✔ 3.0.0: 0x35c5Abf253C873deE9ee4fe2687CD378Eff1263e ipfs:QmSxx69up7Aoc7LtAh1c539AxjT4XykGbAV7mD63PMLx5Y
✔ 3.0.1: 0x35c5Abf253C873deE9ee4fe2687CD378Eff1263e ipfs:QmeMabCnkA5BtTTszqqRztYKCXZqE9VQFH4Vx7dY9ue2nA
✔ 3.1.0: 0x35c5Abf253C873deE9ee4fe2687CD378Eff1263e ipfs:QmYZpZ7tNzHmcqZbALcMxp53Tzub3P7NNgitoMa92D6gbD
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
