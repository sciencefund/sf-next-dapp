import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ScienceFund } from "../../typechain";
import {ethers, ContractTransaction } from "ethers";
import { BigNumber } from '@ethersproject/bignumber';

import { task, types } from "hardhat/config";
import { TASK_DONATE } from "../task-names";


task(TASK_DONATE, "Mint a Science Fund token and display its tokenURI")
.addParam("pool", "the selected funding pool", "Science Fund General Pool", types.string)
.addParam("amount", "the amount in ETH to donate", null, types.string)
.setAction(async ({pool, amount}, hre)=> {

    let deployer: SignerWithAddress;
    let other: SignerWithAddress;

    console.log(pool, '--pool');
    console.log(amount, '--amount');

    // relevant contract abi
    const abi =  [
        'function donate(string memory _selectedPool) public payable',
        'function totalSupply() public view virtual override returns (uint256)',
        'function tokenURI(uint _tokenId) override public view returns(string memory)'
      ];


    // get deployer address
    [ deployer, other ] = await hre.ethers.getSigners();
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
    const contract: ScienceFund = new hre.ethers.Contract(contractAddress, abi, other) as ScienceFund;


    //call donate function
    const donateValue: BigNumber= ethers.utils.parseEther(amount);
    const connectContract: ScienceFund = await contract.connect(other);
    const receipt: ContractTransaction = await connectContract.donate(pool, { gasLimit: 500000, value: donateValue });
    console.log('donated:', receipt);


    //the latest minted tokenID
    const tokenID: number = BigNumber.from(await connectContract.totalSupply()).toNumber();
    console.log(tokenID, 'tokenID');

    //load the tokenURI of this id
    const tokenURI: string = await connectContract.tokenURI(tokenID-1);
    console.log(tokenURI, "tokenURI");

    process.exit(0)
});