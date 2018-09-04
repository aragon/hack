---
id: stack
title: The Aragon stack
sidebar_label: The stack
---

### The most advanced stack for creating DAOs, dapps and protocols
---

From a technical perspective, Aragon can be seen as an **operating system for human organization**.
That way, the Aragon stack can be thought of as an operating system, just like macOS or Linux.

A computer operating system manages which processes have access to the computer's resources. They do that by:

- Implementing a kernel, which has drivers that let the software control the hardware
- Implementing a permission system, to manage which processes can access each resource
- Implementing a self-upgrade system, for bugs and enhancements

The general concept goes as follows: You wouldn't want a Tetris app to own full control over your RAM. That would enable tampering with other apps or stealing precious information.

Similarly, you wouldn't want a CryptoKitties app have full control over the funds of your DAO.

The role of the OS, and in this case of the Aragon stack, is to create an environment in which **apps can abstract over the underlying resources**, while ensuring its security.

---

# The layers of the stack
<br><br><br>
![The Aragon stack](/docs/assets/architecture.svg)
<br>
> **Note**<br>
> This is a diagram of the Aragon stack, from the Ethereum Virtual Machine to the User Interface

<br>
## The kernel

The kernel is a very simple smart contract. It keeps track of an Access Control List app, which it uses for **permission management of the entire DAO**.

The kernel also knows where to find its installed apps and handles upgradeability of the apps, by keeping references to the actual code that apps run.

[Reference documentation for the Kernel](/docs/aragonos-ref.html#2-kernel)

## Permission management

In conventional operating systems, you usually have normal users, and admins. We thought about how to translate that into an OS for humans, and discovered it wasn't enough.

What we came up with was a much richer permissions systems.

Thanks to aragonOS, any resource or functionality can be assigned a role. Only entities that have permission to call that role can access that resource. Those permissions are all set in the Access Control List.

With aragonOS, permissions are as follows:

*Entity E can call Function F (Param P...) on App A, only if Z satisfies Rules R, and Permission Manager PM can revoke or reassign that permission*

Which simplified would be:

*An entity can call a function on an app, and its manager can revoke or reassign that permission*

This enables for virtually infinite combinations and functionality permissions-wise.

## Permission escalation

In a conventional OS, when you want to perform an action but you don't have permission to, you sudo.

In our case, it's not that simple. Since permissions are so rich, there may be lots of paths to escalate permissions.

For example, a token holder may have permission to create a voting, and the voting app may have permission to withdraw funds.

In that case, Aragon Core tells the user that option when they attempt to withdraw funds. Users can show their intent for performing an action by trying to execute it directly, without having to think about what the process for executing the action is. By traversing the Access Control List, Aragon Core can automatically come up the path needed for executing the action.

## Full sandboxing

Permission management is key for allowing security at the smart contract level. That'd be the equal of kernel, filesystem and process security in a conventional OS.

Yet Aragon Core being all about frontend too, security is also required in the UI environment. This is similar how many operating systems impose app sandboxing. An app shouldn't be able to access or tamper with another running app.

Sandboxing is very challenging to implement in the frontend. Our solution is a combination of sandboxed iframes, cross-origin messaging and platform APIs.

All apps run inside sandboxed iframes, and only communicate with Aragon Core using aragon.js. Aragon Core provides APIs for accessing smart contracts, displaying notifications and signing transactions. While signing transactions, a panel opens up in Aragon Core, not in the app. Apps cannot prompt users to sign transactions directly, and they cannot interact with the contracts of other apps. Thus all transactions are securely handled by Aragon Core, decreasing the surface attack.

## Cohesive UI

Aren't iframes and third party apps bad user experience? Thanks to Aragon UI, all Aragon apps can look and behave the same. That's amazing for user experience. Operating systems have leveraged this for the last decades. Confusing and incoherent user experiences lead to more errors and less comfort.

We have been inspired by Apple and how they built their ecosystem, both in [desktop](https://developer.apple.com/documentation/appkit) and [mobile](https://developer.apple.com/documentation/uikit). While I have been a Linux user and lover since I was 12, I recognize that UX-wise, Apple knows how it goes.

# The easiest way to create dapps

Aragon Core is a complete platform for dapp development.

Worried about upgradeability? Solved, thanks to APM.

Worried about governance? Solved, thanks to forwarders and permissions.

Worried about reinventing the wheel instead of leveraging existing apps? Solved, just install other apps and plug them to yours with the permission system!

Worried about security: Solved, thanks to frontend sandboxing and smart contract permissions.

Worried about creating a good-looking UI? Solved, use Aragon UI.

If this inspired you to build on Aragon, check out our developer documentation!

If this inspired you to build Aragon, check out open issues or look for open positions!



For users, [Aragon Core](https://app.aragon.org) is the easiest way to create unstoppable organizations. The UI abstracts away technical details, and lets users focus on what matters.

When using Aragon Core, users don't notice that:

- They are interacting with many apps, created by different developers
- The dapp always tries to find how the user can perform actions, even if they don't have direct permission to do so
- The smart contracts and frontend of Aragon Core and its apps are fully upgradeable

That can sound simple, but it isn't. There are many technical challenges. Creating an app platform with full sandboxing. Traversing the access control list so users can perform actions they don't have direct permission over. [Having decentralized and censorship-resistant upgradeability](https://blog.aragon.org/deploying-and-distributing-aragon-core-11e70cbc9b50/).

From a technical perspective, Aragon Core is an operating system for human organization.


