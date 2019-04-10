---
id: acl-intro
title: Permissions
sidebar_label: Permissions
---

##### Use the Access Control List (ACL) to control who can access your app's functionality

## How does it work?
The ACL essentially just contains a set of who has permission to execute an action in an Aragon app and who can re-grant or revoke that permission. Most generally, an *Entity* can hold the permission to call a function protected by *Role* in an *App*, and their permission is managed by a *Manager*, who can revoke or regrant that permission.


## Example

Now let's say we have these 3 apps:
- A *Token Manager* app, which represents BOB token holders and forwards all their intents to another app
- A *Voting* app, which executes any arbitrary action after a voting of BOB token holders passes
- A *Finance* app, which controls the funds of the organization

| Entity        | App           | Role      | Manager  |
| ------------- | ------------- | --------- | -------- |
| Token Manager | Voting        | OPEN_VOTE | Voting   |
| Voting        | Finance       | WITHDRAW  | Voting   |

With the simple mapping in the table above, we have done the following:
- Given permission to BOB token holders, using the *Token Manager*, to open votes in the *Voting* app
- Given permission to the *Voting* app to withdraw funds from the *Finance* app

We have achieved a fully democratic way of withdrawing funds in Ethereum!
