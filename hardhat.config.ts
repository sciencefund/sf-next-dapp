import { HardhatUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";


import "./tasks/accounts";
import "./tasks/deployment/deploy";
require("dotenv").config();


const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [{ version: "0.8.4", settings: {} }],
  },
  typechain: {
    outDir: 'types',
    target: 'ethers-v5',
    alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
  },
  networks: {
    hardhat: {
      chainId: 31337,
      initialBaseFeePerGas: 0,
      accounts: [{ privateKey: `0x${process.env.PRIVATE_KEY}`, balance: '10000000000000000000000000' }]
    },
    // localhost: {
    //   url: 'http://localhost:8545',
    //   chainId: 31337,
    //   accounts: [`0x${process.env.PRIVATE_KEY}`]
    // },
  }
};


export default config;