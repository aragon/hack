---
id: package-management
title: Package management
sidebar_label: Package management
---

![](/docs/assets/brand/aragonpm.png)

### Publishing and upgrading Aragon apps
---

To ease upgrades for Aragon apps, both app **smart contracts and frontend can be upgraded using the Aragon Package Manager**.

The Aragon Package Manager (APM) is built on top of aragonOS itself. **APM is a DAO itself** running on aragonOS (taking advantage of upgradeability and the ACL).

APM allows for multiple package registries to exist with different governance models for package publishing and releasing new versions. There is an official Aragon curated one, `aragonpm.eth`, which has very strict restrictions of what gets published and very high quality standards, that we use for publishing our core components.

Different APM registries in which everyone can publish their packages are expected to be created by the community, and **you can create your own registry** and have full control over it!

#### Read more: [Aragon Package Manager architecture](/docs/apm.html)
