---
id: getting-started
title: Getting started
sidebar_label: Getting started
---

##### What is Aragon and what does it do


Aragon is a project to **empower freedom** by creating tools for **decentralized governance**.

These tools help people freely organize **without borders or intermediaries**. Instead of bureaucracy, subjectivity, and trust, smart contracts have opened the door to **experiment with governance at the speed of software**.

The Aragon stack helps you develop software for **human organization**. From the smart contracts to the user interface, Aragon takes care of the most important pieces of infrastructure to deliver censorship-resistant, decentralized and upgradeable apps.

If you're new to this ecosystem, don't worry if some (or all) of that sounded a little abstract to you. You can think of Aragon as providing the lego pieces to allow people (like you) to build the next generation of human organizations. Organizations that can be spun up instantly, that can't be shut down by governments, that are resistant to internet censorship, and that allow small groups of people to collaborate effectively.


![](/docs/assets/core.png)

> Example of a decentralized, censorship-resistant, good-looking voting app on Aragon


What you need to get started building with Aragon:

- [Environment setup](#environment-setup)
- [Quick start](#quick-start)
- [Next steps](#next-steps)


## Environment setup

### Node version

Make sure you have at least Node.js `v8.0.0`.

### Signing and web3 provider

We recommend using [Frame](https://frame.sh) to send transactions to the blockchain. Otherwise you can use [Metamask browser extension](https://metamask.io/).

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
