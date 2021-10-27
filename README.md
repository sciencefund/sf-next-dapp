# Science Fund Homepage with SFT

# NextJS Frontend

## Get Started

Install dependencies

```shell
npm i
```

and run the development server:

```shell
npm run dev
```

Open http://localhost:3000 with your browser to see the result.

## Edit the home page

You can start editing the homepage page by modifying <code>pages/index.js</code>. The page auto-updates as you edit the file.

# HardHard Backend

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:
```
npx hardhat help

```
### deploy to local network
```shell
npx hardhat clean
TS_NODE_TRANSPILE_ONLY=1 npx hardhat compile
npx hardhat node
npx hardhat deploy
```

### Running test
`//TODO:`more tests are needed

```shell
npx hardhat test
```


## **Interacting with the contract from browser on local hardhat nextwork** 


- **Local Faucet**


    You can deploy with your own account and get some ETH in the hardhat network by setting your account private key in .env .


- **Network** 

    As of the time of writing, there is some [metamask issue](https://github.com/MetaMask/metamask-extension/issues/10290) on localnetwork. One can resolve it by adding custom RPC in your metamask browser extension with chainID 31337 default in hardhat network.

- **Network** 

    Update the contract address in `index.js` after deployment.
