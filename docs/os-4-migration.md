---
id: aragonos-4-migration
title: aragonOS 4 migration guide
sidebar_label: Migrating to aragonOS 4 from aragonOS 3
---

aragonOS 4 was designed to be as familiar as possible to users of aragonOS 3. In some cases an Aragon app might not even have to be changed when upgrading.

For a more in-depth technical explaination of the changes in aragonOS 4, please see the [annoucement blog post](https://blog.aragon.org/releasing-aragonos-4) and [reference documentation](/docs/aragonos-ref.html). An annotated list of commits between aragonOS 3 and aragonOS 4 is also [available](https://github.com/aragon/aragonOS/wiki/aragonOS-4:-Updates-to-aragonOS-and-aragon-apps#application-capabilities).

---
## Breaking interface changes

### Solidity pragma

All contracts inheriting from `AragonApp` must now use at least `pragma solidity 0.4.24`.

### Initialization

All `AragonApp`s must now be initialized before they can be used to prevent uninitialized contracts that may be maliciously initialized by someone else. Trying to access `auth()` or `authP()` protected functionality in uninitialized apps will now revert.

If your app didn't already require initialization then you'll need to include the following function in your app:

```solidity
contract App is AragonApp {
    /**
    * @dev Initialize can only be called once. It saves the block number in which it was initialized.
    */
    function initialize() public onlyInit {
        initialized();
    }
}
```

And use it in a template when installing the app:

```solidity
contract AppInstallTemplate {
    /**
    * @dev Create a new DAO with App installed
    */
    function newDAO() external {
        // ...

        App app = App(dao.newAppInstance(/* ... */));
        app.initialize();

        // Now app can be used
        // ...
    }
}
```

### Pruned public constants

To optimize the gas costs of deploying base and proxy contracts as well as simplify public interfaces on tools like etherscan, we've pruned most public constants that would be unnecessary on-chain. This is most likely to only affect any existing tests that expect some constants to be exposed publicly in your contract and can be fixed by either creating mocks or duplicating the constants in the tests.

`KernelConstants` has also been split into [`KernelAppIds`](https://github.com/aragon/aragonOS/blob/v4.0.0/contracts/kernel/KernelConstants.sol#L8) and [`KernelNamespaceConstants`](https://github.com/aragon/aragonOS/blob/v4.0.0/contracts/kernel/KernelConstants.sol#L20), although it is unlikely your app was directly inheriting from `KernelConstants`.

### Kernel's newAppInstance overload replaced

An argument was added to the longer overloads of `newAppInstance()` and `newPinnedAppInstance()` to include an initialization payload so the new proxy instance could be created and initialized in one atomic call. The new arguments list for the longer overloads is `(byte32 appId, address appBase, bytes initializePayload, bool setDefault)`.

### AragonApp.getExecutor(bytes) renamed

`AragonApp.getExecutor(bytes)` has been renamed `getEVMScriptExecutor(bytes)` and has `getEVMScriptRegistry()` exposed alongside it.

### Proxy-less AragonApps

By default, all `AragonApp`s are petrified on deployment and can only be used behind a proxy.

This was chosen as a sane default as it is unlikely you'd want to directly deploy, install, and use a base contract instance of an app rather than a proxy instance, but it is also possible to turn this off by inheriting from [`UnsafeAragonApp`](https://github.com/aragon/aragonOS/blob/v4.0.0/contracts/apps/UnsafeAragonApp.sol) instead.

### Stand-alone usage of AragonApps

`AragonApp`s that use any functionality requiring a Kernel (e.g. `auth()`, EVMScripts, or the recovery mechanism) now require the app instance to be connected to a Kernel. Frankly, if you're not using any of this functionality, you probably shouldn't be inheriting from `AragonApp`.

The old behaviour used to be that functionality protected by the `auth()` or `authP()` modifiers could still be invoked if the app instance wasn't connected to a Kernel. This was unexpected and confusing behaviour, possibly leading to dangerous situations, and was removed.

### EVMScripts require callers to be initialized

Using `AragonApp.runScript(bytes, bytes, address[])` requires an application to be initialized, and each EVMScript executor contract now also checks if its caller has been initialized to prevent malicious misuse from unintended users.

### DelegateScript and DeployDelegateScript executors removed

Both `DelegateScript` and `DeployDelegateScript` were found to be insecure and have been removed. Although they were still protected by the ACL, the potential for damage was too high due to the fact that they `delegatecall`ed into a user-submitted address.

### Token contracts removed

The [Minime token](https://github.com/Giveth/minime/) and [Standard token](https://github.com/aragon/aragonOS/blob/v3.1.12/contracts/lib/zeppelin/token/StandardToken.sol) implementations were removed. You should import these contracts into your own project if you would like to continue to use them.

If you'd like to see what this looks like in practice, you can visit [`aragon-apps/shared/minime`](https://github.com/aragon/aragon-apps/blob/v4.0.0/shared/minime).

### aragon-apps

All the apps in [aragon-apps](https://github.com/aragon/aragon-apps) were upgraded to aragonOS 4. Most have not changed much with very few external interface differences. If you were using old versions of them such as in an organization template, however, then you may have to adjust to small differences in their APIs.

The most notable change is with the [Vault](https://github.com/aragon/aragon-apps/blob/master/apps/vault/contracts/Vault.sol) which was massively simplified and made much easier to secure than the previous implementation. If you had trouble integrating with the previous Vault, this one should be much simpler to use and understand.

For more information see the [raw list of changes](https://github.com/aragon/aragonOS/wiki/aragonOS-4:-Updates-to-aragonOS-and-aragon-apps#aragon-apps).

---
## Shiny new things

### ETH and token recoverability

All `AragonApp`s now have built-in ETH and token recoverability in case they accidentally receive value. A `transferToVault(address)` interface is exposed externally to allow someone to send the tokens held by an app instance to the default vault set in the Kernel.

An `allowRecoverability(address)` hook is exposed to allow overloading in `AragonApp` subclasses to control the recoverability behaviour. For example, if an application is meant to hold tokens or ETH, it should turn off the recoverability behaviour for any accepted tokens so they can't be maliciously transferred to another app, even if it is the default vault.

### Depositable proxies

By default, it is impossible to send ETH to an app proxy instance (assuming it is one of `AppProxyUpgradeable` or `AppProxyPinned`) through a gas-limited `.send()` or `.transfer()`. This only applies to proxy instances because you can always declare your own `payable` fallback in `AragonApp` subclasses.

If your application would like its proxies to be able to directly receive ETH through `.send()` or `.transfer()`, however, you can use `AragonApp.setDepositable(true)` at some point to enable this functionality.

Good example use cases of this are in applications that need to hold value, like a vault or fundraising contract. A vault would always want to accept direct transfers so it calls `setDepositable(true)` upon initialization. A fundraising application, however, would likely only want to enable it for the duration of the fundraising period, so it only calls `setDepositable(true)` as the period starts and calls `setDepositable(false)` when the period ends.

### auth provides isInitialized check

The `auth()` and `authP()` modifiers now also check for `isInitialized()` so you don't have to use both modifiers anymore.

### New utilities

It is recommended to use the new [`TimeHelpers`](https://github.com/aragon/aragonOS/blob/v4.0.0/contracts/common/TimeHelpers.sol) and [`Uint256Helpers`](https://github.com/aragon/aragonOS/blob/v4.0.0/contracts/common/Uint256Helpers.sol) utilities to safely get values for time variables (e.g. `now`) and convert between uint units. These also provide a standard interface that allow you to easily create mocks for changing the time returned during testing.

[`EtherTokenConstant`](https://github.com/aragon/aragonOS/blob/v4.0.0/contracts/common/EtherTokenConstant.sol) is also recommended to use as the "address" for ETH when an application can handle both tokens and ETH.

---
## Technical changes worth knowing about

### Unstructured storage

App proxies ([`AppProxyUpgradeable`](https://github.com/aragon/aragonOS/blob/v4.0.0/contracts/apps/AppProxyUpgradeable.sol) and [`AppProxyPinned`](https://github.com/aragon/aragonOS/blob/v4.0.0/contracts/apps/AppProxyPinned.sol)) are now implemented through [unstructured storage](https://blog.zeppelinos.org/upgradeability-using-unstructured-storage/).

This means contracts inheriting from `AragonApp` now start their storage directly from [storage slot 0](https://solidity.readthedocs.io/en/v0.5.0/miscellaneous.html?highlight=layout%20of%20storage#layout-of-state-variables-in-storage) rather than an arbitrary value (in aragonOS 3 it was slot 100), making it much easier to inspect, debug, and swap out proxy implementations. This also makes it much easier for aragonOS to add more functionality in the future without requiring data migrations.

### Kernel storage of apps

The Kernel's storage of apps and their namespacing was revamped to use a mapping of a mapping approach rather than a single mapping whose key was derived from a hash of the namespace and app name.

This is not only cheaper but also makes inspection and debugging much easier as the storage location for a particular app requires less steps to derive.

### Preferring mappings to arrays for storing structs

As pointed out at [Devcon 3](https://www.youtube.com/watch?v=sJ7VECqHFAg&feature=youtu.be&t=9m27s), mappings of structs are much easier to upgrade at later dates than arrays of structs because the data isn't packed tightly. All aragonOS internal and official aragon apps now use this pattern of emulating arrays through mappings.
