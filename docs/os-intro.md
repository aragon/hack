---
id: aragonos-intro
title: aragonOS intro
sidebar_label: Introduction
hide_title: true
---

![](/docs/assets/brand/aragonos.png)

**aragonOS** is a **smart contract framework** for building decentralized organizations, dapps, and protocols.

--------

As you may have guessed, **the OS in aragonOS stands for Operating System**. How so?

A computer operating system manages how applications access the underlying resources of the computer—the hardware.

aragonOS does the same for decentralized organizations or protocols. It abstracts away the management of how apps and external entities access the resources of the organization or protocol.

These resources can be things such as assets, cryptocurrencies, the rights to claim a premium on a loan, or the rights to upgrade a smart contract.

Its architecture is based on the idea of a decentralized organization or protocol being the aggregate of multiple components (called applications) connected by a pillar, called the **Kernel**, which are all governed by a special [Access Control List (ACL)](/docs/acl-intro.html) application that controls how these applications and other entities can interact with each other.

--------

#### aragonOS provides the following functionality:
- **Upgradability**: Smart contracts can be **upgraded to a newer version**. Example: fixing a bug or adding a feature.
- **Permission control**: By using the `auth()` and `authP()` modifiers you can **protect functionality** such that they're only accessible by other apps or entities if given permission. This completely abstracts the authentication logic from an app, allowing you to focus on your app's business logic. Example: protecting a vault so only the organization's Voting app can initiate an action to transfer funds.
- **Forwarders**: aragonOS apps can communicate with each other by sending their intent to perform an action to other apps. Example: withdrawing funds from a vault only on the passing of a vote and the expiring of a time-lock.

All the above makes it very simple for aragonOS apps to incorporate **governance**. You just need to add a voting app, configure permissions the right way, and away you go!

--------

#### Useful reads:

<span>![*](/docs/assets/check.svg) [Your first Aragon app tutorial](/docs/tutorial.html)</span><br>
<span>![*](/docs/assets/check.svg) [aragonOS reference](/docs/aragonos-ref.html)</span><br>
<span>![*](/docs/assets/check.svg) [aragonOS API](/docs/kernel_Kernel.html)</span><br>
<span>![*](/docs/assets/check.svg) [Introducing aragonOS 3.0](https://blog.aragon.org/introducing-aragonos-3-0-alpha-the-new-operating-system-for-protocols-and-dapps-348f7ac92cff/)</span><br>
