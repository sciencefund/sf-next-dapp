import { ethers } from "hardhat";
import chai from "chai";
import { ScienceFund__factory, ScienceFund } from "../typechain";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

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

    describe("deployment", async () => {
        it("has expected name and symbol", async function () {
            expect(await scienceFund.name()).to.equal("ScienceFund");
            expect(await scienceFund.symbol()).to.equal("SFT");
        });
    });

    describe("donate", async () => {
        const tokenId = ethers.BigNumber.from(1);
        
        it("donate 1.3Eth to Neuroscience when anyone calls it", async function () {

            const selectedPool: string = "Neuroscience";
            //TODO: more tests with specific payable amount

            await expect(scienceFund.connect(deployer).donate(other.address, selectedPool))
                .to.emit(scienceFund, 'Transfer')
                .withArgs(ZERO_ADDRESS, other.address, tokenId);
        })


    })

});



