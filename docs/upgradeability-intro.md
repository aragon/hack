---
id: upgradeability-intro
title: Upgradeability
sidebar_label: Upgradeability
---

##### Make your app upgradeable to fix bugs and push enhancements


The ACL and Forwarders allow you to create apps that are interoperable and generic so you don't have to reimplement any governance or authentication logic whatsoever. This is thanks to Proxies. A **Proxy** is a very simple smart contract which consists of decoupling the instance of a particular smart contract with the location of its actual business logic.

All a Proxy does is **delegate calls to another contract which contains its actual logic**.

This allows for upgradeability since **you can always interact with the same Ethereum address for the smart contract** but its logic can be upgraded over time.

Proxies help enable the decoupling of authentication and logic since you do not need to authenticate any particular version of the smart contract but rather a reference to it that never changes.

We created [EIP897](https://github.com/ethereum/EIPs/pull/897), which has been merged, in order to standarize how Proxy interfaces work across all the ecosystem.

The [aragonOS Kernel](/docs/stack.html#the-kernel) takes care of maintaining the mapping between the Proxy address of an app and the address where its actual logic lives. Then, upgrading an app is as easy as:

```solidity
    kernel.setApp(kernel.APP_BASES_NAMESPACE(), appId, newAppCodeAddr)
```
