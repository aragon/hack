---
id: propagation
title: Propagating your content hash through IPFS
sidebar_label: Propagation
---

#####

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
