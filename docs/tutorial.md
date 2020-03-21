---
id: tutorial
title: Your first Aragon app
sidebar_label: Your first Aragon app
---

#####

In this guide, we will walk you through creating your first Aragon app using [aragonOS](os-intro.md), the JavaScript implementation of [aragonAPI](api-intro.md), [aragonUI](ui-intro.md) and the Aragon [buidler plugin](https://github.com/aragon/buidler-aragon).

## The setup

Let's first set up and bootstrap our project:

```sh
npx create-aragon-app foo tutorial
```

This will create a new directory named `foo`, with files cloned from [your first Aragon app template](https://github.com/aragon/your-first-aragon-app). This particular boilerplate includes everything you need to get started — [buidler](https://buidler.dev/), aragonOS and aragonAPI.

### Structure

This boilerplate has the following structure:

```md
root
├── app
├ ├── src
├ ├ ├── App.js
├ ├ ├── index.js
├ ├ └── script.js
├ └── package.json
├── contracts
├ └── CounterApp.sol
├── scripts
├ └── buidler-hooks.js
├── arapp.json
├── manifest.json
├── buidler.config.js
└── package.json
```

- **app**: Frontend folder. Completely encapsulated, has its own package.json and dependencies.
  - **src**: Source files.
    - `App.js`: Aragon app root component.
    - `index.js`: Aragon app entry point.
    - `script.sol`: Aragon app background script.
  - [**package.json**](https://docs.npmjs.com/creating-a-package-json-file): Frontend npm configuration file.
- **contracts**: Smart Constracts folder.
  - `CounterApp.sol`: Aragon app contract.
- **scripts**: Scripts folder.
  - `buidler-hooks.js`: Buidler script hook.
- [**arapp.json**](https://hack.aragon.org/docs/cli-global-confg#the-arappjson-file): Aragon configuration file. Includes Aragon-specific metadata for your app.
- [**manifest.json**](https://hack.aragon.org/docs/cli-global-confg#the-manifestjson-file): Aragon configuration file. Includes web-specific configurations.
- [**buidler.config.js**](https://buidler.dev/config/): Buidler configuration file.
- [**package.json**](https://docs.npmjs.com/creating-a-package-json-file): Main npm configuration file.

### Stuck?

If you get stuck at any point. [Come back here to check the diff with changes after the tutorial is completed](https://github.com/aragon/your-first-aragon-app/pull/2/files).

Now let's start with it 💪.

## Writing a simple contract

To illustrate how easy it is to use aragonOS, we will build our app as a vanilla smart contract, without any Aragon-specific interfaces at all.

Today, we will build a simple counter app — you can increment it, you can decrement it, and it will all be decentralized. Decentralized coffee counter, anyone?

```solidity
// contracts/CounterApp.sol
pragma solidity ^0.4.24;

import "@aragon/os/contracts/lib/math/SafeMath.sol";


contract CounterApp {
    using SafeMath for uint256;

    /// Events
    event Increment(address indexed entity, uint256 step);
    event Decrement(address indexed entity, uint256 step);

    /// State
    uint256 public value;

    function increment(uint256 step) external {
        value = value.add(step);
        emit Increment(msg.sender, step);
    }

    function decrement(uint256 step) external {
        value = value.sub(step);
        emit Decrement(msg.sender, step);
    }
}
```

Pretty simple, right? You might wonder why we would bother adding events to this smart contract, but it comes in handy later for illustration purposes — and we can also create an activity feed from it, if we wanted to.

> **Note**<br>
> We use [SafeMath](https://github.com/aragon/aragonOS/blob/next/contracts/lib/math/SafeMath.sol) for uint256. Using SafeMath is a security convention that allows handling math operations with safety checks that revert on error preventing the risk of overflows.

## 3 steps to governance and upgradeability

Now for the interesting part: making our simple smart contract an Aragon app.

First, inherit from the Aragon app smart contract, like so:

```solidity
import "@aragon/os/contracts/apps/AragonApp.sol";

contract CounterApp is AragonApp {
    // ...
}
```

Second, define the roles that you want your app to have. A role can be assigned to other apps or people and those entities will have access to methods guarded by that role.

In this example we will define a role for incrementing and a role for decrementing but note that you can have a single role to guard all methods in your contract if you find that appropriate.

```solidity
contract CounterApp is AragonApp {
    // ...
    bytes32 constant public INCREMENT_ROLE = keccak256("INCREMENT_ROLE");
    bytes32 constant public DECREMENT_ROLE = keccak256("DECREMENT_ROLE");
    // ...
}
```

Finally, guard the methods with the `auth()` modifier that the `AragonApp` interface gives you and add an [initialize function](/docs/aragonos-building.html#constructor-and-initialization) to your contract; we use `initValue` as the starting value of the counter:

```solidity
contract CounterApp is AragonApp {
    // ...

    function initialize(uint256 _initValue) public onlyInit {
        value = _initValue;

        initialized();
    }

    function increment(uint256 step) auth(INCREMENT_ROLE) external {
        // ...
    }

    function decrement(uint256 step) auth(DECREMENT_ROLE) external {
        // ...
    }
}
```

That's it. In 3 steps, you now have an Aragon app, with full upgradeability and modular governance.

## Descriptive transactions

Aragon wants to be as user friendly as possible, so it provides an easy way for developers to describe what their smart contracts do in a human readable way. It's called [Radspec](human-readable-txs.md). It works by putting `@notice` statements alongside a human readable description for the function. In our example, we use the input `step` to describe what is doing our function at runtime.

```solidity
contract CounterApp is AragonApp {
    /**
     * @notice Increment the counter by `step`
     * @param step Amount to increment by
     */
    function increment(uint256 step) auth(INCREMENT_ROLE) external {
        // ...
    }

    /**
     * @notice Decrement the counter by `step`
     * @param step Amount to decrement by
     */
    function decrement(uint256 step) auth(DECREMENT_ROLE) external {
        // ...
    }
}
```

## Building the frontend

Because apps inside the [Aragon client](client.md) are sandboxed, it also means that apps do not have direct access to Web3.

Apps are run inside an iframe, which means that it only has access to its own DOM, not the outlying DOM. The app can communicate with the client over our own custom RPC protocol.

Then the client takes care of connecting to Ethereum via Web3, and also handles things like signing transactions, displaying notifications and more to the end-user.

All of this is achieved by using aragonAPI. aragonAPI is split in two parts: one for clients and one for apps. The client portion of aragonAPI reads _requests_ from the app over RPC, sandboxes apps and performs Web3 actions, whereas the app portion provides a simple API to communicate with the client (to read state, send transactions and more).

### Background scripts and building state

Apps usually want to listen to events using Web3 and build an application state from those events. This concept is also known as _event sourcing_.

aragonAPI was built with event sourcing in mind. To build state continually without having the app loaded indefinitely, though, we need to run a background script.

Thankfully the [Aragon client](client.md) will run background scripts specified in the manifest files of our app (more on manifest files later).

Let's start by writing a background script that listens for our `Increment` and `Decrement` events, and builds a state, for this example, the current value of our counter.

```js
// app/src/script.js
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import Aragon, { events } from '@aragon/api'

const app = new Aragon()

app.store(
  async (state, { event }) => {
    const nextState = {
      ...state,
    }

    try {
      switch (event) {
        case 'Increment':
          return { ...nextState, count: await getValue() }
        case 'Decrement':
          return { ...nextState, count: await getValue() }
        case events.SYNC_STATUS_SYNCING:
          return { ...nextState, isSyncing: true }
        case events.SYNC_STATUS_SYNCED:
          return { ...nextState, isSyncing: false }
        default:
          return state
      }
    } catch (err) {
      console.log(err)
    }
  },
  {
    init: initializeState(),
  }
)

/***********************
 *   Event Handlers    *
 ***********************/

function initializeState() {
  return async cachedState => {
    return {
      ...cachedState,
      count: await getValue(),
    }
  }
}

async function getValue() {
  // Get current value from the contract by calling the public getter
  // app.call() returns a single-emission observable that we can immediately turn into a promise
  return parseInt(await app.call('value').toPromise(), 10)
}
```

If you've worked with [Redux](https://redux.js.org/) before, this might look vaguely familiar.

The `store` method takes in a reducer function with the signature `(state, event) => state`, where `state` is whatever you want it to be (in this example it is an integer), and `event` is a [Web3 event](https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#contract-events). The reducer function **must always** return a state, even if it is the same state as before. Returning undefined will reset the reduced state to its initial null state. Also note that the initial state is always null, not undefined, because of JSONRPC limitations.

The `store` should be used as the main "event loop" in an application's background script (running inside a WebWorker). Listens for events, passes them through reducer, caches the resulting state, and re-emits that state for easy chaining. Optionally takes a configuration object comprised of an init function, to re-initialize cached state, and an externals array for subscribing to external contract events. See below for more details.

The store has block caching automatically applied, such that subsequent loads of the application only fetch new events from a cached ("committed") block height (rather than from 0 or the app's initialization block). This state can be observed in the view portion of your app. Also note that the `store` method returns an observable of states. This is a recurring theme in the JavaScript implementation of aragonAPI—almost everything is an [RxJS](http://reactivex.io/rxjs/) observable.

### Displaying State

Now let's write the view portion of our app. In our case, this is a simple HTML file, and a simple React app wiht the `useAragonApi` [React Hook](https://reactjs.org/docs/hooks-intro.html) that observes the state that our background script builds for us and returns the data needed to interact with the app contract.

```html
<!-- app/index.html !-->
<!DOCTYPE html>
<html>
  <head>
    <title>Aragon App</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="src/index.js"></script>
  </body>
</html>
```

```js
// app/src/index.js
import React from 'react'
import ReactDOM from 'react-dom'
import { AragonApi } from '@aragon/api-react'
import App from './App'

const reducer = state => {
  if (state === null) {
    return { count: 0, isSyncing: true }
  }
  return state
}

ReactDOM.render(
  <AragonApi reducer={reducer}>
    <App />
  </AragonApi>,
  document.getElementById('root')
)
```

Before using any Hook provided, you need to declare the component `AragonApi` to connect the app. It is generally a good idea to do it near the top level of your React tree. It should only be declared once. It has an optional reducer prop, which lets you process the state coming from the background script. If not provided, the state is passed as-is.

### App root component

```js
// app/src/App.js
import React from 'react'
import { useAragonApi } from '@aragon/api-react'
import {
  Box,
  Button,
  GU,
  Header,
  IconMinus,
  IconPlus,
  Main,
  SyncIndicator,
  Text,
  textStyle,
} from '@aragon/ui'

function App() {
  const { appState } = useAragonApi()
  const { count, isSyncing } = appState

  return (
    <Main>
      {isSyncing && <SyncIndicator />}
      <Header
        primary="Counter"
        secondary={
          <Text
            css={`
              ${textStyle('title2')}
            `}
          >
            {count}
          </Text>
        }
      />
      <Box
        css={`
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          height: ${50 * GU}px;
          ${textStyle('title3')};
        `}
      >
        Count: {count}
      </Box>
    </Main>
  )
}

export default App
```

`useAragonApi()` is a React Hook that returns the data needed to interact with the app contract. As with any React Hook, please ensure that you follow the [Rules of Hooks](https://reactjs.org/docs/hooks-rules.html).
It returns an object containing the following entries:

- `appState`: Is the app state, after having passed the background script `state` through the reducer prop of AragonApi.
- `api`: This is the current AragonApp instance. Use it to call methods on the contract.

These are not all the entries but the ones we are going to use in the tutorial. To learn about all of them check the [useAragonApi documentation](https://github.com/aragon/aragon.js/blob/master/packages/aragon-api-react/README.md#usearagonapi).

#### Sending transactions

Our users need to be able to increment and decrement the counter. For this, we send what is called an _intent_ to the client. An intent is an action you would like to occur on a specific contract. This intent is handled by the client, which will calculate a _transaction path_ using the ACL of our DAO.

To understand transaction paths, we must first understand a little bit about how the ACL works.

The [ACL (Access Control List)](acl-intro.md) is a simple mapping of _who_ can perform _what_ actions _where_. In our case, _someone_ can perform an action guarded by a specific role (the _what_) on our app (the _where_).

However, it is entirely possible that users can not perform actions directly. For example, in order to increment the counter, we might want a decision making process, such as a vote. The beauty of aragonOS is that we never need to specify this directly, as this is handled by the ACL.

We simply say that the only one (_who_) that can perform increments and decrements (_what_) on our app (_where_) is the voting app. This is not done at compile time, it is done at run time.

This works because of a concept called [_forwarders_](forwarding-intro.md). A forwarder is simply an app that can execute transactions on someone's behalf, if the ACL permits it, and that app can have its own _arbitrary conditions_ under which it wants to execute your transaction! In the example of the voting app, the voting app will only execute your transaction if the vote passes.

It's really simple to use. Let's add our intents to our app:

```js
// ...

function App() {
  const { api, appState } = useAragonApi()
  const { count, isSyncing } = appState
  const step = 2

  return (
    // ...
    <Main>
      // ...
      <Box>
        // ...
        <div>
          <Button
            display="icon"
            icon={<IconMinus />}
            label="Decrement"
            onClick={() => api.decrement(step).toPromise()}
          />
          <Button
            display="icon"
            icon={<IconPlus />}
            label="Increment"
            onClick={() => api.increment(step).toPromise()}
            css={`
              margin-left: ${2 * GU}px;
            `}
          />
        </div>
      </Box>
    </Main>
  )
}
```

That's it! Now whenever the user clicks one of either the increment or decrement buttons, an intent is sent to the wrapper, and it will show the user a transaction to sign.

## Writing the manifest files

In order for aragonAPI to function, it needs some metadata about your app. This metadata is specified in two manifest files; `manifest.json` and `arapp.json`.

### arapp.json

`arapp.json` defines smart contract and aragonPM-specific things like the roles in your app or different environments.

Let's modify `arapp.json` so that it knows about the roles we defined previously and use the development environment:

```json
{
  "roles": [
    {
      "name": "Increment the counter",
      "id": "INCREMENT_ROLE",
      "params": []
    },
    {
      "name": "Decrement the counter",
      "id": "DECREMENT_ROLE",
      "params": []
    }
  ],
  "environments": {
    "default": {
      "network": "rpc",
      "appName": "foo.aragonpm.eth"
    }
  },
  "path": "contracts/CounterApp.sol"
}
```

Notice that we input a fully qualified [ENS](https://ens.domains/) name for `appName`. Let's examine the ENS name we entered, because it is not entirely arbitrary.

![Illustration of foo.aragonpm.eth](https://i.imgur.com/MQnYT6d.png)

The first label in the ENS name is the name of our app. This can be anything you want, given that the full ENS name is not taken.

The second and third label is the name of the [aragonPM](package-management.md) registry that your repository will be (or is) registered to. For the sake of simplicity, this guide assumes that you have rights to create repositories on aragonpm.eth, but you could deploy your own aragonPM registry if you so desire.

### manifest.json

`manifest.json` defines end-user specific things like the human-readable name of your app, icons, and a small description of your app. It also (optionally) defines background scripts, of which we have one.

Let's modify it accordingly:

```json
{
  "name": "Counter",
  "description": "My first Aragon app",
  "script": "/script.js",
  "start_url": "/index.html"
}
```

### Buidler script hooks

These hooks are called by the Aragon Buidler plugin during the start task's lifecycle. All hooks receive two parameters:

- A params object that may contain other objects that pertain to the particular hook.
- A "bre" or BuidlerRuntimeEnvironment object that contains enviroment objects like web3, Truffle artifacts, etc.

We are going to use the `getInitParam` hook. Must return an array with the proxy's init parameters.

That is called when the start task needs to know the app proxy's initialize parameters, `_initValue` for our `CounterApp` initialize function.

```js
module.exports = {
  // ...
  getInitParams: async ({}, { web3, artifacts }) => {
    return [15]
  },
  // ...
}
```

## Running your app locally

To test out your app without deploying a DAO yourself, installing apps, setting up permissions and setting up aragonPM, you can simply run:

```sh
npm start
```

This will do a couple of things for you:

- It will start a development chain you can interact with (it uses `ganache-core`, so it's a full testrpc instance) and prints 10 accounts.
- It compiles the contracts.
- It deploy the aragonOS bases (ENS, DAO factory, aragonPM registry).
- It deploys an Aragon DAO with apps and development permissions (i.e. everyone can do everything)
- It build your app font-end. Since we're importing Node.js modules in our front-end, we need a build script. For this, we opted to use `parcel` because it has zero config, but you can use your favorite bundler.
- It publishes your app to a local aragonPM instance.
- It installs your app
- It initialize the app proxy with the parameter we defined in `getInitParams` hook.
- It starts the client locally, installing it if it's not cached.

After running this command a browser tab should pop up with your freshly created DAO, complete with permissions and your local app installed.

At this point feel free to play around. Both front-end and smart contract files have hot reloading. Yes, even smart contract code, we do a proxy swap on every change under the hood 😎, enjoy.

If you've made it this far, congratulations! 😊🎉😊🎉

## Next steps

### Tests

If you feel like to keep learning about the Aragon stack right away. A great way of doing it is including some tests on your app. Check the [tests examples](https://github.com/aragon/aragon-react-boilerplate/blob/master/test/app.test.js) of the react boilerplate repo for ideas.

### Publishing

Now that we're confident that our app will work and amaze the world, we should publish it. You can follow the publish guide to learn [how to publish in different environments](guides-publish.md).

### Documentation

A good place to go from here would be to check out [our existing apps](https://github.com/aragon/aragon-apps). They are fairly self-contained and use some patterns you might find helpful.

There is much more to [aragonOS](os-intro.md) and [aragonAPI](api-intro.md), and we even have our own [UI toolkit](ui-intro.md). We encourage you to explore all 3 and provide us feedback.

### Community

Join the conversation and ask questions on [GitHub](https://github.com/aragon), [Aragon Forum](https://forum.aragon.org) and Spectrum [App development channel](https://spectrum.chat/aragon/app-development), and make sure to tell us if you build something ara-mazing!

Now you just need to share the great news on Twitter and Reddit, to let people know that you've built something great!
