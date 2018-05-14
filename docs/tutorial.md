---
id: tutorial
title: Tutorial
---

# Your first Aragon app
In this guide, we will walk you through creating your first Aragon app using [aragonOS](aragonos-intro.md), [aragon.js](aragonjs-intro.md), [Aragon UI](aragonui-intro.md) and [Aragon CLI](aragoncli.md).

## Why build an Aragon app?

Let's first talk a bit about why you might want to build an Aragon app.

If you are building a protocol with some sort of curation mechanism or community involvement, or a dapp, Aragon gives you two things virtually for free: upgradeability and governance.

There is a case to be made that upgradeability and governance are two sides of the same coin, since upgradeability without governance re-centralises authority in an otherwise decentralised system, because you have a single entity who decides what version of a contract you interact with.

On the flipside, governance without upgradeability creates rigid systems, which is bad, because what works today, might not work tomorrow.


## The setup

Let's first set up our project.

```
npm i -g @aragon/cli
```

Next, we bootstrap our project:

```
aragon init foo.aragonpm.eth bare
```

This will create a new directory named `foo`, with files cloned from the official Aragon [react](https://github.com/aragon/aragon-react-boilerplate) boilerplate. This particular boilerplate includes everything you need to get started — Truffle, aragonOS and aragon.js.

Notice that we input a fully qualified [ENS](https://ens.domains/) name. We also initialise the app from the [react template](https://github.com/aragon/aragon-react-boilerplate), so we get [Aragon UI](https://github.com/aragon/aragon-ui) included. You can use the `bare` template if you don't want to use it.

Let's examine the ENS name we entered, because it is not entirely arbitrary.

<center>
    <img alt="Illustration of foo.aragonpm.eth" src="https://i.imgur.com/MQnYT6d.png" />
</center>

The first label in the ENS name is the name of our app. This can be anything you want, given that the full ENS name is not taken.

The second and third label is the name of the [APM](package-management.md) (Aragon Package Manager) registry that your repository will be (or is) registered to. For the sake of simplicity, this guide assumes that you have rights to create repositories on aragonpm.eth, but you could deploy your own APM registry if you so desire.


## Writing a simple contract

To illustrate how easy it is to use aragonOS, we will build our app as a vanilla smart contract, without any Aragon-specific interfaces at all.

Today, we will build a simple counter app — you can increment it, you can decrement it, and it will all be decentralized. Decentralized coffee counter, anyone?

```solidity
// contracts/Counter.sol
pragma solidity 0.4.18;

contract Counter {
    // Events
    event Increment(address entity);
    event Decrement(address entity);

    // State
    int public value;
    
    function increment() external {
        value += 1;
        Increment(msg.sender);
    }

    function decrement() external {
        value -= 1;
        Decrement(msg.sender);
    }
}
```

Pretty simple, right? You might wonder why we would bother adding events to this smart contract, but it comes in handy later for illustration purposes — and we can also create an activity feed from it, if we wanted to.


## 3 steps to governance and upgradeability

Now for the interesting part: making our simple smart contract an Aragon app.

First, inherit from the Aragon app smart contract, like so:

```solidity
import "@aragon/os/contracts/apps/AragonApp.sol";

contract Counter is AragonApp {
    // ...
}
```

Second, define the roles that you want your app to have. A role can be assigned to other apps or people, and those entities will have access to methods guarded by that role.

In this example, we will define a role for incrementing, and a role for decrementing, but note that you can have a single role to guard all methods in your contract if you find that appropriate. 

```solidity
// ...

contract Counter is AragonApp {
    // ...
    bytes32 constant public INCREMENT_ROLE = keccak256("INCREMENT_ROLE");
    bytes32 constant public DECREMENT_ROLE = keccak256("DECREMENT_ROLE");
    // ...
}
```

Finally, guard the methods with the `auth` modifier that the `AragonApp` interface gives you:

```solidity
// ...

contract Counter is AragonApp {
    // ...
    
    function increment() auth(INCREMENT_ROLE) external {
        // ...
    }

    function decrement() auth(DECREMENT_ROLE) external {
        // ...
    }
}
```

That's it. In 3 steps, you now have an Aragon app, with full upgradeability and modular governance.


### Descriptive transactions

A big part of Aragon is user-friendliness, and one of the most unfriendly things might be transaction data. Examine this screenshot of a transaction in MetaMask:

![](/docs/assets/metamask.png)

Would you know what this transaction does? Not even a developer could tell (by the way, it buys a cryptokitty); this is why we created Radspec.

Radspec is a secure alternative to Natspec. Natspec was supposed to be a way to describe transactions from a Natspec *expression* and some transaction data.

The issue with Natspec, however, is that it is fully insecure. Any JavaScript goes in Natspec, which opens up a lot of potential attacks, like cross-site scripting, which might successfully phish users.

We will make a post about Radspec in more detail, but for now, let's add some simple descriptions to some transactions in our app.

```solidity
// ...

contract Counter is AragonApp {
    // ...
    
    /**
     * @notice Increment the counter by 1
     */
    function increment() auth(INCREMENT_ROLE) external {
        // ...
    }

    /**
     * @notice Decrement the counter by 1
     */
    function decrement() auth(DECREMENT_ROLE) external {
        // ...
    }
}
```

These Radspec expressions are written in comments in your source code, and they will be grabbed by `aragon` and bundled with your app.

The wrapper will now display these *alongside* the transaction a user is about to perform, so that they have a clear understanding of what they're about to sign.

![Screenshot of signer showing Radspec](/docs/assets/radspec.png)

*Caption: Our Radspec expressions showing up in the Aragon signer*

Obviously, this is a super trivial example as we are not actually evaluating anything, but we could instead write something like:

```
Decrement the counter by `(2 * 2) - 3`
```

which would evaluate to

```
Decrement the counter by 1
```


## Building The Frontend

Building the front-end of your Aragon app is a bit different from building a normal dapp. This is because we have other security requirements, since we're essentially running code from other developers inside of our dapp, so in order to mitigate risk (such as cross-site scripting, phishing attempts by manipulating the DOM) we sandbox apps.

Because we sandbox apps, it also means that apps do not have direct access to Web3.

Apps are run inside a sandboxed iframe, which means that it only has access to its own DOM, not the outlying DOM. In order to perform transactions, calls, send notifications and so on, the app communicates with the *wrapper* over our own custom RPC protocol.

The wrapper takes care of connecting to Ethereum via Web3, and also handles things like signing transactions, displaying notifications and more to the end-user.

To make it a bit easier, we've developed a library we use internally called Aragon.js.

Aragon.js is split in two parts; one for wrappers and one for apps. The wrapper portion of Aragon.js reads *requests* from the app over RPC, sandboxes apps and performs Web3 actions, whereas the app portion of Aragon.js provides a simple API to communicate with the wrapper (to read state, send transactions and more).

Because we're building is an app, all we need is `@aragon/client`, and our template already has that installed.


### Background Workers And Building State

Apps usually want to listen to events using Web3 and build an application state from those events. This concept is also known as *event sourcing*.

Aragon.js was built with event sourcing in mind. To build state continually without having the app loaded indefinitely, though, we need to run a background script.

Thankfully wrappers will run background scripts specified in the manifest files of our app (more on manifest files later).

Let's start by writing a background worker that listens for our `Increment` and `Decrement` events, and builds a state that simply is the current value of our counter.

```js
// app/script.js
import Aragon from '@aragon/client'

// Initialise the app
const app = new Aragon()

// Listen for events and reduce them to a state
const state$ = app.store((state, event) => {
  // Initial state
  if (state === null) state = 0
  
  // Build state
  switch (event.event) {
    case 'Decrement':
      state--
      break
    case 'Increment':
      state++
      break
  }
  
  return state
})
```

If you've worked with [Redux](https://redux.js.org/) before, this might look vaguely familiar.

The `store` method takes in a reducer function with the signature `(state, event) => state`, where `state` is whatever you want it to be (in this example it is an integer), and `event` is a [Web3 event](https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#contract-events).

Internally, `store` will fetch the last known state (if any) and pass that in as the first argument, and then store the resulting state in cache. This state can be observed in the view portion of your app. Also note that the `store` method returns an observable of states. This is a recurring theme in Aragon.js; almost everything is an [RxJS](http://reactivex.io/rxjs/) observable.

The reducer function **must always** return a state, even if it is the same state as before.

> **Note**: The state will start out as `null`, not `undefined` because of the JSONRPC specification.


### Displaying State

Now let's write the view portion of our app. In our case, this is a simple HTML file, and a simple JavaScript file that observes the state that our background worker builds for us.

```html
<!-- app/index.html !-->
<!doctype html>
<html>
<head>
    <title>Counter App</title>
</head>
<body>
    <button id="decrement">-</button>
    <div id="view">...</div>
    <button id="increment">+</button>
    <script src="app.js"></script>
</body>
</html>
```

```js
// app/app.js
import Aragon, { providers } from '@aragon/client'

const app = new Aragon(
  new providers.WindowMessage(window.parent)
)
const view = document.getElementById('view')

app.state().subscribe(
  (state) => {
    view.innerHTML = `The counter is ${state || 0}`
  },
  (err) => {
    view.innerHTML = 'An error occured, check the console'
    console.log(err)
  }
)
```

That's it! Internally, `state` observes the `state` key in cache and emits every time a change occurs.


### Sending Transactions

Our users need to be able to increment and decrement the counter. For this, we publish what is called an *intent* to the wrapper.

An intent is an action you would like to occur on a specific contract. This intent is handled by the wrapper, which will calculate a *transaction path* using the ACL of our DAO.

To understand transaction paths, we must first understand a little bit about how the ACL works.

The ACL (access control list) is a simple mapping of *who* can perform *what* actions *where*. In our case, *someone* can perform an action guarded by a specific role (the *what*) on our app (the *where*).

However, it is entirely possible that users can not perform actions directly. For example, in order to increment the counter, we might want a decision making process, such as a vote. The beauty of aragonOS is that we never need to specify this directly, as this is handled by the ACL.

We simply say that the only one (*who*) that can perform increments and decrements (*what*) on our app (*where*) is the voting app. This is not done at compile time, it is done at run time.

This works because of a concept called *forwarders*. A forwarder is simply an app that can execute transactions on someones behalf, if the ACL permits it, and that app can have its own *arbitrary conditions* under which it wants to execute your transaction! In the example of the voting app, the voting app will only execute your transaction if the vote passes. Cool, right?

We will release a post deep diving a bit more into the forwarding concept, but bear with me for now.

It's actually really simple to use. Let's add our intents to our app:

```js
// app/app.js
// ...
const view = document.getElementById('view')
const increment = document.getElementById('increment')
const decrement = document.getElementById('decrement')

increment.onclick = () => {
  app.increment()
}
decrement.onclick = () => {
  app.decrement()
}
// ...
```

That's it! Now whenever the user clicks one of either the increment or decrement buttons, an intent is sent to the wrapper, and it will show the user a transaction to sign.


### The Build Script

Since we're importing Node.js modules in our front-end, we need a build script. For this, we opted to use `parcel` because it is zero config, but you can use your favorite bundler.

Let's install Parcel first:

```
npm i parcel-bundler -D
```

Next, let's add the build script to `package.json`:

```js
{
  // ...
  "scripts": {
    "build": "parcel build app/script.js -d dist/ && parcel build app/index.html -d dist/ --public-url '.'"
  }
  // ...
}
```

You can now build the front-end of your app by running `npm run build`.


## Writing The Manifest Files

In order for Aragon.js to function, it needs some metadata about your app. This metadata is specified in two manifest files; `manifest.json` and `arapp.json`.

`arapp.json` defines smart contract and APM-specific things, like the roles in your app and the name and version of your app.

Let's modify `arapp.json` so that it knows about the roles we defined previously:

```js
{
  "appName": "foo.aragonpm.eth",
  "version": "1.0.0",
  "roles": [
      { "name": "Increment the counter", "id": "INCREMENT_ROLE", "params": [] },
      { "name": "Decrement the counter", "id": "DECREMENT_ROLE", "params": [] }
  ],
  "path": "contracts/Counter.sol"
}
```

`manifest.json` defines end-user specific things, like the human-readable name of your app, icons and a small description of your app. It also (optionally) defines background scripts, of which we have one.

Let's modify it accordingly:

```json
{
  "name": "Counter",
  "description": "My first Aragon app",
  "script": "/dist/script.js",
  "start_url": "/dist/index.html"
}
```


## Running Your App Locally

To test out your app without deploying a DAO yourself, installing apps, setting up permissions and setting up APM, you can simply run:

```
npx truffle compile # Remember to compile your contracts!
aragon run
```

This will do a couple of things for you:

- It will start a development chain you can interact with (it uses `ganache-core`, so it's a full testrpc instance)
- It deploys an Aragon DAO with apps and development permissions (i.e. everyone can do everything)
- It publishes your app to a local APM instance
- It installs your app

After running this command a browser tab should pop up with your freshly created DAO, complete with permissions and your local app installed.

<center>
    <img alt="Screenshot of dapp" src="https://i.imgur.com/TMW7rlO.png" />
</center>

> Caption: *It's not pretty, but it works. To see a more beautiful version of our counter app, check out the example app that is included in the [React template](https://github.com/aragon/aragon-react-boilerplate)!*


## Publishing

Now that we're confident that our app will work and amaze the world, we should publish it.

To publish it, simply run:

```
npx truffle compile
aragon publish
```

This will give you a transaction to sign that will either register the repository (if it does not exist) or publish a new version (if the repository exists). Furthermore, it will run your build script (if available) and publish your front-end and manifest files to IPFS.

Now you just need to share the great news on Twitter and Reddit, to let people know that you've built something great!


## Next Steps

The full source code of the application we've built in this guide is available on [our GitHub](https://github.com/aragon/aragon-example-application).

A good place to go from here would be to check out [our existing apps](https://github.com/aragon/aragon-apps). They're fairly self-contained and use some patterns you might find helpful.

There's much more to aragonOS 3 and Aragon.js, and we even have our own [UI toolkit](https://github.com/aragon/aragon-ui). We encourage you to explore all 3 and provide us feedback.

Join the conversation and ask questions on [GitHub](https://github.com/aragon) and [Aragon Chat](https://aragon.chat), and make sure to tell us if you build something ara-mazing!
