---
id: ipfs
title: IPFS
sidebar_label: IPFS
---

#####

### IPFS version

If you have a version recent than `0.4.18-hacky2` you should first uninstall your current version with `aragon ipfs unisntall` and then install ipfs again with `aragon ipfs install`.

The latest version `0.4.21` is throwing:

```
ERROR p2pnode: mdns error: could not determine host IP addresses
```

This error is tracked [here](https://github.com/ipfs/go-ipfs/issues/6359). It was fixed, but not released yet.

### Resetting IPFS

After upgrading aragonCLI, or if unexpected errors are being experienced, resetting IPFS by deleting the `~/.ipfs` directory and then run `aragon ipfs` sometimes help.

### Difficult for a local IPFS node to load information from our IPFS server

The best way around this is to:

1. Keep trying on the local ipfs daemon
2. Try accessing that same file in a more generic gateway, like `ipfs.io/ipfs`
3. Downloading our [deployments repo](https://github.com/aragon/deployments) and running `npm run pin` to load all of the previous deployments into your local ipfs daemon (this is _a lot_ of data though; ~2gb right now). Alternatively you can decompress the archive you need and then just pin that.
