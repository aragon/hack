---
id: cli-global-confg
title: Global configuration
sidebar_label: Global configuration
---

[//]: # "TODO: --environment, manifest.json"

### The arapp.json file

The arapp.json file contains metadata for your app. You can check an [example arapp.json](https://github.com/aragon/aragon-apps/blob/master/apps/voting/arapp.json) file to see what fields need to be present:

- `path`: The path to the main contract in your app.
- `roles`: An array of all the roles that your app has. Each role has the following properties:
  - `id`: The identifier of the role as it is defined in the contract.
  - `name`: A description of the role in the app.
  - `params`: The names of any parameters for the role.
- `environments`: An object containing deploy environment configurations.
  - `env_name`: An object containing the configuration for a specific environment. `env_name` can be any name you choose.
    - `appName`: The ENS name of your app where the aragonPM repo can be located.
    - `network`: The network to use for this environment.
    - `registry`: (optional) The address of the ENS registry for this environment. Defaults to the default ENS registry for this network.
