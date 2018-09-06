---
id: stack
title: The Aragon stack
sidebar_label: The stack
---

### The most advanced stack for creating DAOs, dapps and protocols
---

From a technical perspective, Aragon can be seen as an **operating system for human organization**.
Therefore, the Aragon stack can be thought of as an operating system, just like macOS or Linux.

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

#### Read more: [Reference documentation for the Kernel](/docs/aragonos-ref.html#2-kernel)

## Permission management

In conventional operating systems, you just have normal users and admins. But for decentralized governance, you need much more.

aragonOS contains a **rich permissions system**. Any resource or functionality can be assigned a **role**. Only entities that have permission to call that role can access that resource. Those permissions are all set in the [Access Control List](/docs/acl-intro.html).

With aragonOS, permissions work the following way:

> *Entity E* can call *Function F* (*Param P*...) on *App A*, only if *Param P* satisfies *Rules R*, and *Permission Manager PM* can revoke or reassign that permission

Which simplified would be:

> An entity can call a function on an app, and its manager can revoke or reassign that permission

This enables for virtually infinite combinations and functionality permissions-wise.

#### Read more: [Intro to permissions](/docs/acl-intro.html)

## Permission escalation

In a conventional OS, there is usually just one way to escalate permissions, by using tools like `sudo`.

With aragonOS, since permissions are so rich, there may be **many paths to escalate permissions**.

For example, a token holder may have permission to create a voting, and the voting app may have permission to withdraw funds.

In that case, Aragon Core tells the user that option when they attempt to withdraw funds. Users can show their intent for performing an action by trying to execute it directly, without having to think about what the process for executing the action is. By traversing the Access Control List, Aragon Core can automatically come up the path needed for executing the action.

## Full sandboxing

Permission management is key for allowing security at the smart contract level. That is similar to the kernel, filesystem and process security in a conventional OS.

Yet Aragon Core is a frontend too, so security is also required in the UI environment. This is similar how many operating systems impose **app sandboxing**. An app shouldn't be able to access or tamper with another running app.

Aragon Core's approach to frontend sandboxing is a combination of sandboxed iframes and cross-origin messaging.

All apps run inside **sandboxed iframes**, and only communicate with Aragon Core using [aragon.js](/docs/aragonjs-ref.html). Aragon Core provides APIs for accessing smart contracts, displaying notifications and signing transactions. While signing transactions, a panel opens up in Aragon Core, not in the app. Apps cannot prompt users to sign transactions directly, and they cannot interact with the contracts of other apps. Thus all transactions are securely handled by Aragon Core, decreasing the surface attack.

#### Read more: [The Aragon client](/docs/client.html)

## Cohesive UI

Aren't iframes and third party apps bad user experience? Thanks to [Aragon UI](/docs/aragonui-intro.html), all Aragon apps can look and behave the same, improving user experience.

#### Read more: [Intro to Aragon UI](/docs/aragonui-intro.html)

---

# The easiest way to create dapps

Aragon Core is a complete platform for dapp development. It provides:

- Ugradeability, thanks to [APM](/docs/package-management.html).
- Governance, thanks to [forwarders](/docs/forwarding-intro.html) and [permissions](/docs/acl-intro.html).
- Interoperability, just install other apps and plug them to yours with the permission system!
- Security, thanks to frontend sandboxing and smart contract permissions.
- Good-looking UI, thanks to [Aragon UI](/docs/aragonui-intro.html).

You can continue reading about the stack, or [follow the tutorial](/docs/tutorial.html) to start creating an app.