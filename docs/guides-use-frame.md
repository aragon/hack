---
id: guides-use-frame
title: How to use Frame
sidebar_label: How to use Frame
---

This guide will help you to get started with Frame and interact with your DAO using a hardware wallet. If you don't have a DAO yet create one following: [Your first Aragon app tutorial](tutorial.md).

## Setup

Start by downloading Frame from the official website: https://frame.sh.

After installation Frame stays quietly in your menu bar until it's needed.

<p align="center">
  <img width="240" height="500" src="/docs/assets/frame/frame-intro.gif">
</p>

To take full advantage of Frame we recommend you have the `aragonCLI` installed as well. If you already have it, skip to the next section, otherwise ran:

```sh
npm install -g @aragon/cli
```

> You need a Ledger or Trezor wallet to use Frame.

## Configure you Device

#### Ledger

On Ledger devices insert your pin on the device to unlock it and then open Frame.

<p align="center">
  <img width="240" height="500" src="/docs/assets/frame/frame-ledger.gif">
</p>

#####

#### Trezor

On Trezor devices insert your pin directly on frame.

<p align="center">
  <img width="240" height="500" src="/docs/assets/frame/frame-trezor.gif">
</p>

#####

You are ready to select the network and account you would will use.

#### Network

To choose the appropiate network select the button on the uper right corner (the one with the three arrows). This page is the app menu, here you can configure general settings for Frame. We will focus on the Connection option. Right now the default is Rinkeby but you can aslo choose Mainnet, Ropsten and Kovan. For this tutorial we will select Rinkeby.

<p align="center">
  <img width="240" height="500" src="/docs/assets/frame/frame-app-menu.gif">
</p>

#### Accounts

The last step is to choose your account, click on the configuration button, the one on the right, and then click on the accounts button that will pop up. This action will show you a new menu with the avaible accounts on your device for the network. Select one, be sure to have some test ether, get some on the [Rinkeby faucet](https://faucet.rinkeby.io) otherwise.

<p align="center">
  <img width="240" height="500" src="/docs/assets/frame/frame-accounts.gif">
</p>

In the configuration menu you can also manage the dapp permisions you have granted for that particular account. We will explain more about this on the next section.

Now that we finish setting up the device we are ready to sign our first transaction with Frame.

## Signing your first transaction

On this section we are going to interact with an already deployed DAO on rinkeby that allow anyone to mint any amount of `FRAME` tokens to any address. We will use an `aragonCLI` command to execute a function on the `token-manager` app of the DAO. You might find helpful to [learn more about `dao exec` command](https://hack.aragon.org/docs/cli-dao-commands#dao-exec) before continue.

The first step is to ran the command on the terminal:

```sh
dao exec 0x16b3C84d4DB149590981F2d3A36e14Db96069730 0x1A8D8BB7eB5aC6E6F51dF5E65d301c7e5dD00D58 mint <address> <amount> --environment aragon:rinkeby --use-frame
```

Under `<address>` input an address of your choice and under `<amount>` provide the amount of tokens you would like to mint for the address. The arguments `--environments` and `--use-frame` tell the `aragonCLI` that we want to interact with rinkeby and we will use Frame as signer.

#### Permissions

After you ran the command you will see an error message on the terminal:

```sh
✖ Returned error: Permission denied, approve AragonCLI in Frame to continue
```

No worry, we need to grant permissions to the `aragonCLI` on Frame. Probably you already saw Frame asking for this. Accept the request to continue.

<p align="center">
  <img width="240" height="500" src="/docs/assets/frame/frame-permissions.gif">
</p>

#### Signing

Next ran the command again. This time Frame will ask you to sign the transaction that the `aragonCLI` have generated, then confirm it in your device. A couple of seconds later the transaction will be mined.

<p align="center">
  <img width="240" height="500" src="/docs/assets/frame/frame-first-tx.gif">
</p>

Congratulation 🎉 you just sign a transaction with Frame. Open the browser and see the minted `FRAME` tokens for the address you choose one the live Aragon DAO on rinkeby. [Follow this link](https://rinkeby.aragon.org/#/0x16b3C84d4DB149590981F2d3A36e14Db96069730/0x1a8d8bb7eb5ac6e6f51df5e65d301c7e5dd00d58).

#### View

Frame show you the transaction on etherscan clicking on the view details button.

<p align="center">
  <img width="240" height="500" src="/docs/assets/frame/frame-view-tx.gif">
</p>

## Next steps
