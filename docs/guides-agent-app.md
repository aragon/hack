 
## Introduction

 The Agent app (or Aragon Agent) is an Aragon app that can be installed in any Aragon DAO. It's main feature is its ability to perform arbitrary calls to contracts. This means it can be thought of as the **external interface of a DAO**. 

 Put another way:

 >Aragon Agent is a fully-fledged Ethereum account owned by an Aragon organization. It's like a multi-signature account on steroids that enables organizations to interact with any Ethereum contract or protocol. Trading tokens on 0x or Uniswap, opening a Maker CDP, managing names in ENS, owning digital LAND parcels, or even breeding digital cats. [Source](https://blog.aragon.one/aragon-agent-beta-release/)
 
 In technical terms, it's a superset of the [Vault app](https://wiki.aragon.org/dev/apps/vault/), which means it can hold valuable assets ((ETH and [ERC-20](https://en.wikipedia.org/wiki/ERC-20) tokens).
 
Concretely, the Agent app allows for things like:

- An Aragon DAO to interact with other Ethereum smart contracts or protocols without the need to implement a custom Aragon app for every protocol.

- Members of DAOs to identify themselves as their DAO when using any Ethereum dApp.

- An Aragon DAO to participate as a stakeholder in another DAO.

### To find out more
- [Dynamic Permissions for Organization “Actions” with Signer Integration](https://forum.aragon.org/t/dynamic-permissions-for-organization-actions-with-signer-integration/116)

 - [Agent app, arbitrary actions from DAOs](https://forum.aragon.org/t/agent-app-arbitrary-actions-from-daos/275)

 - [Releasing Aragon Agent beta](https://blog.aragon.one/aragon-agent-beta-release/)

## Prerequisites

Before we start, you'll need to head over to [Aragon](https://app.aragon.org/) and create a new DAO with the [democracy template](https://github.com/aragon/dao-kits/tree/master/kits/democracy).

If you're not sure how to do that, please have a look at  [this section](https://wiki.aragon.org/tutorials/Aragon_User_Guide/#21-create-a-new-democracy-organization) of our [User Guide](https://wiki.aragon.org/tutorials/Aragon_User_Guide/#21-create-a-new-democracy-organization).

The first thing you'll be asked to do is to [choose the network](https://wiki.aragon.org/tutorials/Aragon_User_Guide/#211-navigate-to-httpsapparagonorg-in-your-web-browser) for your organization. For the purposes of this guide we'll choose the **Ethereum Testnet (Rinkeby)**.

Later on, you'll be asked to [set three parameters](https://wiki.aragon.org/tutorials/Aragon_User_Guide/#214-set-the-parameters-of-your-democracy-organization-then-click-next) for your organisation -- the **support**, the **minimum acceptance quorum**, and the **vote duration**.

We'll go with the following (sensible) defaults:

- Support: 100%
- Min. Quorum: 0%
- Duration: 168 hours (or 1 week)

## Installing aragonCLI

The aragonCLI (Command Line Interface) is what we use to create, interact with, and develop Aragon apps.

Install it from NPM by running the following command:

`npm install -g @aragon/cli`

Hopefully, it downloaded successfully.

 If not, you should take a look at the [installing aragonCLI](https://hack.aragon.org/docs/guides-faq#installing-aragoncli) section of our [troubleshooting guide.](/docs/guides-faq#installing-aragonCLI) If that doesn't fix things, please don't hesitate to reach out to us at the [#dev-help channel on the Aragon Chat](https://aragon.chat/channel/dev-help).


You can find out more about aragonCLI by reading the [aragonCLI documentation](https://hack.aragon.org/docs/cli-intro).

N.B. even if you've already installed the CLI, you might want to reinstall it to make sure you're up to date with the latest version.

## Installing the Agent app










