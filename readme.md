# Documentation portal for Aragon Apps <a href="https://hack.aragon.org/"><img align="right" src=".github/assets/aragon.svg" height="80px" /></a>

## Running a local instance

### Prerequisites

- [`solc@v0.4.24`](https://github.com/ethereum/solidity/releases/tag/v0.4.24)

> [`solc-select`](https://github.com/crytic/solc-select) is your best friend when it comes to installing solc!

Note: `solidity-docgen` [does not work on Windows](https://github.com/OpenZeppelin/solidity-docgen/issues/22).


```sh
git clone https://github.com/aragon/hack.git
cd hack/website
yarn install
yarn start
```

This should open your local instance of these docs in your browser at <http://localhost:3000/>.

## Publishing

The documentation is published via [gh-pages](https://pages.github.com/). Automatic deployments are handled through an [deployment Github Action](.github/workflows/ci.yml) on pushes to the `master` branch.

If you'd like to publish it locally though, you can run:

```sh
cd website
yarn install
yarn run build
yarn run publish-gh-pages
```

Note: the `aragonOS` files **must** be generated on publish, [see issue](https://github.com/aragon/hack/issues/116).

## Contributing

Thanks for your interest in contributing to these docs!
Get started [here](https://github.com/aragon/hack/blob/master/CONTRIBUTING.md).
