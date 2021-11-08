import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ContractTransaction } from "ethers";
import { task, types } from "hardhat/config";
import { ScienceFund } from "../../typechain";
import { TASK_ALLOCATE } from "../task-names";

task(TASK_ALLOCATE, "allocate a token and update its allocation hash ")
.setAction( async (args, hre) => {
    let deployer: SignerWithAddress;

    // relevant contract abi
    const abi =  [
        'function allocate(uint _tokenId, string memory _allocationHash) public onlyOwner'
      ];

    // get deployer address
    [ deployer ] = await hre.ethers.getSigners();
    const address = await deployer.getAddress();
    console.log(`deployer address: ${address}`);

    //get network
    const network = await hre.ethers.provider.getNetwork();
    console.log(`network: ${network.name}`);


    //get contract address
    var contractAddress=""
    if (network.name === "unknown"){
        contractAddress=process.env.LOCALHOST_CONTRACT_ADDRESS || " ";
    }
    console.log(`contractAddress: ${contractAddress}`);


    //connect to contract
    const contract: ScienceFund = new hre.ethers.Contract(contractAddress, abi, deployer) as ScienceFund;

    // call allocate() fuction
    const allocationHash: string = process.env.TEST_METADATA_URI||" ";
    const connectContract: ScienceFund = await contract.connect(deployer);
    const receipt: ContractTransaction = await connectContract.allocate(1, allocationHash, { gasLimit: 300000 });

    console.log('allocated:', receipt);
    process.exit(0)
})