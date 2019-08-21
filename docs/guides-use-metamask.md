---
id: guides-use-metamask
title: How to use Metamask
sidebar_label: Metamask
---

# What is MetaMask?

Metamask is a browser plugin that lets you make Ethereum transactions through regular websites.

It does this by injecting a Javascript library called web3.js into the namespace of each page your browser loads.

web3.js is written by the Ethereum core team, and has functions that regular webpages can use to make read and write requests to the blockchain.

Eventually we'll have browsers with this sort of functionality built-in. But for now we need plugins like Metamask to help us bridge the gap between web2 and web3. We call these portals between web2 and web3, web3 providers.

For more on why we need web3 providers like Metamask to interact with the blockchain see the **web3 provider** section of our [getting started page](/docs/getting-started.html#web3-provider).

Finally, if you're new to web3 we recommend you read through the **web3** section of our [getting started page](/docs/getting-started.html#web3).

# Getting started

If this is your first time using Metamask, here's how to get started:

Visit the [Metamask homepage](https://metamask.io/) and download the relevant browser extension (this guide will be based around the Chrome extension, but the process is similar for all browsers).

Once it's downloaded, you should be automatically directed to a welcome page.

<p align="center">
   <img width="600" height="326" src="/docs/assets/metamask-guide/m-0.png">
</p>

Follow the instructions carefully. They should be pretty self-explanatory.

Once your MetaMask setup is complete, you should be redirected to your newly created Ethereum wallet.

<p align="center">
   <img width="600" height="326" src="/docs/assets/metamask-guide/m-1.png">
</p>

If you've made it this far, congratulations 🎉.

You now have all you need to sign transactions and interact directly with the Ethereum blockchain.

# A couple of useful points

While at this stage there's no need for you to understand everything about Metamask, here are a couple of useful points.

### Selected networks

In the top right you should see a dropdown menu with **Main Ethereum Network** selected.

With this option selected, you're able to interact directly with the main Ethereum blockchain. If you click on it however, you should see that you have the ability to select other networks.

<p align="center">
   <img width="600" height="326" src="/docs/assets/metamask-guide/m-2.png">
</p>

Why would we need to select other networks? Simply put, before launching a project (or dapp) on the main Ethereum network, it's good practice to deploy a version to an Ethereum test network.

The main reason is that Testnet ETH can be obtained without having to pay real money. This gives developers and the community a chance to iron out any problems before real money is involved.

There are three testnets: **Ropsten**, **Kovan**, and **Rinkleby**.

Don't worry about the precise differences between them at this stage. All you need to know is that they simulate Ethereum and can be used without having to pay real money.

Finally, you can also interact with private Ethereum networks by selecting **Localhost 8545**. Private in this case doesn't mean more secure. It just means that the nodes are not connected to the main or test network nodes.

Why would we want to use a private network? In short, using the mainnet or testnets requires you to download the past transaction history of the blockchain. This takes a considerable amount of time, and requires a lot of local disk space.

A private network requires negligible local disk storage and can be operated without having to purchase ETH with real money. Perfect for rapid experimentation and testing.

### Account address

If you click on the **Details** button below your account name  - in my case Account 1 -  a popup will appear with your account address. It should look something like:

<center> **0x931D387731bBbC988B312206c74F77D004D6B84b** </center>

This is your public address (or public key). You can share this with other people to receive ETH.

# Signing your first transaction with MetaMask

In this section we'll go through how to sign your first transaction using Metamask.

From now on, I'll assume you've reached the **Interacting with your first DAO** section of our [getting started](https://hack.aragon.org/docs/getting-started.html) page. If you haven't, and you want to follow along, you should do this first.

The first step is to open up the Metamask browser extension. If you're using Chrome you should be able to do this by clicking on the fox icon located to the right of your address bar. If you can't see it, [click here](https://chrome.google.com/webstore/search/metamask). This will open up an interface to your Ethereum wallet.

<p align="center">
   <img width="600" height="326" src="/docs/assets/metamask-guide/m-3.png">
</p>

Click on the circle in the top right. You should see a black drop down menu appear.

<p align="center">
   <img width="251" height="320" src="/docs/assets/metamask-guide/m-4.png">
</p>

Click on the **Log out** button in the top right of this menu. You'll be taken to a Welcome Back page.

<p align="center">
   <img width="188" height="320" src="/docs/assets/metamask-guide/m-5.png">
</p>

Now click on **Import using account seed phrase**. Metamask should now open up in a new tab, with the heading: **Restore your account with Seed Phrase**.

Now, what you need to do is to look at the output of your terminal after you ran `npm start`. You should see the following at the end:

```
ℹ The accounts were generated from the following mnemonic phrase:
explain tackle mirror kit van hammer degree position ginger unfair soup bogus
```

These 12 words phrase will allow us to use MetaMask to access an account that has permission to update the Counter in our Counter app.

> Note that your mnemonic phrase won't be the same as mine. So make sure you copy yours from your terminal, and not from this blog.

Once you've copied it, paste it into the wallet seed text box, and create a new password.

<p align="center">
   <img width="400" height="342" src="/docs/assets/metamask-guide/m-6.png">
</p>

When you're done, click on the **Restore** button at the bottom of the page. Congratulations 🎉. You've now connected MetaMask to an Ethereum account that has permission to increment and decrement the Counter app in your first DAO.

We're now finally ready to play with the Counter app 😊.

Navigate back to your DAO and click on the **Increment** button in the Counter app.

<p align="center">
   <img width="225" height="131" src="/docs/assets/metamask-guide/m-7.png">
</p>

You should see a panel slide in from the right with an error message. The message (in a blue box) basically says you can't perform any actions unless you enable MetaMask.

<p align="center">
   <img width="300" height="197" src="/docs/assets/metamask-guide/m-8.png">
</p>

You should see that the final line inside the blue box reads: **Please unlock and enable Metamask**. Click on **enable** and open up MetaMask again.

You should see a connection request from Aragon. Click on the **Connect** button to accept it.

<p align="center">
   <img width="190" height="320" src="/docs/assets/metamask-guide/m-9.png">
</p>

Now go back to the Counter app. Oh dear… we have another error message 😔. This time, the message says we need to connect MetaMask to the private network.

<p align="center">
   <img width="300" height="197" src="/docs/assets/metamask-guide/m-10.png">
</p>

Why are we getting this error?

Remember, Metamask defaults to selecting the main Ethereum network when you make a transaction. But our DAO is actually running on a private local network, not the mainnet.

Why are we using a private network?

Remember that using the mainnet requires purchasing ETH with real money. And that using the mainnet or testnets requires us to download the entire past transaction history of the blockchain: this takes a considerable amount of time, and requires a lot of local disk space. In contrast, a private network requires almost no local disk space and can be operated without having to purchase ETH with real money. So it's perfect for rapid experimentation and testing.

Remember, we can connect to a local (private) network by opening up Metamask and selecting **Localhost 8545**. So let's go ahead and do that.

Close the panel and open MetaMask again. Now, click on the selected network  - **Main Ethereum Network** -  and select **Localhost 8545** from the dropdown menu that appears.

<p align="center">
   <img width="191" height="320" src="/docs/assets/metamask-guide/m-11.png">
</p>

You should now see that your account has some ETH. Quite a lot in fact. Unfortunately this is not real ETH, but it will allow you to perform transactions within your local private network (in other words, increment and decrement the counter).

Now, go back to the **Counter app**, and click on the **Increment** button again.

This time, instead of an error message, you should see an explanation of the action you are about to perform.

<p align="center">
  <img width="300" height="197" src="/docs/assets/metamask-guide/m-12.png">
</p>

Double check that the action that's about to be triggered is the one you wish to perform. Then click on **Create transaction**.

The app will now signal to you that it's waiting for your signature.

<p align="center">
  <img width="300" height="300" src="/docs/assets/metamask-guide/m-13.png">
</p>

Open MetaMask again to sign your transaction. You'll be asked to confirm a transaction from Account 1 (your account) to the address of your newly created DAO. The total amount you're sending is about 0.001 ETH: basically just the **Gas fee**.

<p align="center">
   <img width="191" height="320" src="/docs/assets/metamask-guide/m-14.png">
</p>

In case you're unfamiliar with the concept of **Gas**, the **Gas fee** is what's used to incentivize miners to add your transaction to the blockchain. You can think of it as a small tip. Remember that this transaction is taking place on a local (private) network, so this isn't real money. If you're happy with the details of the transaction, click on **Confirm**.

Now, if you go back to you're first DAO you should see that the counter has finally been incremented!

<p align="center">
   <img width="600" height="326" src="/docs/assets/metamask-guide/m-15.png">
</p>

If you've made it all the way here, well done! You've just signed your first blockchain transaction with Metamask. 🎉🎉😊
