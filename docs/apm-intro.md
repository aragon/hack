---
id: apm-intro
title: aragonPM Introduction
sidebar_label: Introduction
hide_title: true
---

![](/docs/assets/brand/aragonpm.png)

#####

**Upgradeability** is one of the key features of [aragonOS](/docs/aragonos-intro.html).

Because upgradeability implies there will be multiple versions of a package of software, we decided to build aragonPM as the main way to **distribute different versions of the packages** that comprise the Aragon client. As we built it, however, we realized that its use cases could extend far beyond just ours as a publicly accessible piece of infrastructure living on Ethereum.

A package or **repository** (repo) in an aragonPM registry keeps track of evolving versions of its contents (the webapp component typically) and smart contract code (if applicable).

## aragonPM as an Aragon DAO

aragonPM is built on top of [aragonOS](/docs/aragonos-intro.html). It is a Decentralized Autonomous Organization (DAO) running on the same Aragon that‘s used to build Aragon organizations (to take advantage of upgradeability and access control)!

This allows for many aragonPM registries to exist with different governance models for package creation and publishing new versions. There is an official Aragon curated instance, `aragonpm.eth`, which has high quality standards and strict restrictions on what can get published, that we use for publishing our core components.

Different aragonPM registries in which everyone can publish their packages are expected to be created by the community, and we have set up `open.aragonpm.eth` on both the main and Rinkeby networks as an open instance available for any one to publish to.

#####

### Guides

1. [Learn how to build your first app](/docs/tutorial), so you can publish it onto an aragonPM registry
2. [Publish your application onto an aragonPM registry with the CLI](/docs/guides-publish)
3. [Guide others to install your app from an aragonPM registry](/docs/guides-custom-deploy), and finally,
4. [Submit your app to the Aragon Client's App Center](/docs/app-center-submission)
