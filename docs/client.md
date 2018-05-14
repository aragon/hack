---
id: client
title: The Aragon client
---

The [Aragon client](https://github.com/aragon/aragon) is a full dapp that can create and manage decentralized organizations by running Aragon apps inside it.

The client provides Aragon app developers with:
- **Sandboxing**: The client is running code from third party developers, so in order to mitigate risk (such as cross-site scripting, phishing attempts by manipulating the DOM) we sandbox apps
- **App listing**: It traverses the organization to find all the relevant apps for it
- **Transaction pathing**: It checks with the [ACL](acl-intro.md) if the user can perform an action (e.g. withdrawing funds) and if not, it tells the user possible paths to perform it (e.g. maybe by opening a voting)
- **Human readable transactions**: It uses [Radspec](human-readable-txs.md) and describes the user their action in a human readable way
- **Notifications**: Aragon apps can send notifications to the user when something relevant happens

It looks like this:
![](https://raw.githubusercontent.com/aragon/aragon-wiki/master/docs/press/press-kit/screenshots/0.5/aragon_core_v05_beta_home04.png)