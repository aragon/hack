---
id: aragonos-building
title: Developing with aragonOS
---

#####

aragonOS enables apps to be upgradeable and share a generic governance interface. To use it to its full potential, however, the following instructions need to be followed.

## The AragonApp contract

Contracts using aragonOS have to inherit from the `AragonApp` contract.  It makes the following functionality available.

The `AragonApp` contract manages two very important state variables in the app:

- `kernel`: A reference to the Kernel contract. The `Kernel` manages upgradeability and access control for the app.
- `appId`: An identifier for the app (the ENS name of the package repo of the app).

These variables are set by `AppProxy` on its constructor and should never be modified by the app as it could produce an unexpected state and leave the app unprotected or inaccessible.

```solidity
import "@aragon/os/contracts/apps/AragonApp.sol";

contract MyApp is AragonApp {

}
```

## Upgradeability: bases and proxies

The [DelegateProxy](https://eips.ethereum.org/EIPS/eip-897) upgradeability pattern separates the contract implementation code or bases (the business logic) and the actual instances of the apps (thin proxies that use the base contract as their logic). The way upgradeability occurs is by changing the reference of the base contract in the proxy. Updating this reference effectively upgrades the logic that the proxy instances will execute when used.

In the case of aragonOS, the Kernel keeps the references for the versions of all of its installed apps. Using the `kernel.newAppInstance(address appId, address base)` function, an app is registered in the Kernel and a proxy for that app is created. At any point the base contract of the app can be upgraded using `kernel.setApp(bytes32 namespace, bytes32 appId, address app)`.

Making an app available for use with upgradeable proxies requires deploying the contract to the network so its address can be used as a base. By default, if inheriting from `AragonApp`, the base contract is disabled on deployment and cannot be used directly (only behind proxies). This is a security feature to avoid scenarios when a contract that proxies rely on can be destructed and all proxies are rendered useless.

## Constructor and initialization

The constructor of a contract is executed when a contract is created. When using a proxy, however, the constructor code that is run is the proxy's constructor and not the one of the base contract. Because of this, aragonOS apps **cannot use a constructor for initializing the contract**. An initialization function that can only be executed once is required to both be implemented and called before an app is usable.

`AragonApp` exposes the `onlyInit` modifier to protect a function from being called after `initialized()` has been completed and the `auth()`, `authP()`, and `isInitialized` modifiers to protect against a function from being called before the initialization is complete.

In the following example, if `sendFunds()` was called before initialization was complete, it would transfer the ETH sent with the call to `address(0)` since `receiver` wasn't set. By adding the `isInitialized` modifier, the function will fail until the contract has been initialized. It is a good practice to require all functions that modify state to be initialized before they can be used.

```solidity
import "@aragon/os/contracts/apps/AragonApp.sol";

contract MyApp is AragonApp {
    address receiver;

    function initialize(address _receiver) public onlyInit {
        initialized();
        receiver = _receiver;
    }

    function sendFunds() payable external isInitialized {
        receiver.transfer(msg.value);
    }
}
```

It is important to note that, using this pattern, **anyone can initialize a proxy** after it has been deployed. The initialization of a proxy should occur in the same transaction that deploys the proxy to prevent initialization from being front-run by an adversary.

- The [AppProxy](https://github.com/aragon/aragonOS/blob/dev/contracts/apps/AppProxyBase.sol) supports passing an initialization payload to its constructor. On creation, the proxy will perform a call with the provided initialization payload as the calldata to itself. This can be used to initialize the proxy in its constructor.
- If using a [DAO template](templates-intro.md), the initialization of an app can be done right after the proxy is created.

Another important note is that if the app uses the [ACL](#roles-and-the-acl) for access control, **all access control checks will fail unless the app has been initialized**.

### Global variables in apps

Because of our use of Proxies, child contracts won't initialize global variables when created. For example:

```js
contract MyFancyApp is App {
  uint initialState = 1;
}
```

In the above example, when used behind a proxy, `initialState` will be 0, even though the expectation reading the code is that it will be 1.

The correct way to handle this situation is to make it something like:

```js
contract MyFancyApp is App {
  uint initialState;

  function initialize() onlyInit { initialState = 1; }
}
```

## Roles and the Access Control List

aragonOS comes with a powerful [Access Control List (ACL)](/docs/acl-intro.html) that apps can leverage for protecting functionality behind permissions. Rather than coding any custom access control logic into your app, such as the infamous `onlyOwner`, you can just protect functions by adding the `auth()` or `authP()` modifiers.

If the `auth()` modifier is present in a function it will check with the connected Kernel's ACL whether the entity performing the call is allowed to perform the action in the app prior to its execution.

Roles are identified by a `bytes32` value. This identifier can be a constant value so it doesn't take up any storage space. The standard name for a role identifier is the `keccak256` hash of its name as other tooling in the stack expects this to be the case.

```solidity
import "@aragon/os/contracts/apps/AragonApp.sol";

contract MyApp is AragonApp {
    bytes32 public constant SET_RECEIVER_ROLE = keccak256("SET_RECEIVER_ROLE");

    address public receiver;

    function initialize(address _receiver) public onlyInit {
        initialized();
        receiver = _receiver;
    }

    function setReceiver(address _newReceiver) external auth(SET_RECEIVER_ROLE) {
        receiver = _newReceiver;
    }

    function sendFunds() external payable isInitialized {
        receiver.transfer(msg.value);
    }
}
```

An important note is that the `auth()` and `authP()` modifiers will also check whether the app is [initialized](#constructor-and-initialization). If the **app hasn't been initialized, the authentication check will fail**.

When adding a role to your app you will also need to add it to the [`arapp.json`](cli-global-confg#the-arappjson-file) file with a description of the functionality protected by the role. You can check Aragon's [Voting app arapp.json](https://github.com/aragon/aragon-apps/blob/master/apps/voting/arapp.json) for an example of role descriptions.

```json
{
  "roles": [
    {
      "name": "Set the receiver of funds",
      "id": "SET_RECEIVER_ROLE",
      "params": []
    }
  ]
}
```

## Forwarding and EVMScripts

aragonOS introduces the concept of [forwarding](forwarding-intro.md), which is a generic interface for apps to send an intent to other apps if some conditions are met. For example, a Voting app can be a forwarder that only forwards the intent if a vote passes. Another example is a Payroll app that only forwards the intents of an organization's employees.

Forwarders are passed an EVMScript that can be executed by the app. The script executed is always an array of calls that will be performed one after the other.

In order for an app to be a forwarder, it needs to implement these 3 functions in the `IForwarder` interface:

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
        // Arbitrary logic for deciding whether to forward a given intent
        return _sender == receiver;
    }

    function forward(bytes _evmScript) public {
        require(canForward(msg.sender, _evmScript));

        // Input is unused at the moment
        bytes memory input = new bytes(0);

        // An array of addresses that cannot be called from the script
        address[] memory blacklist = new address[](0);

        // Either immediately run the script or save it for later execution
        runScript(_evmScript, input, blacklist); // actually executes script
    }
}
```

In the example above, the app will always forward an intent if the sender happens to be the `receiver` in the contract.

Note that a script is only able to perform calls to addresses or contracts that are not in the address blacklist.

## Fund recovery

In order to prevent funds from being stuck in app proxies forever, aragonOS provides a way to recover tokens and ETH sent to apps that don't manage funds. When funds are sent to an app proxy, they can be recovered and sent to the DAOs default Vault unless this functionality has been explicitely disabled.

If an app *is* intended to hold funds, this recovery functionality can be disabled or customized to only tokens that can be recovered:

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

## Recommendations

### Conventions

#### Representing ETH as a token

If a function has a token parameter, but you would like to handle ETH as well as other token addresses in the same parameter, use `address(0)` as the address of ETH. aragonOS includes `EtherTokenConstant` to define `ETH = address(0)`.

#### Representing time

As it is unlikely we'll ever need to worry about `uint256`-precision for UNIX timestamps (in seconds) or blocks (in ~15s intervals), we generally cast these values down to `uint64`s so we can pack them to save gas. aragonOS provides `TimeHelpers` and `Uint256Helpers` as utility contracts for obtaining these values safely.

### Safety conveniences

`SafeERC20` is available as of `@aragon/os@4.1.0` as a generic library to smooth out ERC20 token
interactions. In particular, it adds the ability to transparently handle [tokens that don't return properly](https://github.com/sec-bit/awesome-buggy-erc20-tokens/blob/master/ERC20_token_issue_list.md#b1-transfer-no-return) as well as adding `staticcall` variants for common read-only interfaces in tokens.

### UNIX philosophy

The design philosophy we use when developing Aragon apps is very similar to the UNIX philosophy. We try to architect apps to do one thing and one thing well and to respect and implement the few aragonOS interfaces so that they play nicely with the rest of the ecosystem.

This results in purely technical benefits such as testability, but it also becomes very powerful when apps are combined and the output of one app becomes the input of an other one. You can think of forwarders resembling UNIX pipes in their philosophy.

### Permissioning

We also recommend that all state-changing functionality in an application should be protected by a role and that each separate action should have its own role. This allows one to create granular permissioning schemes and makes securing an application easier.

## Examples

We officially build and maintain a number of Aragon apps ourselves, that implement the basic functionalities to manage organizations. These apps are released alongside every Aragon release and are a good reference of how to build Aragon apps. You can view their code in the [aragon/aragon-apps](https://github.com/aragon/aragon-apps) repo.
