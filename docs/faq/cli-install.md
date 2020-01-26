---
id: cli-install
title: Installing aragonCLI
sidebar_label: Install aragonCLI
---

#####

### Unix considerations

If you're seeing several errors (e.g. `node-gyp rebuild`) it's probably cause you need to run node long term support (LTS) version, currently `10.15.3`.

If you're seeing one or more errors that look like:

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

You might need to run the shell with administrator rights when installing the aragonCLI, because our `go-ipfs` dependency will need to create a symlink to work correctly.

If you have problems during the instalation of aragonCLI or any other dependencies. You probably need to install [windows-build-tools](https://www.npmjs.com/package/windows-build-tools) or similar package.

Again, if you're having trouble fixing things, please reach out to us at the [#dev-help channel on the Aragon Chat](https://aragon.chat/channel/dev-help)

### Note on Git

You might need to have [Git](https://git-scm.com) installed. If you're unsure what Git is, or whether you have it installed, we recommend you follow [this tutorial.](https://www.learnenough.com/git-tutorial/getting_started)
