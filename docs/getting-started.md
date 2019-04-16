---
id: getting-started
title: Getting started
sidebar_label: Getting started
---

##### What is Aragon and what does it do


Aragon is a project to **empower freedom** by creating tools for **decentralized governance**.

These tools help people freely organize **without borders or intermediaries**. Instead of bureaucracy, subjectivity, and trust, smart contracts have opened the door to **experiment with governance at the speed of software**.

The Aragon stack helps you develop software for **human organization**. From the smart contracts to the user interface, Aragon takes care of the most important pieces of infrastructure to deliver censorship-resistant, decentralized and upgradeable apps.

![](/docs/assets/core.png)

> Example of a decentralized, censorship-resistant, good-looking voting app on Aragon


What you need to get started building with Aragon:

- [Environment setup](#environment-setup)
- [Quick start](#quick-start)
- [Next steps](#next-steps)


## Environment setup

### Node version

Make sure you have at least Node.js `v8.0.0`.

To see what version of node you have installed, from the command line run:

```sh
node -v
```

To download the latest version, [see here](https://nodejs.org/en/download/).


### Signing and web3 provider

We recommend using [Frame](https://frame.sh) to send transactions to the blockchain. Otherwise you can use [Metamask browser extension](https://metamask.io/).

If you're new to the decentralized web you might be wondering why we have to use a separate provider to interact with the blockchain. Why doesn't the decentralized application (dapp) just do it itself?

In short, doing it this way allows you to interact with a dapp without necessarily trusting it with your funds. Additionally, since dapps never get access to your funds, dapp developers don't need to deal with all the security headaches that come with handling money.

### Install the aragonCLI

From the command line run:

```sh
npm i -g @aragon/cli
```

Once we have this package installed we can start building DAOs.

### Note on Git

You might need to have [Git](https://git-scm.com) installed.

### Windows considerations

You might need to run the shell with administrator rights when installing the aragonCLI, because our `go-ipfs` dependency will need to create a symlink to work correctly.

If you have problems during the instalation of aragonCLI or any other dependencies. You probably need to install [windows-build-tools](https://www.npmjs.com/package/windows-build-tools) or similar package.


## Quick start

To create your first DAO run:

```sh
npx create-aragon-app foo.aragonpm.eth
cd foo
npx aragon run
```

Congrats you have just created a DAO! It’s running on your local network and as soon as it's ready it will open in your browser at [localhost:3000](http://localhost:3000)!

## Next steps

Now that you’ve built a DAO let's take a look at the docs or you can jump into the [tutorial](/docs/tutorial.html).
