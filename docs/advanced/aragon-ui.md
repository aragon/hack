---
id: aragon-ui
title: aragonUI
sidebar_label: aragonUI
hide_title: true
---

![](/docs/assets/brand/aragonui.png)

**aragonUI** is an Aragon-native toolkit of UI components for decentralized apps. It follows the [Aragon client](/docs/basics/basics-stack.html#aragon-client.md) design language and will make your app appear as a seamless part of the Aragon ecosystem. Using the aragonUI for your app, however, is not mandatory.

Here is the [gallery of UI components](https://ui.aragon.org/).

Use the following command to install aragonUI:

```sh
npm install --save @aragon/ui
```

Copy the aragonUI assets into your public directory:

```sh
npx copy-aragon-ui-assets ./public
```

Wrap your app in the `Main` component:

```jsx
import { Main } from '@aragon/ui'

function App() {
  return <Main>{/* Your app goes here */}</Main>
}
```

#### Theming

aragonUI supports themes, which can adapt to the preference of the user. This is how you can pass the current theme from aragonAPI to aragonUI:

```jsx
import { useGuiStyle } from '@aragon/api-react'
import { Main } from '@aragon/ui'

function App() {
  const { appearance } = useGuiStyle()
  return <Main theme={appearance}>{/* Your app goes here */}</Main>
}
```

[Check the project website](https://ui.aragon.org/getting-started/) for more information.
