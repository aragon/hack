---
id: aragonos-building
title: Developing with aragonOS
---

In order to make apps upgradeable and having a generic governance interface, using aragonOS to its full potential requires taking into account several aspects when developing smart contracts.

## The `AragonApp` contract

Contracts using aragonOS have to inherit from the `AragonApp` contract which makes available some functionality that is explained below in this guide.

The `AragonApp` contract manages two very important state variables in the app:

- `kernel`: A reference to the Kernel contract. The `Kernel` manages upgradeability and access control for the app.
- `appId`: An identifier for the app, which is the ENS name of the package repo of the app.

These variables are set by `AppProxy` on its constructor and should never be modified by the app, as it could produce an unexpected state and leave the app unprotected or unaccessible.

```solidity
import "@aragon/os/contracts/apps/AragonApp.sol";

contract MyApp is AragonApp {

}
```

## Upgradeability: bases and proxies

The [DelegateProxy](https://eips.ethereum.org/EIPS/eip-897) upgradeability pattern separates the contract implementation code or bases (the business logic) and the actual instances of the apps (thin proxies that use the base contract as their logic). The way upgradeability occurs is by changing the reference of the base contract in the proxy. Updating this reference effectively upgrades the logic that the proxy instances will execute when used.

In the case of aragonOS, the Kernel keeps the references for the versions of all of its installed apps. Using the `kernel.newAppInstance(address appId, address base)` function, an app is registered in the Kernel and a proxy for that app is created. At any point the base contract of the app can be upgraded using `kernel.setApp`.

Making an app available for use with upgradeable proxies requires deploying the contract to the network so its address can be used as a base. By default, if inheriting from `AragonApp`, the base contract is disabled on deployment and cannot be used directly (only behind proxies). This is a security feature to avoid scenarios when a contract that proxies rely on can be destructed and all proxies are rendered useless.

## Constructor and initialization

The constructor of a contract is executed when a contract is created, therefore when using a proxy, the constructor code that is run is the proxies' constructor and not the one of the base contract.

Because of this, aragonOS apps **cannot use a constructor for initializing the contract**. An initialization function needs to be implemented that can only be executed once (`onlyInit` protects a function from being called after `initialized()` has been done). 

The `isInitialized` modifier can be used for protecting against a function being used before the contract is initialized. In the following example, `sendFunds()` would transfer the ETH sent with the call to `address(0)` as it wasn't set, but by adding the `isInitialized` modifier, the function will fail until the contract has been initialized. It is a good practice to require all functions that modify state to be initialized before they can be used.

```solidity
import "@aragon/os/contracts/apps/AragonApp.sol";

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

It is important to note that using this pattern, **anyone can initialize a proxy** after it has been deployed. The initialization of a proxy should occur in the same transaction that deploys the proxy to prevent initialization being front-run by an adversary.

- The [AppProxy](https://github.com/aragon/aragonOS/blob/dev/contracts/apps/AppProxyBase.sol) supports passing an initialization payload to its constructor. On creation, the proxy will perform a call with the provided initialization payload as the calldata to itself. This can be used to initialize the proxy in its constructor.
- If using a [DAO kit](kits-intro.md), the initialization of an app can be done right after the proxy is created.

Another important note is that if the app uses the [ACL](#roles-and-the-acl) for access control, **all access control checks will fail unless the app has been initialized**.

## Roles and the ACL

aragonOS comes with a powerful ACL that apps can use for managing the permissions to calling certain functions in an app. Rather than coding any custom access control logic into your app, such as the infamous `onlyOwner`, you can just protect functions in your app behind the ACL by adding the `auth` modifier.

If the `auth` modifier is present in a function, prior to its execution, it will check with the Kernel's ACL whether the entity performing the call is allowed to perform the action in the app.

Roles are identified by a `bytes32` value, this identifier can be a constant value so it doesn't take up any storage space. The recommended name for a role identifier is the `keccak256` hash of its name, as it makes integration with the tooling better.

```solidity
import "@aragon/os/contracts/apps/AragonApp.sol";

contract MyApp is AragonApp {
    address receiver;

    bytes32 public constant SET_RECEIVER_ROLE = keccak256("SET_RECEIVER_ROLE");

    function initialize(address _receiver) onlyInit public {
        initialized();
        receiver = _receiver;
    }

    function setReceiver(address _newReceiver) auth(SET_RECEIVER_ROLE) public {
        receiver = _receiver;
    }

    function sendFunds() payable isInitialized {
        receiver.transfer(msg.value);
    }
}
```

An important note is that the `auth` modifier will also check whether the app is initialized. If the **app hasn't been initialized, the authentication check will fail**.

When adding a role to your app, it needs to be added to the [`arapp.json`](cli-usage.md#the-arappjson-file) file, with a description of what having the role allows an entity to do. You can check Aragon's [Voting app arapp.json](https://github.com/aragon/aragon-apps/blob/master/apps/voting/arapp.json) for an example of role descriptions.

```json
{
  ...,
  roles: [
    {
      "name": "Set the receiver of funds",
      "id": "SET_RECEIVER_ROLE",
      "params": []
    }
  ]
}
```

## Forwarding

aragonOS introduces the concept of [forwarding](forwarding-intro.md) which is a generic interface for apps sending an intent to other apps if some conditions met. For example, a Voting app can be a forwarder that only forwards the intent if a vote passes, or a Payroll app that forwards intents to all employees of an organization.

Forwarders are passed an EVMScript that can be executed by the app. For the time being, the script executed is always an array of calls that will be performed one after the other.

In order for an app to be a forwarder it needs to implement these 3 functions in the `IForwarder` interface:

```solidity
import "@aragon/os/contracts/apps/AragonApp.sol";
import "@aragon/os/contracts/common/IForwarder.sol";

contract MyApp is IForwarder, AragonApp {
    address receiver;

    function initialize(address _receiver) onlyInit public {
        initialized();
        receiver = _receiver;
    }

    function isForwarder() public pure returns (bool) {
        return true;
    }

    function canForward(address _sender, bytes _evmCallScript) public view returns (bool) {
        // arbitrary logic for deciding whether to forward a given intent
        return _sender == receiver;
    }

    function forward(bytes _evmScript) public {
        require(canForward(msg.sender, _evmScript));

        bytes memory input = new bytes(0); 
        address[] memory blacklist = new address[](0); // an array of addresses that cannot be called from the script

        // Either immediately run the script or save it for later execution
        runScript(_evmScript, input, blacklist); // actually executes script
    }
}
```

In the example above, this app will always forward an intent if the sender happens to be the `receiver` in the contract.

An important note is that when a script is run, it will be able to perform calls from the app to addresses or contracts that are not in the address blacklist.

## Fund recovery

In order to prevent funds from being stuck in app proxies forever, aragonOS provides a way to recover tokens and ETH sent to apps that don't manage funds. When funds are sent to an app proxy, they can be recovered and sent to the DAOs default Vault unless this functionality has been explicitely disabled.

If an app is intended to hold funds, this functionality can be disabled or customized to the tokens that can be recovered:

```solidity
import "@aragon/os/contracts/apps/AragonApp.sol";

contract MyApp is AragonApp {
    address receiver;

    function initialize(address _receiver) onlyInit public {
        initialized();
        receiver = _receiver;
    }

    function allowRecoverability(address token) public view returns (bool) {
        return token != ETH; // turns off fund recovery for ETH
    }
}
```

## Examples

At Aragon we have built some Aragon apps ourselves that implement some basic functionality to manage DAOs. They are a good reference on how to build you Aragon app. You can check them in the [aragon/aragon-apps](https://github.com/aragon/aragon-apps) repo.