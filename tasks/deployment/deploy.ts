import { task } from "hardhat/config";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { ScienceFund__factory } from "../../typechain";
import { TASK_DEPLOY } from "../task-names";
import { Network } from "@ethersproject/networks";

task(TASK_DEPLOY, "Deploy ScienceFund Contract")
  .setAction(async (args, hre) => {

    const network : Network = await hre.ethers.provider.getNetwork();
    console.log(`network: ${network.name}`);
    
    
    const wallets: SignerWithAddress[] = await hre.ethers.getSigners();
    const deployerWallet = wallets[0];
    const deployerAddress = await deployerWallet.getAddress();
    console.log(`deployer address: ${deployerAddress}`);


    const ScienceFundFactory = (await hre.ethers.getContractFactory(
      'ScienceFund',
      deployerWallet
    )) as ScienceFund__factory;

    console.log('Deploying ScienceFund...');
    const scienceFund = await ScienceFundFactory.deploy();
    await scienceFund.deployed();

    console.log('ScienceFund deployed to:', scienceFund.address);
  });


