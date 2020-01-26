---
id: aragon-dir
title: ~./aragon directory
sidebar_label: ~./aragon directory
---

#####

## The ~/.aragon directory

The aragonCLI creates the `.aragon` directory under the user directory where it saves the state of the devchain and the [Aragon client](client.md).

In case the client is not loading properly, deleting the `~/.aragon` directory will make `aragon run` recreate the environment the next time it is used and may solve the issue.
