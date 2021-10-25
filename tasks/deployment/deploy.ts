import { task } from "hardhat/config";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { ScienceFund__factory } from "../../types";
import { TASK_DEPLOY } from "../task-names";

task(TASK_DEPLOY, "Deploy contract")
  .setAction(async (args, hre) => {
    let deployer: SignerWithAddress;

    const network = await hre.ethers.provider.getNetwork();
    console.log(`network: ${network.name}`);
    

    [deployer] = await hre.ethers.getSigners();
    const address = await deployer.getAddress();
    console.log(`deployer address: ${address}`);

    const ScienceFundFactory = (await hre.ethers.getContractFactory(
      'ScienceFund',
      deployer
    )) as ScienceFund__factory;

    console.log('Deploying ScienceFund...');
    const scienceFund = await ScienceFundFactory.deploy();
    await scienceFund.deployed();

    console.log('ScienceFund deployed to:', scienceFund.address);
  });



// network: unknown
// deployer address: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
// Deploying ScienceFund...
// ScienceFund deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3