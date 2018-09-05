---
id: apm
title: Aragon Package Manager
sidebar_label: Architecture
hide_title: true
---

![](/docs/assets/brand/aragonpm.png)

**Upgradeability** is one of the key features of [aragonOS](/docs/aragonos-intro.html).

We decided to build APM as the main way to **distribute different versions of the packages** that comprise Aragon Core. A package or **repository** (repo) in the APM keeps track of evolving versions of its contents (the webapp component typically) and smart contract code (if applicable).

## Architecture: Registries, repos and versions

Each APM Registry is a smart contract that owns an [Ethereum Name Service](https://ens.domains/) (ENS) domain and therefore can create subdomains for its repos. This gives users the ability to **find repos with human-readable names**.

We envision that many APM registries will be created for different purposes and types of packages. For Aragon, we use the `aragonpm.eth` registry to host our core components. We also have the `open.aragonpm.eth` registry for community developed packages, where anyone can create repos.

At the repo level, each repo can have **its own rules** that govern **how new versions can be published** using the aragonOS [Access Control List](/docs/acl-intro.html). This allows for setting up different types of processes depending the importance of the repo or the nature of the upgrade (major, minor or patch).

![](https://blog.aragon.org/content/images/2018/08/0_THgdT5gn4P-WjT3d.png)

> **Caption**<br>
> A Repo is created in a Registry and can have many versions published over time

A repo keeps versioned history of content and smart contract code tuples. The content is an on-chain reference to a blob of data that lives off-chain (we support IPFS or HTTP addressing currently). By using IPFS we have the assurance of the **integrity** of the data and that it hasn't changed since it was published. Aragon always uses IPFS for publishing, but having HTTP is useful for testing purposes or for less critical code.

The smart contract code only applies to packages that have an on-chain contract component associated with a particular version. It can be the **implementation code for [upgradeable Proxies](/docs/upgradeability-intro.html)** or a smart contract that can be directly used. By having these code addresses stored on-chain, smart contracts can use APM directly to get the latest version of the code for a repo.

APM gives users **complete transparency** over all deployments and **traceability** of what process publishing a new version entailed.

Because APM repos are Aragon apps that are part of the APM Registry DAO, repos can use any of the [aragonOS](/docs/aragonos-intro.html)-compatible governance apps to govern the process for creating new updates.

It is important to point out that APM acts as the reference to what the last version of a repo is, but **all upgrades are opt-in** and DAOs through their governance mechanisms need to decide to upgrade, or keep using an old version.

Automatically upgrading all of Aragon's DAOs is extremely dangerous regardless of what the governance mechanism over upgrades is. That's why by default all upgrades must be started within the DAO, however someone could build an auto-update contract that makes the DAO and its apps up to date to the latest version in APM.

## Interacting with APM: apm.js and Aragon CLI

In order to interact with APM registries we have built [apm.js](https://github.com/aragon/apm.js), a standalone JS library to inspect APM repos, get their different versions and fetch the referenced content. The library also allows interaction with the APM contracts in order to create repos or new versions in repos.

The [Aragon CLI](/docs/cli-usage.html) also uses apm.js to provide a great developer experience to publishing new versions to APM repos. The CLI APM commands, accessible doing `aragon apm`, are the easiest way to manage APM repos.

![](https://blog.aragon.org/content/images/2018/08/0_h6eCFJahFwtwL3GN.png)

> **Caption**<br>
>  Using the Aragon CLI to publish a version to an APM repo and inspecting it
