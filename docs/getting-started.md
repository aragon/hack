---
id: getting-started
title: Getting started
sidebar_label: Getting started
---

##### What is Aragon and what does it do


Aragon is a project to **empower freedom** by creating tools for **decentralized governance**.

These tools help people freely organize **across borders** and **without intermediaries**. Instead of bureaucracy, subjectivity, and trust, smart contracts have opened the door to **experiment with governance at the speed of software**.

The Aragon stack helps you develop software for **human organization**. From the smart contracts to the user interface, Aragon takes care of the most important pieces of infrastructure to deliver censorship-resistant, decentralized and upgradeable apps.

If you're new to this ecosystem, don't worry if some (or all) of that sounded a little abstract to you. You can think of Aragon as providing the lego pieces to allow people (like you) to build the next generation of human organizations. Organizations that can be spun up instantly, that can't be shut down by governments, that are resistant to internet censorship, and that allow small groups of people to collaborate effectively.

![](/docs/assets/core.png)

> Example of a decentralized, censorship-resistant, good-looking voting app on Aragon

# Introduction

Many of us have  gone through the pain of setting up a corporate entity. Or felt like we've lacked the tools to collaborate with people all around the globe when we're building stuff we want to see in the world.

Right now, the current system simply doesn't work. If you want to set up an organisation you have to go to lawyers, pay thousands of dollars, and all you get in return is a set of unintelligible pieces of paper that cost you more than months of development. On top of this, these pieces of paper don't enforce anything by themselves: they're more like an idea, or a concept.

If you try to explain this to a kid, you quickly realise how mad the current system seems to them. When you think about it, it's really impressive that the world functions the way it does with this sort of legacy framework and operating system underneath.

At Aragon, we believe that decentralized autonomous organizations (DAOs) are the solution to this problem. What exactly is a DAO? There are many ways to describe a DAO, and knowledgable people may disagree on the precise definition. For our purposes, you can think of DAOs as flexible, global, and uncensorable online organizations.

How does Aragon fit in? Aragon provides you with tools (apps) that make it easy for you to create DAOs -- you can think of Aragon apps as lego bricks that can be flexibly combined to make DAOs (the final lego structures).

Another way to think of Aragon is as a new operating system (OS) for setting up organizations. One that is far more efficient than the existing OS (lawyers, administrative headaches, etc) we are used to dealing with.

### More on DAOs

For those of you who are new to DAOs, in this section we'll briefly cover the sorts of things DAOs can enable, when you might want to use a DAO, as well as the trends around the world accelerating their adoption.

#### DAOs can enable: 

- Shared bank accounts with custom rules and permissions
- Payroll that automatically runs by itself
- Built-in voting on important topics

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

While this is nothing new in itself -- P2P architectures have existed since the 1990’s (where they rose to fame with file sharing programs like BitTorrent and Napster) -- what's new is the addition of cryptography and economic incentives to these architectures.

The fusion of these seemingly disparate disciplines was the big innovation behind Bitcoin, and has since led to the emergence of a new field of research devoted to their intersection (what we now call cryptoeconomics). 

While we won't get into the details here,the key takeaway is that cryptoeconomics is the big unlock that has allowed us to start moving from centralized data structures (web2) to more decentralized or fully distributed data architectures (web3).

![](/docs/assets/centralized-vs-decentralized-stack-2.png)

> Note that there’s a spectrum from fully centralized (left) to fully decentralized (right).

And while blockchains -- like Bitcoin and Ethereum -- are key to this web3 vision, it's important to note that there are other essential parts of the web3 stack that are not covered by them. For example, since blockchains are relatively expensive to store data on, it turns out that they don't make great file systems. That's why there's also a need for decentralized file systems like the [InterPlanetary File System](https://ipfs.io/) (which Aragon also makes use of).


### Further reading
...


# Up and running

Now that we've got you all excited, let's go through what you need to get started building with Aragon 😊


## Environment setup

### Node.js

First off, we need to be sure we have a recent version of Node.js installed, at least `v8.0.0`.

To see which version of Node you have installed, from the command line run:

```sh
node -v
```

If you need to download a more recent version, [see here](https://nodejs.org/en/download/).


### Web3 provider

Next, we'll need what we call a web3 provider to actually sign and send transactions to the Ethereum blockchain.

We recommend either [Frame](https://frame.sh) or [Metamask](https://metamask.io/). [talk briefly about the differences, why you might prefer one over the other]

If you're new to the decentralized web you might be wondering why we have to use a separate provider to interact with the blockchain. Why don't decentralized apps (like Aragon's) just do it themselves?

In short, while it's possible for dapps to interact directly with the blockchain, using a web3 provider allows users to interact with dapps without trusting every one of them with their private keys (the keys to theirs funds). Without a web3 provider, users have to have total trust in every dapp they use. With a web3 provider, they just need to trust that provider.

#### Frame 

>Frame is an OS-level Ethereum interface that lets you use standalone signers, such as a Ledger or Trezor, to interact with dapps and the Ethereum network. 
[^ replace quotation with jargon free paragraph]

For instructions on how to use Frame as your web3 provider, please take a look at our Frame guide. [link to frame guide]

#### Metamask 

MetaMask is a browser plugin that allows users to make Ethereum transactions through regular websites. It does this by injecting a javascript library called web3.js into the namespace of each page your browser loads. web3.js is written by the Ethereum core team, and has functions that regular webpages can use to make read and write requests to the blockchain.

For instructions on how to use Metamask as your web3 provider, please take a look at our Metamask guide. [link to metamask guide]


### The aragonCLI

The final missing piece is what's known as the aragonCLI (or Command Line Interface). This is what we'll use to create, interact with, and develop Aragon apps and DAOs.

To install it from the command line run:

```sh
npm i -g @aragon/cli
```

Hopefully, it downloaded successfully. If that's the case, congrats! you're now officially ready to start building your first DAO!

If you're having trouble with this step, you should take a look at the installing aragonCLI section of the [troubleshooting guide.](https://hack.aragon.org/docs/guides-faq#installing-aragonCLI) If that doesn't fix things, please don't hesitate to reach out to us at the [#dev-help channel on the Aragon Chat](https://aragon.chat/channel/dev-help).

## Quick start

In order to get up and running quickly, we’ll build our first DAO using some basic scaffolding [explain what scaffolding means] -- remember a DAO is just a combination of Aragon Apps... [elaborate...]

To create our DAO run:

```sh
npx create-aragon-app first_dao.aragonpm.eth
cd first_dao
npx aragon run
```

Don't worry about understanding the first line right now. Really. We'll cover that in the [tutorial](https://hack.aragon.org/docs/tutorial.html) coming up.

With respect to the third line, ```aragon run``` just sets up everything for us in the background so we can quickly live test our DAO.

N.B. If you're unsure what the difference is between ```npx``` and ```npm```, we recommend you read through this [medium post](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) and this [stackoverflow post.](https://stackoverflow.com/questions/50605219/difference-between-npx-and-npm)

If you've made it this far congrats 🤗. You've just created your first DAO!

It’s running on your local network and as soon as it's ready it will open in your browser at [localhost:3000](http://localhost:3000)!

### Interacting with your first DAO
If it's not already open, open your browser at the localhost address shown in your terminal. It should look something like this:

<pre>This is the configuration for your development deployment:
    Ethereum Node: ws://localhost:8545
    ENS registry: 0x5f6f7e8cc7346a11ca2def8f827b7a0b612c56a1
    APM registry: aragonpm.eth
    DAO address: 0xE56671CA800F4516B5B705c729BD3c6Aee4DDbEC

    Opening <b>http://localhost:3000/#/0xE56671CA800F4516B5B705c729BD3c6Aee4DDbEC</b> to view your DAO
</pre>

Once your browser is open at the right address, you should see a screen that looks like the one below

![](/docs/assets/getting-started-dao-1.png)

As you can see on the left, this DAO is made up of two Aragon apps -- Home and Counter. Right now, we're in the Home app. This app just displays a welcome message with no possible user interactions.

Click on Counter to open up the (slightly) more interesting Counter app.

![](/docs/assets/getting-started-dao-2.png)

[^ reread and rework this section]

#### Signing your first transaction with Metamask

[insert visual tutorial]

#### Signing your first transaction with Frame

[insert visual tutorial]

## Next steps

We hope you enjoyed that 😊! Please don't hesitate to leave us any feedback [insert link].

Now that you’ve built your first DAO, feel free to take a look at the docs. If you're interested in understanding things at a deeper level, we recommend you jump straight into our awesome [tutorial](/docs/tutorial.html).

P.S. You should find that there is a light blue EDIT button in the top-right corner of every page. If you feel like you can improve our documentation in any way, please don't hesitate to click on it. Once you click on it, you'll be taken to a github copy of the page. On that page you should see a small pencil icon somewhere on the right. Click on it to start.

P.P.S. Before you submit any changes, you should read our [contribution guidelines.](https://github.com/aragon/hack/blob/master/CONTRIBUTING.md)

[^ create and/or provide a link to a tutorial that takes the user through their first githubedit + simple Markdown]
