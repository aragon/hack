---
id: cli-faq
title: Troubleshooting/FAQ
sidebar_label: Troubleshooting
---

### Resetting the devchain

After upgrading the CLI, or if unexpected errors are being experienced, [resetting the devchain](#aragon-devchain) (by doing `aragon devchain --reset` or `aragon run --reset`) is sometimes useful as it will restart the chain from the snapshot.


### Using Metamask

The easiest way to interact with your DAO is using [Metamask](https://metamask.io/). In order to do so, you must make sure that:

- It's unlocked
- Private network (_Localhost 8545_) is chosen
- The first account provided by `aragon run` or `aragon devchain` is imported and selected. To import the account, copy the private key (something like `a8a54b2d8197bc0b19bb8a084031be71835580a01e70a45a13babd16c9bc1563`), go to the Metamask accounts upper icon (to the left of the hamburguer button), scroll down, click on "Import account" and paste the value you copied.


### Issues sending transactions

Because of the way that Metamask caches the account nonces for the different networks, you may be getting the following error when interacting with your app:

```
Error: the tx doesn't have the correct nonce. account has nonce of: 157 tx has nonce of: 158
```

The workaround is to switch to a different network (e.g. Rinkeby) and then switch back to the _Localhost 8545_ network.  This will refresh Metamask's account nonce cache. Sending transactions should now succeed.


### The ~/.aragon directory

The aragonCLI creates the `.aragon` directory under the user directory where it saves the state of the devchain and the Aragon client.

In case the client is not loading properly, deleting the `~/.aragon` directory will make `aragon run` recreate the environment the next time it is used and may solve the issue.

### Propagating your content hash through IPFS
When publishing a package via `aragon apm publish`, you will be returned an IPFS content (root) hash. For the Aragon client to load these files through its default IPFS configuration, this hash needs to be accessible at `https://ipfs.eth.aragon.network/ipfs/<hash>`.

If you are running into issues with your hash being propagated to this URL, try the following steps.

1. If you have `aragon ipfs` running, quit that daemon.
2. Run the command `ipfs daemon --enable-namesys-pubsub`.
3. Propagate your content through public gateways.
    - Request your content hash at the following gateways. The `index.html` will automatically be loaded if it's available in the hash's root directory:
      - `https://ipfs.eth.aragon.network/ipfs/<hash>`
      - `https://ipfs.io/ipfs/<hash>`
      - `https://ipfs.infura.io/ipfs/<hash>`
      - [Check this list](https://discuss.ipfs.io/t/curated-list-of-ipfs-gateways/620) for additional gateways if you are having trouble with propagating.
    - If your content also includes an `artifact.json` or `manifest.json`, make sure to separately request these as they will usually not be requested by the `index.html`:
      - `<gateway>/ipfs/<hash>/artifact.json`
      - `<gateway>/ipfs/<hash>/manifest.json`
    - Keep retrying if any files don't immediately become available.
4. Once successful with step 3, request your hash at the Aragon gateway to double check it has propagated and is immediately accessible by the Aragon client:
    - `https://ipfs.eth.aragon.network/ipfs/<hash>`
    - (If applicable) `https://ipfs.eth.aragon.network/ipfs/<hash>/artifact.json`
    - (If applicable) `https://ipfs.eth.aragon.network/ipfs/<hash>/manifest.json`

Note that it is best practice to pin the content hash to an IPFS server you manage to ensure its future availability.