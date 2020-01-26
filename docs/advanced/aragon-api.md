---
id: aragon-api
title: aragonAPI Introduction
sidebar_label: aragonAPI
hide_title: true
---

![](/docs/assets/brand/aragonapi.png)

#####

Standard set of APIs and specifications used to interact with aragonOS-powered contracts by handling transaction pathing, upgradeability, and contract state without depending on a centralized service.

## Reference implementations in specific languages

### JavaScript

A JavaScript implementation of the aragonAPI, used to interact with aragonOS by handling transaction pathing, upgradeability, identity providers and state of the contracts.

Some of the things you can do with the JavaScript implementation are:

- Connect contracts to front-end
- Interact with aragonOS and aragonOS-powered applications directly through an abstraction over web3.js
- Get access to application state with built in client-side caching
- Create human-readable transaction descriptions for your smart contracts through [Radspec](/docs/basics/basics-os-concepts.html#how-radspec-works)

#### Docs

- [Quick Start for apps](docs/aragon-api/js-ref-quick-start.md)
- [App API](docs/aragon-api/js-ref-api.md)
  - [React API](docs/aragon-api/js-ref-react.md)
- [Aragon client implementations (wrapper)](docs/aragon-api/js-ref-wrapper.md)
- [Providers](docs/aragon-api/js-ref-providers.md)
- [Architecture of Aragon apps and their communication channels](docs/aragon-api/js-ref-architecture.md)

#### Guides

- [Background Scripts](docs/aragon-api/js-guide-bg-scripts.md)
