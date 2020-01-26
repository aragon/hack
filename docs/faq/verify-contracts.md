---
id: verify-contracts
title: Verifying your contracts
sidebar_label: Contract verification
---

#####

To be sure you are trying to verify the correct smart contract be sure to check what app version is installed in you DAO with:

```sh
dao apps <dao-address>
```

For example `voting@1.1.5`. We can check the information for that deployment in the [`deploys.yml` file](https://github.com/aragon/deployments/blob/470c6929674a4afe4f89f9a6917578f7e9486d39/environments/rinkeby/deploys.yml#L40). Be sure to look in the environment you are working (eg. rinkeby).

You can check the `commitHash` in aragon-apps GitHub repo and view the smart contract code that was deployed for that specific version. For `v1.1.5` this is the [code deployed](https://github.com/aragon/aragon-apps/blob/d99b6e9d62d3de47601077adb6b3b14fbe92f8a9/apps/voting/contracts/Voting.sol)
