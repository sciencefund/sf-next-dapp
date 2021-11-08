import { HardhatUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";


import "./tasks/accounts";
import "./tasks/deployment/deploy";
import "./tasks/faucet";
import "./tasks/donation/donate";
import "./tasks/allocation/allocate";

require("dotenv").config();


const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [{ version: "0.8.4", settings: {} }],
  },
  typechain: {    
    target: 'ethers-v5',
    alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
  },
  networks: {
    hardhat: {
      chainId: 31337,
      initialBaseFeePerGas: 0,
    },


  }
};


export default config;