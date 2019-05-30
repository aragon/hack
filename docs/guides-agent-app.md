 
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

# Before we start

Before we start, you'll need to head over to [Aragon](https://app.aragon.org/) and create a new DAO with the [democracy template](https://github.com/aragon/dao-kits/tree/master/kits/democracy).

If you're not sure how to do that, please have a look at  [this section](https://wiki.aragon.org/tutorials/Aragon_User_Guide/#21-create-a-new-democracy-organization) of our [User Guide](https://wiki.aragon.org/tutorials/Aragon_User_Guide/#21-create-a-new-democracy-organization).

The first thing you'll be asked to do is to [choose the network](https://wiki.aragon.org/tutorials/Aragon_User_Guide/#211-navigate-to-httpsapparagonorg-in-your-web-browser) for your organization. For the purposes of this guide we'll choose the **Ethereum Testnet (Rinkeby)**.

Later on, you'll be asked to [set three parameters](https://wiki.aragon.org/tutorials/Aragon_User_Guide/#214-set-the-parameters-of-your-democracy-organization-then-click-next) for your organisation -- the **support**, the **minimum acceptance quorum**, and the **vote duration**.

We'll go with the following (sensible) defaults:

- Support: 100%
- Min. Quorum: 0%
- Duration: 168 hours (or 1 week)

# Step 1: Installing aragonCLI

The aragonCLI (Command Line Interface) is what we use to create, interact with, and develop Aragon apps.

Install it from NPM by running the following command:

`npm install -g @aragon/cli`

Hopefully, it downloaded successfully.

 If not, you should take a look at the [installing aragonCLI](https://hack.aragon.org/docs/guides-faq#installing-aragoncli) section of our [troubleshooting guide.](/docs/guides-faq#installing-aragonCLI) If that doesn't fix things, please reach out to us at the [#dev-help channel on the Aragon Chat](https://aragon.chat/channel/dev-help).

Note that even if you've already installed the CLI, you might want to reinstall it to make sure you're up to date with the latest version.

If you want to find out more about aragonCLI, have a look at the [aragonCLI documentation](https://hack.aragon.org/docs/cli-intro).

# Step 2: Installing the Agent app

Now that we've downloaded aragonCLI, we're ready to install the Agent app.

aragonCLI installs the `aragon dao` commands. We use [these commands](https://hack.aragon.org/docs/cli-dao-commands) to interact directly with our DAO from the command line. They're also available directly using the `dao` shortcut.

To install the Agent app run: 

`dao install <your organisation's name> agent --environment aragon:rinkeby --apm.ipfs.rpc https://ipfs.eth.aragon.network/ipfs/` 

You should see that after `dao install <your organisation's name> agent` we pass in two [global options](https://hack.aragon.org/docs/cli-intro#global-options): `--enviroment` and `--apm.ipfs.rpc`.

The `--environment` option allows us to specify the network we want to use. In our case we've created our organization on rinkeby so we pass in `aragon:rinkeby`.

Note that if we had chosen the **Ethereum Mainnet** as the network for our organization we would have passed `aragon:mainnet` instead of `aragon:rinkeby` as the argument to `--environment`.

The `--apm.ipfs.rpc` option allows us to point to an IPFS node that has the files we are looking for. In our case we're pointing it to the aragon network IPFS node.

Note that we can run our own IPFS node by running `aragon ipfs` in another terminal window. 

Running a local IPFS node allows us to run the same command without the `--apm.ipfs.rpc` option (since the `--apm.ipfs.rpc` option defaults to `http://localhost:5001`). 

However, since IPFS propogation is slow, it's better to point directly to the aragon IPFS node.

For more on the `dao install` command see the documentation [here](https://hack.aragon.org/docs/cli-dao-commands#dao-install).


# Step 3: Setting permissions

If you look at the end of the output of the `dao install` command you just ran, you should see the following:
```
ℹ Successfully executed: "Execute desired action as a token holder"
 ⚠ After the app instance is created, you will need to assign permissions to it for it appear as an app in the DAO
```
What does this mean exactly? 

It's telling us that although we've successfully installed the Agent app, before we can use it as part of our DAO we need to define who can access the app's functionality.

In other words, we need to define who (or which app) has permission to execute actions in the Agent app and who can re-grant and revoke that permission.

In this guide we're going to give the Voting app permissions to execute actions on behalf of the Agent app, and therefore on behalf of the DAO.

To assign these permissions we need to get a hold of the Ethereum address of the Agent app -- remember **Agent is a fully-fledged Ethereum account** -- as well as the address of the Voting app.

To do this we'll use the [`dao apps`](https://hack.aragon.org/docs/cli-dao-commands#dao-apps) command.

`dao apps` takes one argument: the address or name of an aragon DAO. 

By default it only returns apps with permissions. But we can use the `--all` option to get it to return apps without permissions in the report.

From the command line run:

`dao apps <your organization name> --all --environment aragon:rinkeby`

You should see a table that looks something like this:

| App  | Proxy address | Content |
| ------------- | ------------- | ------------ |
| kernel@vundefined  | 0x45d5bfc6262dc22aac45e2d11de84502c50cb2f5  | (No UI available) |
| acl@vundefined | 0xea8e69eb3393f05f7d541b0a19702d57cbec9c51   | (No UI available) |
| evmreg@vundefined | 0x0ebd148047b006380d2e0a882561c99c8f236e93  | (No UI available) | 
| voting@v2.0.3 | **0x1141b4a2d237023cbf916244ac2f3bf17b00bd40**  | ipfs:QmcgUz9PXaZwvA3m7fXPgjsEVKteuivLNSCDvxKGv8ztMa |
| vault@v3.0.1   | 0x7f82f34e15b6942ca4f9493224ff2e2dd1e58cb8  | ipfs:QmeMabCnkA5BtTTszqqRztYKCXZqE9VQFH4Vx7dY9ue2nA |
| finance@v2.0.4    | 0x512ddbc255bfc05dc0fc0f7bc5ef35344a834a44  | ipfs:QmUA6s9eA6Nq5CPrd29ZGYXTTHqvYPUUJ5CUSM5QCj4XKY |
| token-manager@v2.0.2  | 0x0f23ed476668bca59fdcc9142d413ecc4983dde1  | ipfs:QmP8RgDXBDUxV4LLwKsepFJPbXLcpaKu8DMngWPFz51P1m |

Followed directly by another that looks like this:

| Permissionless app   | Proxy address  |
| ------------- | ------------- |
| 0x9ac98dc5f995bf0211ed589ef022719d1487e5cb2bab505676f0d084c07cf89a | **0xD9c5C153B162ACd0e88370410F92A055052d4572** |

The permissionless app is the Agent app we've just installed. Its address is listed under **Proxy address** in the bottom table. In my case that's **0xD9c5C153B162ACd0e88370410F92A055052d4572** .

The Voting app address can be found under the **Proxy address** column in the voting app row of the first table: **0x1141b4a2d237023cbf916244ac2f3bf17b00bd40** .

Once you've found your Agent and Voting app addresses, run the following command:

`dao acl create <Your organisation name> <Your agent app address> EXECUTE_ROLE <Your voting app address> <Your voting app address> --environment aragon:rinkeby`

You should see the following output:

```
✔ Generating transaction
  ✔ Sending transaction
 ✔ Successfully executed
```
🎉🎉 Congratulations! 🎉🎉 You've successfully given your Voting app permissions to execute actions on behalf of your Agent app.

**[Explain the acl command, EXECUTE_ROLE and arguments]**

Now, if you rerun the command:

`dao apps <your organization name> --all --environment aragon:rinkeby`

You should see that your Agent app has been added to the bottom of the App table and that the Permissionless app table is now empty.

| App  | Proxy address | Content |
| ------------- | ------------- | ------------ |
| kernel@vundefined  | 0x45d5bfc6262dc22aac45e2d11de84502c50cb2f5  | (No UI available) |
| acl@vundefined | 0xea8e69eb3393f05f7d541b0a19702d57cbec9c51   | (No UI available) |
| evmreg@vundefined | 0x0ebd148047b006380d2e0a882561c99c8f236e93  | (No UI available) | 
| voting@v2.0.3 | 0x1141b4a2d237023cbf916244ac2f3bf17b00bd40  | ipfs:QmcgUz9PXaZwvA3m7fXPgjsEVKteuivLNSCDvxKGv8ztMa |
| vault@v3.0.1   | 0x7f82f34e15b6942ca4f9493224ff2e2dd1e58cb8  | ipfs:QmeMabCnkA5BtTTszqqRztYKCXZqE9VQFH4Vx7dY9ue2nA |
| finance@v2.0.4    | 0x512ddbc255bfc05dc0fc0f7bc5ef35344a834a44  | ipfs:QmUA6s9eA6Nq5CPrd29ZGYXTTHqvYPUUJ5CUSM5QCj4XKY |
| token-manager@v2.0.2  | 0x0f23ed476668bca59fdcc9142d413ecc4983dde1  | ipfs:QmP8RgDXBDUxV4LLwKsepFJPbXLcpaKu8DMngWPFz51P1m |
| **0x9ac98dc5f995bf0211ed589ef022719d1487e5cb2bab505676f0d084c07cf89a** | 0xD9c5C153B162ACd0e88370410F92A055052d4572 | ipfs:QmfNaBuQsaKE8at2ce9k2FU9dKs16WQqg4RPUHSNik1z9e |


| Permissionless app   | Proxy address  |
| ------------- | ------------- |





...

For more on how we handle permissions in Aragon, [see here](https://hack.aragon.org/docs/acl-intro).

















