---
id: apm-ref
title: aragonPM reference documentation
sidebar_label: Reference documentation
---

#####

aragonPM is built from three aragonOS-powered applications:

<span>![*](/docs/assets/check.svg) [APMRegistry](#apmregistry)</span><br>
<span>![*](/docs/assets/check.svg) [ENSSubdomainRegistrar](#enssubdomainregistrar)</span><br>
<span>![*](/docs/assets/check.svg) [Repo](#repo)</span><br>

## APMRegistry

### APMRegistry governance

Each instance of an APMRegistry can have a different governance model. Governance of a registry is enforced directly using the DAO's ACL.

By default a new repo will set the creator (or `dev` param) as the owner of the repo and it is the only address that can create new versions in the repo. However, as the permission manager, this account can grant the permission to create versions to other entities. These entities can be anything from another dev to a multisig or a full blown DAO.

### ENSSubdomainRegistrar

Aragon app with the logic and permissions to add and delete subdomains to the ENS domain owned by the APMRegistry DAO.

Upon initialization, ownership of the ENS name that the APMRegistry operates is transferred to the ENSSubdomainRegistrar app that is installed in the DAO. In our deployments, we ensure this is completed on deployment through a APMRegistryFactory contract that assigns the APMRegistry the ENSSubdomainRegistrar's `POINT_ROOTNODE_ROLE` and then calls `initialize()` on the APMRegistry.

The APMRegistry also needs to have permissions for the ENSSubdomainRegistrar's `CREATE_NAME_ROLE` in order to create new names, which is done every time a repo is created.

---

### API documentation

See [APMRegistry](/docs/apm_APMRegistry.html) and [ENSSubdomainRegistrar](/docs/ens_ENSSubdomainRegistrar.html).

---

## Repo

After [discovering the apps of a DAO by traversing its ACL](/docs/aragonos-ref.html#app-installation), we can fetch their `app.appId()`s and use ENS to resolve their Repo contracts:

```solidity
repo = Repo(Resolver(ens.resolver(appId)).addr(appId))

```

or using [`ethereum-ens`](https://github.com/ensdomains/ensjs):

```js
repo = Repo.at(await ens.addr(appId))
```

Every individual Repo is an Aragon app that leverages the ACL in the aragonPM DAO. Depending on each aragonPM registry's governance model, the process for creating new versions in the Repo or transferring ownership may vary.

A Repo keeps versioned state over the following components:

- **Smart contract library code** (`contractAddress`): the app code is the address of the deployed contract version of the app. An organization's Kernel determines which version of the app it uses by pointing to the app code address associated with that version.
- **Package content** (`contentURI`): defined by a location ID of where the other components of the package (e.g. frontend) are hosted (IPFS, Swarm, etc.) and the content hash for fetching it. An `arapp.json` file is expected to be found in this package.

A Repo does not need to contain both components but, whatever the case, all the rules below still apply.

By versioning both the app code address and the package content we can add additional expectations for the what semantic versioning of Repos mean:

- **Patch**: Minor changes to the package contents (e.g. frontend). Update can be performed silently for users.
- **Minor**: Significant changes to the package contents but still works with the current smart contract code. Users should be notified of the update.
- **Major**: Any change to the smart contract app code that requires user interaction in order to upgrade.

---

### Version upgrade rules

Before creating a new version in a repo an ACL check is performed to determine whether the entity has permission to create a new version.

After the ACL check, the Repo logic checks whether the version upgrade is allowed. A version bump for a package is defined by the following rules:

- Only one member of the version is increased by 1. The version components to the left of the raised member must stay the same and the components to the right must be 0.
  - Example: From `2.1.3` the only allowed bumps are to `3.0.0` (major version), `2.2.0` (minor version), and `2.1.4` (patch version).
- Changes to the app code address can only be done if the raise changes the major version (upgrading it to `M.0.0` by the above rule).

The initial version of an app must be a valid bump from version `0.0.0`.

By having this check performed at the smart contract level we can load the correct version of the frontend just by looking at an instance of an app. This is done by checking that the version of a smart contract is linked to a given app by getting its `appId` and `appCode` (see section below _By latest contract address_).

---

### Fetching Repo versions

Repos offer multiple ways to fetch versions. By checking the logs for the following event, one can see all the versions ever created in a Repo:

```solidity
(Repo) NewVersion(uint256 versionId, uint16[3] semanticVersion);
```

All the different methods for fetching versions return the following tuple:

```solidity
repoVersion = (uint16[3] semanticVersion, address contractAddress, bytes contentURI);
```

**By versionId**

Every version can be fetched with its `versionId` (which starts at `1` and is incremented by `1` on each new version).

```solidity
repoVersion = repo.getByVersionId(versionId);
```

The total count of versions created in a Repo can be queried with:

```solidity
count = repo.getVersionsCount();
lastVersionId = count - 1;
```

**By semantic version**

A version can be fetched by providing the exact semantic version:

```solidity
repoVersion = repo.getBySemanticVersion([major, minor, patch]);
```

**By latest contract address**

Fetching the latest version by contract address is useful for clients to easily fetch the latest minor or patch release associated with a particular major version. This makes it particularly easy for organizations to still be served the relevant frontends if they have not updated their smart contract code to the latest major version.

```solidity
repoVersion = repo.getLatestForContractAddress(contractCode);
```

**Latest version**

The latest version of a Repo can be fetched as follows:

```solidity
repoVersion = repo.getLatest();
```

---

### API documentation

See [Repo](/docs/apm_Repo.html).
