
import { task } from "hardhat/config";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { TASK_FAUCET } from "./task-names";
require("dotenv").config();


task(TASK_FAUCET, "Send ETH to an address")
.setAction( async (args, hre) => {
    let deployer: SignerWithAddress;

    const receiver = process.env.LOCAL_USER_WALLET;
    
    const network = await hre.ethers.provider.getNetwork();
    console.log(`network: ${network.name}`);
    

    [deployer] = await hre.ethers.getSigners();

    if (network.name === "unknown"){
        const tx = await deployer.sendTransaction({
            to: receiver,
            value: hre.ethers.utils.parseUnits("999"),
          });

        await tx.wait();

        console.log(`Transferred 999 ETH to ${receiver}`);

    }

})