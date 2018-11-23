---
id: aragonos-ref
title: aragonOS reference documentation
sidebar_label: Reference documentation
---

*Documentation for [aragonOS](https://github.com/aragon/aragonOS) v4.0.1. Looking for [aragonOS 3 documentation?](/docs/aragonos-3-ref.html)*

This document provides a technical overview of the framework's architecture and provides insight into its capabilities. It assumes the reader understands [Solidity](https://solidity.readthedocs.io/). For a less technical introduction, visit the [introduction](/docs/aragonos-intro.html).

## Design philosophy

Using aragonOS allows you to write simpler code by **decoupling** the specific **business logic** of a protocol or application from its **authentication logic**.

With aragonOS, you don't have to think about how to implement authentication or governance at all. Simply inherit from the **AragonApp** base class and use a special modifier to mark actions that require authentication. 

Additionally, **upgradeability** capabilities are provided and are used by default. aragonOS implements the [DelegateProxy](https://eips.ethereum.org/EIPS/eip-897) pattern known as  [unstructured storage](https://blog.zeppelinos.org/upgradeability-using-unstructured-storage/). This pattern essentially splits a contract into two instances: a **base logic contract**, which is then depended upon by a simple, slim **proxy contract**. The proxy delegates all its logic to the linked base contract and can modify its pointer to the base contract in order to upgrade its logic.

## Components:

- [Kernel](#kernel)
- [ACL](#acl)
- [AragonApp](#aragonapp)
- [Forwarders and EVMScripts](#forwarders-and-evmscripts)

## Kernel

### The app mapping

At the core of the Kernel lives a mapping called the `app` mapping. You can set and get apps using the following interfaces:

```solidity
function setApp(bytes32 namespace, bytes appId, address app) public;
function getApp(bytes32 namespace, bytes32 appId) public view returns (address);
```

- **namespace:** specifies what type of app record is being set.
- **appId:** used to identify what app is being set. It is the [ENS `namehash`](http://docs.ens.domains/en/latest/introduction.html#namehash) of the APM repo (e.g. `namehash('voting.aragonpm.eth')`).
- **app:** Address of a contract that can have a different meaning depending on the [namespace](#namespaces).

> **Warning**
>
> Modifying this mapping can have completely destructive consequences and can result in loss of funds. The permission to execute this action, `SET_APP_ROLE`, is **critical** and has to be well protected behind the ACL.

### Namespaces

The Kernel implements three namespaces in which installed apps can be registered:

- **Core namespace** (`keccak256('core')`): the core components of the Kernel. The only contract set in the core mapping should be the reference to the Kernel's base contract.
- **Base namespace** (`keccak256('base')`): the base contract addresses for proxy implementations.
- **App namespace** (`keccak256('app')`): the "default" app address for an installed app. This is used when an app might need to reference another app in the organization, for example, the default ACL instance or the EVMScriptsRegistry.

### App installation

The notion of "installing" an application in aragonOS is somewhat tricky. Although the Kernel keeps information about apps and their bases, it does not actually keep every app instance stored within its `apps` mapping.

As such, we attribute the "installation" of an app instance to the creation of its first permission in the [ACL](#acl). If an app has no permissions set, it is technically impossible to use, if developed correctly, and is not considered installed.

While aragonOS is unopinionated about using base or proxy contracts as app instances, by default it prefers using proxies to allow for upgradeability.

You can create new [app proxy](#appproxies-and-upgradeability) instances through the following interfaces:

```solidity
function newAppInstance(bytes32 appId, address appBase);
function newPinnedAppInstance(bytes32 appId, address appBase);
```

- **appId:** used to identify what app to link the proxy to. It is the [ENS `namehash`](http://docs.ens.domains/en/latest/introduction.html#namehash) of the APM repo (e.g. `namehash('voting.aragonpm.eth')`).
- **app:** Address of the base contract for the app instance. If this app has already been installed previously, this address **must** be the same as the one currently set (use `getApp(kernel.APP_BASES_NAMESPACE(), appId)` to check).

Overloaded versions of the two functions with more options are available:

```solidity
function newAppInstance(bytes32 appId, address appBase, bytes initializePayload, bool setDefault);
function newPinnedAppInstance(bytes32 appId, address appBase, bytes initializePayload, bool setDefault);
```

- **initializePayload**: calldata to be used to immediately initialize the app proxy, useful for atomically initializing the new app proxy in one transaction.
- **setDefault**: set the new app as the default instance of the app in the Kernel (i.e. also set it in the **App** namespace).

### App permissioning

For convenience, the Kernel exposes the following interfaces for getting the default ACL as well as whether an entity has permission to invoke a particular action on an app:

```solidity
function acl() public view returns (IACL);
function hasPermission(address who, address where, bytes32 what, bytes how) public view returns (bool);
```

### Upgradeability

Upgradeability of apps and the Kernel itself is done by setting a new address for a specific key in the `apps` mapping with either the **Core** or **Base** namespace.

**Kernel upgradeability**

Kernel instances for different organizations can share the same implementation. Every Kernel instance is a KernelProxy, allowing them to be upgradeable.

> **Warning**
>
> Be _extremely_ careful when upgrading the Kernel! The logic for upgrading to a new implementation is in the implementation itself, and so an upgrade to the Kernel could render it un-upgradeable or even unusable!

Upgrading the Kernel of an organization is done by changing the **Kernel appId** in the **Core** namespace:

```solidity
kernel.setApp(kernel.CORE_NAMESPACE(), kernel.KERNEL_APP_ID(), newKernelBaseAddr);
```

**AppProxies and upgradeability**

In a similar fashion to the Kernel, apps can share implementation code to save gas on deployment. AppProxies rely on the Kernel for their upgradeability. Note that separate app instances in an organization are all linked to the same base contract in the Kernel, and so upgrading the base contract would effectively upgrade all of that app's instances.

Upgrading an app is done by setting a new base address for **that app's appId** in the **Base** namespace:

```solidity
kernel.setApp(kernel.APP_BASES_NAMESPACE(), votingAppId, newVotingAppBaseAddr);
```

aragonOS provides two different types of proxies for apps:

- **AppProxyUpgradeable**: an upgradeable proxy. In every call to the proxy it retrieves the current base contract address from the Kernel and forwards the call.

- **AppProxyPinned**: a non-upgradeable proxy. On creation, it checks and saves the base contract address in the Kernel. This cannot be upgraded unless the base contract has explicit logic to change that storage slot.

### Permissions

`APP_MANAGER_ROLE` is required any time the `apps` mapping is modified.

> **Warning**
>
> `APP_MANAGER_ROLE` can be used in malicious and dangerous ways. **Protect this permission.**

### Events

`SetApp` is fired any time the `app` mapping changes:

```solidity
SetPermission(address indexed from, address indexed to, bytes32 indexed role, bool allowed);
```

### Interface

The Kernel implements the following interface:

```solidity
interface IVaultRecoverable {
    function transferToVault(address token) external;

    function allowRecoverability(address token) external view returns (bool);
    function getRecoveryVault() external view returns (address);
}

contract IKernel is IVaultRecoverable {
    event SetApp(bytes32 indexed namespace, bytes32 indexed appId, address app);

    function acl() public view returns (IACL);
    function hasPermission(address who, address where, bytes32 what, bytes how) public view returns (bool);

    function setApp(bytes32 namespace, bytes32 appId, address app) public;
    function getApp(bytes32 namespace, bytes32 appId) public view returns (address);
}
```

## ACL

A **Permission** is defined as the ability to perform actions (grouped by **Roles**) in a certain app instance (identified by its address).

We refer to a **permission instance** as an entity holding a certain permission. If it helps, you can think of a permission as an _manifestation_ of an app's role that is held by an entity.

The ACL is built entirely as an AragonApp and can be upgraded in the same way as any other application installed into an Kernel. Unlike other apps, however, the ACL is installed and initialized upon the Kernel's own initialization due to its importance.

### Managing permissions

First of all, you can obtain the default ACL instance for a Kernel with:

```solidity
ACL acl = ACL(kernel.acl());
```

Then you can execute the following actions:

**Create Permission**

```solidity
acl.createPermission(address entity, address app, bytes32 role, address manager);
```

- **entity**: entity to hold the permission.
- **app**: app whose role will be allowed through the permission
- **role**: role to allow
- **manager**: manager of the role's permission instances

> **Warning**
>
> `createPermission()` will fail if that role has pre-existing permission instances or a permission manager set.

Grants `role` in `app` for an `entity` and set `manager` as the manager of the role's permission instances.

This action is identical to `grantPermission()` except it allows the creation of the first permission instance of a role.

> **Note**
>
> Creating permissions is mandatory for apps to work. Any permission checks on non-existent permissions are failed automatically.

**Grant Permission**

```solidity
acl.grantPermission(address entity, address app, bytes32 role);
```

> **Warning**
>
> Only callable by the `manager` of the role's permission instances.

Grants `role` in `app` for an `entity`. This `entity` would then be allowed to call all actions that their `role` can perform on that particular `app` until the permission manager revokes their role with `revokePermission()`.

This action is identical to `grantPermission()` except it can only be used by the permission manager of the role.

> **Note**
>
> The `grantPermission()` action doesn’t require protection with the ACL because only the permission manager of the role can make changes.

**Revoke Permission**

```solidity
acl.revokePermission(address entity, address app, bytes32 role);
```

> **Warning**
>
> Only callable by the `manager` of the role's permission instances.

Revokes `role` in `app` for an `entity`.

> **Note**
>
> The `revokePermission()` action doesn’t require protection with the ACL because only the permission manager of the role can make changes.

### Basic ACL example

As an example, the following steps show a complete flow for user "Root" to create a new DAO with the basic permissions set so that a [Voting app](https://github.com/aragon/aragon-apps/tree/master/apps/voting) can manage the funds stored in a [Vault app](https://github.com/aragon/aragon-apps/tree/master/apps/vault):

1. Deploy the Kernel and the ACL
2. Executing `kernel.initialize(acl, rootAddress)`, which in turns calls `acl.initialize(rootAddress)`, creates the "permissions creator" permission under the hood `createPermission(rootAddress, aclAddress, CREATE_PERMISSIONS_ROLE, rootAddress)`
3. Deploy the Voting app
4. Grant the Voting app the ability to call `createPermission()`: `grantPermission(votingAppAddress, aclAddress, CREATE_PERMISSIONS_ROLE)` (must be executed by `rootAddress`)
5. Deploy the Vault app, which has an action called `transfer()`
6. Create a new vote via the Voting app to create the `TRANSFER_ROLE` permission: `createPermission(votingAppAddress, vaultAppAddress, TRANSFER_ROLE, votingAppAddress)`
7. If the vote passes, the Voting app now has access to all actions in the Vault protected by `TRANSFER_ROLE`, which in this case is just `transfer()`
8. Fund transfers from the Vault can now be controlled via votes from the Voting app. Each time a user wishes to transfer funds, they can create a new vote via the Voting app to propose an execution of the Vault's `transfer()` action. The `transfer()` action will be executed if and only if the vote passes.

Note that the Voting app is also able to revoke or regrant the `TRANSFER_ROLE` permission as it is that permission's manager of `TRANSFER_ROLE` on `vaultAppAddress`.

### Permission managers

As we have seen in the [Basic ACL example](#basic-acl-example), when a permission is created a **Permission Manager** is set for that specific role. The permission manager is able to grant or revoke permission instances for that role.

**Getting a role's permission manager**

```solidity
acl.getPermissionManager(address app, bytes32 role)
```

**Change a permission manager**

```solidity
acl.setPermissionManager(address newManager, address app, bytes32 role);
```

> **Warning**
>
> Only callable by the `manager` of the role's permission instances.

Changes the permission manager to `newManager`.

The new permission manager replaces the old permission manager resulting in the old manager losing any management power over that permission.

`createPermission()` executes a special case of this action to set the initial manager for the newly created permission. From that point forward, the manager can only be changed with `setPermissionManager()`.

### Parameter interpretation

When a permission is granted to an entity by the permission manager it can be assigned an array of parameters that will be evaluated every time the ACL is checked to see if the entity can perform the action.

Parameters allow the ACL to perform certain computations with the arguments of a permission in order to decide whether to allow the action or not. This moves the ACL from being a purely binary access list to a more sophisticated system that allows for fine-grained control.

An ACL parameter is comprised of a data structure with 3 values:

- **Argument Value** (`uint240`): the value to compare against, depending on the argument. It is a regular Ethereum memory word that loses its two most significant bytes of precision. The reason for this was to allow parameters to be saved in just one storage slot, saving significant gas.
Even though `uint240`s are used, it can be used to store any integer up to `2^30 - 1`, addresses, and bytes32. In the case of comparing hashes, losing 2 bytes of precision shouldn't be a dealbreaker if the hash algorithm is secure.
- **Argument ID** (`uint8`): Determines how the comparison value is fetched. From 0 to 200 it refers to the argument index number passed to the role. After 200, there are some special *Argument IDs*:
	- `BLOCK_NUMBER_PARAM_ID` (`id = 200`): sets comparison value to the block number at the time of execution. This allows for setting up timelocks depending on blocks.
	- `TIMESTAMP_PARAM_ID` (`id = 201`): sets comparison value to the timestamp of the current block at the time of execution. This allows for setting up timelocks on time.
	- `id = 202`: not currently in use.
	- `ORACLE_PARAM_ID` (`id = 203`): checks with an oracle at the address in the `argument value` and returns whether it returned true or false (no comparison with the `argument value`).
	- `LOGIC_OP_PARAM_ID` (`id = 204`): evaluates a logical operation and returns true or false depending on its result (no comparison with the `argument value`).
	- `PARAM_VALUE_PARAM_ID` (`id = 205`): return `argument value`. Commonly used with the `RET` operation to just return a value. If the value in the param is greater than 0 it will evaluate to true, otherwise it will return false.
- **Operation type** (`uint8`): what operation should be done to compare the value fetched using the argument ID or the argument value. For all comparisons, both values are compared in the following order `args[param.id] <param.op> param.value`. Therefore, for a greater than operation, with `param = {id: 0, op: Op.GT, value: 10}`, it will interpret whether the argument 0 is greater than 10. The implemented operation types are:
	- None (`Op.NONE`): always evaluates to `false` regardless of parameter or arguments.
	- Equals (`Op.EQ`): evaluates to true if every byte matches between `args[param.id]` and `param.value`.
	- Not equals (`Op.NEQ`): evaluates to true if any byte doesn't match.
	- Greater than (`Op.GT`): evaluates to true if `args[param.id] > param.value`.
	- Less than (`Op.LT`): evaluates to true if `args[param.id] < param.value`.
	- Greater than or equal (`Op.GTE`): evaluates to true if `args[param.id] >= param.value`.
	- Less than or equal (`Op.LTE`): evaluates to true if `args[param.id] <= param.value`.
	- Return (`Op.RET`): evaluates to true if `args[param.id]` is greater than one. Used with `PARAM_VALUE_PARAM_ID`, it makes `args[param.id] = param.value`, so it returns the associated value of the parameter.

While also representing an operation, when the argument ID is `LOGIC_OP_PARAM_ID` only the `Op`s below are valid. These operations use the parameter's value to point to other parameter indices in the parameter array. Any values are encoded as `uint32` numbers, each left-shifted 32 bits (for example, an `Op` that takes two inputs with a value of `0x00....0000000200000001` would have input 1, 1, and input 2, 2, refering to params at index 1 and 2). Here are the available logic `Op`s:
- Not (`Op.NOT`): takes 1 parameter index and evaluates to the opposite of what the linked parameter evaluates to.
- And (`Op.AND`): takes 2 parameter indices and evaluates to true if both evaluate to true.
- Or (`Op.OR`): takes 2 parameter indices and evaluates to true if either evaluate to true.
- Exclusive or (`Op.XOR`): takes 2 parameter indices and evaluates to true if only one of the parameters evaluate to true.
- If else (`Op.IF_ELSE`): takes 3 parameters, evaluates the first parameter and if true, evalutes as the second parameter's evaluation, or as the third parameter's evaluation if false.

**Parameter execution**

When evaluating a rule the ACL will always evaluate the result of the first parameter. This first parameter can be an operation that links to other parameters and its evaluation depends on those parameters' evaluation. Execution is recursive and the result evaluated is always the result of the evaluation of the first parameter.

**Examples of rules**

The interpreter supports encoding complex rules in what would look almost like a programming language. For example, let’s look at the following [test case](https://github.com/aragon/aragonOS/blob/63c4722b8629f78350586bcea7c0837ab5882a20/test/TestACLInterpreter.sol#L112-L126):

```solidity
function testComplexCombination() {
    // if (oracle and block number > block number - 1) then arg 0 < 10 or oracle else false
    Param[] memory params = new Param[](7);
    params[0] = Param(LOGIC_OP_PARAM_ID, uint8(Op.IF_ELSE), encodeIfElse(1, 4, 6));
    params[1] = Param(LOGIC_OP_PARAM_ID, uint8(Op.AND), encodeOperator(2, 3));
    params[2] = Param(ORACLE_PARAM_ID, uint8(Op.EQ), uint240(new AcceptOracle()));
    params[3] = Param(BLOCK_NUMBER_PARAM_ID, uint8(Op.GT), uint240(block.number - 1));
    params[4] = Param(LOGIC_OP_PARAM_ID, uint8(Op.OR), encodeOperator(5, 2));
    params[5] = Param(0, uint8(Op.LT), uint240(10));
    params[6] = Param(PARAM_VALUE_PARAM_ID, uint8(Op.RET), 0);

    assertEval(params, arr(uint256(10)), true);

    params[4] = Param(LOGIC_OP_PARAM_ID, uint8(Op.AND), encodeOperator(5, 2));
    assertEval(params, arr(uint256(10)), false);
}
```

When assigned to a permission, this rule will **evaluate to true** (and therefore allow the action) only on the following conditions:

- If an oracle accepts it, and
- The block number is greater than the previous block number, and
- Either the oracle allows it (again! testing redundancy too) or the first parameter of the rule is lower than 10.

The possibilities for customizing an organization or protocol's governance model are truly endless and there is no need to write any actual Solidity.

### Permissions

`CREATE_PERMISSION_ROLE` protects `createPermission()`.

> **Warning**
>
> `CREATE_PERMISSION_ROLE` could be used in malicious and dangerous ways. This is initially assigned when when the Kernel is first initialized. **Protect this permission.**

### Events

[`createPermission()`](#create-permission), [`grantPermission()`](#grant-permission), and [`revokePermission()`](#revoke-permission) all fire the same `SetPermission` event that Aragon clients are expected to cache and process into a locally stored version of the ACL:

```solidity
SetPermission(address indexed from, address indexed to, bytes32 indexed role, bool allowed);
```

[`setPermissionManager()`](#set-permission-manager) fires the following event:

```solidity
ChangePermissionManager(address indexed app, bytes32 indexed role, address indexed manager);
```

## AragonApp

AragonApp is the base class for all aragonOS applications. It exposes a light layer of functionality to supplement an application's business logic and sets up the required storage to connect to a Kernel.

> **Note**
>
> We have outlined a number of recommended conventions to follow in the [aragonOS development guide](/docs/aragonos-building.html#conventions).

### Security recommendations and sane defaults

While it is ultimately up to you to understand the concepts and sufficiently protect your business logic from flaws, AragonApp attempts to provide sane and secure defaults out of the box so you don't have to worry about potential security breaches from misconfiguration.

Applications inheriting from AragonApp are required to be initialized, connected to a Kernel, and used with an [AppProxy](#upgradeability). By default, they are not meant to receive or hold funds and allow all tokens to be recovered through the fund recovery mechanism in case of an accidental token transfer.

To secure an application, it is critical to ensure that all externally-accessible, state-changing functionality is protected by [authentication](#authentication). If the application is meant to receive, hold, or transfer funds, you will also have to carefully reason about the [fund recovery and depositable capabilities](#application-capabilities) and how they affect your application (alongside the [standard Ethereum security recommendations](https://github.com/ConsenSys/smart-contract-best-practices) of course!) If the app is a [forwarder or uses EVMScripts](#forwarders-and-evmscripts) you should also carefully understand the implications of allowing another application or entity to execute an action from your application's address.

### Authentication

**Adding roles**

Declaring roles is simple and usually done as public `bytes32` declarations at the start of the contract file. By convention, the standard name for a role identifier is the `keccak256` hash of its name as other tooling in the stack expects this to be the case:

```solidity
bytes32 public CUSTOM_ACTION_ROLE = keccak256("CUSTOM_ACTION_ROLE");
```

**Protecting functionality**

Protecting an action behind the ACL is done in the smart contract by simply adding the authentication modifiers `auth` or `authP()` to the action. On executing the action, the `auth` or `authP` modifier checks with the Kernel whether the entity performing the call holds the required role or not.

`auth` is capable of defining a *binary* permission—either yes or no:

```solidity
function customAction() auth(CUSTOM_ACTION_ROLE) {
}
```

`authP` allows you to pass a number of parameters that can then be used in the [ACL's parameterization](#parameter-interpretation) for each permission. This allows you to define powerful permissions with highly granular controls based on the inputs of an action:

```solidity
bytes32 public TRANSFER_ROLE = keccak256("TRANSFER_ROLE");
function transfer(uint256 amount) authP(TRANSFER_ROLE, arr(amount)) {
}
```

`authP` takes a `uint256[]` as its second argument. A number of `arr()` syntatical sugar helpers are exposed by default by AragonApp to help construct this array when using different argument types.

Finally, AragonApp also exposes a public getter for checking if an entity can perform a certain action:

```solidity
function canPerform(address sender, bytes32 role, uint256[] params) public view returns (bool);
```

> **Note**
>
> Apps have the choice of which actions to protect behind the ACL as some actions may make sense to be completely public. Any publicly exposed state-changing function should *most likely* be protected, however.

**Lifecycle of an AragonApp call requiring the ACL**

![](/docs/assets/os-app-call.gif)

### Application lifecycle guarantees

The [DelegateProxy](https://eips.ethereum.org/EIPS/eip-897) pattern suffers from a particular weakness of the proxy contracts depending upon the survival of the base logic contracts. It is important to understand the lifecycles of these base and proxy contracts to ensure users' safety and to avoid incidents like the unfortunate [second Parity multisig wallet vulnerability](https://www.parity.io/security-alert-2/).

AragonApps can be in the lifecycle stages of **uninitialized**, **initialized**, or **petrified**. As an application contract is deployed it begins in the **uninitialized** state and can go to either the **initialized** or **petrified** state.

![](/docs/assets/app-lifecycle.png)

AragonApp base logic contracts are **petrified** upon their deployment. They can never be initialized and are considered frozen in an uninitialized state forever. This also means that, if properly developed, there is no way for these contracts to be `selfdestruct`ed.

The AppProxy contracts users deploy and link to the base logic contracts are expected to be **initialized** by their users and only made usable once this initialization is complete.

### Application capabilities

**Fund recovery**

By default, all AragonApps have a fund recovery mechanism enabled for all tokens and ETH to protect against the event of an accidental transfer of funds. This is partly motivated by a flaw in the ERC20 specification that does not allow contracts to prevent themselves from receiving tokens like they can with ETH.

All AragonApps expose an externally-accessible fund recovery mechanism:

```solidity
function transferToVault(address token) external;
```

This capability is configurable through the overloadable hook:

```solidity
function allowRecoverability(address token) public view returns (bool);
```

The default implementation of `allowRecoverability()` is just to return true for all tokens but your overload could choose to not allow certain tokens or even ETH.

**Depositable proxies**

AppProxies start off not being able to receive ETH through the native, gas-limited `.send()` and `.transfer()` methods.

This can be explicitly enabled through this function when an app wants to allow itself (as the proxy instance) to recieve ETH from other contracts using `.send()` or `.transfer()`:

```solidity
function setDepositable(bool depositable) internal;
```

An example use case would be a fundraising application which would only enable its proxy instances to be capable of receiving ETH for the duration of a fundraiser.

**Forwarding and EVMScripts**

See the following [Forwarders and EVMScripts](#forwarders-and-evmscripts) section.

AragonApp exposes the following interface for running EVMScripts:

```solidity
function runScript(bytes script, bytes input, address[] blacklist) internal isInitialized protectState returns (bytes);
```

And some getters for information about EVMScripts:

```solidity
function getEVMScriptExecutor(bytes script) public view returns (IEVMScriptExecutor);
function getEVMScriptRegistry() public view returns (IEVMScriptRegistry);
```

## Forwarders and EVMScripts

Forwarders are one of the most important concepts of aragonOS. Rather than hardcoding the notion of a vote into each separate app’s functionality and ACL one can instead use a generic Voting App, which implements the forwarding interface, to pass actions _forward_ to other apps after successful votes. If the Voting App is set up to only allow a token’s holders to vote, that means any actions/calls being passed from it must have also been approved by the token’s holders.

### Forwarding and transaction pathing

The forwarding interface also allows a frontend interface, like the Aragon client, to calculate "forwarding paths". If you wanted to perform an action but you don't have the required permissions, a client can think of alternative paths for execution. For example, you might be in the Vault app's interface wishing to perform a token transfer. If you only had the permission to create votes, the client would directly prompt you to create a vote rather than let you complete the transfer. The flow is illustrated in the following animation:

![forwarding animation](/docs/assets/fwd.gif)

> Vote forwarding scenario.  (Please note that the governance model and characters are fictional.)

### EVMScripts

We have designed our own scripting format, known as EVMScripts, to encode complex actions into a bytes representation that can be stored and later executed by another entity. EVMScripts can be installed on a per-organization basis through a **EVMScriptRegistry** and aragonOS comes complete with the ability to install multiple script executors in an organization.

**EVMScript executors** are contracts that take a script and an input and return an output after execution.

EVMScript executors must implement the following interface:

```solidity
interface IEVMScriptExecutor {
    function execScript(bytes script, bytes input, address[] blacklist) external returns (bytes);
    function executorType() external pure returns (bytes32);
}
```

> **Warning**
>
> EVMScript executors are called with a `delegatecall` and operate in the context of the calling app. This **must** be taken into consideration when developing your own executor as it could cause a security breach.

aragonOS provides the `CallsScript` executor as a simple way to concatenate multiple calls. It cancels the operation if any of the calls fail.

- **Script body:** See [`CallsScript` source code ](https://github.com/aragon/aragonOS/blob/v4.0.0/contracts/evmscript/executors/CallsScript.sol#L25) for spec of the payload.
- **Input:** None
- **Output:** None.
- **Blacklist:** Entire script reverts if a call to one of the addresses in the blacklist is performed.

### Making an app a Forwarder

Apps can become Forwarders by simply implementing the following interface:

```solidity
interface IForwarder {
    function isForwarder() external pure returns (bool);
    function canForward(address sender, bytes evmCallScript) public view returns (bool);
    function forward(bytes evmCallScript) public;
}
```

Examples of forwarders can be found in the [aragon-apps repo](https://github.com/aragon/aragon-apps). Both the [Voting](https://github.com/aragon/aragon-apps/blob/master/apps/voting/contracts/Voting.sol) and [Token Manager](https://github.com/aragon/aragon-apps/blob/master/apps/token-manager/contracts/TokenManager.sol) apps are forwarders.

> **Warning**
>
> EVMScripts are very powerful and risk causing security breaches! For example, the Token Manager, which allows any token holder to forward actions, needs to have the token address in its blacklist as otherwise any token holder would effectively have control over the token in the same way that the Token Manager does!
