# `NFT Game Logic Sandbox`

> React components and hooks for fast testing game logic with [Moralis](https://moralis.io?utm_source=ashbeech&utm_medium=readme&utm_campaign=ethereum-boilerplate).

## About

Aim: Save time and resources for game developers by e.g. facilitating the generation of in-game assets as NFTs via intuative UI.

These tutorial videos are a great introduction.
Part 1: [Link to Moralis YouTube Video](https://youtu.be/2nM1dTm2zww)
Part 2: [Link to Moralis YouTube Video](https://youtu.be/a3zIFrJl7UU)

Built on [react-moralis](https://github.com/MoralisWeb3/react-moralis) and [Moralis](https://moralis.io?utm_source=ashbeech&utm_medium=readme&utm_campaign=ethereum-boilerplate).

## Quick Launch 🚀

Via terminal, navigate to your local dev directory and run:

```sh
git clone https://github.com/ashbeech/moralis-nft-game.git

```

Then navigate into the cloned project's root directory to install all dependencies:

```sh
npm install

```

Go to [Moralis.io](https://moralis.io?utm_source=ashbeech&utm_medium=readme&utm_campaign=ethereum-boilerplate) to create your server instance. Rename `.env.example` file to `.env` and add your Moralis server credentials. For help see ['How to start Moralis Server'](https://docs.moralis.io/moralis-server/getting-started/create-a-moralis-server).

_Note_: To find your `"X-API-Key": API_KEY` here: https://deep-index.moralis.io/api-docs/#/storage/uploadFolder

Run your app:

```sh
npm start
```

## Functionality 🛠

### `IPFS Metadata Uploads`

Using [`axios`](https://www.npmjs.com/package/axios) lib, pointed at the [`API_URL`](https://deep-index.moralis.io/api-docs/#/storage/uploadFolder) you can upload files directly to [IPFS](https://ipfs.io/).

```jsx
// upload to IPFS
Promise.all(promiseArray).then(() => {
  axios
    .post(API_URL, ipfsArray, {
      headers: {
        "X-API-Key": API_KEY,
        "content-type": "application/json",
        accept: "application/json",
      },
    })
    .then((res) => {
      // successfully uploaded file to IPFS
      let fileCID = res.data[0].path.split("/")[4];
      console.log("FILE CID:", fileCID);
      // pass IPFS folder CID to compile metadata
      uploadMetadata(
        API_URL, // <-- this is in .env
        API_KEY, // <-- this is in .env
        fileCID,
        totalFiles,
        _formValues
      );
    })
    .catch((err) => {
      setLoading(false);
      setError(true);
      setErrorMessage(err);
      console.log(err);
    });
});
```

### `useWeb3ExecuteFunction()`

You can use the [`useWeb3ExecuteFunction()`](https://www.npmjs.com/package/react-moralis#useWeb3ExecuteFunction) hook to execute on-chain functions. You need to provide the correct abi of the contract, the corresponding contractAddress, the functionName that you would like to execute, and any parameters (params) thet you need to send with the function.

### Minting Game Assets ⛓

Deploy Solidity contracts e.g. `Character.sol` to EVM blockchain via [Truffle (local)](https://trufflesuite.com/docs/ganache/overview.html) or [⚙️ Remix IDE](https://remix.ethereum.org/) for test or mainnet deployment.

## Dependencies 🏗

### Backend

`moralis`: [ℹ️ Docs](https://www.npmjs.com/package/moralis)
`react-moralis`: [ℹ️ Docs](https://www.npmjs.com/package/react-moralis)
`axios`: [ℹ️ Docs](https://www.npmjs.com/package/axios)

### Frontend

`chakra-ui`: [ℹ️ Docs](https://www.npmjs.com/package/chakra-ui)
`react-dropzone`: [ℹ️ Docs](https://www.npmjs.com/package/react-dropzone)

### Much more to come [WIP]

…

---

# 🤝 `Need help?`

If you need help with setting up the app or have other questions - don't hesitate to write in our community forum and we will check asap. [Forum link](https://forum.moralis.io). The best thing about Moralis is the super active community ready to help at any time! We help each other.

# ⭐️ `Star us`

If this code brought you value, please star this project.

This is bullish.
