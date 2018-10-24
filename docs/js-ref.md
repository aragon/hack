---
id: aragonjs-ref
title: aragon.js reference documentation
sidebar_label: Reference documentation
hide_title: true
---

![](/docs/assets/brand/aragonjs.png)

A Javascript library to interact with aragonOS by handling transaction pathing, upgradeability and state of the contracts.

- [Client](#client)
- [Wrapper](#wrapper)
- [Providers](#providers)
- [State](#state-1)

## Client

**App API**

- [AragonApp](#aragonapp)
  - [accounts()](#accounts)
  - [identify(identifier)](#identify)
  - [events()](#events)
  - [external(address, jsonInterface)](#external)
  - [cache(key, value)](#cache)
  - [state()](#state)
  - [store(reducer, [events])](#store)
  - [call(method, ...params)](#call)
  - [notify(title, body, [context], [date])](#notify)
  - [context()](#context)
  - [describeScript(script)](#describescript)

---
### Importing

ES6

```js
import AragonApp from '@aragon/client'
```

ES5 (CommonJS)

```js
const AragonApp = require('@aragon/client').default
```

---
### AragonApp

This class is used to communicate with the wrapper in which the app is run.

Every method in this class sends an RPC message to the wrapper.

The app communicates with the wrapper using a messaging provider. The default provider uses the [Worker PostMessage API](https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage), but you may specify another provider to use (see the exported [providers](#providers) to learn more about them).

To send an intent to the wrapper (i.e. invoke a method on your smart contract), simply call it on the instance of this class as if it was a JavaScript function.

For example, to invoke `increment` on your app's smart contract:

```js
const app = new AragonApp();

// Sends an intent to the wrapper that we wish to invoke `increment` on our
// app's smart contract
app.increment()
```

**Parameters**

1. `provider` (`Provider`): A provider used to send and receive messages to and from the wrapper. Defaults to a provider that uses the [Worker PostMessage API](https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage).

**Example**

```js
import AragonApp, { providers } from '@aragon/client'

// The default provider should be used in background scripts
const backgroundScriptOfApp = new AragonApp()

// This instance uses a provider that should be used for front-ends
const frontendOfApp = new AragonApp(new providers.WindowMessage(window.parent))
```

---
### accounts

Get an array of accounts that the user controls over time.

**Parameters**

None.

**Returns**

([`Observable`](https://github.com/tc39/proposal-observable)): An [RxJS observable](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html) that emits an array of account addresses every time a change is detected.

---
### identify

Add an app identifier.

This identifier is used to distinguish multiple instances of your app, so choose something that provides additional context to the app instance.

An example of a good app identifier would be the token symbol of the token that the [Token Manager](https://github.com/aragon/aragon-apps/tree/master/apps/token-manager) app manages.

**Parameters**

1. `identifier` (`String`): The identifier of the app.

**Returns**

None.

---
### events

Listens for events on your app's smart contract from the last unhandled block.

**Parameters**

None.

**Returns**

([`Observable`](https://github.com/tc39/proposal-observable)): An [RxJS observable](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html) that emits [Web3 events](https://web3js.readthedocs.io/en/1.0/glossary.html#specification).

---
### external

Creates a handle to interact with an external contract (i.e. a contract that is **not** your app's smart contract, such as a token).

**Parameters**

1. `address` (`String`): The address of the external contract.
2. `jsonInterface` (`Array<Object>`): The [JSON interface](https://web3js.readthedocs.io/en/1.0/glossary.html#glossary-json-interface) of the external contract.

**Returns**

(`Object`): An external smart contract handle. Calling any function on this object will send a call to the smart contract and return an [RxJS observable](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html) that emits the value of the call.

**Example**

```js
const token = app.external(tokenAddress, tokenJsonInterface)

// Retrieve the symbol of the token
token.symbol().subscribe(symbol => console.log(`The token symbol is ${symbol}`))

// Retrieve the token balance of an account
token.balanceOf(someAccountAddress).subscribe(balance => console.log(`The balance of the account is ${balance}`))
```

---
### cache

Set a value in the application cache.

**Parameters**

1. `key` (`String`): The cache key to set a value for
2. `value` (`any`): The value to persist in cache

**Returns**

(`any`): This method passes through `value`

---
### state

Observe the cached application state over time.

This method is also used to share state between the background script and front-end of your application.

**Parameters**

None.

**Returns**

([`Observable`](https://github.com/tc39/proposal-observable)): An [RxJS observable](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html) that emits the application state every time it changes. The type of the emitted values is application specific.

---
### store

Listens for events, passes them through `reducer`, caches the resulting state and re-emits that state for easy chaining.

This is in fact sugar on top of [`state`](#state), [`events`](#events) and [`cache`](#cache).

The reducer takes the signature `(state, event)` à la Redux. Note that is _must always_ return a state, even if it is unaltered by the event.

Also note that the initial state is always `null`, not `undefined`, because of JSONRPC limitations.

Optionally takes an array of other Web3 event observables to merge with this app's events, for example you might use an external contract's events.

**Parameters**

1. `reducer` (`Function`): A function that reduces events to a state. This can return a Promise that resolves to a new state.
2. [`events`](`Array<Observable>`): An optional array of observables to merge in with the internal events observable.

**Returns**

([`Observable`](https://github.com/tc39/proposal-observable)): An observable of application states.

**Example**

A simple reducer for a counter app

```js
const state$ = app.store((state, event) => {
  // Initial state is always null
  if (state === null) state = 0

  switch (event.event) {
    case 'Increment':
      state++
      return state
    case 'Decrement':
      state--
      return state
  }

  // We must always return a state, even if unaltered
  return state
})
```

A reducer that also reduces events from an external smart contract

```js
const token = app.external(tokenAddress, tokenJsonInterface)

const state$ = app.store(
  (state, event) => {
    // ...
  },
  [token.events()]
)
```

---
### call

Perform a call on the app's smart contract.

**Parameters**

1. `method` (`String`): The name of the method to call.
2. `...params` (_arguments_): An optional variadic number of parameters.

**Returns**

([`Observable`](https://github.com/tc39/proposal-observable)): An observable that emits the result of the call.

**Example**

```js
// Calls the smart contract's `balanceOf` method with the specified account address
app.call('balanceOf', accountAddress).subscribe(balance => console.log(`The balance of the account is ${balance}`))
```

---
### notify

**NOTE: This call is not currently handled by the wrapper**

Sends a notification.

**Parameters**

1. `title` (`String`): The title of the notification.
2. `body` (`String`): The body of the notification.
3. [`context`](`Object`): An optional context that will be sent back to the app if the notification is clicked.
4. [`date`](`Date`): An optional date that specifies when the notification originally occured.

**Returns**

None.

---
### context

**NOTE: The wrapper does not currently send contexts to apps**

Listen for app contexts.

An app context is an application specific message that the wrapper can send to the app.

For example, if a notification or a shortcut is clicked, the context attached to either of those will be sent to the app.

App contexts can be used to display specific views in your app or anything else you might find interesting.

**Parameters**

None.

**Returns**

([`Observable`](https://github.com/tc39/proposal-observable)): An observable that emits app contexts as they are received.

---
### describeScript

- [providers](#providers)
  - [MessagePortMessage([target])](#messageportmessage)
  - [WindowMessage([target])](#windowmessage)

Decodes an EVM callscript and tries to describe the transaction path that the script encodes.

**Parameters**

1. `script` (`String`): The EVM callscript to describe.

**Returns**

([`Observable`](https://github.com/tc39/proposal-observable)): An observable that emits the described transaction path. The emitted transaction path is an array of objects, where each item has a `destination`, `data` and `description` key.

---
## Providers

---
### MessagePortMessage

A provider that communicates through the [`WebWorker PostMessage API`](https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage).

**Parameters**

1. [`target`](`Object`): The object (that implements the [Worker PostMessage API](https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage)) to send messages to.

---
### WindowMessage

A provider that communicates through the [`Window PostMessage API`](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage).

**Parameters**

1. [`target`](`Object`): The object (that implements the [Window PostMessage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)) to send messages to.

---
## Wrapper

**Parameters**

- daoAddress: string The address of the DAO.
- options Object Wrapper options. (optional, default {})
  - options.provider any The Web3 provider to use for blockchain communication (optional, default ws://rinkeby.aragon.network:8546)
  - options.ensRegistryAddress String The address of the ENS registry (optional, default null)

**Example**

```js
const aragon = new Aragon('0xdeadbeef')

// Initialises the wrapper and logs the installed apps
aragon.init(() => {
  aragon.apps.subscribe(apps => console.log(apps))
})
```

**API**

**init**
Initialise the wrapper.

Returns Promise<void>

**initAcl**
Initialise the ACL.

Returns Promise<void>

**getAppProxyValues**
Get proxy metadata (appId, address of the kernel, ...).

Parameters

- proxyAddress string The address of the proxy to get metadata from
- Returns Promise`<Object>`

**isApp**
Check if an object is an app.

Parameters

- app Object
- Returns boolean

**initApps**
Initialise apps observable.

Returns void


**initForwarders**
Initialise forwarder observable.

Returns void

**runApp**
Run an app.

Parameters

- sandbox Object An object that is compatible with the PostMessage API.
- proxyAddress string The address of the app proxy.

  Returns Object

**getAccounts**

Get the available accounts for the current user.

Returns Promise<Array<string>> An array of addresses

**getTransactionPath**

Calculate the transaction path for a transaction to destination that invokes methodName with params.

Parameters

- destination string
- methodName string
- params Array<any>

Returns `Array<Object>` An array of Ethereum transactions that describe each step in the path

**calculateTransactionPath**

Calculate the transaction path for a transaction to destination that invokes methodName with params.

Parameters

- sender string
- destination string
- methodName string
- params Array<any>

Returns `Array<Object>` An array of Ethereum transactions that describe each step in the path

---
## State

This document outlines how to write background scripts for your app and why you might want to do so.

Background scripts are parts of your app that are always run as soon as the Aragon Dapp is opened.

This is hugely useful if you want to keep your app up to date every time a user opens your app, since you can build out your application state in the background.

Furthermore, background scripts create a nice separation of concerns - your background script handles all of the state building and your app front-end is simply presentational.

**Setup**

First you need to instantiate an instance of the AragonApp class from @aragon/client.

```js
import Aragon from '@aragon/client'
const app = new Aragon()
```

Next, you need to specify that your app has a background script.

In your manifest.json file, simply specify the script key. The value should be the path to your built background script.

For example, if our built background script was located at dist/script.js, we would specify it like so:

```json
{
  // name etc.
  'script': '/dist/script.js'
}
```

**Building State**

All of the AragonApp methods are available to you. We highly recommend that you use AragonApp#store as it handles state caching and events subscriptions for you.

```js
const state$ = app.store((state, event) => {
  // Initial state is always null
  if (state === null) state = 0

  switch (event.event) {
    case 'Increment':
      state++
      return state
    case 'Decrement':
      state--
      return state
  }

  // We must always return a state, even if unaltered
  return state
}
```

**Sharing State**

If you use AragonApp#store, then state will be automatically shared with your front-end in real-time (via AragonApp#state).