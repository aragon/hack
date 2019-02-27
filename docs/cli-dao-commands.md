---
id: cli-dao-commands
title: DAO commands
sidebar_label: DAO commands
---

[//]: # "TODO: dao act and dao token"

The `aragon dao` commands can be used for interacting with your DAO directly from the command line. These commands are also available directly using the `dao` alias.


### dao new

Uses a DAO Kit to create a new DAO and prints its address.

Options:
- `--kit`: The aragonPM repo name of the kit that is used to create the DAO. Defaults to `bare-kit.aragonpm.eth`.
- `--kit-version [version-number|latest]`: The version of the repo that will be used to create the DAO. Defaults to `latest`.
- `--fn`: The function on the kit that is called to create a new DAO. Defaults to the `newBareInstance` function for `bare-kit.aragonpm.eth`.
- `--fn-args`: The arguments that the function to create the kit is called with. Defaults to an array of arguments.
- `--deploy-event`: The name of the event that is emitted when the DAO is created. The DAO address must be a return argument in the event log named `dao`. Defaults to `DeployInstance`.


### dao upgrade

The `dao upgrade` command upgrades all instances of an app to a newer version.

```
dao upgrade [dao-addr] [app-apm-repo] [repo-version]
```

- `dao-addr`: The main address of the DAO (Kernel).
- `app-apm-repo`: The repo name of the app being upgraded (e.g. `voting` or `voting.aragonpm.eth`).
- `repo-version`: Version of the repo that the app will be upgraded to; can be a version number or `latest` for the newest published version (defaults to `latest`).

aragonOS protects against having different instances of a particular app running with different versions (e.g. all the Voting app instances run the same version).  Performing a `dao upgrade` will upgrade all instances of the app to the version specified.


### dao install

The `dao install` command installs an instance of an app in the DAO.

```
dao install [dao-addr] [app-apm-repo] [repo-version]
```


- `dao-addr`: The main address of the DAO (Kernel).
- `app-apm-repo`: The repo name of the app being installed (e.g. `voting` or `voting.aragonpm.eth`).
- `repo-version`: Version of the repo that will be installed; can be a version number or `latest` for the newest published version (defaults to `latest`).

In aragonOS an app is considered to be installed in a DAO if it uses the DAO Kernel as its Kernel and there are references to the app in the ACL of the DAO.

The `dao install` command will create an instance of the app and assign permissions to the main account to perform all the protected actions in the app.

By default it will initialize the app using `initialize` function, which can be changed with `--app-init` option, and with arguments provided in `--app-init-args`. If you want to skip app initialization (which is not generally recommended), you can do it by setting `--app-init` to `none`.

As explained in the [upgrade command](#dao-upgrade), all app instances of the same app in DAO must run the same version, so installing an app with a version will effectively upgrade all app instances to this version.


### dao apps

Used to inspect all the installed apps in a DAO.

```
dao apps [dao-addr]
```

- `dao-addr`: The main address of the DAO (Kernel).


### dao exec

Performs transactions in your DAO directly from the CLI. It supports [transaction pathing](forwarding-intro.md) so if your account cannot perform the action directly it will try to find how to do it (e.g. creating a vote).

```
dao exec [dao-addr] [app-proxy-addr] [method] [argument1 ... argumentN]
```

- `dao-addr`: The main address of the DAO (Kernel).
- `app-proxy-addr`: The address of the app where the action is being performed. You can find the proxy address by checking [`dao apps`](#dao-apps).
- `method`: Name of the method being executed in the app (e.g. `withdrawTokens`).
- `arguments`: The arguments that the method will be executed with (each separated by a space).


### dao acl

Used to inspect the ACL state in a DAO to check its permissions.

```
dao acl [dao-addr]
```
- `dao-addr`: The main address of the DAO (Kernel).


### dao acl create

Used to create a permission in the ACL. Can only be used if the permission hasn't been created before. The `manager` of the permission can use `dao acl grant` and `dao acl revoke` to manage the permission.

```
dao acl create [dao-addr] [app-proxy-addr] [role] [entity] [manager]
```

- `dao-addr`: The main address of the DAO (Kernel).
- `app-proxy-addr`: The address of the app whose permissions are being managed. You can find the proxy address by checking [`dao apps`](#dao-apps).
- `role`: The identifier for the role. Can be the `bytes32` identifier of the role or its name (e.g. `INCREMENT_ROLE`).
- `entity`: The address of the entity that is being granted the permission by creating it.
- `manager`: The address of the entity that will be able to grant that permission or revoke it.


### dao acl grant

Used to grant a permission in the ACL.

```
dao acl grant [dao-addr] [app-proxy-addr] [role] [entity]
```

- `dao-addr`: The main address of the DAO (Kernel).
- `app-proxy-addr`: The address of the app whose permissions are being managed. You can find the proxy address by checking [`dao apps`](#dao-apps).
- `role`: The identifier for the role. Can be the `bytes32` identifier of the role or its name (e.g. `INCREMENT_ROLE`).
- `entity`: The address of entity that is being granted the permission.


### dao acl revoke

Used to revoke a permission in the ACL.

```
dao acl revoke [dao-addr] [app-proxy-addr] [role] [entity]
```

- `dao-addr`: The main address of the DAO (Kernel).
- `app-proxy-addr`: The address of the app whose permissions are being managed. You can find the proxy address by checking [`dao apps`](#dao-apps).
- `role`: The identifier for the role. Can be the `bytes32` identifier of the role or its name (e.g. `INCREMENT_ROLE`).
- `entity`: The address of entity that is being revoked the permission.


### dao acl set-manager

Used to change the manager of a permission in the ACL.

```
dao acl set-manager [dao-addr] [app-proxy-addr] [role] [manager]
```

- `dao-addr`: The main address of the DAO (Kernel).
- `app-proxy-addr`: The address of the app whose permissions are being managed. You can find the proxy address by checking [`dao apps`](#dao-apps).
- `role`: The identifier for the role. Can be the `bytes32` identifier of the role or its name (e.g. `INCREMENT_ROLE`).
- `manager`: The new manager for the permission.


### dao acl remove-manager

Used to remove the manager of a permission in the ACL. The permission can be created again after removing its manager.

```
dao acl remove-manager [dao-addr] [app-proxy-addr] [role]
```

- `dao-addr`: The main address of the DAO (Kernel).
- `app-proxy-addr`: The address of the app whose permissions are being managed. You can find the proxy address by checking [`dao apps`](#dao-apps).
- `role`: The identifier for the role. Can be the `bytes32` identifier of the role or its name (e.g. `INCREMENT_ROLE`).
