---
id: aragonui-intro
title: Aragon UI intro
---

**Aragon UI** is an Aragon-native toolkit of UI components for decentralized apps. It will make your app look consistent with the whole look of the [Aragon client](client.md), in a way that it will not even look like the user is running apps from different developers. However, it is **not mandatory to create an Aragon app**.

You can check the [gallery of UI components](http://ui.aragon.one/).

You can install it by doing:
```
npm i @aragon/ui
```

It comes with some assets, like fonts or images. These need to be copied where Aragon UI can access them.

The path to the assets can then be communicated to Aragon UI using the global component `<AragonApp />`:

```javascript
import { AragonApp } from '@aragon/ui'

const App = () => (
  <AragonApp publicUrl="/">
    {/* Your app goes here */}
  </AragonApp>
)
```

To get the path of the directory from where the assets need to be copied, use `path.dirname(require.resolve('@aragon/ui'))`.