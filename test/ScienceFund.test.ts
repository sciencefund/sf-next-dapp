import { ethers } from "hardhat";
import chai from "chai";
import { ScienceFund__factory, ScienceFund } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { BigNumber } from "@ethersproject/bignumber";


const { expect } = chai;

let scienceFund: ScienceFund;
let ScienceFundFactory: ScienceFund__factory;
let deployer: SignerWithAddress;
let other: SignerWithAddress;

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

describe("scienceFund", () => {

    beforeEach(async () => {
        [deployer, other] = await ethers.getSigners();
        ScienceFundFactory = (await ethers.getContractFactory(
            'ScienceFund',
            deployer
        )) as ScienceFund__factory;

        scienceFund = (await ScienceFundFactory.deploy()) as ScienceFund;
        expect(scienceFund.address).to.properAddress;
    });



    // test deployment
    describe("deployment", async () => {
        it("should have expected name and symbol", async function () {
            expect(await scienceFund.name()).to.equal("ScienceFund");
            expect(await scienceFund.symbol()).to.equal("SFT");
        });
    });




    // test donate function
    describe("donate", async () => {

        it("should donate 1.3Eth to Neuroscience and the owner has it", async function () {

            const selectedPool: string = "Neuroscience";
            const contract = await scienceFund.connect(other);
            const amount: BigNumber = ethers.utils.parseEther("1.3");

            const overrides = {
                value: amount
            }
            
            expect(await contract.donate(selectedPool, overrides))
                .to.emit(scienceFund, 'SFTokenMinted')
                .withArgs(await contract.totalSupply(), amount, selectedPool);

            const tokenID = await contract.totalSupply();

            expect(await contract.ownerOf(tokenID)).to.equal(other.address)
            
        })
    })



    // test tokenURI
    describe("tokenURI", async () => {

        it("should fail if tokenID does not exist", async function () {

            const contract = await scienceFund.connect(deployer);
      

            const total: BigNumber = await contract.totalSupply();
            const tokenId: BigNumber = total.add(BigNumber.from("1"));

            await expect(contract.tokenURI(tokenId))
                .to.be.revertedWith("ScienceFund: Token needs to be minted first");

        })
    })


    // test allocation
    describe("allocate()", async () => {
    
        it("should allocate token ID to preselected hash", async function () {
            //mint 3 token
            const contract = await scienceFund.connect(deployer);

            for (var i:number = 0; i<=3; i++){
                var amount:string = String(i+2);
                await contract.donate("Neuroscience", { value: ethers.utils.parseEther(amount)})
            }
   
            const latestTokenId: BigNumber = await contract.totalSupply();
            const allHash: string = process.env.TEST_ALLO_HASH || " ";

            await expect(contract.allocate(latestTokenId, allHash))
                .to.emit(scienceFund, "SFTokenAllocated")
                .withArgs(latestTokenId, allHash);

            const token = await contract.getSFToken(latestTokenId);
            expect(token.alloHash).to.equal(allHash);

        })
    })

       // test completion
       describe("complete()", async () => {
    
        it("should emit complete event and update allocation hash--after being allocated", async function () {

            const contract = await scienceFund.connect(deployer);
            const allHash: string = process.env.TEST_ALLO_HASH || " ";

            //mint and allocate 3 token

            for (var i:number = 0; i<=3; i++){
                var amount:string = String(i+2);
                await contract.donate("Neuroscience", { value: ethers.utils.parseEther(amount)});       
    
            }
   

            const latestTokenId: BigNumber = await contract.totalSupply();
         

            await contract.allocate(latestTokenId, allHash);
            await expect(contract.complete(latestTokenId, allHash))
                .to.emit(scienceFund, "SFTokenCompleted")
                .withArgs(latestTokenId, allHash);

            var token = await contract.getSFToken(latestTokenId);
     

            expect(token.completeHash).to.equal(allHash);

        })
    })


});



