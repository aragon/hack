---
id: api-intro
title: aragonAPI Introduction
sidebar_label: Introduction
hide_title: true
---

![](/docs/assets/brand/aragonapi.png)

Standard set of APIs and specifications used to interact with aragonOS-powered contracts by handling transaction pathing, upgradeability, and contract state without depending of a centralized service.

## Reference implementations in specific languages

### JavaScript

A JavaScript implementation of aragonAPI, used to interact with aragonOS by handling transaction pathing, upgradeability, identity providers and state of the contracts.

Some of the things you can do with the JavaScript implementation are:

- Connect contracts to front-end
- Interact with the EVM and [aragonOS](os-intro.md) when using the full Aragon System
- Abstract Web3 so a direct Web3 connection isn't exposed to the browser
- Use a store method wich mantains the application state using caching
- Pull [Radspec](human-readable-txs.md) notices from contracts

#### Quick Start

- [Quick Start for apps](js-quick-start.md)

#### Docs

- [App API](js-ref-app.md)
- [Wrapper API](js-ref-wrapper.md)
- [React API](js-ref-react.md)
- [Providers](js-ref-providers.md)
- [Architecture of Aragon apps and their communication channels](js-ref-architecture.md)

#### Guides

- [Background Scripts](js-guide-bg-scripts.md)
