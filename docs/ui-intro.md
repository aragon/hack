---
id: aragonui-intro
title: Aragon UI intro
sidebar_label: Introduction
---

**Aragon UI** is an Aragon-native toolkit of UI components for decentralized apps. It follows the [Aragon client](client.md) design language and will make your app appear as a seamless part of the Aragon ecosystem. Using the Aragon UI for your app, however, is not mandatory.

Here is the [gallery of UI components](http://ui.aragon.org/).

Use the following command to install Aragon UI:
```
npm i @aragon/ui
```

The toolkit comes with some assets, like fonts or images, which need to be copied to a location that Aragon UI can access. The path to the assets can then be communicated to Aragon UI using the global component `<AragonApp />`:

```javascript
import { AragonApp } from '@aragon/ui'

const App = () => (
  <AragonApp publicUrl="/">
    {/* Your app goes here */}
  </AragonApp>
)
```

To get the path of the directory from where the assets need to be copied, use `path.dirname(require.resolve('@aragon/ui'))`.