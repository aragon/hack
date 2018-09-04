---
id: aragonos-building
title: Building with aragonOS design patterns
---

In order to make apps upgradeable and having a generic governance interface, using aragonOS to its full potential requires taking into account several aspects when developing smart contracts.

## The `AragonApp` contract

Contracts using aragonOS have to inherit from the `AragonApp` contract which exposes...

The `AragonApp` contract manages two very important state variables in the app:

- `kernel`: A reference to the Kernel contract. The `Kernel` manages upgradeability and access control for the app.
- `appId`: An identifier for the app, which is the ENS name of the package repo of the app.

These variables are set by `AppProxy` on its constructor and should never be modified by the app, as it could produce and unexpected state and leave the app unprotected or unaccessible.

```solidity
contract MyApp is AragonApp {}
```

## Upgradeability: bases and proxies

The [DelegateProxy](https://eips.ethereum.org/EIPS/eip-897) upgradeability pattern separates the contract implementation code or bases (the business logic) and the actual instances of the apps (thin proxies that use the base contract as their logic). The way upgradeability occurs is by changing the reference to the base contract in the proxy. Updating this reference effectively upgrades the logic that the proxy instances will execute when used.

In the case of aragonOS, the Kernel keeps the references for the versions of all its installed apps. Using the `kernel.newAppInstance(address appId, address base)` function an app is registered in the Kernel and a proxy for that app is created. At any point the base contract of the app can be upgraded using `kernel.setApp`.

Making an app available for use with upgradeable proxies requires deploying the contract to the network and its address can be used as a base. By default, if inheriting from `AragonApp`, the base contract is disabled on deployment and cannot be used directly (only behind proxies). This is a security feature to avoid scenarios when a contract that proxies rely on can be destructed and all proxies are rendered useless.

## Constructor and initialization

The constructor of a contract is executed when a contract is created, therefore when using a proxy, the constructor code that is run is the proxy and not the one of the base contract.

Because of this, aragonOS apps cannot use a constructor for initializing the contract. An initialize function needs to be implemented that can only be executed once (`onlyInit` protects a function from being called after `initialized()` has been done). 

The `isInitialize` modifier can be used for protecting against a function being used before the contract is initialized. In the following example `sendFunds()` would transfer the ETH sent to `address(0)`, but by adding the `isInitialized` modifier, the function will fail until the contract has been initialized. It is a good practice to require all functions that modify state to be initialized before they can be used.

```solidity
contract MyApp is AragonApp {
  address receiver;

  function initialize(address _receiver) onlyInit public {
    initialized();
    receiver = _receiver;
  }

  function sendFunds() payable isInitialized {
    receiver.transfer(msg.value);
  }
}
```

It is important to note that using this pattern, **anyone can initialize** a proxy after it has been deployed. The initialization of a proxy should occur in the same transaction that deploys the proxy to prevent initialization being front-run by an adversary.

- The [AppProxy](https://github.com/aragon/aragonOS/blob/dev/contracts/apps/AppProxyBase.sol) supports passing an initialization payload to its constructor. On creation, the proxy will perform a call with the provided initialization payload as the calldata to itself. This can be used to initialize the proxy in its constructor.
- If using a [DAO kit](kits-intro.md), the initialization of an app can be done right after the proxy is created.

## Roles and the ACL


## Forwarding
## Events
## Depositable and recoverable
## Examples