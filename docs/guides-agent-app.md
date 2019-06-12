---
id: guides-use-agent
title: How to use Aragon Agent
sidebar_label: Agent app
---

# Introduction

 The Agent app (or Aragon Agent) is an Aragon app that can be installed in any Aragon DAO. It's main feature is its ability to perform arbitrary calls to contracts. This means it can be thought of as the **external interface of a DAO**. 

 Put another way:

 >Aragon Agent is a fully-fledged Ethereum account owned by an Aragon organization. **It's like a multi-signature account on steroids that enables organizations to interact with any Ethereum contract or protocol.** Trading tokens on 0x or Uniswap, opening a Maker CDP, managing names in ENS, owning digital LAND parcels, or even breeding digital cats. [Source](https://blog.aragon.one/aragon-agent-beta-release/)
 
In technical terms, it's a superset of the [Vault app](https://wiki.aragon.org/dev/apps/vault/), which means it can hold valuable assets (ETH and [ERC-20](https://en.wikipedia.org/wiki/ERC-20) tokens).
 
Concretely, the Agent app allows for things like:

- An Aragon DAO to interact with other Ethereum smart contracts or protocols without the need to implement a custom Aragon app for every protocol.

- Members of DAOs to identify themselves as their DAO when using any Ethereum dApp.

- An Aragon DAO to participate as a stakeholder in another DAO.

# Prerequisites



While there are no formal prerequisites to this guide, it'll be helpful for you to have a basic understanding of both our [Voting](https://wiki.aragon.org/dev/apps/voting/) and [Token Manager](https://wiki.aragon.org/dev/apps/token-manager/) apps. The best way to do that is to go through sections 2.1 and 2.2 of our [User Guide](https://wiki.aragon.org/tutorials/Aragon_User_Guide/index.html#2-templates).

Apart from that this guide should be self-contained.

# Installing Aragon Agent

## 0. Create a Democracy DAO

Before we start, you'll need to head over to [Aragon](https://rinkeby.aragon.org/) and create a new DAO with the [democracy template](https://github.com/aragon/dao-kits/tree/master/kits/democracy).

If you're not sure how to do that, please have a look at  [this section](https://wiki.aragon.org/tutorials/Aragon_User_Guide/#21-create-a-new-democracy-organization) of our  [User Guide](https://wiki.aragon.org/tutorials/Aragon_User_Guide/#21-create-a-new-democracy-organization).

The first thing you'll be asked to do is to [choose the network](https://wiki.aragon.org/tutorials/Aragon_User_Guide/#211-navigate-to-httpsapparagonorg-in-your-web-browser) for your organization. For the purposes of this guide we'll choose the **Ethereum Testnet (Rinkeby)**.

Later on, you'll be asked to [set three parameters](https://wiki.aragon.org/tutorials/Aragon_User_Guide/#214-set-the-parameters-of-your-democracy-organization-then-click-next) for your organization -- the **support**, the **minimum acceptance quorum**, and the **vote duration**.

We'll go with the following (sensible) defaults:

- Support: 100%
- Min. Quorum: 0%
- Duration: 168 hours (or 1 week)

## 1. Install aragonCLI

The [aragonCLI](https://hack.aragon.org/docs/cli-intro) (Command Line Interface) is what we use to create, interact with, and develop Aragon apps.

If you haven't done so already, install it from NPM by running the following command:

`npm install -g @aragon/cli`

Hopefully, it installed successfully 😊.

 If not, we recommend you take a quick look at the [installing aragonCLI](/docs/guides-faq.md#installing-aragoncli) section of our [troubleshooting guide](/docs/guides-faq.md#installing-aragonCLI). It should help diagnose and fix the problem 🧐.
 
If that still doesn't fix things 😟, please reach out to us at the [#dev-help channel on the Aragon Chat](https://aragon.chat/channel/dev-help). We're more than happy to help.

Note that aragonCLI v5.4.0 was the first version to [include support](https://blog.aragon.one/aragon-agent-beta-release/) for Agent.


If you're unsure which version of aragonCLI you have, run:

`aragon -v`

If your version number is less than 5.9.5, or if it's been a while since you last installed the CLI, we recommend you reinstall it (by running the `npm install` command above).


## 2. Install the Agent app

Now that we've installed aragonCLI 🎉, we're ready to install the [Agent app](https://blog.aragon.one/aragon-agent-beta-release/).

aragonCLI installs the [`aragon dao`](https://hack.aragon.org/docs/cli-dao-commands) commands. We use these to interact directly with our DAO from the command line. They're also available directly using the `dao` shortcut.

We'll use the the [`dao install`](https://hack.aragon.org/docs/cli-dao-commands#dao-install) command to install the Agent app.

`dao install` takes two arguments:

1. The address or [aragonID](https://github.com/aragon/aragon-id) name of an Aragon DAO.
2. The package name of an Aragon app published to [aragonPM](/docs/apm-intro) (for the Agent app this would be agent  or agent.aragonpm.eth).
`

So in our case, to install the Agent app, we need to run: 

```
dao install <your organization name> agent --environment aragon:rinkeby --apm.ipfs.rpc https://ipfs.eth.aragon.network/ipfs/
```

You should see that after `dao install <your organization's name> agent` we pass in two [global options](https://hack.aragon.org/docs/cli-intro.html#global-options): `--enviroment` and `--apm.ipfs.rpc`.

<details>
<summary>Tell me more about these global options.</summary>

The `--environment` option allows us to specify the network we want to use. In our case we've created our organization on rinkeby so we pass in `aragon:rinkeby`.

Note that if we had chosen the **Ethereum Mainnet** as the network for our organization we would have passed `aragon:mainnet` instead of `aragon:rinkeby` as the argument to `--environment`.

The `--apm.ipfs.rpc` option allows us to point to an IPFS node that has the files we are looking for. In our case we're pointing it to the aragon network IPFS node.

We can also run our own IPFS node by running `aragon ipfs` in another terminal window. 

Running a local IPFS node allows us to run the same command without the `--apm.ipfs.rpc` option (since the `--apm.ipfs.rpc` option defaults to `http://localhost:5001`). 

However, since IPFS propogation is slow, it's better to point directly to the aragon IPFS node.

</details>

**Note that, in the true spirit of democracy, this step will trigger a vote in the DAO, you'll need to vote *yes* to confirm the installation of the Agent app.** To confirm the vote:

1. Click on the  **Voting** app icon in the left panel. You should see you have one open vote.

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

4. Sign the transaction with your favourite [web3 provider](/docs/getting-started.md#web3-provider) and voila! That's all there is to it. When you click on the Voting app again you should see the vote has passed with a 100% Yes vote.

<p align="center">
   <img width="800" src="/docs/assets/agent-guide/agent-3.png">
</p>

## 3. Set permissions

If you look at the end of the output of the `dao install` command you ran in the previous step, you should see something like:

<pre>
✔ Successfully deployed the app at  <b>0x843bfA21a040E742ec32b8F6991e182D9655AF21</b>
ℹ Successfully executed: "Execute desired action as a token holder"
 ⚠ After the app instance is created, you will need to assign permissions to it for it appear as an app in the DAO
</pre>

What does this mean exactly 😕?

It's telling us that although we've successfully installed the Agent app, before we can use it as part of our DAO we need to define who can access the app's functionality.

In other words, we need to define who (or which app) has permission to execute actions in the Agent app and who can re-grant and revoke that permission.

In this guide we're going to give the Voting app permission to use the Agent app to execute actions.

To assign these permissions we need to get a hold of the Ethereum address of the Agent app -- remember **Agent is a fully-fledged Ethereum account** -- as well as the address of the Voting app in our DAO.

The Agent app address is returned at the end of the output of the `dao install` command. It should look something like **0x843bfA21a040E742ec32b8F6991e182D9655AF21** (see the code snippet above). Yours will be slightly different.

As for the Voting app, its address can be found through the UI as follows:

1. Click on **App Center** in the left panel to see your installed apps.

<p align="center">
   <img width="800" src="/docs/assets/agent-guide/agent-15.png">
</p>

2. Click on the **View details** button under the voting app.

<p align="center">
   <img width="800" src="/docs/assets/agent-guide/agent-16.png">
</p>

3. Click on the blue box under **Installed intances** (see inside the red ellipse in the image below).

<p align="center">
   <img width="800" src="/docs/assets/agent-guide/agent-17.png">
</p>

 4. You should see a small pop up appear with a header that says **Address**. Under the header is the address of your voting app. It should look something like **0x15a102f80ea3b1bd585a044e9b3c39a84c5f44e5**.

 <p align="center">
   <img width="800" src="/docs/assets/agent-guide/agent-18.png">
</p>

Once you've located your Agent and Voting app addresses, run the following command to give your Voting app permission to use the Agent app to execute actions.

```
dao acl create <your organization name> <your agent app address> EXECUTE_ROLE <your voting app address> <your voting app address> --environment aragon:rinkeby
```

You should see the following output:

```
✔ Generating transaction
  ✔ Sending transaction
 ✔ Successfully executed
```
😊🎉 🎉😊

<details>
<summary>Tell me more about dao acl create.</summary>

Before we explain the `dao acl create` command we ran above we need to understand a little bit about how permissions in Aragon work.

Aragon uses an [Access Control List](/docs/acl-intro) (ACL) to control who can access your app's functionality.

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

2. Is our organization's Agent app -- we are managing the permissions of our Agent app by giving the Voting app permissions to use the Agent app to execute actions.

3. Is the EXECUTE_ROLE -- The EXECUTE_ROLE is a role defined in the Agent app: it allows an entity to execute a specific action through the Agent app (transferring tokens for example).

4. Is our organization's Voting app -- we are granting this role to our Voting app, this gives it permission to use the Agent app to execute actions.

5. Is our Voting app again -- we are assigning it as manager of the role, this allows it to grant or revoke the permissions of this ro
</details>

**Note that, same as before, this command will trigger a vote in the DAO and you'll need to vote *yes* to confirm the new permissions you've granted the Voting app.**

You can do this either by using the Aragon client again or, now that you know how to get the address of your apps, by running:

```
dao exec <your organization name> <your voting app address> vote <vote id> true true --environment aragon:rinkeby --apm.ipfs.rpc https://ipfs.eth.aragon.network/ipfs/
```
<details>
<summary>Tell me more about dao exec.</summary>

[`dao exec`](https://hack.aragon.org/docs/cli-dao-commands#dao-exec) is used to perform transactions in your DAO directly from the aragonCLI. It takes at least three arguments:

- The first is always the name or address of the DAO you want to interact with. In our case this is our DAO's name.

- The second is the address of the app where the action is being performed. In our case this is the [Voting app](https://wiki.aragon.org/dev/apps/voting/).

- The third is the name of the method being executed in the app: In our case the method is [`vote`](https://wiki.aragon.org/dev/apps/voting/index.html#casting-votes).

- The remaining arguments are the arguments which the method -- in our case `vote` -- will be executed with. We are passing in three: `1`,  `true` and  `true`.

    - The first (`1`) is the id for the vote we want to interact with. This is always an integer. Vote ids start at 0 and increment by 1 each time a vote is created.

    - The second (`true`) specifies which way we want to vote: `true` means yes and `false` means no.

    - And the third (`true`) specifies whether the contract should check if a vote already has enough support to be executed. If it does, the Voting app will perform the action that was being voted on, and the vote will be close. `true` means check if this vote can be executed, `false` means don't check.

</details>

<p align="center">
   <img width="400" src="/docs/assets/agent-guide/agent-4.png">
</p>

>Tip: If you need to look up the id of a vote, look the vote up in the Voting app UI. You'll find the id in the top left corner (next to the hashtag). For example in the image above, the id of the vote is 1 (look inside the red circle).

## 4. Check permissions

As a final step, let's verify that permissions have been set properly through the UI:

1. Click on the **Permissions** menu option in the left panel. You should see the Agent app at the end of the second row. Click on it.

<p align="center">
   <img width="800" src="/docs/assets/agent-guide/agent-5.png">
</p>

2. Under **Actions available on this app** should see that the Voting app now manages who has the ability to execute actions for the Agent app. Scroll down.

<p align="center">
   <img width="800" src="/docs/assets/agent-guide/agent-6.png">
</p>

3.  Under **Permissions set on this app** you should see that Voting app now has permission to use the Agent app to execute actions. 🎉🎉🎉

<p align="center">
   <img width="800" src="/docs/assets/agent-guide/agent-7.png">
</p>

# Interacting with Aragon Agent

## Introducing `dao act`

`dao act` is the main way we'll interact with Aragon Agent. It's the command we use to perform transactions with the Agent app directly from aragonCLI.

According to the documentation:

>`dao act` provides some syntax sugar over `dao exec` for executing actions using Agent app instances in a DAO.

Like `dao exec` it takes at least three arguments:

1. The address of the Agent app you want to use to perform an action.

2. The address of an **external contract** or **the address of an app** within a DAO.

3. The [full signature](https://solidity.readthedocs.io/en/v0.5.3/abi-spec.html#function-selector) of the method we wish to execute in either the external contract or the app we specified in the second arugument.

>For example if we wanted to execute the `vote` method of a Voting app we would pass in its full signature `vote(unint256,bool,bool)` as the third argument. And if we wanted to execute the `confirmTransaction` method of a [Gnosis Multisig](https://wallet.gnosis.pm/#/wallets) we would pass in `confirmTransaction(uint256)`.

The remaining arguments are the arguments which the method we specified in our third argument will be executed with.

Don't worry if it's not completely clear to you how `dao act` works at this stage. The following use cases will help you develop some intuition for it!

## Use case A: Voting in another organization

Let's start by seeing how we can use the Agent app to allow one Aragon organization to participate as a stakeholder in another.

### **1. Create another Democracy DAO**

The first step is to create another Democracy DAO. Exactly the same as before, head over to [Aragon](https://rinkeby.aragon.org/) and choose the following defaults:

- Support: 100%
- Min. Quorum: 0%
- Duration: 168 hours (or 1 week)

### **2. Mint a token to allow our first DAO (A) to vote in our new DAO (B)**

We've now created two Democracy DAOs -- let's call them **A** and **B**. A has an Agent app, B doesn't. We want to allow A to vote in B.

Remember that A needs to be a tokenholder of B to be able to vote in B. And that A's Agent app acts its external interface.

In other words, A's Agent app allows it to participate as a stakeholder in B.

This means that to allow A to vote in B we need to mint a token for A's Agent app in B. 

To do this run:

```
dao exec <name of dao B> <token manager app address of dao B> mint <agent app address of dao A> 1000000000000000000 --environment aragon:rinkeby --apm.ipfs.rpc https://ipfs.eth.aragon.network/ipfs/
```

Remember, you can find the addresses of the apps in any of your DAOs by running `dao apps <organization name> --environment aragon:rinkeby`.

As you can see, we are using the `dao exec` command to interact with the `mint` method of B's [Token Manager](https://wiki.aragon.org/dev/apps/token-manager/) app.

 [`mint`](https://wiki.aragon.org/dev/apps/token-manager/index.html#mint-tokens) is used to create new tokens and assign them to a receiver. It takes two arguments: a receiver address and the amount of tokens to be created.

In our case the receiver is A's Agent App, and the amount of tokens to be created is 1.

However, you should notice that instead of writing `1` as the second argument to `mint` we've gone with `1000000000000000000`.

This is because the token created by the [democracy template](https://github.com/aragon/dao-kits/tree/master/kits/democracy) has 18 decimals, so 1 unit of a token is actually 0.000000000000000001 tokens. This is not what we want.

In order to mint a full token from the CLI we need to pass the full number, which will then be interpreted with 18 decimals.
In our case this is a 1 followed by eighteen 0s, or `1000000000000000000`.

>Note: If you're having problems with this step, you might need to run [`aragon ipfs`](https://hack.aragon.org/docs/cli-ipfs-commands#aragon-ipfs) in another terminal.

Finally, the usual warning: running the above command will trigger a vote in B to create and send a token to A's Agent App: we'll need to vote *yes* to confirm the minting of the token.

You can do this either directly through the UI or by running:

```
dao exec <name of dao B> <voting app address of dao B> vote 0 true true --environment aragon:rinkeby --apm.ipfs.rpc https://ipfs.eth.aragon.network/ipfs/
```

On the UI, the vote will look something like this.

<p align="center">
   <img width="800" src="/docs/assets/agent-guide/agent-8.png">
</p>

Once you've voted *yes*, switch over to the Token Manager app (click on **Tokens** in the left sidebar).

<p align="center">
   <img width="800" src="/docs/assets/agent-guide/agent-9.png">
</p>

You should see that you've successfully added another token holder (your Agent app)! 🎉🎉😊

### **3. Create a vote in B to add a third entity**

As in step 2, we'll run `dao exec` again, except this time the first argument to `mint` will be the address of the third entity we want to add to B.

```
dao exec <name of dao B> <token manager app address of dao B> mint <third entity's address> 1000000000000000000 --environment aragon:rinkeby --apm.ipfs.rpc https://ipfs.eth.aragon.network/ipfs/
```

Running the above will create an open vote in B. Again we'll need to vote *yes* to confirm the minting.

<p align="center">
   <img width="800" src="/docs/assets/agent-guide/agent-10b.png">
</p>

As before, you can either do this through the UI or run the same command we ran at the end of step 2 with one small modification: 

This time the first argument to `vote` will be a `1` and not a `0`, since the id of this new vote is 1. Remember that vote ids start at zero and increment by one each time a vote is created.

If you go to the Voting app after you've voted, you'll see that the *yes* vote is only 50%.

<p align="center">
   <img width="800" src="/docs/assets/agent-guide/agent-10.png">
</p>

That's because only one out of two token holders have voted. The other token holder (A's Agent app) still has to vote.


### **4. Use A's Agent app to take part in B's vote**

In order to close and enact the vote, we'll use A's Agent app to vote yes to adding a third entity to B.

To do this we need to use the `dao act` command we introduced at the beginning of this section.

Remember that `dao act` takes at least three arguments:

 - The first is the address of the Agent app you want to use to perform an action. In our case this is the address of A's Agent app.

- The second is the address of an **external contract** or  the address of an app within a DAO. In our case this is the address of B's [Voting app](https://wiki.aragon.org/dev/apps/voting/).

- The third is the [full signature](https://developer.mozilla.org/en-US/docs/Glossary/Signature/Function) of the method we wish to execute in either the external contract or the app we specified in the second argument. In our case the method is [`vote`](https://wiki.aragon.org/dev/apps/voting/index.html#casting-votes) and its full signature is `vote(unint256,bool,bool)`.

- Finally, the remaining arguments are the arguments which the method -- in our case `vote` -- will be exectuted with. We can see from the signature that `vote` takes three arguments: an interger, a boolean, and a boolean. In our case we will pass in: `1`, `true` and `true`.

   - The first (`1`) is the id for the vote we want to interact with. This is always an integer. Remember that vote ids start at 0 and increment by 1 each time a vote is created.

   - The second (`true`) specifies which was we want to vote: true means yes and false means no.

   - And the third (`true`) specifies whether the contract should check if a vote already has enough support to be executed. If it does, the Voting app will perform the action that was being voted on, and the vote will be close. `true` means check if this vote can be executed, `false` means don't check.


So in our case, we run:

```
dao act <agent app address of dao A> <voting app address of dao B>  "vote(uint256,bool,bool)" 1 true true  --environment aragon:rinkeby --apm.ipfs.rpc https://ipfs.eth.aragon.network/ipfs/
```

The result of this command will be to trigger a vote in A on whether to allow A's Agent app to execute the vote in B.

<p align="center">
   <img width="800" src="/docs/assets/agent-guide/agent-11.png">
</p>

### **5. Confirm the vote/action in A**

The final step is to confirm the vote in A.

Again, we can do this either through the UI or by running:

```
dao exec <name of dao A> <voting app address of dao A> vote 2 true true --environment aragon:rinkeby --apm.ipfs.rpc https://ipfs.eth.aragon.network/ipfs/
```
Note that we passed in a vote id of `2` as the first argument to `vote`. That's because this is the third vote created in A, and vote ids start at 0.

Once you've confirmed the vote, if you head over to B's voting app again you should see that the vote to mint one token for your chosen third entity now has 100% support.

<p align="center">
   <img width="800" src="/docs/assets/agent-guide/agent-13.png">
</p>

Finally, to double check that your chosen entity has really been added as a stakeholder in B, click on B's Token Manager (named **Tokens** in left panel).

<p align="center">
   <img width="800" src="/docs/assets/agent-guide/agent-14.png">
</p>

You should see there are now three tokenholders, each with equivalent stakes.

If you've made it this far,  congratulations! 😊🎉😊🎉

You've just used the Agent app to allow one Aragon organization to participate as a stakeholder in another! 

## Use case B: Interacting with Compound

## Use case C: Creating an Aragon Trust

## Use case D: Opening a Maker CDP

# Further resources
- [Dynamic Permissions for Organization “Actions” with Signer Integration](https://forum.aragon.org/t/dynamic-permissions-for-organization-actions-with-signer-integration/116)

- [Agent app, arbitrary actions from DAOs](https://forum.aragon.org/t/agent-app-arbitrary-actions-from-daos/275)

- [Releasing Aragon Agent beta](https://blog.aragon.one/aragon-agent-beta-release/)











