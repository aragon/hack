---
id: getting-started
title: Getting started
sidebar_label: Getting started
---

##### What is Aragon and what does it do


Aragon is a project to **empower freedom** by creating tools for **decentralized governance**.

These tools help people freely organize **across borders** and **without intermediaries**. Instead of bureaucracy, subjectivity, and trust, smart contracts have opened the door to **experiment with governance at the speed of software**.

The Aragon stack helps you develop software for **human organization**. From the smart contracts to the user interface, Aragon takes care of the most important pieces of infrastructure to deliver censorship-resistant, decentralized and upgradeable apps.

If you're new to this ecosystem, don't worry if some (or all) of that sounded a little abstract to you. You can simply think of Aragon as providing the lego pieces to allow people (like you) to build the next generation of companies. Companies that can be spun up instantly, that can't be shut down by governments, that are resistant to internet censorship, and that allow small groups of people to organise themselves efficiently and effectively.

![](/docs/assets/core.png)

> Example of a decentralized, censorship-resistant, good-looking voting app on Aragon

# Introduction

Many of us have  gone through the pain of setting up a corporate entity. Or felt like we've lacked the tools to collaborate with people all around the world when we're building stuff we want to see in the world.

Right now, the current system simply doesn't work. If you want to setup an organisation you have to go to lawyers, pay thousands of dollars, and all you get in return is a set of unintelligible pieces of paper that cost you more than months of development. On top of this, these pieces of paper don't enforce anything by themselves: they're more like an idea, or a concept.

If you try to explain this to a kid, or to younger generations that have spent much of their lives interacting in a borderless digital world, you quickly realise how mad the current system seems to them. When you think about it, it's really impressive that the world functions the way it does with this sort of legacy framework and operating system underneath.

At Aragon, we believe that decentralized autonomous organizations (DAOs) are the solution to this problem. What exactly is a DAO? Like the parable of the blind man and the elephant... There are many ways to describe a DAO, and knowledgable people may disagree on the precise definition. For our purposes, you can think of DAOs as flexible, global, and uncensorable online organizations.

How does Aragon fit in? Aragon provides you with tools (apps) that make it easy for you to create DAOs -- you can think of Aragon apps as lego bricks that can be flexibly combined to make DAOs (the final lego structures).

Another way to think about Aragon is as a new operating system (OS) for setting up organizations. One that is far more efficient than the existing OS (lawyers, administrative headaches, etc) we are used to dealing with.

### More on DAOs

In this section we'll briefly cover the sorts of things DAOs can enable, when you might want to use a DAO, as well as the trends around the world accelerating their adoption.

#### DAOs can enable: 

- Shared bank accounts with custom rules and permissions
- Payroll that automatically runs by itself
- Built-in voting on important topics
- The creation and distribution of governance tokens

#### DAO use cases: 

- Part-time projects with friends or strangers
- Future of work: people working part time on multiple things for short periods of time
- Temporary pop-up companies
- Companies in authoritarian jurisdictions
- Global, distributed teams

#### Trends around the world accelerating DAO adoption: 

- The rise of populist authoritarians
- The future of work (remote and distributed)
- The growing de-platforming problem
- The rise of decentralized finance
- The [increasing](https://medium.com/complex-systems-channel/teams-a-manifesto-7490eab144fa) [complexity](https://necsi.edu/complexity-rising-from-human-beings-to-human-civilization-a-complexity-profile) of human civilization



### Web3

Unless you've been living under a rock for the last few years, you've probably come across the term web3 😋. But what does it mean exactly? And why do we care about it in the context of Aragon?

Web3 is the vision of a fully decentralized web. One of the craziest things to wrap your head around is that in web3, apps don't need a central server to fetch data from!

How is this possible? In a nutshell, thanks to something called peer-to-peer data architectures. The key point is that in a P2P architecture, instead of requesting data from a central server, you request it from multiple computers (peers) around you.

While this is nothing new by itself -- P2P architectures have existed since the 1990’s (where they rose to fame with file sharing programs like BitTorrent and Napster) -- what's new is the addition of cryptography and economic incentives to these architectures.

This fusion of seemingly disparate disciplines was the big innovation behind Bitcoin, and has led to the emergence of a new field of research called cryptoeconomics.

What exactly is cryptoeconomics? To borrow Vitalik's definition, cryptoeconomics is about building systems that have certain desired properties, using:

- Cryptography to prove properties about messages that happened in the past
- Economic incentives to encourage desired properties to hold into the future

In plain english, cryptoeconomics is about building systems using cryptography to make sure that past data can't be hacked, and economic incentives to make sure that people act in a way that's good for the system.

The key takeaway here is that cryptoeconomics is the big unlock that has allowed us to start moving from centralized data structures (web2) to more decentralized or fully distributed data architectures (web3).

![](/docs/assets/centralized-vs-decentralized-stack-2.png)

> Note that there’s a spectrum from fully centralized (left) to fully decentralized (right).

It's also important to note that blockchains -- like Ethereum -- are only part of the decentralized web3 stack (platform and processing). It turns out that blockchains don't make good file systems because they are expensive to store data on. That's why there's also a need for decentralized file systems like the [InterPlanetary File System](https://ipfs.io/).

As Aragon's apps aim to run in a completely decentralized way, every layer of the web3 stack is key to our vision. For example, we make use of IPFS.


### Further reading
...


# Up and running

Now that we've got you all excited, let's go through what you need to get started building with Aragon 😊


## Environment setup

### Node.js

First off, we need to sure we have a recent version of Node.js, at least `v8.0.0`.

To see which version of Node you have installed, from the command line run:

```sh
node -v
```

To download the latest version, [see here](https://nodejs.org/en/download/).


### Web3 provider

Next we'll need what we call a web3 provider to actually sign and send transactions to the ethereum blockchain.

We recommend either [Frame](https://frame.sh) or [Metamask](https://metamask.io/).

If you're new to the decentralized web you might be wondering why we have to use a separate provider to interact with the blockchain. Why don't decentralized apps (dapps) just do it themselves?

In short, while it's possible for dapps to interact directly with the blockchain, doing it this way allows users to interact with dapps without trusting them with their private keys (the keys to theirs funds). Without web3 providers, users have to have total trust in every dapp they use -- otherwise they risk having their funds stolen.


#### Metamask 

> MetaMask is a browser plugin that allows users to make Ethereum transactions through regular websites. It facilitates the adoption of Ethereum because it bridges the gap between the user interfaces for Ethereum (eg. Mist browsers, Dapps) and the regular web (eg. Chrome, Firefox, websites).

> MetaMask injects a javascript library called web3.js into the namespace of each page your browser loads. web3.js is written by the Ethereum core team, and has functions that regular webpages can use to make read and write requests on the blockchain that are consistent with the existing protocol [Source](https://www.quora.com/What-is-MetaMask)

[^explain what this means]

If this is your first time using Metamask, here's how to started:

Visit https://metamask.io/ and download the relevant browser extension. Once it's downloaded you should be automatically directed to a page that looks like this (note that the screenshots below are taken from the chrome browser extension).

[metamask-1.png]

Follow the instructions carefully. They should be pretty self-explanatory. Once your metamask setup is complete, you should be redirected to a page that looks like this:

[metamask-4.png]

If you've reached this stage, congratulations! You've just created your first Ethereum wallet. You're now able to sign transactions and interact directly with the Ethereum blockchain.

A couple of useful points:

In the top right you should see a dropdown menu with Main Ethereum Network selected. With this option selected, you're able to interact directly with the main Ethereum blockchain.  If you click on it however, you should see that you have the ability to select other networks.

[metamask-5.png]

Why would we need to select other networks? Simply put, before launching a project (or dapp) on the main Ethereum network, it's good practice to deploy a version to an Ethereum test network. These test nets simulate Ethereum, and give developers and the community a chance to iron out any problems before real money is involved.

Don't worry about the precise differences between the test nets at this stage. The key takeaway is that Metamask also allows you to connect to Ethereum test networks. And that these networks allow you to play around with dapps using fake money (we'll be using one of these test networks later	to interact with out first DAO).

[metamask-5b]

If you click on the details button below your account name, a popup will appear with your account address. This is your public address (or public key). You can share this with other people to receive Eth.

[metamask-6.png]

Finally, if you click on the View Account On EtherScan button you'll be taken to a page that looks like this.
This will allow you to see (in real-time) your transaction history for this address. If you're signing off on or expecting to receive a transaction, this is where you should check.

#### Frame 
> Frame is an OS-level Ethereum interface that lets you use standalone signers, such as a Ledger or Trezor, to interact with dapps and the Ethereum network.

[explain what this means and go through installation -- with images]


### The aragonCLI

Finally, to create and develop Aragon apps, we need to install the aragonCLI (Command Line Interface).

To install it from the command line run:

```sh
npm i -g @aragon/cli
```

If this package downloaded successfully, you're now ready to start building DAOs!

If you're having trouble with this step, you should look at the considerations for your operating system below. If that doesn't fix things, please don't hesitate to reach out to us at the [#dev-help channel on the Aragon Chat](https://aragon.chat/channel/dev-help).

### Mac considerations

If you're seeing one or more errors that look like:

```sh
EACCES: permission denied
```

It's probably because you originally installed Node with root permissions. Because of this, writing to your npm directory (```npm -i -g```) requires root permissions too.

While it's not a good idea to have Node installed this way, one way to quickly give yourself root permissions is to run the slightly modified command:

```sh
sudo npm i -g --unsafe-perm @aragon/cli
```

An arguably better way to fix the problem is to follow the steps outlined in this [stackoverflow answer.](https://stackoverflow.com/a/24404451)

[i think this whole section needs to be exlained more simply...]

### Windows considerations

You might need to run the shell with administrator rights when installing the aragonCLI, because our `go-ipfs` dependency will need to create a symlink to work correctly. [this needs to be explained better]

If you have problems during the instalation of aragonCLI or any other dependencies. You probably need to install [windows-build-tools](https://www.npmjs.com/package/windows-build-tools) or similar package. 

Again, if you're having trouble fixing things, please reach out to us at the [#dev-help channel on the Aragon Chat](https://aragon.chat/channel/dev-help)

### Note on Git

You might need to have [Git](https://git-scm.com) installed. [a little startling for the reader... why might? i think we need to elaborate here...]

## Quick start

To get up and running quickly, we’ll build our first DAO using some basic scaffolding -- remember a DAO is just a combination of Aragon Apps... [elaborate]

To create our DAO run:

```sh
npx create-aragon-app foo.aragonpm.eth
cd foo
npx aragon run
```

Don't worry about understanding the first line right now. Really. We'll cover that in the [tutorial](https://hack.aragon.org/docs/tutorial.html) coming up.

With respect to the third line, ```aragon run``` just sets up everything for us in the background so we can quickly live test our DAO.

N.B. If you're unsure what the difference is between ```npx``` and ```npm```, we recommend you read through this [stackoverflow post.](https://stackoverflow.com/questions/50605219/difference-between-npx-and-npm)

If you've made it this dar congrats 🤗. You've just created your first DAO!

It’s running on your local network and as soon as it's ready it will open in your browser at [localhost:3000](http://localhost:3000)!

### Interacting with your first DAO
[visual tutorial with metamask]

[visual tutorial with frame]

## Next steps

Now that you’ve built a DAO let's take a look at the docs or you can jump into the [tutorial](/docs/tutorial.html).
