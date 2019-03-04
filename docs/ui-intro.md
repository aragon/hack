---
id: aragonui-intro
title: aragonUI intro
sidebar_label: Introduction
hide_title: true
---

![](/docs/assets/brand/aragonui.png)

**aragonUI** is an Aragon-native toolkit of UI components for decentralized apps. It follows the [Aragon client](client.md) design language and will make your app appear as a seamless part of the Aragon ecosystem. Using the aragonUI for your app, however, is not mandatory.

Here is the [gallery of UI components](https://ui.aragon.org/).

Use the following command to install aragonUI:
```
npm i @aragon/ui
```

And wrap your app in the `Main` component:

```javascript
import { Main } from '@aragon/ui'

const App = () => (
  <Main>
    {/* Your app goes here */}
  </Main>
)
```

[Check the project on GitHub](https://github.com/aragon/aragon-ui#getting-started) for more information.
