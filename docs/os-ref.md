---
id: aragonos-ref
title: aragonOS reference documentation
sidebar_label: Reference documentation
---

aragonOS A framework that enables flexible and upgradeable governance mechanisms by creating and assigning permissions to multiple entities. This doc assumes you have some knowledge about solidity, if not checkout [Solidity](https://solidity.readthedocs.io/) before you jump into AragonOS.

- [Kernel](#kernel)
- [ACL](#acl)
- [Proxy](#proxy)
- [Forwarder](#forwarder)

## Kernel

The kernel is at the core of every organization there is only one instance per organization. Once you have a DAO you’ll want to add apps that help make your DAO effective. Keeping track of which apps that have been installed is done by using app mapping onto the namespace of the kernel. If we want to upgrade any of these apps we will do so by using proxies.

> Tip
>
> Apps are contracts that rely on use the kernel for their upgradeability and access control. Apps don’t need to implement any of those as they occur directly in the Kernel or ACL.

<!-- DelegateProxies - a contract which delegates its logic to another contract -->

**Apps**

Aragon DAOs come with come with some basic apps pre-installed and users can add other apps. Apps can be manually add via setApp() or through the UI. Its important to keep in mind that apps run in different namespaces.

To add an app to the DAO run:

```javascript
function setApp(bytes32 namespace, bytes appId, address app) public
```

- **Namespace**: specifies what type of app record is being set.
- **AppId**: used to identify what app is being set. It is the ENS namehash of the APM repo (e.g. namehash(‘voting.aragonpm.eth’)).
- **App**: Address of a contract that can have different meaning depending on the namespace.

> Warning
>
> Modifying the kernel mapping can have completely destructive consequences and can result in loss of funds.

**Namespaces**

What are namespaces? Namespaces are the three layers your DAO is made up of.

- **Core** (keccak256('core')): in this namespace is where the core components of the kernel reside. The only thing in the core mapping is the reference to the kernel base contract.
- **Base** namespace (keccak256('base')): keeps track of the base contracts for appIds.
- **App** namespace (keccak256('app')): some apps use the app namespace as a way to reference other apps. For example this is used to store the reference to the ACL instance or the EVMScriptsRegistry.

<!-- Every kernel instance is a kernel proxy. -->

<!-- AppProxies rely their upgradability to the kernel. -->

```javascript
kernel.setup(kernel.APP_BASES_NAMESPACE(), votingAppId, newVotingAppCodeAddr)
```

**Upgradeability**

What happens when a new version of an app that in your DAO uses is released? How do you upgrade it? Who gets to upgrade it? These are important questions. Aragon solves these issues using ACL and Proxies. The ACL (Access Control Lis) is what keeps track of who can do what and under what conditions. Proxies are a way of seperating the app logic and the app state into proxy contracts that can be swapped out without impacting the other, this solves upgrading. These topics are covered later in the section.

**App sandbox**

It is of paramount importance that apps can not change the DOM of other apps in an attempt to mislead users. As such, all apps are sandboxed.

This means that apps are run inside an iframe that only has access to itself, and in order to send transactions, calls, and more, it communicates with the Aragon dapp (the "wrapper") through a custom RPC protocol built specifically for Aragon. Apps do not have direct access to Web3.

RPC calls are sent to the wrapper using the PostMessage API and the wrapper will use the information in the calls to perform specific actions, such as listen for events, cache values and calculate transaction paths.

In practice, this means that apps only publish intents, and do not execute actions directly. Instead, all business logic is deffered to the wrapper.

## ACL

The ACL (Access Control List) is what allows entities (apps, DAOs, humans) to perform actions in our system via permissions. For example, say you accidentally add a malicious calculator app to your DAO, just because it’s in your DAO doesn't mean it should have the ability that pulls funds out of your DAO’s Valut, this would be bad. The ACL makes it so if you didn't explicitly give an application permissions then it's not going to be able to perform unauthorized actions.

**What are permissions?**

Permissions allow entities to perform actions. Permissions can be grouped by roles and are specific to app instances. We say app instances because you can have multiple instances of the same app in your DAO, each having different permissions.

For example, let's say you want take funds out of a DAOs wallet to cover the cost of pizza. In this case the DAO was set up so no member could withdraw funds from the wallet, instead every withdraw had be voted on, if the vote passes money is released, else the vote fails and nothing happens. Let's say you have a voting app in your DAO, and its been setup so that the permissions allow for the withdrawal of funds if a vote passes. When you make the request for fcks.
  - id 00 - TIMESTAMP_PARAM_ID (id = 201): Sets comparison value to the timestamp of the current block at the time of execution. This allows for setting up timelocks on time. - id 01
  - ORACLE_PARAM_ID (id = 203): Checks with an oracle at the address in the argument value and returns whether it returned true or false (no comparison with arg). - id 03
  - LOGIC_OP_PARAM_ID (id = 204): Evaluates a logical operation and returns true or false depending on its result (no comparison with arg). - id 04
  - PARAM_VALUE_PARAM_ID (id = 205): Uses value as return. Commonly used with the RET operation, to just return a value. If the value in the param is greater than 0, it will evaluate to true, otherwise it will return false. - id 05

- Operation type (uint8): Determines what operation is made to compare the value fetched using the argument ID or the argument value. For all comparisons, both valth a param = {id: 0, op: Op.GT, value: 10}, it will interpret whether the argument 0 is greater than 10. The implemented operation types are:
  - None (Op.NONE): Always evaluates to false, regardless of parameter or arguments. Opcode value = 00
  - Equals (Op.EQ): Evaluates to true if every byte matches between args[param.id] and param.value. Opcode value = 01
  - Not equals (Op.NEQ): Evaluates to true if any byte doesn't match. Opcode value = 02
  - Greater than (Op.GT): Evaluates to true if args[param.id] > param.value. Opcode value = 03
  - Less than (Op.LT): Evaluates to true if args[param.id] < param.value. Opcode value = 04
  - Greater than or equal (Op.GTE): Evaluates to true if args[param.id] >= param.value. Opcode value = 05
  - Less than or equal (Op.LTE): Evaluates to true if args[param.id] <= param.value. Opcode value = 06
  - Return (Op.RET): Evaluates to true if args[param.id] is greater than one. Used with PARAM_VALUE_PARAM_ID, it makes args[param.id] = param.value, so it returns the parameter associated value. Opcode value = 07

**Parameter execution**

When evaluating a rule, the ACL will always evaluate the result of the first parameter. This first parameter can be an operation that links to other parameters and its evaluation depends on those parameter evaluation.

Execution is recursive and the result evaluated is always the result of the eval of the first parameter.

**Parameter encoding**

To encode some logic operations (AND, OR, IF-ELSE) which link to other parameters, the following helpers are provided, where the function arguments always refer to parameter indexes in the Param array they belong to:
If-Else (ternary) operation
encodeIfElse(uint condition, uint success, uint failure)

Binary operations (And, Or)
encodeOperator(uint param1, uint param2)

**Rules**

The interpreter supports encoding complex rules in what would look almost like a programming language, for example let’s look at the following test case:

```js
   function testComplexCombination() {
        // if (oracle and block number > block number - 1) then arg 0 < 10 or oracle else false
        Param[] memory params = new Param[](7)
        params[0] = Param(LOGIC_OP_PARAM_ID, uint8(Op.IF_ELSE), encodeIfElse(1, 4, 6))
        params[1] = Param(LOGIC_OP_PARAM_ID, uint8(Op.AND), encodeOperator(2, 3))
        params[2] = Param(ORACLE_PARAM_ID, uint8(Op.EQ), uint240(new AcceptOracle()))
        params[3] = Param(BLOCK_NUMBER_PARAM_ID, uint8(Op.GT), uint240(block.number - 1))
        params[4] = Param(LOGIC_OP_PARAM_ID, uint8(Op.OR), encodeOperator(5, 2))
        params[5] = Param(0, uint8(Op.LT), uint240(10))
        params[6] = Param(PARAM_VALUE_PARAM_ID, uint8(Op.RET), 0)

        assertEval(params, arr(uint256(10)), true)

        params[4] = Param(LOGIC_OP_PARAM_ID, uint8(Op.AND), encodeOperator(5, 2))
        assertEval(params, arr(uint256(10)), false)
    }
```

When assigned to a permission, this rule will evaluate to true (and therefore allow the action) if an oracle accepts it and the block number is greater than the previous block number, and either the oracle allows it (again! testing redundancy too) or the first parameter of the rule is lower than 10. The possibilities for customizing organizations/DApps governance model are truly endless, without the need to write any actual Solidity.

**Events**

createPermission(), grantPermission(), and revokePermission() all fire the same SetPermission event that Aragon clients are expected to cache and process into a locally stored version of the ACL:

```js
SetPermission(address indexed from, address indexed to, bytes32 indexed role, bool allowed)
```

setPermissionManager() fires the following event:

```js
ChangePermissionManager(address indexed app, bytes32 indexed role, address indexed manager)
```

**Example**

In this example we are going to have our give permission for a user to install a simple valut app and expose the ability to transfer funds to a users account.

Vault contract

```js
pragma solidity 0.4.18;
import "@aragon/os/contracts/apps/AragonApp.sol";
import "@aragon/os/contracts/lib/zeppelin/token/ERC20.sol";
import "@aragon/os/contracts/lib/misc/Migrations.sol";

contract Vault is AragonApp {
    bytes32 constant public TRANSFER_ROLE = keccak256("TRANSFER_ROLE");

    /**
    * @notice Transfer `value` `token` from the Vault to `to`
    * @param token Address of the token being transferred
    * @param to Address of the recipient of tokens
    * @param value Amount of tokens being transferred
    */
    function transfer(address token, address to, uint256 value)
        authP(TRANSFER_ROLE, arr(address(token), to, value))
        external
    {
        transfer(token, to, value, new bytes(0));
    }


    function deposit(address token, address from, uint256 value) payable public {
        require(value > 0);
        require(msg.sender == from);
        if (token == ETH) {
            // Deposit is implicit in this case
            require(msg.value == value);
        } else {
            require(ERC20(token).transferFrom(from, this, value));
        }
    }

    function balance(address token) public view returns (uint256) {
        if (token == ETH) {
            return address(this).balance;
        } else {
            return ERC20(token).balanceOf(this);
        }
    }
}
```

The transfer function needs to be exposed for the ACL contract to interact with it so we use the authP() parameter to tell it which parameters need to be passed to the ACL.

```js
authP(TRANSFER_ROLE, arr(address(token), to, value))
```

First we pass in the role this function will be assigned to, TRANSFER_ROLE. Using the arr() parameter we pass in the next set of parameters that are going to be sent to the ACL to determine is this action can go through. Lets say we deploy this contract and its address is 0x111.

Now that transfer() is exposed lets use it!

Here is our Vault.js code

```js
const ACL = artifacts.require('ACL')
const Kernel = artifacts.require('Kernel')

let kernel,
  app,
  factory,
  acl = {}

const permissionsRoot = accounts[0]
const granted = accounts[1]

let role = null
const receipt = await factory.newDAO(permissionsRoot)
app = receipt.logs.filter(l => l.event == 'DeployDAO')[0].args.dao

kernel = Kernel.at(app)

role = await kernel.APP_MANAGER_ROLE()
acl = ACL.at(await kernel.acl())

const test = async () => {
  let userOne = accounts[3]
  let userTwo = accounts[4]
  let aclAddress = '0x3292' // this is the acl address
  let vaultApp = '0x111' //vault app address
  let roleAdd = 'ADD_APPS' // role to add applications
  let roleTransfer = 'TRANSFER_ROLE' // role to add applications

  let baseNamespace = '0x1212' //this is the Base namespace

  //grant userOne permission to add the vault app
  await acl.grantPermissionP(userOne, app, roleAdd, { from: granted })

  //now that userOne can add apps to the kernel we will add the vault app
  await kernel.setApp(baseNamespace, vaultApp, aclAddress, { from: userOne })

  //we have the vault, lets add a permission to allow this userTwo to transfer funds
  await acl.grantPermissionP(userTwo, vaultApp, roleTransfer, { from: userOne })
};
```

## Proxy

Upgrading the kernel or an app is done by setting a new address for a key in the kernel using proxies.

**Kernel Upgrade**

Upgrading the kernel of an organization is done by changing the Kernel appId in the Core namespace.

```js
kernel.setApp(kernel.CORE_NAMESPACE(), kernel.KERNEL_APP_ID(), newKernelCodeAddr)
```

> Warning:
>
> An upgrade to the Kernel could render it un-upgradeable.

**App Upgrade**

In a similar fashion to the Kernel, apps can share implementation code to save gas on deployment. AppProxies rely their upgradeability to the Kernel.

Upgrading an app is done by setting a new app address for the appId and using Base namespace in the kernel.

```js
kernel.setApp(kernel.APP_BASES_NAMESPACE(), votingAppId, newVotingAppCodeAddr)
```

There are two different types of proxies:

**upgradeableAppProxy**: in every call to the proxy, it checks with the Kernel what the current code for that appId is and forwards the call. Not sure what this is doing - ?

**PinnedAppProxy**: on contract creation it checks and saves the app code currently in the Kernel. This cannot be upgraded unless the app code has explicit logic to change that storage slot.

```js
kernel.newAppInstance(votingAppId, votingApp)
```

```js
kernel.newPinnedAppInstance(votingAppId, votingApp)
```

## Forwarder

Forwarders are one of the most important concepts of aragonOS. Rather than hardcoding the notion of a vote into each separate app’s functionality and ACL, one can instead use a generic Voting App, which implements the forwarding interface, to pass actions forward to other apps after successful votes. If the Voting App is set up to only allow a token’s holders to vote, that means any actions/calls being passed from it must have been approved by the token’s holders.

**Forwarding and transaction pathing**

The forwarding interface also allows the Aragon client through aragon.js to calculate what we call ‘forwarding paths’. If you wish to perform an action and the client determines you don’t have direct permission to do it, it will think of alternative paths for execution. For example, you might directly go to the Vault App wishing to perform a token transfer, and the client directly prompts you to create a vote, as you have permission to create votes, that will perform the transfer if successful, as illustrated in the animation below.

We have designed our own scripting format, known as EVM scripts, to encode complex actions into a representation that can be stored and later executed by another entity. aragonOS 3.0 allows you to have multiple script executors that can be housed in your organization

**EVMScripts**

Script executors are contracts that take a script and an input and return an output after execution. We have built three script executors for the initial release:

5.2.1 Script executors and EVMScriptRegistry
EVMScriptExecutors must follow this interface:

```js
interface IEVMScriptExecutor {
    function execScript(bytes script, bytes input, address[] blacklist) external returns (bytes)
}
```

Because script executors get are called with a delegatecall, in order to prevent self-destructs, IEVMScriptExecutor.execScript(...) MUST return at least 32 bytes so in case an executor selfdestructs it could be detected.

CallsScript() -
A simple way to concatenate multiple calls. It cancels the operation if any of the calls fail.

Script body: (See source code file for spec of the payload)

Input: None

Output: None

Blacklist: Entire script reverts if a call to one of the addresses in the blacklist is performed.

DelegateScript() - delegatecalls into a given contract, which basically allows for any arbitrary computation within the EVM in the caller’s context.

Script body: Address of the contract to make the call to.

Input: calldata for the delegatecall that will be performed.

Output: raw return data of the call.

Blacklist: impossible to enforce. If there are any addresses in the blacklist the script will revert as it is not possible to check whether a particular address will be called.

DeployDelegateScript() - Is a superset of the DelegateScript, but it takes a contract’s initcode bytecode as its script body instead of just an address. On execution, it deploys the contract to the blockchain and executes it with a delegatecall.

Script body:: initcode for contract being created.

Input: calldata for the delegatecall that will be performed after contract creation.

Output: raw return data of the call.

Blacklist: impossible to enforce. If there are any addresses in the blacklist the script will revert as it is not possible to check whether a particular address will be called.

**Making an app a Forwarder**

Examples of forwarders can be found in the aragon-apps repo, both the Voting and the Token Manager are forwarders.

**Warnings**

EVMScripts can be too powerful. Providing forwarding functionality to an app

Some things to have in mind when developing an app

For example the Token Manager has the token address in its blacklist because otherwise any token holder that is allowed to forward through the Token Manager would effectively have control over the token in the same way the Token Manager has, which would allow to bypass it. By having it in the blacklist, the latter 2 script executors can’t be used, so it only works with CallsScripts that don’t make calls to the token address.