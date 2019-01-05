---
id: getting-started
title: Getting started
sidebar_label: Getting started
---

### What is Aragon and what does it do
---

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

**Node version**

Make sure you have at least Node.js `v8.0.0`.

**Metamask**

We recommend using the [Metamask browser extension](https://metamask.io/) to send transactions to the blockchain.

**Install the aragonCLI**

From the command line run:

```
npm i -g @aragon/cli
```

Once we have this package installed we can start building DAOs.

## Quick start

To create your first DAO run:

```
aragon init foo.aragonpm.eth
cd foo
aragon run
```

Congrats you have just created a DAO! It’s running on your local network and as soon as it's ready it will open in your browser at [localhost:3000](http://localhost:3000)!

## Next steps

Now that you’ve built a DAO let's take a look at the docs or you can jump into the [tutorial](/docs/tutorial.html).