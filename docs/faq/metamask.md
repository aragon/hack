---
id: metamask
title: Metamask
sidebar_label: Metamask
---

#####

### Using Metamask

To interact with your DAO using [Metamask](https://metamask.io/) you must make sure that:

- It's unlocked
- Private network (_Localhost 8545_) is chosen
- The first account provided by `aragon run` or `aragon devchain` is imported and selected. To import the account, copy the private key (something like `a8a5...1563`), go to the Metamask accounts upper icon (to the left of the hamburguer button), scroll down, click on "Import account" and paste the value you copied.

### Issues sending transactions

Because of the way that Metamask caches the account nonces for the different networks, you may be getting the following error when interacting with your app:

```sh
Error: the tx doesn't have the correct nonce. account has nonce of: 157 tx has nonce of: 158
```

The workaround is to switch to a different network (e.g. Rinkeby) and then switch back to the _Localhost 8545_ network. This will refresh Metamask's account nonce cache. Sending transactions should now succeed.
