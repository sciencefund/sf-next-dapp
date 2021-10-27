import { task } from "hardhat/config";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { ScienceFund__factory } from "../../typechain";
import { TASK_DEPLOY } from "../task-names";

task(TASK_DEPLOY, "Deploy ScienceFund Contract")
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


