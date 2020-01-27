---
id: guides-templates
title: Create templates for easy DAO setup
sidebar_label: Templates
---

#####

Creating a DAO with all the desired apps and permissions requires multiple operations that must be properly orchestated. In the context of Ethereum, performing all these operations would require sending many transactions. This would not only be very costly, as every transaction needs to pay for gas, also the integrity of the deployment depends on all operations occurring in the right order.

For these reasons, **the recommended way of creating Aragon DAOs** is using what we call **templates**, on-chain _deployment scripts_ that create a DAO and perform all the required configuration steps in an **atomic manner** without the possibility of an attacker interacting with the DAO while it is still being set up. **templates allow creating a DAO in just one transaction** and when the transaction is processed the DAO is already **fully configured and functional**.

Templates can also be thought of as **DAO templates** as every template can create a DAO with specific settings for an organization type. The two DAO configurations that one can choose from when using the [Aragon client](http://app.aragon.org) correspond to: ([Company](https://github.com/aragon/dao-templates/tree/master/templates/company), [Reputation](https://github.com/aragon/dao-templates/tree/master/templates/reputation) and [Membership](https://github.com/aragon/dao-templates/tree/master/templates/membership)) available in the [DAO templates repository](https://github.com/aragon/dao-templates).

## Getting started with templates using the aragonCLI

The aragonCLI (>= v4.1.0) supports using templates to create a DAO to interact with the apps being developed.

To quickly get started developing your own templates:

```sh
npx create-aragon-app app
```

That command will create a new Aragon app project with a sample template in it ready to be used. The Template (under `contracts/Template.sol`) will create instances of a Token Manager, a Voting app and the [Counter example app](/docs/tutorial.html) and will wire the permissions so incrementing the Counter requires a vote to pass in the Voting app.

In order to start the Aragon client with a DAO created by the template, execute:

```sh
npm run start:ipfs:template
```

When modifying the name of your contract or app name be sure to update those in `Template.sol` otherwise running the template will fail

## Template structure

All templates follow a similar structure and inherit from [BaseTemplate](https://github.com/aragon/dao-templates/blob/master/shared/contracts/BaseTemplate.sol) that allows them to:

1. Create a DAO wiht [\_createDAO()](https://github.com/aragon/dao-templates/blob/master/shared/contracts/BaseTemplate.sol#L79).
2. Create permissions with [\_createPermissions](https://github.com/aragon/dao-templates/blob/master/shared/contracts/BaseTemplate.sol#L88).
3. Install default apps, for example [\_installDefaultAgentApp](https://github.com/aragon/dao-templates/blob/master/shared/contracts/BaseTemplate.sol#L125).
4. Create default apps permissions, for example [\_createVaultPermissions](https://github.com/aragon/dao-templates/blob/master/shared/contracts/BaseTemplate.sol#L151).
5. Install non default apps with [\_installNonDefaultApp](https://github.com/aragon/dao-templates/blob/master/shared/contracts/BaseTemplate.sol#L340)
6. Create [Minime tokens](https://github.com/aragon/dao-templates/blob/master/shared/contracts/BaseTemplate.sol#L370), [validate IDs](https://github.com/aragon/dao-templates/blob/master/shared/contracts/BaseTemplate.sol#L383)
