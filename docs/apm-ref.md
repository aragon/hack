---
id: apm-ref
title: APM reference documentation
sidebar_label: Reference documentation
---

##  APM as an Aragon DAO

The Aragon Package Manager (APM) is built on top of aragonOS. It is a Decentralized
Autonomous Organization (DAO) running on the same Aragon that‘s used to build Aragon
organizations (to take advantage of upgradeability and access control)!

This allows for many APM registries to exist with different governance models for
package creation and publishing new versions. There is an official Aragon curated
instance, `aragonpm.eth`, which has high quality standards and strict restrictions on
what can get published, that we use for publishing our core components.

Different APM registries in which everyone can publish their packages are expected to
be created by the community, and we have set up `open.aragonpm.eth` on both the main
and Rinkeby networks as an open instance available for any one to publish to.

This diagram tries to illustrate the architecture of an APM Registry DAO:

![](/docs/assets/apm-arch.jpeg)

## APMRegistry
### ENSSubdomainRegistrar

Ownership of the ENS name that the `APMRegistry` operates has to be transferred to
the `ENSSubdomainRegistrar` app that is part of the DAO.

The `APMRegistry` needs to have permission on the `ENSSubdomainRegistrar` to create
new names, which is done every time a repo is created.

### APMRegistry governance

Each instance of an APMRegistry can have different governance. Governance of a
registry is enforced directly using the DAO's ACL.

By default a new repo will set the creator (or `dev` param) as the owner of the
repo and it is the only address that can create new versions in the repo. However,
as the permission manager, this account can grant permission to other entities to
create versions. These entities can be anything from another dev, to a multisig or
a full blown DAO.

## Repos

After discovering an entity in the DAO by traversing the ACL that is an app (see
section 2.3 *The apps of a DAO*), we can fetch its `app.appId()` and use ENS to
resolve its Repo contract:

```solidity
repo = Repo(Resolver(ens.resolver(appId)).addr(appId))
```
or using ens.js:
```js
repo = Repo.at(await ens.addr(appId))
```

Every individual Repo is an Aragon app that uses the APM DAO for its ACL.
Depending on each APM registry governance, the process for creating new versions
in the Repo or transferring ownership may vary.

A Repo keeps versioned state over:

  - **Smart contract library code** (`contractAddress`): the app code is the address of
  the deployed contract version of the app. An organization's Kernel determines which
  version of the app it uses by pointing to the app code address associated with that
  version.
  - **Package content** (`contentURI`): defined by a location ID of where the other
  components of the package (e.g. frontend) are hosted (IPFS, Swarm, etc.) and the
  content hash for fetching it. An `arapp.json` file is expected to be found in this
  package.

A Repo does not need to contain both pieces; a repo can solely version either a contract
or off-chain assets. While no problems will occur by using it this way, note that all the
rules below still apply.

By versioning both the app code address and the package content, we can add
additional expectations for the what semantic versioning of Repos mean:

  - **Patch**: Minor changes to the package contents (e.g. frontend). Update can
  be performed silently for users.
  - **Minor**: Major changes to the package contents, but still works with the
  current smart contract code. Users should be notified of the update.
  - **Major**: Any change to the smart contract app code with or without an
  accompanying frontend upgrade. User interaction is needed to upgrade.

### Version upgrade rules
Before creating a new version in a repo, an ACL check is performed to see whether
the entity has permission to create a new version.

After the ACL check, the Repo logic checks whether the version upgrade is allowed.
A version bump for a package is defined by the following rules:

- Only one member of the version is increased by 1. The version components to the
left of the raised member must stay the same and the components to the right must be 0.
  - Example: From `2.1.3` the only allowed bumps are to `3.0.0` (major version),
  `2.2.0` (minor version), and `2.1.4` (patch version).
- Changes to the app code address can only be done if the raise changes the major
version (upgrading it to `M.0.0` by the above rule).

The initial version of an app must be a valid bump from version `0.0.0`.

By having this check performed at the smart contract level, we can load the correct
version of the frontend just by looking at an instance of an app. This is done by
checking that the version of a smart contract is linked to a given app by getting
its `appId` and `appCode` (see section [*By latest contract address*](#by-latest-contract-address).

### Fetching Repo versions
Repos offer multiple ways to fetch versions. By checking logs for the following
event one can see all the versions ever created in a Repo:

```solidity
(Repo) NewVersion(uint256 versionId, uint16[3] semanticVersion);
```

All different methods for fetching versions return the following tuple:

```solidity
repoVersion = (uint16[3] semanticVersion, address contractAddress, bytes contentURI)
```

#### By versionId
Every version can be fetched with its `versionId` (which starts in `1` and is
increments by `1` each version).

```solidity
repoVersion = repo.getByVersionId(versionId)
```

The total count of versions created in a Repo can be queried with:
```solidity
count = repo.getVersionsCount()
lastVersionId = count - 1
```

#### By semantic version
Providing the exact semantic version.
```solidity
repoVersion = repo.getBySemanticVersion([major, minor, patch])
```

#### By latest contract address
Fetching the latest version by contract address allows clients to get the latest
frontend package for an organization that may have not upgraded the smart contract
code to the latest version.
```solidity
repoVersion = repo.getLatestForContractAddress(contractCode)
```

#### Latest version
Pretty self-describing.
```solidity
repoVersion = repo.getLatest()
```
