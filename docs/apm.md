---
id: apm
title: aragonPM
sidebar_label: Architecture
hide_title: true
---

![](/docs/assets/brand/aragonpm.png)

**Upgradeability** is one of the key features of [aragonOS](/docs/aragonos-intro.html).

Because upgradeability implies there will be multiple versions of a package of software, we decided to build aragonPM as the main way to **distribute different versions of the packages** that comprise the Aragon client. As we built it, however, we realized that its use cases could extend far beyond just ours as a publicly accessible piece of infrastructure living on Ethereum.

A package or **repository** (repo) in an aragonPM registry keeps track of evolving versions of its contents (the webapp component typically) and smart contract code (if applicable).

## aragonPM as an Aragon DAO

aragonPM is built on top of [aragonOS](/docs/aragonos-intro.html). It is a Decentralized Autonomous Organization (DAO) running on the same Aragon that‘s used to build Aragon organizations (to take advantage of upgradeability and access control)!

This allows for many aragonPM registries to exist with different governance models for package creation and publishing new versions. There is an official Aragon curated instance, `aragonpm.eth`, which has high quality standards and strict restrictions on what can get published, that we use for publishing our core components.

Different aragonPM registries in which everyone can publish their packages are expected to be created by the community, and we have set up `open.aragonpm.eth` on both the main and Rinkeby networks as an open instance available for any one to publish to.

## Architecture: registries, repos and versions

![](/docs/assets/apm-arch.png)
> The architecture of an aragonPM DAO

As a DAO, each aragonPM registry includes a number of installed applications, including one APMRegistry, one ENSSubdomainRegistrar, and many Repo instances. The aragonPM registry controls a [Ethereum Name Service](https://ens.domains/) (ENS) domain through its ENSSubdomainRegistrar, allowing each new created Repo to be assigned its own subdomain. This gives users the ability to **find repos with human-readable names**, such as `voting.aragonpm.eth`.

We envision that many aragonPM registries will be created for different purposes and types of packages. For Aragon, we use the `aragonpm.eth` registry to host our core components. We also have the `open.aragonpm.eth` registry for community developed packages, where anyone can create repos.

At the repo level, each repo can have **its own rules** that govern **how new versions can be published** using the [Access Control List](/docs/acl-intro.html) from aragonOS. This allows for setting up different types of processes depending on the importance of the repo or the nature of the upgrade (major, minor or patch).

![](/docs/assets/apm-repo.png)
> A Repo is created in a Registry and can have many versions published over time

A repo keeps a versioned history of content and smart contract code tuples. The content is an on-chain reference to a blob of data that lives off-chain (we currently support IPFS or HTTP addressing). By using IPFS we have the assurance of the **integrity** of the data and that it hasn't changed since it was published. We recommend to always publish using a content-addressed network, like IPFS, but having HTTP is useful for testing or less critical code.

The smart contract code only applies to packages that have an on-chain contract component associated with a particular version. It can be the **implementation code for [upgradeable Proxies](/docs/upgradeability-intro.html)** or a smart contract that can be directly used. By having these code addresses stored on-chain, smart contracts can use aragonPM directly to get the latest version of the code for a repo.

aragonPM gives users **complete transparency** over all deployments and **traceability** of what the process of publishing a new version entailed.

It is important to point out that aragonPM acts as the reference to what the last version of a repo is but **all upgrades are opt-in** and users of the repo, such as Aragon organizations, need to decide to upgrade or keep using an old version through their own governance mechanisms. Automatically upgrading all users of a repo is extremely dangerous regardless of the upgrade governance mechanism. That's why all upgrades are opt-in and must be started by the user. Someone could, however, build an auto-update contract that users could allow to automatically update their dependencies.

## Interacting with aragonPM: apm.js and aragonCLI

In order to interact with aragonPM registries, we have built [apm.js](https://github.com/aragon/apm.js) as a standalone JS library to inspect aragonPM repos, get their different versions, and fetch the referenced content. The library also allows interaction with aragonPM contracts for creating new repos or versions.

The [aragonCLI](/docs/cli-usage.html) also uses apm.js to provide a great developer experience for creating and publishing new versions of Aragon apps as aragonPM repos. The CLI's aragonPM commands, accessible through `aragon apm`, are the easiest way to manage aragonPM repos.

![](/docs/assets/apm-publish.png)
>  Using the aragonCLI to publish a version to an aragonPM repo and inspect it
