---
id: basics-os-concepts
title: AragonOS Concepts
sidebar_label: AragonOS Concepts
---

##### Why we built aragonOS

---

aragonOS was born on our path to developing modular and upgradeable smart contracts to power decentralized organizations.

As the project began maturing and we started abstracting more and more, we ended up encapsulating a lot of strong design decisions into a generic framework that could be used by any protocol or decentralized application wanting upgradeability.

**Upgradeability** is really important when developing high-stakes systems in platforms that are still evolving fast. Done well, it can allow for bug fixes and improvements with very little disruption while not causing problems at the protocol level. As a history lesson, if [_The DAO_](<https://en.wikipedia.org/wiki/The_DAO_(organization)>) had had an effective upgradeability mechanism, no hard fork would have been required to fix the problem. As a community we could have avoided months of unproductive discussions, delays in the roadmap, and billions lost in the market capitalization of the protocol due to the fork's damage to network effects.

But upgradeability is a double-edged sword. It doesn't matter how secure or trustless a smart contract is, if it can be upgraded, the contract will effectively be whatever is decided by the party that can upgrade the contract. The guarantees of an upgradeable smart contract are only as strong as the **governance mechanism** that can upgrade it which makes governance the most important aspect of upgradeability.

In a similar way, you cannot have effective governance without a way for upgrading itself to a superior form of governance. Therefore we feel very strongly that **upgradeability** and **governance**, in the context of smart contract, are in reality **two sides of the same coin**.

At Aragon, we are doing research in decentralized governance and the results of our research will all be made aragonOS-compatible. By using aragonOS, protocols can take advantage of our extensive research on governance, upgradeability, and every other aspect of the Aragon Network and Aragon client software.

## Use the Access Control List (ACL) to control who can access your app's functionality

### How does it work?

The ACL essentially just contains a set of who has permission to execute an action in an Aragon app and who can re-grant or revoke that permission. Most generally, an _Entity_ can hold the permission to call a function protected by _Role_ in an _App_, and their permission is managed by a _Manager_, who can revoke or regrant that permission.

For example, let's say we have these 3 apps:

- A _Token Manager_ app, which represents BOB token holders and forwards all their intents to another app
- A _Voting_ app, which executes any arbitrary action after a voting of BOB token holders passes
- A _Finance_ app, which controls the funds of the organization

| Entity        | App     | Role      | Manager |
| ------------- | ------- | --------- | ------- |
| Token Manager | Voting  | OPEN_VOTE | Voting  |
| Voting        | Finance | WITHDRAW  | Voting  |

With the simple mapping in the table above, we have done the following:

- Given permission to BOB token holders, using the _Token Manager_, to open votes in the _Voting_ app
- Given permission to the _Voting_ app to withdraw funds from the _Finance_ app

We have achieved a fully democratic way of withdrawing funds in Ethereum!

## Use forwarders to allow app interoperability and governance

The ACL allows Aragon apps to be interoperable by creating and managing permissions.

For example, a _Token Manager_ app may send an action to the _Voting_ app so if a vote passes the _Voting_ app can withdraw funds from the _Finance_ app.

This is possible thanks to Forwarders. A **Forwarder** is a contract that, given some conditions, will pass along a certain action to other contract(s).
Below is an extract of our _Voting_ app and is all the code required to make it a Forwarder:

```solidity
pragma solidity 0.4.24;

import "@aragon/os/contracts/apps/AragonApp.sol";
import "@aragon/os/contracts/common/IForwarder.sol";

contract Voting is IForwarder, AragonApp {
    /**
    * @notice Creates a vote to execute the desired action, and casts a support vote
    * @dev IForwarder interface conformance
    * @param _evmScript Start vote with script
    */
    function forward(bytes _evmScript) public {
        require(canForward(msg.sender, _evmScript));
        _newVote(_evmScript, "", true);
    }

    function canForward(address _sender, bytes _evmCallScript) public view returns (bool) {
        return canPerform(_sender, CREATE_VOTES_ROLE, arr());
    }

    function isForwarder() public pure returns (bool) {
        return true;
    }
}

```

`canForward` checks if a caller `canPerform` the action `CREATE_VOTES_ROLE`. If it can, it means the caller can create a vote.

`forward` checks if a caller `canForward`, and if it can, it creates a new vote with an `_evmScript`.

This `_evmScript` is the action that will be executed if the voting passes, which can be withdrawing some funds from a _Finance_ app, for example, but it can be any other action. The action is abstracted and doesn't need to be known in advance.

## Make your app upgradeable to fix bugs and push enhancements

The ACL and Forwarders allow you to create apps that are interoperable and generic so you don't have to reimplement any governance or authentication logic whatsoever. This is thanks to Proxies. A **Proxy** is a very simple smart contract which consists of decoupling the instance of a particular smart contract with the location of its actual business logic.

All a Proxy does is **delegate calls to another contract which contains its actual logic**.

This allows for upgradeability since **you can always interact with the same Ethereum address for the smart contract** but its logic can be upgraded over time.

Proxies help enable the decoupling of authentication and logic since you do not need to authenticate any particular version of the smart contract but rather a reference to it that never changes.

We created [EIP897](https://github.com/ethereum/EIPs/pull/897), which has been merged, in order to standarize how Proxy interfaces work across all the ecosystem.

The aragonOS Kernel takes care of maintaining the mapping between the Proxy address of an app and the address where its actual logic lives. Then, upgrading an app is as easy as:

```solidity
    kernel.setApp(kernel.APP_BASES_NAMESPACE(), appId, newAppCodeAddr)
```

## How Radspec works

It's as easy as adding `@notice` to functions in the smart contracts.

```solidity
contract Counter is AragonApp {
    /**
     * @notice Increment the counter by `step`
     */
    function increment(int step) auth(INCREMENT_ROLE) external {
        // ...
    }

    /**
     * @notice Decrement the counter by `step`
     */
    function decrement(int step) auth(DECREMENT_ROLE) external {
        // ...
    }
}
```

These Radspec expressions are written in comments in your source code, and they will be grabbed by `aragon` and bundled with your app.

The Aragon client will display these _with_ the transaction a user is about to perform so that they have a clear understanding of what they're about to sign.

![Screenshot of signer showing Radspec](/docs/assets/basics/radspec.png)

> Our Radspec expressions showing up while signing a transaction

Obviously, this is a super trivial example as we are not actually evaluating anything but we could instead write something like:

```
Decrement the counter by `(2 * 2) - 3`
```

## Publishing and upgrading Aragon apps

**Upgradeability** is one of the key features of aragonOS.

Because upgradeability implies there will be multiple versions of a package of software, we decided to build aragonPM as the main way to **distribute different versions of the packages** that comprise the Aragon client. As we built it, however, we realized that its use cases could extend far beyond just ours as a publicly accessible piece of infrastructure living on Ethereum.

A package or **repository** (repo) in an aragonPM registry keeps track of evolving versions of its contents (the webapp component typically) and smart contract code (if applicable).

To ease upgrades for Aragon apps, both app **smart contracts and frontend can be upgraded using aragonPM**.

aragonPM is a DAO built on top of aragonOS (taking advantage of upgradeability and the ACL).

aragonPM allows for multiple package registries to exist with different governance models for package publishing and releasing new versions. There is an official Aragon curated aragonPM, `aragonpm.eth`, which has very strict restrictions of what gets published and very high quality standards that we use for publishing our core components.

Different aragonPM registries in which everyone can publish their packages are expected to be created by the community. **You can create your own registry** and have full control over it.

### aragonPM as an Aragon DAO

aragonPM is built on top of aragonOS. It is a Decentralized Autonomous Organization (DAO) running on the same Aragon that‘s used to build Aragon organizations (to take advantage of upgradeability and access control)!

This allows for many aragonPM registries to exist with different governance models for package creation and publishing new versions. There is an official Aragon curated instance, `aragonpm.eth`, which has high quality standards and strict restrictions on what can get published, that we use for publishing our core components.

Different aragonPM registries in which everyone can publish their packages are expected to be created by the community, and we have set up `open.aragonpm.eth` on both the main and Rinkeby networks as an open instance available for any one to publish to.

### The architecture of an aragonPM DAO

As a DAO, each aragonPM registry includes a number of installed applications, including one APMRegistry, one ENSSubdomainRegistrar, and many Repo instances. The aragonPM registry controls a [Ethereum Name Service](https://ens.domains/) (ENS) domain through its ENSSubdomainRegistrar, allowing each new created Repo to be assigned its own subdomain. This gives users the ability to **find repos with human-readable names**, such as `voting.aragonpm.eth`.

We envision that many aragonPM registries will be created for different purposes and types of packages. For Aragon, we use the `aragonpm.eth` registry to host our core components. We also have the `open.aragonpm.eth` registry for community developed packages, where anyone can create repos.

At the repo level, each repo can have **its own rules** that govern **how new versions can be published** using the Access Control List from aragonOS. This allows for setting up different types of processes depending on the importance of the repo or the nature of the upgrade (major, minor or patch).

![](/docs/assets/basics/apm-repo.svg)

> A Repo is created in a Registry and can have many versions published over time

A repo keeps a versioned history of content and smart contract code tuples. The content is an on-chain reference to a blob of data that lives off-chain (we currently support IPFS or HTTP addressing). By using IPFS we have the assurance of the **integrity** of the data and that it hasn't changed since it was published. We recommend to always publish using a content-addressed network, like IPFS, but having HTTP is useful for testing or less critical code.

The smart contract code only applies to packages that have an on-chain contract component associated with a particular version. It can be the **implementation code for upgradeable Proxies** or a smart contract that can be directly used. By having these code addresses stored on-chain, smart contracts can use aragonPM directly to get the latest version of the code for a repo.

aragonPM gives users **complete transparency** over all deployments and **traceability** of what the process of publishing a new version entailed.

It is important to point out that aragonPM acts as the reference to what the last version of a repo is but **all upgrades are opt-in** and users of the repo, such as Aragon organizations, need to decide to upgrade or keep using an old version through their own governance mechanisms. Automatically upgrading all users of a repo is extremely dangerous regardless of the upgrade governance mechanism. That's why all upgrades are opt-in and must be started by the user. Someone could, however, build an auto-update contract that users could allow to automatically update their dependencies.
