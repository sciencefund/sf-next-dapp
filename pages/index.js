import { useState, useEffect } from "react";

import Head from "next/head";


import { useWeb3React } from "@web3-react/core";
import { connectors } from "../context/connectors";
import { ethers } from "ethers"
import { BigNumber } from "@ethersproject/bignumber";

import ScienceFund from "../artifacts/contracts/ScienceFund.sol/ScienceFund.json";

import BigButton from "../components/bigButton";
import ConnectWallet from "../components/connectWallet";
import CheckoutScreen from "../components/checkoutScreen";
import Summary from "../components/summary";
import WhyNFT from "../components/whyNFT";
import FundingPools from "../components/fundingPool";
import Trace from "../components/trace";

// contract address on localhost:8545, maybe different for each deployment
// const contractAddress = process.env.LOCALHOST_CONTRACT_ADDRESS;
const contractAddress = "0x0165878A594ca255338adfa4d48449f69242Eb8F";
console.log(contractAddress);


const NETWORKS = {
	localhost: {
		name: "localhost",
		color: "#666666",
		chainId: 31337,
		blockExplorer: "",
		rpcUrl: "http://" + 'localhost' + ":8545",
	}
}



export default function Home() {
	const context = useWeb3React();
	const { library, account, activate } = context;


	const [sftContract, setSftContract] = useState(null);
	const [localProvider, setLocalProvider] = useState(null);


	const [startCheckout, setStartCheckout] = useState(false);




	useEffect(() => {
		if (!sftContract) {
			loadContract()
		}
	});

	// load contract
	const loadContract = async () => {

		if (typeof window.ethereum !== 'undefined') {
			// load the network provider 
			const provider = new ethers.providers.Web3Provider(window.ethereum)
			setLocalProvider(provider);


			// connet to contract on the network
			const contract = new ethers.Contract(contractAddress, ScienceFund.abi, provider);
			const connectedContract = await contract.connect(provider.getSigner(0));
			setSftContract(connectedContract);

			try {
				const contractBalance = await provider.getBalance(contractAddress)
				const contractBalanceETH = ethers.utils.formatEther(BigNumber.from(contractBalance._hex).toString())

				console.log(`${contractBalanceETH}ETH`, 'contractBalance in ether')

			} catch (err) {
				console.log("LOAD Contract Error:", err)
			}

		} else {
			console.log("install metamask")
		}
	}






	const checkoutScreen = () => {
		//start checkout screen
		setStartCheckout(true);

		if (!account) {
			activate(connectors.Injected, err => console.log(err))
		}
	};

	//load user tokens from contract 
	const loadUserTokens = async () => {
		if (!account) {
			activate(connectors.Injected, err => console.log(err))

		}


		if (account) {
			const balanceHex = await sftContract.balanceOf(account)
			console.log(BigNumber.from(balanceHex).toNumber(), 'balance')

			// console.log(await sftContract.ownerOf(1), 'ownerOf 1')
			const token1 = await sftContract.sfTokens(1);
			console.log(token1.id, 'sfTokens  id')
			console.log(token1.value, 'sfTokens  value')
			console.log(token1.pool, 'sfTokens  pool')
			console.log(token1.stage, 'sfTokens  stage')

			//call tokenURI

			const tokenURI = await sftContract.tokenURI(1)
			console.log(tokenURI, 'tokenURI')

		}


		// console.log(ethers.utils.formatEther(BigNumber.from(tokenValue).toString()), 'token value in ETH')
	}



	return (
		<div className='w-screen mx-auto font-serif'>
			<Head>
				<title>Science Fund</title>
				<meta name='description' content='Science Fund Home Page' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className='w-screen mx-auto'>
				<section className='relative mx-auto bg-dark-water bg-fixed bg-cover w-screen'>
					{account ? (
						<ConnectWallet
							connect={() => checkoutScreen()}
							label='Mint Tokens'
						/>
					) : (
						<ConnectWallet
								connect={() => activate(connectors.Injected, err => console.log(err))}
							label='Connect Wallet'
						/>
					)}

					<div className='text-center text-white mx-auto w-3/4 py-48 h-min-96'>
						<p className='text-grey-800 text-3xl italic mb-4 '>
							Reimagining the path to discovery
						</p>
						<h1 className='text-grey-900 text-6xl uppercase mb-6 font-bold tracking-wide'>
							science fund
						</h1>
						<BigButton label="Learn more" />
					</div>
				</section>
				{startCheckout && <CheckoutScreen
					close={() => {
						setStartCheckout(false);
					}}
					sftContract={sftContract}
					account={account}
				/>}


				<div className="w-screen bg-misty-forest bg-opacity-50 bg-cover h-full">

					<Summary />
					<FundingPools onClick={checkoutScreen} account={account} />

					<Trace onClick={loadUserTokens} account={account} />


					<WhyNFT />
				</div>






			</div>
			<footer className='flex flex-row justify-between my-2 mx-2'>
				<a>@ 2021 science fund dao</a>
				<a href='#'>white paper</a>
			</footer>
		</div>
	);
}
