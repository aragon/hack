---
id: client
title: The Aragon client
---

The [Aragon client](https://github.com/aragon/aragon) is a full dapp that can create and manage decentralized organizations by running Aragon apps inside it.

The client provides Aragon app developers with:
- **Sandboxing**: Apps are run inside iframes and can only communicate with the client using RPC (e.g. cannot steal user's private key or scam users)
- **App listing**: It traverses the organization to find all the relevant apps for it
- **Transaction pathing**: It checks with the [ACL](acl-intro.md) if the user can perform an action (e.g. withdrawing funds) and if not, it tells the user possible paths to perform it (e.g. maybe by opening a voting)
- **Notifications**: Aragon apps can send notifications to the user when something relevant happens

It looks like this:
![](https://raw.githubusercontent.com/aragon/aragon-wiki/master/docs/press/press-kit/screenshots/0.5/aragon_core_v05_beta_home04.png)