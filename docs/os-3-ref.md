---
id: aragonos-3-ref
title: aragonOS 3 reference documentation
sidebar_label: Reference (aragonOS 3)
---

*Documentation for [aragonOS](https://github.com/aragon/aragonOS) v3.1.2*

This document provides a technical overview of the architecture and can be used
as a specification and developer guide. For a less technical introduction
to aragonOS 3 you can check the [alpha release blog post](https://blog.aragon.org/introducing-aragonos-3-0-alpha-the-new-operating-system-for-protocols-and-dapps-348f7ac92cff).

## 1. General architecture and design philosophy

Using aragonOS to build a system allows for **decoupling** of specific **business
logic** of a protocol or application from its **authentication logic**.  It allows you to code your application without thinking about authentication or
governance at all. By inheriting from the **AragonApp** base class and defining
actions that require authentication with a special modifier, aragonOS can handle
authentication for the protocol.

### 1.1 Basic concepts: Proxy and Forwarder

Before describing general ideas about the architecture, it is important to
understand two concepts the entire framework builds upon:

- **Proxy:** A Proxy is a very simple smart contract construct which consists of
decoupling the instance of a particular smart contract with the location of its actual
business logic. We call individual instances of contracts **Proxy** and the logic
**base contracts**. A Proxy delegates all its logic on a base contract. Upgradeability
is achieved because this link to the base contract can be modified, effectively
updating the Proxy business logic. We created [ERC897](https://github.com/ethereum/EIPs/pull/897) to standardize Proxy interfaces
for better interoperability in the ecosystem.

- **Forwarder:** A Forwarder is a contract that, given some conditions, will pass
along a certain action to other contract(s).
Thanks to the fact that proxies allow a certain instance of a contract to never
have to change its address even if its underlying logic changes, this allows to
identify a concept such as that an action has been approved in a voting with a
certain support by a group of holders of a token, just by checking that the
action **sender address is an instance of a Voting app with a particular address**.
This helps with the decoupling of authentication and logic explained before.

### 1.2 Architecture: Kernel and apps

An organization or protocol that is built with aragonOS is composed by a set of smart contracts of two types:

- **Kernel:** it is at the core of every organization, there is only one instance of it per organization. It manages one very important mapping to keep track of the different *base contract* address depending on the application, registered apps in the kernel (such as the ACL) or the kernel’s own *base contract*.
- **Apps:** are contracts that rely on use the kernel for their upgradeability and access control. Apps don’t need to implement any of those as they occur directly in the Kernel or ACL.

### 1.3 Design philosophy

The design philosophy we use when developing Aragon apps is very similar to the UNIX philosophy, we try to architect them to do one thing and one thing well, and to respect and implement the few aragonOS interfaces so that they play nicely with the rest of the ecosystem.

This results in purely technical benefits such as testability, but it is also very powerful when apps are combined and the output of one app becomes the input of an other one (forwarders resemble UNIX pipes in some way).

### 1.4 Lifecycle of an aragonOS call

![](/docs/assets/os-call.gif)

## 2. Kernel
### 2.1 The app mapping

At the core of the kernel lives a mapping, called the `app` mapping, which is very
critical.

Modifying this mapping can have completely destructive consequences and can result in loss of funds. The permission to execute this action has to be well protected behind the ACL.

```solidity
function setApp(bytes32 namespace, bytes appId, address app) public;
```

- **Namespace:** specifies what type of app record is being set.
- **AppId:** used to identify what app is being set. It is the [ENS `namehash`](http://docs.ens.domains/en/latest/introduction.html#namehash) of the APM repo (e.g. `namehash('voting.aragonpm.eth')`).
- **App:** Address of a contract that can have different meaning depending on the namespace.

### 2.2 Namespaces

- **Core namespace** (`keccak256('core')`): in this namespace is where the core components of the kernel reside. The only thing in the core mapping is the reference to the kernel base contract.
- **Base namespace** (`keccak256('base')`): keeps track of the base contracts for appIds.
- **App namespace** (`keccak256('app')`): some apps use the app namespace as a way to reference other apps. For example this is used to store the reference to the ACL instance or the EVMScriptsRegistry.

## 3. Upgradeability

Upgradeability of apps and the kernel is done by setting a new address for a
specific key in the `apps` mapping in the kernel.

### 3.1 Kernel upgradeability

Kernel instances for different organizations can share the same implementation.
Every Kernel instance is a KernelProxy . The logic for upgrading to a new implementation
is in the implementation itself. An upgrade to the Kernel could render it un-upgradeable.

Upgrading the kernel of an organization is done by changing the **Kernel appId**
in the **Core namespace**

```solidity
kernel.setApp(kernel.CORE_NAMESPACE(), kernel.KERNEL_APP_ID(), newKernelCodeAddr)
```

### 3.2 AppProxies and upgradeability

In a similar fashion to the Kernel, apps can share implementation code to save
gas on deployment. AppProxies rely their upgradeability to the Kernel.

Upgrading an app is done by setting a new app address for the **appId** for the
**Base namespace** in the kernel.

```solidity
kernel.setApp(kernel.APP_BASES_NAMESPACE(), votingAppId, newVotingAppCodeAddr)
```

aragonOS provides two different types of App Proxies:

- **UpgradeableAppProxy**: in every call to the proxy, it checks with the Kernel
what the current code for that appId is and forwards the call.

- **PinnedAppProxy**: on contract creation it checks and saves the app code currently
in the Kernel. This cannot be upgraded unless the app code has explicit logic to
change that storage slot.

There is an extra function in the Kernel that allows for setting the app code and at
the same time creating a new proxy. This function only sets the code the first time.

```solidity
kernel.newAppInstance(votingAppId, votingApp)
kernel.newPinnedAppInstance(votingAppId, votingApp)
```

## 4. ACL

A **Permission** is defined as the ability to perform actions (grouped by roles) in a certain app instance (identified by its address).

We refer to a **Permission Instance** as an entity holding a certain permission.

### 4.1 The ACL as an Aragon app, the Interface
First of all, you need to define your base ACL instance for your kernel with:

```solidity
acl = ACL(kernel.acl())
```

Then you can execute the following actions:

#### Create Permission

```solidity
acl.createPermission(address entity, address app, bytes32 role, address manager)
```

`createPermission()` will fail if that permission has pre-existing permission instances.

This action is identical to [`grantPermission()`](#grant-permission) except it allows the creation of a new permission if it doesn’t exist yet.

A role in the ACL protects access to `createPermission()` as this important function could be used in malicious ways. When the Kernel is initialized, it also creates the permission that grants the initializing address the ability to create new permissions.

Note that creating permissions is made mandatory by the ACL: all actions requiring yet-to-be-created permissions are disallowed by default. Any permission checks on non-existent permissions are failed automatically.

#### Grant Permission

```solidity
acl.grantPermission(address entity, address app, bytes32 role)
```

Grants `role` in `app` for an `entity`. Only callable by the `manager` of a certain permission. This `entity` would then be allowed to call all actions that their `role` can perform on that particular `app` until the permission manager revokes their role with [`revokePermission()`](#revoke-permission).

The `grantPermission()` action doesn’t require protection with the ACL because an entity can only make changes to a permission if it is the permission's `manager`.

#### Revoke Permission

```solidity
acl.revokePermission(address entity, address app, bytes32 role)
```

Revokes `role` in `app` for an `entity`. Only callable by the `manager` of a certain permission.

The `revokePermission()` action doesn’t need to be protected by the ACL either, as an entity can only make changes if it is the `manager` for a given permission.

#### Adding Permissions

Apps have the choice of which actions to protect behind the ACL, as some actions may make sense to be completely public. Protecting an action behind the ACL is done in the smart contract by simply adding the authentication modifier [`auth()`](https://github.com/aragon/aragonOS/blob/4f4e89abaac6c70243c8288b27272003ecb63e1d/contracts/apps/AragonApp.sol#L10) or [`authP()`](https://github.com/aragon/aragonOS/blob/4f4e89abaac6c70243c8288b27272003ecb63e1d/contracts/apps/AragonApp.sol#L15)(passing the role required as a parameter) to the action. On executing the action, the `auth()`/`authP()` modifiers check with the Kernel whether the entity performing the call holds the required role or not.


### 4.2 Basic ACL
As an example, the following steps show a complete flow for user "Root" to create a new DAO with the basic permissions set so that a [Voting app](https://github.com/aragon/aragon-apps/tree/master/apps/voting) can manage the funds stored in a [Vault app](https://github.com/aragon/aragon-apps/tree/master/apps/vault):

1. Deploy the Kernel and the ACL
2. Executing `kernel.initialize(acl, rootAddress)` which in turns calls `acl.initialize(rootAddress)` creates the "permissions creator" permission under the hood:
`createPermission(rootAddress, aclAddress, CREATE_PERMISSIONS_ROLE, rootAddress)`
3. Deploy the Voting app
4. Grant the Voting app the ability to call `createPermission()`:
`grantPermission(votingAppAddress, aclAddress, CREATE_PERMISSIONS_ROLE)` (must be executed by `rootAddress`)
5. Deploy the Vault app, which has a action called `transferTokens()`
6. Create a new vote via the Voting app to create the `TRANSFER_TOKENS_ROLE` permission
`createPermission(votingAppAddress, vaultAppAddress, TRANSFER_TOKENS_ROLE, votingAppAddress)`
7. If the vote passes, the Voting app then has access to all actions in the Vault protected by `TRANSFER_TOKENS_ROLE`, which in this case is just `transferTokens()`
8. Fund transfers from the Vault can now be controlled via votes from the Voting app. Each time a user wishes to transfer funds, they can create a new vote via the Voting app to propose an execution of the Vault's `transferTokens()` action. If, and only if, the vote passes, will the `transferTokens()` action be executed.

Note that the Voting app is also able to revoke or regrant the `TRANSFER_TOKENS_ROLE` permission as it is that permission's manager on `vaultAppAddress`.


### 4.3 Permission managers
As we have seen, when a permission is created, a **Permission Manager** is set for that specific permission. The permission manager is able to grant or revoke permission instances for that permission.

The Permission Manager can be changed with:

```solidity
acl.setPermissionManager(address newManager, address app, bytes32 role)
```

Changes the permission manager to `newManager`. Only callable by the `manager` of a certain permission.

The new permission manager replaces the old permission manager, resulting in the old manager losing any management power over that permission.

[`createPermission()`](#create-permission) executes a special case of this action to set the initial manager for the newly created permission. From that point forward, the manager can only be changed with `setPermissionManager()`.

There's also a getter for the Permission Manager:

```solidity
acl.getPermissionManager(address app, bytes32 role)
```

### 4.4 Parameter interpretation
When a permission is granted to an entity by the permission manager, it can be
assigned an array of parameters that will be evaluated every time the ACL is checked
to see if the entity can perform the action.

Parameters allow to perform certain computations with the arguments of a role in
order to decide whether the action can be done or not. This moves the ACL for being
a purely binary access list, to a more sophisticated system that allows way more
granular control.

An ACL parameter is comprised of a data structure with 3 values:

- **Argument Value** (`uint240`): It is the value to compare against depending on
the argument. It is a regular Ethereum memory word, that looses it 2 most significant
bytes of precision. The reason for this was to allow parameters to be saved in just
one storage slot, saving significant gas.
Even though `uint240`s are used, it can be used to store any integer up to `2^30 - 1`,
addresses and bytes32 (in the case of comparing hashes, losing 2 bytes of precision
shouldn't be a dealbreaker if the hash algorithm is secure). The only problem is
when
- **Argument ID** (`uint8`): Determines how the comparison value is fetched. From
0 to 200 it refers to the argument index number passed to the role. After 200, there
are some *special Argument IDs*:
	- `BLOCK_NUMBER_PARAM_ID` (`id = 200`): Sets comparison value to the block number
	at the time of execution. This allows for setting up timelocks depending
	on blocks.
	- `TIMESTAMP_PARAM_ID` (`id = 201`): Sets comparison value to the timestamp of the
	current block at the time of execution. This allows for setting up timelocks
	on time.
	- `SENDER_PARAM_ID` (`id = 202`): Sets comparison value to the sender of the call.
	(Currently useless because of [this issue]())
	- `ORACLE_PARAM_ID` (`id = 203`): Checks with an oracle at the address in the
	*argument value* and returns whether it returned true or false (no comparison with arg).
	- `LOGIC_OP_PARAM_ID` (`id = 204`): Evaluates a logical operation and returns
	true or false depending on its result (no comparison with arg).
	- `PARAM_VALUE_PARAM_ID` (`id = 205`): Uses value as return. Commonly used with
	the `RET` operation, to just return a value. If the value in the param is greater
	than 0, it will evaluate to true, otherwise it will return false.
- **Operation type** (`uint8`): Determines what operation is made to compare the
value fetched using the argument ID or the argument value. For all comparisons,
both values are compared in the following order `args[param.id] <param.op> param.value`.
Therefore for a greater than operation, with a `param = {id: 0, op: Op.GT, value: 10}`,
it will interpret whether the argument 0 is greater than 10. The implemented
operation types are:
	- None (`Op.NONE`): Always evaluates to `false`, regardless of parameter or arguments.
	- Equals (`Op.EQ`): Evaluates to true if every byte matches between `args[param.id]` and
	`param.value`.
	- Not equals (`Op.NEQ`): Evaluates to true if any byte doesn't match.
	- Greater than (`Op.GT`): Evaluates to true if `args[param.id] > param.value`.
	- Less than (`Op.LT`): Evaluates to true if `args[param.id] < param.value`.
	- Greater than or equal (`Op.GTE`): Evaluates to true if `args[param.id] >= param.value`.
	- Less than or equal (`Op.LTE`): Evaluates to true if `args[param.id] <= param.value`.
	- Return (`Op.RET`): Evaluates to true if `args[param.id]` is greater than one.
	Used with `PARAM_VALUE_PARAM_ID`, it makes `args[param.id] = param.value`, so it
	returns the parameter associated value.

While also representing an operation, when the id is `LOGIC_OP_PARAM_ID`, only the
ops below are valid. These operations use the parameter's value to point to other
parameters index in the parameter array. These values are encoded as `uint32`
numbers, left-shifted 32 bits to the left each (example: for example, an op that
takes two inputs value would be `0x00....0000000200000001`, would be input 1, 1,
and input 2, 2, refering to params at index 1 and 2). Available logic ops:
	- Not (`Op.NOT`): Takes 1 parameter index and evaluates to the opposite of what
	the linked parameter evaluates to.
	- And (`Op.AND`): Takes 2 parameter indices and evaluates to true if both
	evaluate to true.
	- Or (`Op.OR`): Takes 2 parameter indices and evaluates to true if any of them
	evaluate to true.
	- Exclusive or (`Op.XOR`): Takes 2 parameter indices and evaluates to true if
	only one of the parameters evaluate to true.
	- If else (`Op.IF_ELSE`): Takes 3 parameters, evaluates the first parameter
	and if it evaluates to true, it evaluates to whatever the parameter second
	parameter evaluates to, otherwise it evaluates to whatever the third parameter
	does.

### 4.6 Parameter execution
When evaluating a rule, the ACL will always evaluate the result of the first parameter.
This first parameter can be an operation that links to other parameters and its
evaluation depends on those parameter evaluation.

Execution is recursive and the result evaluated is always the result of the eval
of the first parameter.

### 4.7 Parameter encoding
To encode some logic operations (AND, OR, IF-ELSE) which link to other parameters, the following helpers are provided, where the function arguments always refer to parameter indexes in the `Param` array they belong to:

#### If-Else (ternary) operation
```solidity
encodeIfElse(uint condition, uint success, uint failure)
```

#### Binary operations (And, Or)
```solidity
encodeOperator(uint param1, uint param2)
```

### 4.8 Examples of rules
The interpreter supports encoding complex rules in what would look almost like a programming language, for example let’s look at the following [test case](https://github.com/aragon/aragonOS/blob/63c4722b8629f78350586bcea7c0837ab5882a20/test/TestACLInterpreter.sol#L112-L126):

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

When assigned to a permission, this rule will **evaluate to true** (and therefore allow the action) if an oracle accepts it and the block number is greater than the previous block number, and either the oracle allows it (again! testing redundancy too) or the first parameter of the rule is lower than 10. The possibilities for customizing organizations/DApps governance model are truly endless, without the need to write any actual Solidity.

### 4.9 Events
[`createPermission()`](#create-permission), [`grantPermission()`](#grant-permission), and [`revokePermission()`](#revoke-permission) all fire the same `SetPermission` event that Aragon clients are expected to cache and process into a locally stored version of the ACL:

```solidity
SetPermission(address indexed from, address indexed to, bytes32 indexed role, bool allowed)
```

[`setPermissionManager()`](#set-permission-manager) fires the following event:

```solidity
ChangePermissionManager(address indexed app, bytes32 indexed role, address indexed manager)
```

## 5. Forwarders and EVMScript

Forwarders are one of the most important concepts of aragonOS. Rather than hardcoding the notion of a vote into each separate app’s functionality and ACL, one can instead use a generic Voting App, which implements the forwarding interface, to pass actions forward to other apps after successful votes. If the Voting App is set up to only allow a token’s holders to vote, that means any actions/calls being passed from it must have been approved by the token’s holders.

### 5.1 Forwarding and transaction pathing

The forwarding interface also allows the Aragon client through aragon.js to calculate what we call ‘forwarding paths’. If you wish to perform an action and the client determines you don’t have direct permission to do it, it will think of alternative paths for execution. For example, you might directly go to the Vault App wishing to perform a token transfer, and the client directly prompts you to create a vote, as you have permission to create votes, that will perform the transfer if successful, as illustrated in the animation below.

![forwarding animation](/docs/assets/fwd.gif)
(governance model and characters are fictional)

We have designed our own scripting format, known as EVM scripts, to encode complex actions into a representation that can be stored and later executed by another entity. aragonOS 3.0 allows you to have multiple script executors that can be housed in your organization

### 5.2 EVMScripts

Script executors are contracts that take a script and an input and return an output after execution. We have built three script executors for the initial release:

#### 5.2.1 Script executors and EVMScriptRegistry

EVMScriptExecutors must follow this interface:

```solidity

interface IEVMScriptExecutor {
    function execScript(bytes script, bytes input, address[] blacklist) external returns (bytes);
}
```

Because script executors get are called with a `delegatecall`, in order to prevent
self-destructs, `IEVMScriptExecutor.execScript(...)` MUST return
at least 32 bytes so in case an executor `selfdestruct`s it could be detected.

##### 5.2.1.1 CallsScript
A simple way to concatenate multiple calls. It cancels the operation if any of the calls fail.

- **Script body:** (See source code file for spec of the payload)
- **Input:** None
- **Output:** None.
- **Blacklist:** Entire script reverts if a call to one of the addresses in the blacklist is performed.

##### 5.2.1.1 DelegateScript
`delegatecalls` into a given contract, which basically allows for any arbitrary computation within the EVM in the caller’s context.

- **Script body:** Address of the contract to make the call to.
- **Input:** `calldata` for the `delegatecall` that will be performed.
- **Output:** raw return data of the call.
- **Blacklist:** impossible to enforce. If there are any addresses in the blacklist the script will revert as it is not possible to check whether a particular address will be called.

##### 5.2.1.3 DeployDelegateScript

Is a superset of the DelegateScript, but it takes a contract’s initcode bytecode as its script body instead of just an address. On execution, it deploys the contract to the blockchain and executes it with a `delegatecall`.

- **Script body:**: initcode for contract being created.
- **Input:** `calldata` for the `delegatecall` that will be performed after contract creation.
- **Output:** raw return data of the call.
- **Blacklist:** impossible to enforce. If there are any addresses in the blacklist the script will revert as it is not possible to check whether a particular address will be called.


### 5.3 Making an app a Forwarder

Examples of forwarders can be found in the aragon-apps repo, both the Voting and the Token Manager are forwarders.

### 5.3.1 Warnings

EVMScripts can be too powerful. Providing forwarding functionality to an app

Some things to have in mind when developing an app

For example the Token Manager has the token address in its blacklist because otherwise any token holder that is allowed to forward through the Token Manager would effectively have control over the token in the same way the Token Manager has, which would allow to bypass it. By having it in the blacklist, the latter 2 script executors can’t be used, so it only works with CallsScripts that don’t make calls to the token address.
