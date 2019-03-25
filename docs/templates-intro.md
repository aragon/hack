---
id: templates-intro
title: Templates
sidebar_label: Templates
---

### Create templates for easy DAO setup

---

Creating a DAO with all the desired apps and permissions requires multiple operations that must be properly orchestated. In the context of Ethereum, performing all these operations would require sending many transactions. This would not only be very costly, as every transaction needs to pay for gas, also the integrity of the deployment depends on all operations occurring in the right order.

For these reasons, **the recommended way of creating Aragon DAOs** is using what we call **templates**, on-chain _deployment scripts_ that create a DAO and perform all the required configuration steps in an **atomic manner** without the possibility of an attacker interacting with the DAO while it is still being set up. **templates allow creating a DAO in just one transaction** and when the transaction is processed the DAO is already **fully configured and functional**.

Templates can also be thought of as **DAO templates** as every template can create a DAO with specific settings for an organization type. The two DAO configurations that one can choose from when using the [Aragon client](http://app.aragon.org) correspond to the beta templates ([Democracy](https://github.com/aragon/dao-kits/blob/ce62d132d944951dc200df8aa74e42db8e70a094/kits/democracy/contracts/DemocracyKit.sol) and [Multisig](https://github.com/aragon/dao-kits/blob/ce62d132d944951dc200df8aa74e42db8e70a094/kits/multisig/contracts/MultisigKit.sol)) available in the [DAO templates repository](https://github.com/aragon/dao-kits).

## Getting started with templates using the aragonCLI

The [aragonCLI](/docs/cli-intro.html) (>= v4.1.0) supports using templates to create a DAO to interact with the apps being developed.

To quickly get started developing your own templates:

```sh
npx create-aragon-app app
```

That command will create a new Aragon app project with a sample template in it ready to be used. The Template (under `contracts/Template.sol`) will create instances of a Token Manager, a Voting app and the [Counter example app](/docs/tutorial.html) and will wire the permissions so incrementing the Counter requires a vote to pass in the Voting app.

In order to start the Aragon client with a DAO created by the template, execute:

```sh
npx aragon run --template Template --template-init @ARAGON_ENS
```

When modifying the name of your contract or app name be sure to update those in `Template.sol` otherwise running the template will fail

## Template structure

All templates follow a similar structure:

1. Use a [DAOFactory](https://github.com/aragon/aragonOS/blob/4.0.1/contracts/factory/DAOFactory.sol) to create a DAO.
2. Assign the template contract the necessary permissions in the DAO needed for installation (usually only `APP_MANAGER_ROLE`).
3. Create app proxy instances for all the apps (`dao.newAppInstance(...)`).
4. Initialize apps (`app.initialize(...)`).
5. Set up permissions for the apps and the DAO.
6. Clean up the permissions temporarily assigned to the template.

> **Note**<br>
> The `kits` has been deprecated and `templates` should be used instead. You may find the `kits` notation in some places while we made the transition.
