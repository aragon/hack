 ## Introduction
 The Agent app is an Aragon App that can be installed in any Aragon DAO. It's main feature is its ability to perform arbitrary calls to contracts. This allows it to represent the DAO externally.

 In other words, the Agent app can be thought of as the external interface of a DAO: it allows a DAO and its members to collectively participate in any web3 application, including other DAOs. 
 
 >Aragon Agent is a fully-fledged Ethereum account owned by an Aragon organization. It's like a multi-signature account on steroids that enables organizations to interact with any Ethereum contract or protocol. Trading tokens on 0x or Uniswap, opening a Maker CDP, managing names in ENS, owning digital LAND parcels, or even breeding digital cats. [Source](https://blog.aragon.one/aragon-agent-beta-release/)



In technical terms, it's a superset of the [Vault app](https://wiki.aragon.org/dev/apps/vault/), which means it can hold valuable assets ((ETH and [ERC-20](https://en.wikipedia.org/wiki/ERC-20) tokens).
 
Concretely, the Agent app allows for things like:

- An Aragon DAO to interact with other Ethereum smart contracts or protocols without the need to implement a custom Aragon app for every protocol.

- Members of DAOs to identify themselves as their DAO when using any Ethereum dApp.

- An Aragon DAO to participate as a stakeholder in another DAO.

### Further resources
- [Dynamic Permissions for Organization “Actions” with Signer Integration](https://forum.aragon.org/t/dynamic-permissions-for-organization-actions-with-signer-integration/116)

 - [Agent app, arbitrary actions from DAOs](https://forum.aragon.org/t/agent-app-arbitrary-actions-from-daos/275)

 - [Releasing Aragon Agent beta](https://blog.aragon.one/aragon-agent-beta-release/)

## Prerequisites

Before we start, you'll need to head over to [Aragon](https://app.aragon.org/) and create a new DAO with the [democracy template](https://github.com/aragon/dao-kits/tree/master/kits/democracy).

If you're not sure how to do that, we have a [section devoted to it](https://wiki.aragon.org/tutorials/Aragon_User_Guide/#21-create-a-new-democracy-organization) in our [User Guide](https://wiki.aragon.org/tutorials/Aragon_User_Guide/#21-create-a-new-democracy-organization).

At some point you'll be asked to [set three parameters](https://wiki.aragon.org/tutorials/Aragon_User_Guide/#214-set-the-parameters-of-your-democracy-organization-then-click-next) for your organisation -- the **support**, the **minimum acceptance quorum**, and the **vote duration**.

For the purposes of this guide we'll go with the following (sensible) defaults:

- Support: 100%
- Min. Quorum: 0%
- Duration: 168 hours (or 1 week)










