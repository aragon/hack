---
id: human-readable-txs
title: Human readable transactions
---

A big part of Aragon is user-friendliness, and one of the most unfriendly things in the Ethereum world, might be transaction data. Examine this screenshot of a transaction in MetaMask:

![UTF8 string in MetaMask](/docs/assets/metamask.png)

Would you know what this transaction does? Not even a developer could tell. This is why we created Radspec.

Radspec is a secure alternative to Natspec. Natspec was supposed to be a way to describe transactions from a Natspec *expression* and some transaction data.

The issue with Natspec, however, is that it is fully insecure. Any Javascript can execute in Natspec, which opens up a lot of potential attacks, like cross-site scripting, which might successfully phish users.

## How to use Radspec

It's as easy as adding `@notice` to our functions in the smart contracts. 

```solidity
contract Counter is AragonApp {    
    /**
     * @notice Increment the counter by `step`
     */
    function increment(int step) auth(INCREMENT_ROLE) external {
        // ...
    }

    /**
     * @notice Decrement the counter by `step`
     */
    function decrement(int step) auth(DECREMENT_ROLE) external {
        // ...
    }
}
```

These Radspec expressions are written in comments in your source code, and they will be grabbed by `aragon` and bundled with your app.

The [Aragon client](client.md) will now display these *alongside* the transaction a user is about to perform, so that they have a clear understanding of what they're about to sign.

![Screenshot of signer showing Radspec](/docs/assets/radspec.png)

*Caption: Our Radspec expressions showing up in the Aragon signer*

Obviously, this is a super trivial example as we are not actually evaluating anything, but we could instead write something like:

```
Decrement the counter by `(2 * 2) - 3`
```

Or even include parameters like we did with `step` earlier
