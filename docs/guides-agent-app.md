 ## What is the Agent app
 The Agent app is an Aragon App that can be installed in any Aragon DAO. It's main feature is its ability to perform arbitrary calls to contracts. This allows it to represent the DAO externally.

 In other words, the Agent app can be thought of as the external interface of a DAO: it allows a DAO and its members to collectively participate in any web3 application, including other DAOs. For example a DAO might choose to participate in a staking pool, breed cryptokitties, or participate in a larger DAO.

In technical terms, the Agent app is a superset of the [Vault app](https://github.com/aragon/aragon-apps/tree/master/apps/vault). It can hold valuable assets (ETH and ERC20) and perform external actions.

Concretely, the Agent app allows for things like:

- An Aragon DAO to interact with other Ethereum smart contracts or protocols without the need to implement a custom Aragon app for every protocol.

- Members of DAOs to identify themselves as their DAO when using any Ethereum dApp (signer integrations take care of routing the intent through the governance process of the DAO).

- An Aragon DAO to participate as a stakeholder in another DAO, enabling the creation of DAO stacks.

### Further resources
- [Dynamic Permissions for Organization “Actions” with Signer Integration](https://forum.aragon.org/t/dynamic-permissions-for-organization-actions-with-signer-integration/116)

 - [Agent app, arbitrary actions from DAOs](https://forum.aragon.org/t/agent-app-arbitrary-actions-from-daos/275)