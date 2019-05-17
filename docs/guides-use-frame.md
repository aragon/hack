---
id: guides-use-frame
title: How to use Frame
sidebar_label: How to use Frame
---

This guide will help you to get started with Frame and interact with a DAO using a hardware wallet.

## Setup

> You need a Ledger or Trezor wallet to use Frame. Hot wallet support will be added soon!

Start by downloading Frame from the official website: https://frame.sh. After installation Frame stays quietly in your menu bar until it's needed.

<p align="center">
  <img width="240" height="500" src="/docs/assets/frame/frame-intro.gif">
</p>

To take full advantage of Frame, we recommend you have `aragonCLI` installed as well. If you already have it, skip to the next section, otherwise run:

```sh
npm install -g @aragon/cli
```

If you're having trouble with this step, you should take a look at the installing aragonCLI section of the [troubleshooting guide.](/docs/guides-faq#installing-aragonCLI) If that doesn't fix things, please don't hesitate to reach out to us at the [#dev-help channel on the Aragon Chat](https://aragon.chat/channel/dev-help).

## Configure your device

#### Ledger

On Ledger devices insert your pin on the device to unlock it and then open Frame.

<p align="center">
  <img width="240" height="500" src="/docs/assets/frame/frame-ledger.gif">
</p>

#### Trezor

On Trezor devices insert your pin directly on Frame.

<p align="center">
  <img width="240" height="500" src="/docs/assets/frame/frame-trezor.gif">
</p>

You should now be able to select the network and account you would like to use.

#### Network

To choose the appropriate network, select the button on the upper right corner (the three arrows). This will take you to Frame's menu, where you can configure its general settings. We will focus on the "Connection" option. Right now the default is Rinkeby but you can also choose Mainnet, Ropsten or Kovan.

For this tutorial we will select Rinkeby.

<p align="center">
  <img width="240" height="500" src="/docs/assets/frame/frame-app-menu.gif">
</p>

#### Accounts

The last step is to choose your account. Click on the configuration button (the button to the right of the Ledger or Trezor icon) and then click on the accounts button that pops up below the icon. This will display a new menu with the available accounts on your device for the network. Select one with some test ether (if you don't have any, you can request some via the [Rinkeby faucet](https://faucet.rinkeby.io)).

<p align="center">
  <img width="240" height="500" src="/docs/assets/frame/frame-accounts.gif">
</p>

In the configuration menu you can also manage the dapp permisions you have granted for that particular account. We'll explain more about this in the next section.

You are now finished setting up Frame for your device, and are ready to sign your first transaction!

## Signing your first transaction

In this section we are going to interact with an already [deployed DAO on Rinkeby](https://rinkeby.aragon.org/#/0x16b3C84d4DB149590981F2d3A36e14Db96069730/) that allows anyone to mint any amount of `FRAME` tokens to any address. We will use an `aragonCLI` command to execute a function on [the Token Manager app installed on the DAO](https://rinkeby.aragon.org/#/0x16b3C84d4DB149590981F2d3A36e14Db96069730/0x1A8D8BB7eB5aC6E6F51dF5E65d301c7e5dD00D58). You may find it helpful to [learn more about `dao exec` command](https://hack.aragon.org/docs/cli-dao-commands#dao-exec) before continuing.

The first step is to run this command in your terminal:

```sh
dao exec \
  0x16b3C84d4DB149590981F2d3A36e14Db96069730 0x1A8D8BB7eB5aC6E6F51dF5E65d301c7e5dD00D58 \
  mint <address> <amount> \
  --environment aragon:rinkeby \
  --use-frame
```

Replace `<address>` with an address of your choice (as the token minting recipient) and `<amount>` with the amount of tokens you would like to mint for the address (remembering to apply the token's decimals, e.g. 10^18). The options `--environments` and `--use-frame` tell `aragonCLI` that we want to interact with Rinkeby to use Frame as the transaction signing provider.

#### Permissions

After running the command, you should see this error message in your terminal:

```sh
✖ Returned error: Permission denied, approve AragonCLI in Frame to continue
```

Don't worry, we just need to grant `aragonCLI` permission to access your account on Frame. You may have seen Frame ask for this earlier on setup. Approve the request to continue.

<p align="center">
  <img width="240" height="500" src="/docs/assets/frame/frame-permissions.gif">
</p>

#### Signing

Now run the command again. This time, Frame will ask you to sign the transaction that aragonCLI generated. Sign and then confirm it from your hardware device. In a couple of seconds, the transaction should be mined.

<p align="center">
  <img width="240" height="500" src="/docs/assets/frame/frame-first-tx.gif">
</p>

Congratulations 🎉! You've just signed your first transaction with Frame. Navigate to the [live Aragon DAO's Token Manager](https://rinkeby.aragon.org/#/0x16b3C84d4DB149590981F2d3A36e14Db96069730/0x1a8d8bb7eb5ac6e6f51df5e65d301c7e5dd00d58) to see the minted `FRAME` tokens for your chosen address.

#### Viewing transactions

Finally, if you click on the "View details" button, Frame will open the transaction's details on Etherscan.

<p align="center">
  <img width="240" height="500" src="/docs/assets/frame/frame-view-tx.gif">
</p>

## Next steps
