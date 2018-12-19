---
id: tutorial
title: Your first Aragon app
---

In this guide, we will walk you through creating your first Aragon app using [aragonOS](os-intro.md), the JavaScript implementation of [aragonAPI](js-ref.md), [aragonUI](ui-intro.md) and [aragonCLI](/docs/cli-usage.html).

# Quickstart

Follow these instructions to immediately run the full tutorial:

```
npm i -g @aragon/cli
aragon init foo.aragonpm.eth react
cd foo
aragon run
```

This should open up the app in your browser!

## The setup

Now we'll take things slower and step through and explain the code line by line.

Let's first set up our project.

```
npm i -g @aragon/cli
```

Next, we bootstrap our project:

```
aragon init foo.aragonpm.eth react
```

This will create a new directory named `foo`, with files cloned from the official Aragon [react boilerplate](https://github.com/aragon/aragon-react-boilerplate). This particular boilerplate includes everything you need to get started — Truffle, aragonOS and aragonAPI.

Notice that we input a fully qualified [ENS](https://ens.domains/) name. We also initialise the app from the [react template](https://github.com/aragon/aragon-react-boilerplate), so we get [aragonUI](https://github.com/aragon/aragon-ui) included. You can use the `bare` template if you don't want to use it.

Let's examine the ENS name we entered, because it is not entirely arbitrary.

![Illustration of foo.aragonpm.eth](https://i.imgur.com/MQnYT6d.png)

The first label in the ENS name is the name of our app. This can be anything you want, given that the full ENS name is not taken.

The second and third label is the name of the [aragonPM](package-management.md) (aragonPM) registry that your repository will be (or is) registered to. For the sake of simplicity, this guide assumes that you have rights to create repositories on aragonpm.eth, but you could deploy your own aragonPM registry if you so desire.


## Writing a simple contract

To illustrate how easy it is to use aragonOS, we will build our app as a vanilla smart contract, without any Aragon-specific interfaces at all.

Today, we will build a simple counter app — you can increment it, you can decrement it, and it will all be decentralized. Decentralized coffee counter, anyone?

```solidity
// contracts/CounterApp.sol
pragma solidity 0.4.24;

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

Second, define the roles that you want your app to have. A role can be assigned to other apps or people and those entities will have access to methods guarded by that role.

In this example we will define a role for incrementing and a role for decrementing but note that you can have a single role to guard all methods in your contract if you find that appropriate.

```solidity
contract Counter is AragonApp {
    // ...
    bytes32 constant public INCREMENT_ROLE = keccak256("INCREMENT_ROLE");
    bytes32 constant public DECREMENT_ROLE = keccak256("DECREMENT_ROLE");
    // ...
}
```

Finally, guard the methods with the `auth()` modifier that the `AragonApp` interface gives you and add an initialize function to your contract:

```solidity
contract Counter is AragonApp {
    // ...

    function initialize() onlyInit {
      initialized();
    }

    function increment() auth(INCREMENT_ROLE) external {
        // ...
    }

    function decrement() auth(DECREMENT_ROLE) external {
        // ...
    }
}
```

That's it. In 3 steps, you now have an Aragon app, with full upgradeability and modular governance.


## Descriptive transactions

Aragon wants to be as user friendly as possible, so it provides an easy way for developers to describe what their smart contracts do in a human readable way. It's called [Radspec](human-readable-txs.md). It works by putting `@notice` statements alongside a human readable description for the function.

```solidity
contract Counter is AragonApp {    
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

## Building the frontend

Because apps inside the [Aragon client](client.md) are sandboxed, it also means that apps do not have direct access to Web3.

Apps are run inside an iframe, which means that it only has access to its own DOM, not the outlying DOM. The app can communicate with the client over our own custom RPC protocol.

Then the client takes care of connecting to Ethereum via Web3, and also handles things like signing transactions, displaying notifications and more to the end-user.

All of this is achieved by using aragonAPI. aragonAPI is split in two parts: one for clients and one for apps. The client portion of aragonAPI reads *requests* from the app over RPC, sandboxes apps and performs Web3 actions, whereas the app portion provides a simple API to communicate with the client (to read state, send transactions and more).

Because we're building an app, all we need is `@aragon/client` and our template already has that installed.


### Background workers and building state

Apps usually want to listen to events using Web3 and build an application state from those events. This concept is also known as *event sourcing*.

aragonAPI was built with event sourcing in mind. To build state continually without having the app loaded indefinitely, though, we need to run a background script.

Thankfully the [Aragon client](client.md) will run background scripts specified in the manifest files of our app (more on manifest files later).

Let's start by writing a background worker that listens for our `Increment` and `Decrement` events, and builds a state that simply is the current value of our counter.

```js
// app/script.js
import Aragon from '@aragon/client'

const app = new Aragon()

const initialState = {
  count: 0
}
app.store(async (state, event) => {
  if (state === null) state = initialState

  switch (event.event) {
    case 'Increment':
      return { count: await getValue() }
    case 'Decrement':
      return { count: await getValue() }
    default:
      return state
  }
})
```

If you've worked with [Redux](https://redux.js.org/) before, this might look vaguely familiar.

The `store` method takes in a reducer function with the signature `(state, event) => state`, where `state` is whatever you want it to be (in this example it is an integer), and `event` is a [Web3 event](https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#contract-events).

Internally, `store` will fetch the last known state (if any) and pass that in as the first argument, and then store the resulting state in cache. This state can be observed in the view portion of your app. Also note that the `store` method returns an observable of states. This is a recurring theme in the JavaScript implementation of aragonAPI—almost everything is an [RxJS](http://reactivex.io/rxjs/) observable.

The reducer function **must always** return a state, even if it is the same state as before.

> **Note**<br>
> The state will start out as `null`, not `undefined` because of the JSONRPC specification.

<br>

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

<br>
### Sending transactions

Our users need to be able to increment and decrement the counter. For this, we publish what is called an *intent* to the wrapper.

An intent is an action you would like to occur on a specific contract. This intent is handled by the client, which will calculate a *transaction path* using the ACL of our DAO.

To understand transaction paths, we must first understand a little bit about how the ACL works.

The [ACL (Access Control List)](acl-intro.md) is a simple mapping of *who* can perform *what* actions *where*. In our case, *someone* can perform an action guarded by a specific role (the *what*) on our app (the *where*).

However, it is entirely possible that users can not perform actions directly. For example, in order to increment the counter, we might want a decision making process, such as a vote. The beauty of aragonOS is that we never need to specify this directly, as this is handled by the ACL.

We simply say that the only one (*who*) that can perform increments and decrements (*what*) on our app (*where*) is the voting app. This is not done at compile time, it is done at run time.

This works because of a concept called [*forwarders*](forwarding-intro.md). A forwarder is simply an app that can execute transactions on someone's behalf, if the ACL permits it, and that app can have its own *arbitrary conditions* under which it wants to execute your transaction! In the example of the voting app, the voting app will only execute your transaction if the vote passes.

It's really simple to use. Let's add our intents to our app:

```js
// app/app.js
const view = document.getElementById('view')
const increment = document.getElementById('increment')
const decrement = document.getElementById('decrement')

increment.onclick = () => {
  app.increment()
}
decrement.onclick = () => {
  app.decrement()
}
```

That's it! Now whenever the user clicks one of either the increment or decrement buttons, an intent is sent to the wrapper, and it will show the user a transaction to sign.


### The build script

Since we're importing Node.js modules in our front-end, we need a build script. For this, we opted to use `parcel` because it has zero config, but you can use your favorite bundler.

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


## Writing the manifest files

In order for aragonAPI to function, it needs some metadata about your app. This metadata is specified in two manifest files; `manifest.json` and `arapp.json`.

`arapp.json` defines smart contract and aragonPM-specific things like the roles in your app and the name and version of your app.

Let's modify `arapp.json` so that it knows about the roles we defined previously:

```js
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
  "path": "contracts/CounterApp.sol",
  "environments": {
    "default": {
      "network": "development",
      "appName": "foo.aragonpm.eth"
    }
  }
}
```

`manifest.json` defines end-user specific things like the human-readable name of your app, icons, and a small description of your app. It also (optionally) defines background scripts, of which we have one.

Let's modify it accordingly:

```json
{
  "name": "Counter",
  "description": "My first Aragon app",
  "script": "/dist/script.js",
  "start_url": "/dist/index.html"
}
```


## Running your app locally

To test out your app without deploying a DAO yourself, installing apps, setting up permissions and setting up aragonPM, you can simply run:

```
aragon run
```

This will do a couple of things for you:

- It will start a development chain you can interact with (it uses `ganache-core`, so it's a full testrpc instance)
- It deploys an Aragon DAO with apps and development permissions (i.e. everyone can do everything)
- It publishes your app to a local aragonPM instance
- It installs your app

After running this command a browser tab should pop up with your freshly created DAO, complete with permissions and your local app installed.

![Screenshot of dapp](/docs/assets/counter.png)

> **Note**<br>
> It's not pretty, but it works. To see a more beautiful version of our counter app, check out the example app that is included in the [React template](https://github.com/aragon/aragon-react-boilerplate)!

### Running your app from an HTTP server

Running your app using HTTP will allow for a faster development process of your app's front-end, as it can be hot-reloaded without the need to execute `aragon run` every time a change is made.

- First start your app's development server running `npm run start:app`, and keep that process running. By default it will rebuild the app and reload the server when changes to the source are made.

- After that, you can run `npm run start:aragon:http` which will compile your app's contracts, publish the app locally and create a DAO. You will need to stop it and run it again after making changes to your smart contracts.

Changes to the app's background script (`app/script.js`) cannot be hot-reloaded, after making changes to the script, you will need to either restart the development server (`npm run start:app`) or rebuild the script `npm run build:script`.

### Metamask

At this point you are likely going to use [Metamask](https://metamask.io/) to interact with your DAO. In order to do so, you must make sure that:

- It's unlocked
- Private network (_Localhost 8545_) is chosen
- The first account provided by `aragon run` is imported and selected. To import the account, copy the private key (something like `a8a54b2d8197bc0b19bb8a084031be71835580a01e70a45a13babd16c9bc1563`), go to the accounts upper icon, to the left of the hamburguer button, scroll down, click on `Import account` and paste the value you copied.

## Publishing

Now that we're confident that our app will work and amaze the world, we should publish it.

To publish it, simply run:

```
aragon apm publish <minor|major> [contract-address|contract-name]
```

The `aragon apm publish` command bumps the version number and publishes your app.

If a major version is being published then the contract address for your app has to be provided or the contract name so the contract can be deployed. If it is not provided it will default to the contract specified in the `arapp.json` file.

If a minor or patch version is being published then the command can be run with the `--only-content` flag which will just perform an update to the content of the app (the webapp and its artifacts).

This will give you a transaction to sign that will either register the repository (if it does not exist) or publish a new version (if the repository exists). Furthermore, it will run your build script (if available) and publish your front-end and manifest files to IPFS.

Now you just need to share the great news on Twitter and Reddit, to let people know that you've built something great!

## More CLI commands

You can check the '[Using the aragonCLI](cli-usage.md)' guide for an in-depth description of how all the commands available in the CLI work.

## Next steps

The full source code of the application we've built in this guide is available on [our GitHub](https://github.com/aragon/aragon-example-application).

A good place to go from here would be to check out [our existing apps](https://github.com/aragon/aragon-apps). They are fairly self-contained and use some patterns you might find helpful.

There is much more to aragonOS and aragonAPI, and we even have our own [UI toolkit](https://github.com/aragon/aragon-ui). We encourage you to explore all 3 and provide us feedback.

Join the conversation and ask questions on [GitHub](https://github.com/aragon) and [Aragon Chat](https://aragon.chat), and make sure to tell us if you build something ara-mazing!
