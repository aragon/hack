# Instructions for running these docs

## Prerequisites

- [`solc@v0.4.24`](https://github.com/ethereum/solidity/releases)

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

Note: the `aragonOS` files **must** be generated on publish, [see issue](https://github.com/aragon/hack/issues/116).

## Contributing

Thanks for your interest in contributing to these docs!
Get started [here](https://github.com/aragon/hack/blob/master/CONTRIBUTING.md).
