import { useState, useEffect } from "react";

import Head from "next/head";


import { useWeb3React } from "@web3-react/core";
import { connectors } from "../context/connectors";
import { ethers } from "ethers"
import { BigNumber } from "@ethersproject/bignumber";

import ScienceFund from "../artifacts/contracts/ScienceFund.sol/ScienceFund.json";

import TopicCard from "../components/topicCard";
import BigButton from "../components/bigButton";
import ConnectWallet from "../components/connectWallet";
import DonateWindow from "../components/donateWindow";
import TxMessage from "../components/txMessage";



// contract address on localhost:8545, maybe different for each deployment
// const contractAddress = process.env.LOCAL_CONTRACT_ADDRESS
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

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
	const [txState, setTxState] = useState({
		txHash: undefined,
		txError: undefined,
		txSuccess: undefined,
	})


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
			const connectedContract = await contract.connect(provider.getSigner(0))
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



	//load user tokens from contract 
	const loadUserTokens = async () => {

		const balanceHex = await sftContract.balanceOf(account)
		console.log(BigNumber.from(balanceHex).toNumber(), 'balance')

		console.log(await sftContract.ownerOf(1), 'ownerOf 1')
		console.log(await sftContract.tokenFundingPools(1), 'funding pool')

		const tokenValue = await sftContract.tokenValues(2)
		console.log(ethers.utils.formatEther(BigNumber.from(tokenValue).toString()), 'token value in ETH')

		//TODO: sftContract.tokenURI(1) throws errors

	}



	const checkoutScreen = async () => {
		//start checkout screen
		setStartCheckout(true);

		if (!account) {
			activate(connectors.Injected, err => console.log(err))
		}
	};

	const mintSFT = async (amountInEth, selectedPool) => {


		const overrides = {
			value: ethers.utils.parseEther(amountInEth.toString())
		}


		try {

			setTxState({
				txHash: undefined,
				txError: undefined,
				txSuccess: undefined,
			});


			// sent transaction to network
			const tx = await sftContract.donate(account, selectedPool, overrides)

			setTxState({ txHash: tx.hash })

			// wait for the transaction to be mined
			const receipt = await tx.wait();

			// simulate a bit of delay for localnetwork
			setTimeout(() => {
				if (receipt.status === 1) {
					setTxState({
						txSuccess: true,
					});
				}
			}, 2000)


			// console.log(receipt, 'receipt');

		} catch (error) {

			console.log(error, 'tx error')

		}
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
								onClick={activate(connectors.Injected, err => console.log(err))}
							label='Connect Wallet'
						/>
					)}

					<div className='text-center text-white mx-auto w-3/4 py-48'>
						<p className='text-grey-800 text-3xl italic mb-4 '>
							Reimagining the path to discovery
						</p>
						<h1 className='text-grey-900 text-6xl uppercase mb-6 font-bold tracking-wide'>
							science fund
						</h1>
						<BigButton
							label='Stay tuned'
							href='/'
						/>
					</div>
				</section>
				{/* Curated Pool */}
				<section className='container mx-auto px-4 max-w-6xl '>
					<div className='container py-10 px-10'>
						<h1 className='text-3xl my-5'>
							Curated Funding Pools{" "}
						</h1>
						<p className='text-base my-3'>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Ut enim ad minim veniam, quis
							nostrud exercitation ullamco laboris nisi ut aliquip
							ex ea commodo consequat. Duis aute irure dolor in
							reprehenderit in voluptate velit esse cillum dolore
							eu fugiat nulla pariatur. Excepteur sint occaecat
							cupidatat non proident, sunt in culpa qui officia
							deserunt mollit anim id est laborum
						</p>



						<button
							className='bg-gray-900 text-white hover:bg-gray-700 py-2 px-4 rounded my-5'
							onClick={checkoutScreen}>
							{account ? (
								<h2>Mint Tokens</h2>
							) : (
								<h2>Connect wallet to donate</h2>
							)}
						</button>
						{startCheckout && <DonateWindow
							mintSFT={mintSFT}
								close={() => {
								setStartCheckout(false);
							}}
						/>}

						{txState.txHash && <TxMessage
							msg={txState.txHash}
							close={() => { }}
						/>}

						{txState.txError &&
							<TxMessage
								msg={txError}
								close={() => {
									setStartCheckout(false);
									setTxState({ txError: undefined })

								}}
							/>}

						{txState.txSuccess && <TxMessage
							msg="Transaction Success"
							close={() => {
								setStartCheckout(false);
								setTxState({ txSuccess: undefined })
								}}
							/>
						}

					</div>

					<div
						className='flex flex-row justify-evenly
				items-center'>
						<TopicCard
							imagePath='/images/topics/brain.jpg'
							topic='Neuroscience'
							description='Can we understand the biological basis of learning, memory, behavior and ultimately consciousness?'
						/>
						<TopicCard
							imagePath='/images/topics/virus.jpg'
							topic='Infectious Disease'
							description='What are the chances of a superbug wiping out humanity?'
						/>
					</div>
				</section>
				{/* Granular Traceability */}
				<section className='container mx-auto px-4 max-w-6xl '>
					<div className='container py-10 px-10'>
						<h1 className='text-3xl my-5'>
							Granular Traceability{" "}
						</h1>
						<p className='text-base my-3'>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua. Ut enim ad minim veniam, quis
							nostrud exercitation ullamco laboris nisi ut aliquip
							ex ea commodo consequat. Duis aute irure dolor in
							reprehenderit in voluptate velit esse cillum dolore
							eu fugiat nulla pariatur. Excepteur sint occaecat
							cupidatat non proident, sunt in culpa qui officia
							deserunt mollit anim id est laborum
						</p>

						<button className='bg-gray-900 text-white hover:bg-gray-700 py-2 px-4 rounded my-5'>
							<h2 onClick={loadUserTokens}>Connect wallet to trace</h2>
						</button>
					</div>
				</section>
			</div>
			<footer className='flex flex-row justify-between my-2 mx-2'>
				<a>@ 2021 science fund dao</a>
				<a href='#'>white paper</a>
			</footer>
		</div>
	);
}
