---
id: guides-custom-deploy
title: Custom Aragon Organization Deployment using aragonCLI
sidebar_label: Custom deploy with aragonCLI
---

This guide will show you the process to deploy a blank organization and configure it as a custom organization for a cooperative.

We assume you have a general understanding of Aragon stack.

In order to get started you will need the latest version of the CLI installed so open a terminal and enter the following:


```
npm install -g @aragon/cli

```

## General considerations

In order to deploy to rinkeby or mainnet using the CLI you will either need to use a hardware wallet with [Frame](https://frame.sh) or configure aragonCLI to [sign transactions using a private key](/docs/cli-faq.html#set-a-private-key).

If you decide to [use frame](guides-use-frame.md), just add `--use-frame` to any of these commands.

For any deploy always remember to have in a separate terminal the [IPFS](https://docs.ipfs.io/introduction/overview/) daemon running, use `aragon ipfs` to start it.

If you are testing locally:

- In a separate terminal run: `aragon devchain`

If you are deploying to rinkeby:

- Add `--environment aragon:rinkeby` to each of these commands

If you are deploying to mainnet:

- Add `--environment aragon:mainnet` to each of these commands

## Creating a blank organization

```
dao new
```

This will create a new organization based on default [`bare-kit`](https://github.com/aragon/dao-kits/blob/master/kits/bare/contracts/BareKit.sol) it won’t have a token manager, vault, finance, or voting instance installed. Make a note of the deployed DAO address as we will need it for subsequent commands.

## Adding a Token and Token Manager instance

Aragon uses tokens to represent groups, token balances can be capped to a certain amount per account made non-transferrable. The following are 3 common scenarios:

- `Membership`: A non-transferrable token limited to 1 per account
- `Reputation`: A non-transferrable token without balance restriction
- `Equity`: A transferrable token without balance restriction

For the cooperative we want to start with a membership token.

First we need to deploy a [MiniMe](https://github.com/Giveth/minime) token, using the `dao new token` command. 

```
dao token new <token-name> <symbol> [decimal-units] [transfer-enabled]
```

For a membership token we want to set `decimal-units` to 0 (default is 18), we can leave `tranfer-enabled` as default (true), as we will restrict transferability using the token-manager in a subsequent step. So we end up with:

```
dao token new "Member" "MBR" 0
```

Make a note of the token address as we will need it later!

Next we need to deploy an instance of the token-manager app which will serve as the token-controller for the minime token we just deployed. The token-manager cannot be initialized unless it is already the controller of a minime token, so we want to use `dao install` command with the `--app-init none` argument, that way we can perform some actions before we initialize it.

```
dao install <dao-address> token-manager --app-init none
```

In order to get the token-manager address we need to run the following command:

```
dao apps <dao-address> --all
```

You should see a list of apps, and a token-manager instance listed under permissionless apps, make a note of this address as we will need it later.

Next we want to set the token-manager instances as the token-controller on our token.

```
dao token change-controller <token-address> <token-manager-address>
```

Next we want create a permission for the token-manager.

```
dao acl create <dao-address> <token-manager-address> MINT_ROLE <your-address> <your-address>
```

Now we can actually initialize the token manager using the `dao exec` command. The token-manager’s initialize function takes 3 parameters, the address of a minimetoken, a boolean indicating if the token should be transferrable, and an uint determining max number of tokens an address can control (use 0 if you do not want to restrict balances).

For a membership token we would initialize like this:

```
dao exec <dao-address> <token-manager-address> initialize [token-address] false 1
```

At this point if you open your DAO in a web browser you should see the token manager app installed, and should be able to mint tokens from `your-address`. Find your DAO UI here: `https://<network>.aragon.org/#/<DAO Address>`

Even though we have initialized the token manager as `transferrable = false`, and token transfers fail, there is what appears to be a UI bug where the token manager will list the token as transferrable even though it is not. [GitHub issue](https://github.com/aragon/aragon-apps/issues/630).

## Adding a Voting instance

Adding a voting app allows actions to be protected by a vote, each instance is associated with a token, but you can have multiple voting instances per token, with each instance having different parameters. A common case might be to have some actions require a simple majority, while other require a super-majority. We will create on voting app instance, but the process can be repeated as many times as required.

Since we already have a token and token manager deployed all we have to do is install the app, this can be done in one step using the `dao install` command and passing arguments via `--app-init-args`.

The voting app requires the following initialization parameters:

- `minime token`: address of a minime token
- `support required percentage`: Percentage of yeas in casted votes for a vote to succeed (expressed as a percentage of `10^18`; eg. `10^16 = 1%`, `10^18 = 100%`)
- `min accept quorum`: Percentage of yeas in total possible votes for a vote to succeed (expressed as a percentage of `10^18`; eg. `10^16 = 1%`, `10^18 = 100%`)
- `vote time`: Seconds that a vote will be open for token holders to vote (unless enough yeas or nays have been cast to make an early decision)

So if we want a voting app instances with a support requirement of 60% and min accept quorum of 25% and a voting period of 7 days we would use the following command.

```
dao install <dao-address> voting --app-init-args [token-address] 600000000000000000 250000000000000000 604800
```

Next you will need to assign the create votes permission, if you want all token holders to be able to create votes, we can assign the `CREATE_VOTES_ROLE` to the `token-manager-address`, you can also set permissions to the voting app itself. The following command grants token holders the ability to create votes, and requires a vote to manage changes to the permission.

```
dao acl create <dao-address> <voting-app-address> CREATE_VOTES_ROLE <token-manager-address> <voting-app-address>
```

At this point you should be able to open your organization and create votes :clap:

## Adding a Vault and Finance instance

The Vault is intended to securely store and manage funds but does not have its own user interface. The Finance app provides an interface and provides some limited budgeting capabilities. In the future, it may make sense to install the vault app without the finance app, or the finance app with a different version of the vault app, but for now these two apps generally make sense to install as a pair.

The vault can be installed and does not require passing any specific initialization parameters

```
dao install <dao-address> vault
```

The finance app requires two initialization parameters: a `vault instance address` and `budgeting period` (in seconds). If you are familiar with the finance app in the UI, you may have noticed that there is not way to configure or set a budget, however, the contracts allow you to set a per-asset budget which is reset each time period. 

Eventually the UI will be updated to support these functions. If you don’t intend to use any of the budgetting functionallity the budget period parameter doesnt matter but it does need to be passed. If you do plan on using the budgeting functionality here is the how it works:

For a given budget period P, a budget B can be set for asset A. The total volume of transfers of A cannot exceed its budget within a period P. So for example, if we initialize P as 1 Month, we could set a budget for DAI of 1000, and even if the vault contains more than 1000 DAI it will not be able to spend more than 1000 DAI per month. Keep in mind that the budget is not exposed in the UI, so transactions which exceed the budget will just fail.

Lets set install a finance instances with a budget period of 30 days:

```
dao install <dao-address> finance --app-init-args [vault-address] 2592000
```

Now we want to create a permission that grants the finance app the transfer role on the vault, we will make have voting be required to manage the permission.

```
dao acl create <dao-address> <vault-address> TRANSFER_ROLE <finance-address> <voting-address>
```

We also want to grant some permissions on the finance app to the voting app:

```
dao acl create <dao-address> <finance-address> CREATE_PAYMENTS_ROLE <voting-address> <voting-address> 

dao acl create <dao-address> <finance-address> EXECUTE_PAYMENTS_ROLE <voting-address> <voting-address>

dao acl create <dao-address> <finance-address> MANAGE_PAYMENTS_ROLE <voting-address> <voting-address>
```

For more information on what each of these roles do as well as additional roles made available by the finance app, see [the wiki](https://wiki.aragon.org/dev/apps/finance/)

At this point you should be able to open your dao, manage tokens, create votes, and manage funds using vault and finance apps.

## Review & Finalize Permissions

While we have a mostly functional DAO the permissions need to be cleaned up because we do not want our personal address to have root authority in the organization. These steps can be done using the CLI as described bellow, or if you prefer you can do it using the permissions UI.

We can see what permissions are currently assigned using the dao acl command

```
dao acl <dao-address>
```

You will notice that some key permissions have been granted and are managed by the address you used to perform these commands. By following these steps you are transferring authority as the creator of the organization to other applications and entities defined above, it is an inreversible process, so be careful not to revoke a permission before granting it to an appropriate entity.

You’ll want to grant permissions which are currently only assigned to your address to another entity (eg. `voting-address`):

```
dao acl grant <dao-address> <app-address> <ROLE> <entity-address>
```

You’ll want to revoke permissions for yourself once they have been granted to another entity:

```
dao acl revoke <dao-address> <app-address> <ROLE> [your-address]
```

You’ll want change the permission manager for permissions from your address to another entity (eg. `voting-address`):

```
dao acl set-manager <dao-address> <app-address> <ROLE> <entity-address>
```
