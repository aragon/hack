---
id: kits-intro
title: Kits
sidebar_label: Kits
---

### Create templates for easy DAO setup
---

Creating a DAO with all the desired apps and permissions requires multiple operations that must be properly orchestated. In the context of Ethereum, performing all these operations would require sending many transactions. This would not only be very costly, as every transaction needs to pay for gas, also the integrity of the deployment depends on all operations occurring in the right order.

For these reasons, **the recommended way of creating Aragon DAOs** is using what we call **Kits**, on-chain *deployment scripts* that create a DAO and perform all the required configuration steps in an **atomic manner** without the possibility of an attacker interacting with the DAO while it is still being set up. **Kits allow creating a DAO in just one transaction** and when the transaction is processed the DAO is already **fully configured and functional**.

Kits can also be thought of as **DAO templates** as every kit can create a DAO with specific settings for an organization type. The two DAO configurations that one can choose from when using the [Aragon client](http://app.aragon.org) correspond to the beta kits ([Democracy](https://github.com/aragon/dao-kits/blob/ce62d132d944951dc200df8aa74e42db8e70a094/kits/democracy/contracts/DemocracyKit.sol) and [Multisig](https://github.com/aragon/dao-kits/blob/ce62d132d944951dc200df8aa74e42db8e70a094/kits/multisig/contracts/MultisigKit.sol)) available in the [DAO kits repository](https://github.com/aragon/dao-kits).

## Getting started with kits using the aragonCLI

The [aragonCLI](/docs/cli-intro.html) (>= v4.1.0) supports using kits to create a DAO to interact with the apps being developed.

To quickly get started developing your own kits:

```
aragon init app react-kit
```

That command will create a new Aragon app project with a sample kit in it ready to be used. The Kit (under `contracts/Kit.sol`) will create instances of a Token Manager, a Voting app and the [Counter example app](/docs/tutorial.html) and will wire the permissions so incrementing the Counter requires a vote to pass in the Voting app.

In order to start the Aragon client with a DAO created by the kit, execute:
```
aragon run --kit Kit --kit-init @ARAGON_ENS
```

When modifying the name of your contract or app name be sure to update those in `Kit.sol` otherwise running the kit will fail

## Kit structure

All kits follow a similar structure:

1. Use a [DAOFactory](https://github.com/aragon/aragonOS/blob/4.0.1/contracts/factory/DAOFactory.sol) to create a DAO.
2. Assign the kit contract the necessary permissions in the DAO needed for installation (usually only `APP_MANAGER_ROLE`).
3. Create app proxy instances for all the apps (`dao.newAppInstance(...)`).
4. Initialize apps (`app.initialize(...)`).
5. Set up permissions for the apps and the DAO.
6. Clean up the permissions temporarily assigned to the kit.
