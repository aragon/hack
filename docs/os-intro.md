---
id: aragonos-intro
title: aragonOS intro
---

**aragonOS** is a **smart contract framework** for building DAOs, dapps and protocols.

Its architecture is based on the idea of a decentralized organization being the aggregate of multiple components (called applications) and a pillar that is the **Kernel**, which governs [how these applications can talk to each other](/docs/acl-intro.html) and how other entities can interact with them.

aragonOS provides:
- **Upgreadability**: Smart contracts can be **upgraded to a newer version**. Example: *Fixing a bug or adding a feature*
- **Permission control**: By using the `auth` and `authP` modifiers, you can **protect functionality** so only other apps or entities can access it. Example: *Protecting a vault so only the DAO's Voting app can initiate an action to transfer funds*
- **Forwarders**: aragonOS apps can send their intent to perform an action to other apps, so that **intent is forwarded if a set of requirements are met**. Example: *Withdrawing funds from a vault if a voting passed and a time-lock expired*

All the above makes it very simple for aragonOS apps to incorporate **governance**. You just need to add a voting app, plug permissions the right way, and you are ready to go!

Useful reads:
- [Your first Aragon app tutorial](/docs/tutorial.html)
- [aragonOS reference](/docs/aragonos-ref.html)
- [aragonOS API](/docs/kernel_Kernel.html)
- [Introducing aragonOS 3.0](https://blog.aragon.org/introducing-aragonos-3-0-alpha-the-new-operating-system-for-protocols-and-dapps-348f7ac92cff/)