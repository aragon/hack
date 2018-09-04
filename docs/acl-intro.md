---
id: acl-intro
title: Permissions
sidebar_label: Permissions
---

### Use the ACL to control who can access your app's functionality
---

As you may have guessed, **the OS in aragonOS stands for Operating System**. How so?

A computer operating system manages how applications may access the underlying resources of the computer, the hardware.

aragonOS does the same for decentralized organizations. **aragonOS manages how apps and external entities may access the resources of the organization**.

These resources can be assets, cryptocurrencies, rights to claim a premium on a loan, rights to upgrade a smart contract...

## How does it work?
The component that makes this resource management possible its called the ACL, or **Access Control List**.

The ACL is a mapping of who has permission to execute an action in an Aragon app, and who can re-grant or revoke that permission. Looks like this:

| Entity        | App           | Role     | Manager  |
| ------------- | ------------- | -------- | -------- |
| Token Manager | Voting        | openVote | Voting   |
| Voting        | Finance       | withdraw | Voting   |

Which in English would be: an *Entity* can call a *Role* in an *App*, and this all is managed by *Manager*.


## Example

Now let's say we have these 3 apps:
- A *Token Manager* app, which represents BOB token holders and forwards all their intents to another app
- A *Voting* app, which executes any arbitrary action after a voting of BOB token holders passes
- A *Finance* app, which controls the funds of the organization

With the simple mapping in the table above, we have:
- Given permission to BOB token holders, using the *Token Manager*, to open votes in the *Voting* app
- Given permission to the *Voting* app to withdraw funds from the *Finance* app
- We have a fully democratic way of withdrawing funds in Ethereum!
