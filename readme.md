# Instructions for running these docs

## Prerequisites

- [`solc`](https://github.com/ethereum/solidity/releases)

Note: `solidity-docgen` [does not work on Windows](https://github.com/OpenZeppelin/solidity-docgen/issues/22).

## Running a local instance

```sh
git clone https://github.com/aragon/hack.git
cd hack/website
npm install
npm start
```

This should open your local instance of these docs in your browser at <http://localhost:3000/>.

## Publishing

```sh
cd website
npm install
npm run build
npm run publish-gh-pages
```

## Syncing files

Currently the docs for `aragonCLI` and `aragon.js` are being pulled from their own repositories.
(see `./website/scripts`)

This is a one way sync and any changes to the docs in **this** repo have to be synced manually by
maintainers 🤔.

Please make sure to check the diff when doing the sync!

## Contributing

Thanks for your interest in contributing to these docs!
Get started [here](https://github.com/aragon/hack/blob/master/CONTRIBUTING.md).
