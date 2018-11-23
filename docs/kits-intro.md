---
id: kits-intro
title: Templates
sidebar_label: Templates
---

### Create templates for easy DAO setup
---

Creating a DAO with all the desired apps and permissions requires multiple operations that must be properly orchestated. In the context of Ethereum, performing all these operations would require sending many transactions. This would not only be very costly, as every transaction needs to pay for gas, also the integrity of the deployment depends on all operations occurring in the right order.

For these reasons, **the recommended way of creating Aragon DAOs** is using what we call **Templates**, on-chain *deployment scripts* that create a DAO and perform all the required configuration steps in an **atomic manner** without the possibility of an attacker interacting with the DAO while it is still being set up. **Templates allow creating a DAO in just one transaction** and when the transaction is processed the DAO is already **fully configured and functional**.

Templates can also be thought of as **DAO templates** as every template can create a DAO with specific settings for an organization type. The two DAO configurations that one can choose from when using [Aragon](http://app.aragon.org) correspond to the beta templates ([Democracy](https://github.com/aragon/dao-kits/blob/master/kits/beta/contracts/DemocracyTemplate.sol) and [Multisig](https://github.com/aragon/dao-kits/blob/master/kits/beta/contracts/MultisigTemplate.sol)) available in the [DAO templates repository](https://github.com/aragon/dao-kits).

## Getting started with templates using the aragonCLI

The [aragonCLI](/docs/cli-usage.html) (>= v4.1.0) supports using templates to create a DAO to interact with the apps being developed.

To quickly get started developing your own templates:

```
aragon init app react-kit
```

That command will create a new Aragon app project with a sample template in it ready to be used. The Template (under `contracts/Kit.sol`) will create instances of a Token Manager, a Voting app and the [Counter example app](/docs/tutorial.html) and will wire the permissions so incrementing the Counter requires a vote to pass in the Voting app.

In order to start the Aragon client with a DAO created by the template, execute:
```
aragon run --kit Template --kit-init @ARAGON_ENS
```

When modifying the name of your contract or app name be sure to update those in `Kit.sol` otherwise running the template will fail

## Template structure

All templates follow a similar structure:

1. Use a DAO Factory to create a DAO.
2. Assign the template contract permissions in the DAO needed for operation.
3. Create app instances for all the apps (`dao.newAppInstance(...)`)
4. Initialize apps (`app.initialize(...)`)
5. Set up permissions for the apps and the DAO.
6. Clean up the permissions temporarily assigned to the template.
