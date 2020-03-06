---
id: guides-buidler-migration
title: Buidler plugin migration
sidebar_label: Buidler plugin migration
---

##### How to migrate an existing Aragon app to the Buidler plugin

This guide aims to explain how to migrate an Aragon app to the new [Aragon Buidler plugin](https://blog.aragon.one/buidler-plugin). 

We assume you have a general understanding of the Aragon stack.

## 1. Install dependencies

### Dev dependencies

  - **"@aragon/buidler-aragon"**: "^0.1.0"
  - **"@aragon/contract-test-helpers"**: "0.0.1"
  - **"@nomiclabs/buidler"**: "^1.0.2"
  - **"@nomiclabs/buidler-truffle5"**: "^1.1.2"
  - **"@nomiclabs/buidler-web3"**: "^1.1.2"
  - **"bignumber.js"**: "^9.0.0"
  - **"web3"**: "^1.2.6"


## 2. Update `.gitignore` file

  - artifacts
  - cache

## 3. Add/replace npm scripts

In `package.json`:

  - "postinstall": "npm run build-app"
  - "build-app": "cd app && npm install && cd .."
  - "compile": "buidler compile --force"
  - "start": "buidler start"
  - "test": "buidler test --network buidlerevm"

Also, make sure that you have the following two scripts in `app/package.json`:

  - **serve**: Launches the web server (`devserver` script in most projects)
  - **watch**: Watches for file changes (`watch:script` script in most projects)



Publish is not available at the moment.

## 4. Create the Buidler config file

`buidler.config.js`: 

```js
const { usePlugin } = require('@nomiclabs/buidler/config')

usePlugin('@aragon/buidler-aragon')

module.exports = {
  defaultNetwork: 'localhost',
  networks: {
    localhost: {
      url: 'http://localhost:8545'
    },
  },
  solc: {
    version: '0.4.24',
    optimizer: {
      enabled: true,
      runs: 10000
    }
  },
  aragon: {
    appServePort: 1234,
    clientServePort: 3000,
    appSrcPath: 'app/',
    appBuildOutputPath: 'dist/',
    hooks: require('./scripts/buidler-hooks')
  }
}
```

## 5. Hooks

`scripts/buidler-hooks.js`:

```js
module.exports = {

  // Called before a dao is deployed.
  preDao: async ({}, { web3, artifacts }) => {},

  // Called after a dao is deployed.
  postDao: async ({ dao }, { web3, artifacts }) => {},

  // Called after the app's proxy is created, but before it's initialized.
  preInit: async ({ proxy }, { web3, artifacts }) => {},

  // Called after the app's proxy is initialized.
  postInit: async ({ proxy }, { web3, artifacts }) => {},

  // Called when the start task needs to know the app proxy's init parameters.
  // Must return an array with the proxy's init parameters.
  getInitParams: async ({}, { web3, artifacts }) => {
    return []
  },

  // Called after the app's proxy is updated with a new implementation.
  postUpdate: async ({ proxy }, { web3, artifacts }) => {}
}
```

## 5. Migrate tests

## 6. Uninstall unnecessary dependencies

