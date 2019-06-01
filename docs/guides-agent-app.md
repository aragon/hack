---
id: guides-use-agent
title: How to use Aragon Agent
sidebar_label: Agent app
---

# Introduction

 The Agent app (or Aragon Agent) is an Aragon app that can be installed in any Aragon DAO. It's main feature is its ability to perform arbitrary calls to contracts. This means it can be thought of as the **external interface of a DAO**. 

 Put another way:

 >Aragon Agent is a fully-fledged Ethereum account owned by an Aragon organization. **It's like a multi-signature account on steroids that enables organizations to interact with any Ethereum contract or protocol.** Trading tokens on 0x or Uniswap, opening a Maker CDP, managing names in ENS, owning digital LAND parcels, or even breeding digital cats. [Source](https://blog.aragon.one/aragon-agent-beta-release/)
 
 In technical terms, it's a superset of the [Vault app](https://wiki.aragon.org/dev/apps/vault/), which means it can hold valuable assets ((ETH and [ERC-20](https://en.wikipedia.org/wiki/ERC-20) tokens).
 
Concretely, the Agent app allows for things like:

- An Aragon DAO to interact with other Ethereum smart contracts or protocols without the need to implement a custom Aragon app for every protocol.

- Members of DAOs to identify themselves as their DAO when using any Ethereum dApp.

- An Aragon DAO to participate as a stakeholder in another DAO.

### For more details
- [Dynamic Permissions for Organization “Actions” with Signer Integration](https://forum.aragon.org/t/dynamic-permissions-for-organization-actions-with-signer-integration/116)

 - [Agent app, arbitrary actions from DAOs](https://forum.aragon.org/t/agent-app-arbitrary-actions-from-daos/275)

 - [Releasing Aragon Agent beta](https://blog.aragon.one/aragon-agent-beta-release/)

# Prerequisites

If this is your first time interacting with an Aragon app we recommend you go through our [Getting started page](https://hack.aragon.org/docs/getting-started.html) first. 

It will also be helpful for you to have a basic understanding of both our [Voting](https://wiki.aragon.org/dev/apps/voting/) and [Token Manager](https://wiki.aragon.org/dev/apps/token-manager/) apps. The best way to do that is to go through sections 2.1 and 2.2 of our [User Guide](https://wiki.aragon.org/tutorials/Aragon_User_Guide/index.html#2-templates).

Apart from that this guide should be self-contained.

# Setup

## 0. Create a Democracy DAO

Before we start, you'll need to head over to [Aragon](https://app.aragon.org/) and create a new DAO with the [democracy template](https://github.com/aragon/dao-kits/tree/master/kits/democracy).

If you're not sure how to do that, please have a look at  [this section](https://wiki.aragon.org/tutorials/Aragon_User_Guide/#21-create-a-new-democracy-organization) of our  [User Guide](https://wiki.aragon.org/tutorials/Aragon_User_Guide/#21-create-a-new-democracy-organization).

The first thing you'll be asked to do is to [choose the network](https://wiki.aragon.org/tutorials/Aragon_User_Guide/#211-navigate-to-httpsapparagonorg-in-your-web-browser) for your organization. For the purposes of this guide we'll choose the **Ethereum Testnet (Rinkeby)**.

Later on, you'll be asked to [set three parameters](https://wiki.aragon.org/tutorials/Aragon_User_Guide/#214-set-the-parameters-of-your-democracy-organization-then-click-next) for your organisation -- the **support**, the **minimum acceptance quorum**, and the **vote duration**.

We'll go with the following (sensible) defaults:

- Support: 100%
- Min. Quorum: 0%
- Duration: 168 hours (or 1 week)

## 1. Install aragonCLI

The [aragonCLI]((https://hack.aragon.org/docs/cli-intro).) (Command Line Interface) is what we use to create, interact with, and develop Aragon apps.

Install it from NPM by running the following command:

`npm install -g @aragon/cli`

Hopefully, it downloaded successfully 😊.

 If not, you should take a quick look at the [installing aragonCLI](https://hack.aragon.org/docs/guides-faq#installing-aragoncli) section of our [troubleshooting guide](/docs/guides-faq#installing-aragonCLI). It should help diagnose and fix the problem.
 
If that still doesn't fix things 😟, please reach out to us at the [#dev-help channel on the Aragon Chat](https://aragon.chat/channel/dev-help). We're more than happy to help.

Note that even if you've already installed the CLI, you might want to reinstall it to make sure you're up to date with the latest version.

## 2. Install the Agent app

Now that we've downloaded aragonCLI 🎉, we're ready to install the [Agent app](https://blog.aragon.one/aragon-agent-beta-release/).

aragonCLI installs the [`aragon dao`](https://hack.aragon.org/docs/cli-dao-commands) commands. We use these to interact directly with our DAO from the command line. They're also available directly using the `dao` shortcut.

We'll use the the [`dao install`](https://hack.aragon.org/docs/cli-dao-commands#dao-install) command to install the Agent app.

`dao install` takes two arguments:

1. The address or [aragonID](https://github.com/aragon/aragon-id) name of an Aragon DAO.
2. The name of an Aragon app.

So in our case, to install the Agent app, we'll run: 

```
dao install <your organisation name> agent --environment aragon:rinkeby --apm.ipfs.rpc https://ipfs.eth.aragon.network/ipfs/
```

You should see that after `dao install <your organisation's name> agent` we pass in two [global options](https://hack.aragon.org/docs/cli-intro#global-options): `--enviroment` and `--apm.ipfs.rpc`.

The `--environment` option allows us to specify the network we want to use. In our case we've created our organization on rinkeby so we pass in `aragon:rinkeby`.

Note that if we had chosen the **Ethereum Mainnet** as the network for our organization we would have passed `aragon:mainnet` instead of `aragon:rinkeby` as the argument to `--environment`.

The `--apm.ipfs.rpc` option allows us to point to an IPFS node that has the files we are looking for. In our case we're pointing it to the aragon network IPFS node.

We can also run our own IPFS node by running `aragon ipfs` in another terminal window. 

Running a local IPFS node allows us to run the same command without the `--apm.ipfs.rpc` option (since the `--apm.ipfs.rpc` option defaults to `http://localhost:5001`). 

However, since IPFS propogation is slow, it's better to point directly to the aragon IPFS node.

**Note that, in the true spirit of democracy, this step will trigger a vote in the DAO, you'll need to vote *yes* to confirm the installation of the Agent app.**

1. Click on the  Voting app icon on the left. You should you have one open vote.

<p align="center">
   <img width="800" src="/docs/assets/agent-guide/agent-0.png">
</p>

2. Click on the **View vote** button. You should see a panel pop up on the right hand side.

<p align="center">
   <img width="800" src="/docs/assets/agent-guide/agent-1.png">
</p>

3. Scroll to the bottom of the panel and click on the big green **Yes** button.

<p align="center">
   <img width="800" src="/docs/assets/agent-guide/agent-2.png">
</p>

4. Sign the transaction and voila! That's all there is to it. When you click on the Voting app again you should see the vote has passed with a 100% Yes vote.

<p align="center">
   <img width="800" src="/docs/assets/agent-guide/agent-3.png">
</p>

## 3. Set permissions

If you look at the end of the output of the `dao install` command you ran in the previous step, you should see the following:
```
ℹ Successfully executed: "Execute desired action as a token holder"
 ⚠ After the app instance is created, you will need to assign permissions to it for it appear as an app in the DAO
```
What does this mean exactly 
😕? 

It's telling us that although we've successfully installed the Agent app, before we can use it as part of our DAO we need to define who can access the app's functionality.

In other words, we need to define who (or which app) has permission to execute actions in the Agent app and who can re-grant and revoke that permission.

In this guide we're going to give the Voting app permissions to execute actions on behalf of the Agent app, and therefore on behalf of the DAO.

To assign these permissions we need to get a hold of the Ethereum address of the Agent app -- remember **Agent is a fully-fledged Ethereum account** -- as well as the address of the Voting app.

To do this we'll use the [`dao apps`](https://hack.aragon.org/docs/cli-dao-commands#dao-apps) command.

`dao apps` takes one argument: the address or name of an aragon DAO. 

By default it only returns apps with permissions. But we can use the `--all` option to get it to return apps without permissions.

From the command line run:

`dao apps <your organization name> --all --environment aragon:rinkeby`

You should see a table that looks something like this:

| App  | Proxy address | Content |
| ------------- | ------------- | ------------ |
| kernel@vundefined  | 0xa25fb31870bc492d450012ae32dafa72af9e82c3  | (No UI available) |
| acl@vundefined | 0xfefb0cdb7a1fac257815d52ba82776f98dc70205   | (No UI available) |
| evmreg@vundefined | 0x9087db02300ef24b116daf0426b6ba22b28a0c79  | (No UI available) | 
| voting@v2.0.4 | **0x15a102f80ea3b1bd585a044e9b3c39a84c5f44e5**  | ipfs:QmPjWU51opgTVnXwAhYAWasL2CaiYHqy2mXdXtzqfC8sKx |
| vault@v3.0.1   | 0x952a18185da912984e0bc8a830ba98f8151976af | ipfs:QmeMabCnkA5BtTTszqqRztYKCXZqE9VQFH4Vx7dY9ue2nA |
| finance@v2.0.5    | 0x4171f7ac1a4606b93093e8648e2f9a16c59cf3b1 | ipfs:QmeMLs4jHya89khHVSubLaao9cZW6ELZUoYPHkwCUwKBH7 |
| token-manager@v2.0.3  | 0xbf07e1c74a72aa60df3ddf3115d15575d27e61e1 | ipfs:Qmb9Bv3J9AuXD5auY1WNwiJeohnYRhyso7XMULs7EZ8eTG |

Followed directly by another that looks like this:

| Permissionless app   | Proxy address  |
| ------------- | ------------- |
| 0x9ac98dc5f995bf0211ed589ef022719d1487e5cb2bab505676f0d084c07cf89a | **0x843bfA21a040E742ec32b8F6991e182D9655AF21** |

The permissionless app is the Agent app we've just installed. Its address is listed under **Proxy address** in the bottom table. In my case that's **0x843bfA21a040E742ec32b8F6991e182D9655AF21** . Yours will be slightly different.

The Voting app address can be found under the **Proxy address** column in the voting app row of the first table: **0x15a102f80ea3b1bd585a044e9b3c39a84c5f44e5** .

Once you've located your Agent and Voting app addresses, run the following command:

```
dao acl create <your organisation name> <your agent app address> EXECUTE_ROLE <your voting app address> <your voting app address> --environment aragon:rinkeby
```

You should see the following output:

```
✔ Generating transaction
  ✔ Sending transaction
 ✔ Successfully executed
```
If you've reached this stage, 😊🎉 Congratulations! 🎉😊 You've successfully given your Voting app permissions to execute actions on behalf of your Agent app!

Why did that work 😕?

Before we explain the `dao acl create` command we ran above we need to understand a little bit about how permissions in Aragon work.

Aragon uses an [Access Control List](https://hack.aragon.org/docs/acl-intro) (ACL) to control who can access your app's functionality.

This list contains a set of who has permission to execute an action in an Aragon app and who can re-grant or revoke that permission.

[`dao acl create`](https://hack.aragon.org/docs/cli-dao-commands#dao-acl-create) is just the Aragon command used to create a permission in the ACL.

It takes 5 arguments:

1. The name or main address of the DAO
2. The address of the app whose - permissions are being managed (WHO).
3. The identifier or name of the role (WHERE).
4.  The address of the app (or entity) that is being granted the permission (WHAT).
5. The address of the app (or entity) that will be able to grant that permission or revoke it (HOW).

Let's revisit an annotated version of the command we ran above:

```
dao acl create
1. <your organization name>
2. <your agent app address> 
3. EXECUTE_ROLE
4. <your voting app address>
5. <your voting app address>
--environment aragon:rinkeby
```
You should see that in our case:

- **1** is the name of our organization. 

- **2** is our organization's Agent app -- we are managing the permissions of our Agent app by allowing the Voting app to execute actions on behalf of it.

- **3** is the EXECUTE_ROLE -- The EXECUTE_ROLE is a role defined in the Agent app: it allows an app or entity to transfer tokens (as well as some additional actions).

- **4** is our organization's Voting app -- we are granting this role to our Voting app, this allows it to execute actions on behalf of our Agent app.

- **5** is our Voting app again -- we are giving it permission to re-grant or revoke the permission we have just given it.

**Note that, same as before, this command will trigger a vote in the DAO and you'll need to vote *yes* to confirm the new permissions you've granted the Voting app.**

You can do this either by using the UI again or,now that you know how to get the address of your apps, by running:

```
dao exec <your organization name> <your voting app address> vote 1 true true --environment aragon:rinkeby --apm.ipfs.rpc https://ipfs.eth.aragon.network/ipfs/
```

[`dao exec`](https://hack.aragon.org/docs/cli-dao-commands) is used to perform transactions in your DAO directly from the aragonCLI. It takes at least three arguments:

- The first is always the name or address of the DAO you want to interact with. In our case this is our DAO's name.

- The second is the address of the app where the action is being performed. In our case this is the [Voting app](https://wiki.aragon.org/dev/apps/voting/).

- The third is the name of the method being executed in the app: In our case the method is [`vote`](https://wiki.aragon.org/dev/apps/voting/index.html#casting-votes).

- The remaining arguments are the arguments which the method -- in our case `vote` -- will be exectuted with. We are passing in three: `1`,  `true` and  `true`.

    - The first (`1`) is the id for the vote we want to interact with. This is always an integer. Vote ids start at 0 and increment by 1 each time a vote is created.

    - The second (`true`) specifies which was we want to vote: `true` means yes and `false` means no.

    - And the third (`true`) specifies whether the contract should check if a vote already has enough support to be executed. By executed we mean that even if everyone else voted against, the vote would still be approved. If that's the case, the vote is executed and immediately closed. `true` means check, `false` means don't check.

<p align="center">
   <img width="400" src="/docs/assets/agent-guide/agent-4.png">
   <em>It's easy to find vote ids from the UI: see the red circle.</em>
</p>

## 4. Check permissions

If you rerun the command:

`dao apps <your organization name> --all --environment aragon:rinkeby`

You should see that your Agent app has been added to the bottom of the App table and that the Permissionless app table is now empty.

| App  | Proxy address | Content |
| ------------- | ------------- | ------------ |
| kernel@vundefined  | 0xa25fb31870bc492d450012ae32dafa72af9e82c3 | (No UI available) |
| acl@vundefined | 0xfefb0cdb7a1fac257815d52ba82776f98dc70205 | (No UI available) |
| evmreg@vundefined | 0x9087db02300ef24b116daf0426b6ba22b28a0c79 | (No UI available) | 
| voting@v2.0.4 | 0x15a102f80ea3b1bd585a044e9b3c39a84c5f44e5 | ipfs:QmPjWU51opgTVnXwAhYAWasL2CaiYHqy2mXdXtzqfC8sKx |
| vault@v3.0.1   | 0x952a18185da912984e0bc8a830ba98f8151976af | ipfs:QmeMabCnkA5BtTTszqqRztYKCXZqE9VQFH4Vx7dY9ue2nA |
| finance@v2.0.5    | 0x4171f7ac1a4606b93093e8648e2f9a16c59cf3b1 | ipfs:QmeMLs4jHya89khHVSubLaao9cZW6ELZUoYPHkwCUwKBH7 |
| token-manager@v2.0.3  | 0xbf07e1c74a72aa60df3ddf3115d15575d27e61e1 | ipfs:Qmb9Bv3J9AuXD5auY1WNwiJeohnYRhyso7XMULs7EZ8eTG |
| **0x9ac98dc5f995bf0211ed589ef022719d1487e5cb2bab505676f0d084c07cf89a** | 0x843bfa21a040e742ec32b8f6991e182d9655af21 | ipfs:QmfNaBuQsaKE8at2ce9k2FU9dKs16WQqg4RPUHSNik1z9e |


| Permissionless app   | Proxy address  |
| ------------- | ------------- |

This confirms that the Agent app has been assigned permissions and is now an app in the DAO.

Note that **0x9ac98dc5f995bf0211ed589ef022719d1487e5cb2bab505676f0d084c07cf89a** is just the general identifier for the version of Agent app you have installed.

You can also verify that permissions have been set properly through the UI:

1. Click on the **Permissions** menu option in the left panel. You should see the Agent app at the end of the second row. Click on it.

<p align="center">
   <img width="800" src="/docs/assets/agent-guide/agent-5.png">
</p>

2. Under **Actions available on this app** should see that the Voting app now manages who has the ability to execute actions for the Agent app. Scroll down.

<p align="center">
   <img width="800" src="/docs/assets/agent-guide/agent-6.png">
</p>

3.  Under **Permissions set on this app** you should see that Voting app is also allowed to execute actions on behalf of the Agent app.

<p align="center">
   <img width="800" src="/docs/assets/agent-guide/agent-7.png">
</p>

# Use cases

## A. Voting in another organization

### **1. Create another Democracy DAO**

Exactly the same as before, revisit [step 0 of the Setup section](/docs/guides-agent-app.md) above if you need reminding 😋. 

### **2. Mint a token to allow our first DAO (A) to vote in our new DAO (B)**

We've now created two Democracy DAOs -- let's call them **A** and **B**. A has an Agent app, B doesn't. We want to allow A to vote in B.

Remember that one needs to be a tokenholder of B to be able to vote in B. And that A's Agent app acts its external interface.  

In other words, A's Agent app allows it to participate as a stakeholder in B.

It follows that to allow A to vote in B we need to mint a token for A's Agent app in B. 

To do this run:

```
dao exec <name of dao B> <token manager app address of dao B> mint <agent app address of dao A> 1000000000000000000 --environment aragon:rinkeby --apm.ipfs.rpc https://ipfs.eth.aragon.network/ipfs/
```

Remember, you can find the addresses of the apps in any of your DAOs by running `dao apps <organization name> --environment aragon:rinkeby`.

As you can see, we are using the `dao exec` command to interact with the `mint` method of B's [Token Manager](https://wiki.aragon.org/dev/apps/token-manager/) app.

 [`mint`](https://wiki.aragon.org/dev/apps/token-manager/index.html#mint-tokens) is used to create new tokens and assign them to a receiver. It takes two arguments: a receiver address and the amount of tokens to be created.

In our case the receiver is A's Agent App, and the amount of tokens to be created is 1.

However, you should notice that instead of writing `1` as the second argument to `mint` we've gone with `1000000000000000000`.

This is because a token has 18 decimals, so 1 unit of a token is actually 0.000000000000000001 tokens. This is not what we want.

In order to mint a full token from the CLI we need to pass the full number, which will then be interpreted with 18 decimals.
In our case this is a 1 followed by eighteen 0s, or `1000000000000000000`.

Finally, the usual warning: running the above command will trigger a vote in B to create and send a token to A's Agent App: we'll need to vote *yes* to confirm the minting of the token.

You can do this either directly through the UI or by running:

```
dao exec <name of dao B> <voting app address of dao B> vote 0 true true --environment aragon:rinkeby --apm.ipfs.rpc https://ipfs.eth.aragon.network/ipfs/
```

On the UI, the vote will look something like this.

<p align="center">
   <img width="800" src="/docs/assets/agent-guide/agent-8.png">
</p>

Once you've voted *yes*, switch over to the Token Manager app (click on *Tokens* in the left sidebar).

<p align="center">
   <img width="800" src="/docs/assets/agent-guide/agent-9.png">
</p>

You should see that you've successfully added another token holder (your Agent app)!

### **3. Create a vote in B to add a third entity**

As in step 2, we'll run `dao exec` again, except this time the first argument to `mint` will be the address of the third entity we want to add to B.

```
dao exec <name of dao B> <token manager app address of dao B> mint <third entity's address> 1000000000000000000 --environment aragon:rinkeby --apm.ipfs.rpc https://ipfs.eth.aragon.network/ipfs/
```

Running the above will create a vote in B. Again we'll need to vote *yes* to confirm the minting.

<p align="center">
   <img width="800" src="/docs/assets/agent-guide/agent-10b.png">
</p>

As before, you can either do this through the UI or run the same command we ran at the end of step 2 with one small modification: 

This time the first argument to `vote` will be a `1` and not a `0`, since the id of this new vote is 1. Remember that vote ids start at zero and increment by one each time a vote is created.

If you go to the Voting app after you've voted, you'll see that the *yes* vote is only 50%.

<p align="center">
   <img width="800" src="/docs/assets/agent-guide/agent-10.png">
</p>

That's because only 1 / 2 tokenholders have voted. The other tokenholder (A's Agent app) still has to vote.


### **4. Use A's Agent app to take part in B's vote**

To enact the vote, we'll use A's Agent app to vote yes to adding a third entity to B.

But before we do this, we need to introduce the `dao act` command.

According to the documentation:

>`dao act` provides some syntax sugar over `dao exec` for executing actions using Agent app instances in a DAO.

In plain english, `dao act` acts like `dao exec` except the first argument to `dao act` is an agent app address rather than a DAO address.

Another minor but important difference is that we need to pass in the full signature of the method we wish to execute.

For example, if we want to execute the `vote` method of a Voting app we need to pass in `vote(unint256,bool,bool)`.

Now that you have a high-level understanding of `dao act`, you're ready to run the following command:

```
dao act <agent app address of dao A> <voting app address of dao B>  "vote(uint256,bool,bool)" 1 true true  --environment aragon:rinkeby --apm.ipfs.rpc https://ipfs.eth.aragon.network/ipfs/
```

### **5. Confirm the vote/action in A**

Finally, we need to confirm the vote in A.

Again, we can do this either through the UI or by running:

```
dao exec <name of dao A> <voting app address of dao A> vote 2 true true --environment aragon:rinkeby --apm.ipfs.rpc https://ipfs.eth.aragon.network/ipfs/
```
Note that we passed in a vote id of `2` as the first argument to `vote`. That's because this is the 3rd vote created in A, and vote ids start at 0.

If you've made it this far,  congratulations! 😊🎉😊🎉

You've just used the Agent app to allow one Aragon organization to participate as a stakeholder in another! 

## B. Opening a Maker CDP

## C. Interacting with Uniswap

## D. Creating an Aragon Trust














