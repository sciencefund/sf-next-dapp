import { HardhatUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";


import "./tasks/accounts";
import "./tasks/deployment/deploy";


const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  solidity: {
    compilers: [{ version: "0.8.4", settings: {} }],
  },
  networks: {
    hardhat: {
      initialBaseFeePerGas: 0,
    },
    localhost: {},
  }
};


export default config;