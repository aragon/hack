---
id: basics-getting-started
title: Getting started
sidebar_label: Getting started
---

##### What is Aragon and what does it do

Aragon is a project to **empower freedom** by creating tools for **decentralized governance**.

These tools help people freely organize **across borders** and **without intermediaries**. Instead of bureaucracy, subjectivity, and trust, smart contracts have opened the door to **experiment with governance at the speed of software**.

The Aragon stack helps you develop software for **human organization**. From the smart contracts to the user interface, Aragon takes care of the most important pieces of infrastructure to deliver censorship-resistant, decentralized and upgradeable apps.

If you're new to this ecosystem, don't worry if some (or all) of that sounded a little abstract. You can think of Aragon as providing the lego pieces to allow people (like you) to build the next generation of human organizations.

Organizations that can be spun up instantly, that can't be shut down by governments, that are resistant to internet censorship, and that allow small groups of people to collaborate effectively.

![](/docs/assets/getting-started-dao-0.png)

> Example of a decentralized, censorship-resistant, good-looking voting app on Aragon

# Introduction

Many of us have gone through the pain of setting up a corporate entity. Or felt like we've lacked the tools to collaborate with people all around the globe when we're building stuff we want to see in the world.

Right now, the current system simply doesn't work. If you want to set up an organisation you have to go to lawyers, pay thousands of dollars, and all you get in return is a set of unintelligible pieces of paper that cost you more than months of development.

On top of this, these pieces of paper don't enforce anything by themselves: they're more like an idea, or a concept.

If you try to explain this to a kid, you quickly realise how mad the current system seems to them. When you think about it, it's really impressive that the world functions the way it does with this sort of legacy framework and operating system underneath.

At Aragon, we believe that decentralized autonomous organizations (DAOs) are the solution to this problem.

What exactly is a DAO? There are many ways to describe a DAO, and knowledgable people may disagree on the precise definition. For our purposes, you can think of DAOs as flexible, global, and uncensorable online organizations.

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

![](/docs/assets/basics/centralized-vs-decentralized-stack.png)

> Note that there’s a spectrum from fully centralized (left) to fully decentralized (right).

And while blockchains -- like Bitcoin and Ethereum -- are key to this web3 vision, it's important to note that there are other essential parts of the web3 stack that are not covered by them.

For example, since blockchains are relatively expensive to store data on, it turns out that they don't make great file systems. That's why there's also a need for decentralized file systems like the [InterPlanetary File System](https://ipfs.io/) (which Aragon also makes use of).

### All Aragon terminology

- **DAO**: Stands for Decentralized Autonomous Organization. Here, a DAO means a set of aragonOS smart contracts.
- **DAO Template**: Smart contracts that can be used as templates for creating pre-configured DAOs.
- **Aragon apps**: Apps that use aragonOS, aragonAPI, and integrate inside the Aragon client.
- **Access Control List (ACL)** The ACL is a mapping of who has permission to execute an action in an Aragon app and who can re-grant or revoke that permission.
- **aragonID**: aragonID is a lightweight identity system using [ENS](http://ens.domains).
- [**Aragon client**](http://app.aragon.org): Client to interact with aragonOS-powered decentralized organizations. It implements a signer with transaction pathing, notifications and a sandboxed environment for aragonOS-based apps using aragonAPI.
- **aragonOS**: Framework that enables flexible and upgradeable governance mechanisms by creating and assigning permissions to multiple entities.
- **aragonPM**: Decentralized package manager based on aragonOS that handles upgreadability of smart contracts and arbitrary data blobs, such as webapps.
- **aragonPM Repository**: Smart contract deployed inside aragonPM that keeps track of the versions for a package.
- **aragonAPI**: Standard set of APIs and specifications used to interact with aragonOS-powered contracts by handling transaction pathing, upgradeability, and contract state. Reference implementations in specific languages:
  - JavaScript
- **aragonUI**: Aragon-native toolkit of UI components for decentralized apps.
- **aragonCLI**: Tool for creating, testing and publishing Aragon applications.
- **Aragen**: Tool that automatically generates everything that is needed to run Aragon on a local Ethereum chain.

### Further resources

- [DAOs and the Web3 vision](https://www.youtube.com/watch?v=YG3a5ihbkAQ)
- [The future of organizations](https://blog.aragon.one/the-future-of-organizations/)
- [The Aragon Manifesto](https://blog.aragon.org/the-aragon-manifesto-4a21212eac03/)
- [The Aragon Whitepaper](https://github.com/aragon/whitepaper)
- [Aragon Black: #1 White paper & Manifesto](https://blog.aragon.black/white-paper-manifesto/)
- [Can Aragon make decentralized autonomous governance work](https://breakermag.com/can-aragon-make-decentralized-autonomous-governance-work/)
- [Why The Internet Needs IPFS Before It’s Too Late](https://techcrunch.com/2015/10/04/why-the-internet-needs-ipfs-before-its-too-late/)
- [A hands-on introduction to IPFS](https://medium.com/coinmonks/a-hands-on-introduction-to-ipfs-ee65b594937)
- [Blockchain infrastructure landscape: a first principles framing](https://medium.com/@trentmc0/blockchain-infrastructure-landscape-a-first-principles-framing-92cc5549bafe)
- [The case for decentralization](https://a16zcrypto.com/2019/04/why-work-in-crypto-startup-grind-2019/)
- [What comes after open source?](https://a16zcrypto.com/2019/01/what-comes-after-open-source/)
- [Fat protocols](http://www.usv.com/blog/fat-protocols)

## Next steps

We hope you enjoyed that 😊! Please don't hesitate to leave us any [feedback](https://aragon.chat/channel/feedback).

Now that you’ve built your first DAO, feel free to take a look at the docs. If you're interested in understanding things at a deeper level, we recommend you jump straight into our [awesome tutorial](/docs/tutorial.html).

## Contributing

You should find that there is a light blue EDIT button in the top-right corner the page. This button is available on every page of the Aragon docs. If you feel like you can improve our documentation in any way, please don't hesitate to click on it!

If you don't have any programming experience or if this is your first time contributing to an open-source project, don't worry. We've created a [GitHub guide](https://github.com/aragon/hack/tree/master/docs-internal/github-guide.md) just for you 😊.

P.S. Before you submit any changes, make sure to read our [contribution guidelines.](https://github.com/aragon/hack/blob/master/CONTRIBUTING.md)
