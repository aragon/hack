---
id: getting-started
title: Getting started
sidebar_label: Getting started
---

##### What is Aragon and what does it do


Aragon is a project to **empower freedom** by creating tools for **decentralized governance**.

These tools help people freely organize **across borders** and **without intermediaries**. Instead of bureaucracy, subjectivity, and trust, smart contracts have opened the door to **experiment with governance at the speed of software**.

The Aragon stack helps you develop software for **human organization**. From the smart contracts to the user interface, Aragon takes care of the most important pieces of infrastructure to deliver censorship-resistant, decentralized and upgradeable apps.

![](/docs/assets/core.png)

> Example of a decentralized, censorship-resistant, good-looking voting app on Aragon

### Introduction

Many of us have  gone through the pain of setting up a corporate entity. Or felt like we've lacked the tools to collaborate with people all around the world when we're building stuff we want to see in the world.

Right now, the current system simply doesn't work. If you want to setup an organisation you have to go to lawyers, pay thousands of dollars, and all you get in return is a set of unintelligible pieces of paper that cost you more than months of development. On top of this, these pieces of paper don't enforce anything by themselves: they're more like an idea, or a concept.

If you try to explain this to a kid, or to younger generations that have spent most of their lives interacting in a borderless digital world, you quickly realise how mad the current system seems to them. When you think about it, it's really impressive that the world functions the way it does with this sort of legacy framework and operating system underneath.

We believe that decentralized autonomous organizations (or  DAOs) are the solution to this problem. What is a DAO? Like the parable of the blind man and the elephant... For our purposes, you can think of DAOs as flexible, global, uncensorable, permissionless, free, online organizations.

Where does Aragon fit in? Aragon makes it easy to build DAOs (by providing you with, and allowing you to easily combine, decentralized applications that meet your organisations every need). One way to think of Aragon is as a new operating system (OS) for setting up organizations. One that is far more efficient than existing OS (lawyers, administrative headaches etc...)


Now that we've got you all excited, here's what you need to get started building with Aragon:


- [Environment setup](#environment-setup)
- [Quick start](#quick-start)
- [Next steps](#next-steps)


## Environment setup

### Node version

Make sure you have at least Node.js `v8.0.0`.

To see what version of Node you have installed, from the command line run:

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

Once we have this package installed we can start building DAOs. If you're having trouble with this step, see the relevant operating system considerations below.

### Note on Git

You might need to have [Git](https://git-scm.com) installed.

### Mac considerations

If you're seeing one or more errors that look like:

```sh
EACCES: permission denied
```

It's probably because you originally installed Node with root permissions. Because of this, writing to your npm directory (```npm -i -g```) requires root permissions too.

One way to quickly give yourself root permissions is to run the slightly modified command:

```sh
sudo npm i -g --unsafe-perm @aragon/cli
```

An arguably better way to fix the problem is to follow the steps outlined in this [stackoverflow answer.](https://stackoverflow.com/a/24404451)

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
If you're unsure what the difference is between ```npx``` and ```npm```, we recommend you read through this [stackoverflow post.](https://stackoverflow.com/questions/50605219/difference-between-npx-and-npm) Don't worry if you don't completely understand what the rest of the first line is doing. We'll cover this in the [tutorial](https://hack.aragon.org/docs/tutorial.html) coming up. 

Congrats you have just created a DAO! It’s running on your local network and as soon as it's ready it will open in your browser at [localhost:3000](http://localhost:3000)!

## Next steps

Now that you’ve built a DAO let's take a look at the docs or you can jump into the [tutorial](/docs/tutorial.html).
