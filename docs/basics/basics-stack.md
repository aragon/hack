---
id: basics-stack
title: The Aragon stack
sidebar_label: The Aragon stack
---

##### For creating DAOs, dapps and protocols

From a technical perspective, Aragon can be seen as an **operating system for human organization**.
Therefore, the Aragon stack can be thought of as an operating system, just like macOS or Linux.

A computer operating system manages which processes have access to the computer's resources. They do that with the following components:

- A Kernel, which has drivers that let the software control the hardware
- A permission system, to manage which processes can access each resource
- A self-upgrade system, for bugs and enhancements

You wouldn't want a Tetris app to own full control over your computer's RAM. That would enable tampering with other apps or stealing precious information. Similarly, you wouldn't want a CryptoKitties app to have full control over the funds of your DAO.

The role of the OS, and in this case of the Aragon stack, is to create an environment in which **apps can abstract over the underlying resources**, while ensuring security.

# The layers of the stack

<br><br><br>
![The Aragon stack](/docs/assets/basics/architecture.svg)
<br>

> This is a diagram of the Aragon stack, from the Ethereum Virtual Machine to the User Interface

<br>

## aragonOS

**aragonOS** is a **smart contract framework** for building decentralized organizations, dapps, and protocols.

As you may have guessed, **the OS in aragonOS stands for Operating System**. How so?

A computer operating system manages how applications access the underlying resources of the computer—the hardware.

aragonOS does the same for decentralized organizations or protocols. It abstracts away the management of how apps and external entities access the resources of the organization or protocol.

These resources can be things such as assets, cryptocurrencies, the rights to claim a premium on a loan, or the rights to upgrade a smart contract.

Its architecture is based on the idea of a decentralized organization or protocol being the aggregate of multiple components (called applications) connected by a pillar, called the **Kernel**, which are all governed by a special Access Control List (ACL) application that controls how these applications and other entities can interact with each other.

### The Kernel

The Kernel is a very simple smart contract. It keeps track of an Access Control List app which it uses for **permission management of the entire DAO**.

The Kernel also knows where to find its installed apps and handles upgradeability of the apps by keeping references to the actual code that apps run.

### Permission management

In conventional operating systems you just have normal users and admins but for decentralized governance you need much more.

aragonOS contains a **rich permissions system**. Any resource or functionality can be assigned a **role**. Only entities that have permission to call that role can access that resource. Those permissions are all set in the Access Control List.

With aragonOS, permissions work the following way:

> _Entity **E**_ can call _Function **F**_ (protected by _Role **R**_ and parameterized by _Params **P**_...) on _App **A**_ only if _Entity **E**_ holds a permission for _Role **R**_ on _App **A**_ and their arguments to _Function **F**_ satisfy _Rules **R**_. A _Permission Manager **M**_ can revoke or reassign that permission.

Which simplified would be:

> An entity can call a function on an app and its manager can revoke or reassign that permission

This enables for a great amount of flexibility in permission configuration.

### Permission escalation

In a conventional OS there is usually just one way to escalate permissions, by using tools like `sudo`.

With aragonOS, since permissions are so rich, there may be **many paths to escalate permissions**.

For example, a token holder may have permission to create a vote, and the voting app may have permission to withdraw funds.

In that case, the Aragon client tells the user that option when they attempt to withdraw funds. Users can show their intent for performing an action by trying to execute it directly without having to know the process for executing the action. By traversing the Access Control List, Aragon can automatically determine the path needed for executing the action.

### aragonOS provides the following functionality

- **Upgradability**: Smart contracts can be **upgraded to a newer version**. Example: fixing a bug or adding a feature.
- **Permission control**: By using the `auth()` and `authP()` modifiers you can **protect functionality** such that they're only accessible by other apps or entities if given permission. This completely abstracts the authentication logic from an app, allowing you to focus on your app's business logic. Example: protecting a vault so only the organization's Voting app can initiate an action to transfer funds.
- **Forwarders**: aragonOS apps can communicate with each other by sending their intent to perform an action to other apps. Example: withdrawing funds from a vault only on the passing of a vote and the expiring of a time-lock.

All the above makes it very simple for aragonOS apps to incorporate **governance**. You just need to add a voting app, configure permissions the right way, and away you go!

---

## Aragon client

The [Aragon client](https://github.com/aragon/aragon) is a full dapp that can create and manage decentralized organizations by running Aragon apps inside it.

The client provides Aragon app developers with the following capabilities:

- **Sandboxing**: The client is running code from third party developers and so in order to mitigate risk (such as cross-site scripting and phishing attempts by manipulating the DOM) we sandbox apps
- **App listing**: It traverses the organization to find all the relevant apps for it
- **Transaction pathing**: It checks with the ACL to see if the user can perform an action (e.g. withdrawing funds) and if not, it gives the user alternative paths to perform it (e.g. maybe by opening a vote)
- **Human readable transactions**: It uses Radspec and describes the user action in a human readable way
- **Notifications**: Aragon apps can send notifications to the user when something relevant happens

### Full sandboxing

Permission management is key for allowing security at the smart contract level. This is similar to the Kernel, filesystem and process security in a conventional OS.

Yet the Aragon client is a frontend too, so security is also paramount in the UI environment. This is similar to how many operating systems impose **app sandboxing**. An app shouldn't be able to access or tamper with another running app. It would be disastrous if a malicious app could inject code or modify the frontend of another app.

Aragon's approach to frontend sandboxing is a combination of **sandboxed iframes** and **cross-origin messaging** through a custom RPC protocol built specifically for Aragon. Apps do not have direct access to Web3 or Ethereum.

The Aragon client uses aragonAPI to provide apps APIs for accessing smart contracts, displaying notifications and signing transactions. When signing transactions, a panel opens up in the client, not in the app. Apps cannot prompt users to sign transactions directly and they cannot interact with the contracts of other apps—in reality, they can only send action "intents". Thus all transactions are securely handled by the Aragon client, decreasing the attack surface.

### Cohesive UI

It is commonly thought that iframes degrade the user experience and are not best practice. Though aragonUI uses iframes, it has been built to mitigate this issue. Additionally, it allows all apps to look and behave the same to provide a consistent experience for users across Aragon apps.

### Keeping users informed

A big part of Aragon is user-friendliness, and one of the most unfriendly things in the Ethereum world is transaction data. Examine this screenshot of a transaction in MetaMask:

![UTF8 string in MetaMask](/docs/assets/basics/metamask-sign-data.png)

Would you know what this transaction does? Not even a developer could tell. This is why we created Radspec.

Radspec is a secure alternative to Natspec. Natspec was supposed to be a way to describe transactions from a Natspec _expression_ and some transaction data.

The issue with Natspec, however, is that it is insecure. Any JavaScript can execute in Natspec which opens up a lot of potential attacks, like cross-site scripting, which might successfully phish users.

---

Continue reading about the stack or [follow the tutorial](/docs/tutorial.html) to start creating an app.
