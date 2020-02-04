---
id: guides-faq
title: Troubleshooting and FAQ
sidebar_label: Troubleshooting
---

#####

## Installing aragonCLI

### Unix considerations

If you're seeing several installation errors (e.g. `node-gyp rebuild`), the problem is probably due to an outdated Node.js version.

aragonCLI currently supports the latest releases of the following Node.js versions: 10, 11 and 12.  

If you're seeing errors similar to:

```sh
EACCES: permission denied
```

It's probably because you originally installed Node with root permissions. Because of this, writing to your npm directory (`npm -i -g`) requires root permissions too.

While it's not a good idea to have Node installed this way, one way to quickly give yourself root permissions is to run the slightly modified command:

```sh
sudo npm i -g --unsafe-perm @aragon/cli
```

An arguably better way to fix the problem is to follow the steps outlined in this [stackoverflow answer.](https://stackoverflow.com/a/24404451)

### Windows considerations

Windows is not officially supported by aragonCLI at the moment. 

### Note on Git

You might need to have [Git](https://git-scm.com) installed. If you're unsure what Git is, or whether you have it installed, we recommend you follow [this tutorial.](https://www.learnenough.com/git-tutorial/getting_started)

## Resetting the devchain

After upgrading aragonCLI, or if unexpected errors are being experienced, [resetting the devchain](/docs/cli-main-commands.html#aragon-devchain) (by doing `aragon devchain --reset` or `aragon run --reset`) is sometimes useful as it will restart the chain from the snapshot.

## The ~/.aragon directory

The aragonCLI creates the `.aragon` directory under the user directory where it saves the state of the devchain and the [Aragon client](client.md).

In case the client is not loading properly, deleting the `~/.aragon` directory will make `aragon run` recreate the environment the next time it is used and may solve the issue.

## Set a private key

For interacting with aragonCLI you can configure a private key in `~/.aragon`. Create a file `<network>_key.json` (eg. `rinkeby_key.json`) with this structure:

```json
{
  "rpc": "https://<network>.eth.aragon.network",
  "keys": ["put-your-priv-key-here"]
}
```

Then if you use `--environment aragon:<network>` when using the aragonCLI commands it will use that account.

You can also define a `~/.aragon/mnemonic.json` file like:

```json
{
  "mnemonic": "explain tackle mirror kit ..."
}
```

## Verifying your contracts

You can validate the smart contract and other files of a specific app installed in your DAO with:

```sh
dao apps <dao-address>
```

For example `voting@1.1.5`. We can check the information for that deployment in the [`deploys.yml` file](https://github.com/aragon/deployments/blob/470c6929674a4afe4f89f9a6917578f7e9486d39/environments/rinkeby/deploys.yml#L40). Be sure to look in the environment you are working (eg. rinkeby).

You can check the `commitHash` in aragon-apps GitHub repo and view the smart contract code that was deployed for that specific version. For `v1.1.5` this is the [code deployed](https://github.com/aragon/aragon-apps/blob/d99b6e9d62d3de47601077adb6b3b14fbe92f8a9/apps/voting/contracts/Voting.sol)

## IPFS

### IPFS version

If you have a version older than `0.4.22`, you should first uninstall your current version with `aragon ipfs unisntall` and install IPFS again with `aragon ipfs install`.

### Resetting IPFS

After upgrading aragonCLI, or if unexpected errors are being experienced, resetting IPFS by deleting the `~/.ipfs` directory and then run `aragon ipfs` sometimes help.

### Difficulty for a local IPFS node to load information from Aragon's IPFS server

The best way around this is to:

1. Keep trying on the local ipfs daemon
2. Try accessing that same file in a more generic gateway, like `ipfs.io/ipfs`
3. Downloading our [deployments repo](https://github.com/aragon/deployments) and running `npm run pin` to load all of the previous deployments into your local ipfs daemon (this is _a lot_ of data though; ~2gb right now). Alternatively you can decompress the archive you need and then just pin that.

### Propagating your content hash through IPFS

When publishing a package via `aragon apm publish`, you will be returned an IPFS content (root) hash. For the Aragon client to load these files through its default IPFS configuration, this hash needs to be accessible at `https://ipfs.eth.aragon.network/ipfs/<hash>`.

If you are running into issues with your hash being propagated to this URL, try running `ipfs propagate <hash>` or the following steps.

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

## Metamask

### Using Metamask

To interact with your DAO using [Metamask](https://metamask.io/) you must make sure that:

- It's unlocked
- Private network (_Localhost 8545_) is chosen
- The first account provided by `aragon run` or `aragon devchain` is imported and selected. To import the account, copy the private key (something like `a8a5...1563`), go to the Metamask accounts upper icon (to the left of the hamburguer button), scroll down, click on "Import account" and paste the value you copied.

### Issues sending transactions

Because of the way that Metamask caches the account nonces for the different networks, you may be getting the following error when interacting with your app:

```sh
Error: the tx doesn't have the correct nonce. account has nonce of: 157 tx has nonce of: 158
```

The workaround is to switch to a different network (e.g. Rinkeby) and then switch back to the _Localhost 8545_ network. This will refresh Metamask's account nonce cache. Sending transactions should now succeed.
