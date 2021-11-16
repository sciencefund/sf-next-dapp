import { useState, useEffect, useReducer, useCallback } from "react";

import Head from "next/head";

import { ethers, providers } from "ethers"
import Web3Modal from "web3modal"
import { BigNumber } from "@ethersproject/bignumber";
import WalletConnectProvider from '@walletconnect/web3-provider'


import ScienceFund from "../artifacts/contracts/ScienceFund.sol/ScienceFund.json";

import BigButton from "../components/bigButton";
import ConnectWallet from "../components/connectWallet";
import CheckoutScreen from "../components/checkoutScreen";
import Summary from "../components/summary";
import WhyNFT from "../components/whyNFT";
import FundingPools from "../components/fundingPool";
import Trace from "../components/trace";
import TraceScreen from "../components/traceScreen";



const contractAddress = process.env.NEXT_PUBLIC_RINKEBY_CONTRACT_ADDRESS;
console.log(contractAddress);


const providerOptions = {
	walletconnect: {
		package: WalletConnectProvider, // required
		options: {
			infuraId: "INFURA_ID" // required
		}
	}
}

let web3Modal
if (typeof window !== 'undefined')
{
	web3Modal = new Web3Modal({
		network: 'mainnet',
		cacheProvider: true,
		providerOptions,
	})

}


const initialState = {
	provider: null,
	etherProvider: null,
	address: null,
	network: null,
}

function reducer(state, action)
{
	switch (action.type)
	{
		case 'SET_WEB3_PROVIDER':
			return {
				...state,
				provider: action.provider,
				etherProvider: action.web3Provider,
				address: action.address,
				network: action.network
			}
		case 'SET_ADDRESS':
			return {
				...state,
				address: action.address,
			}
		case 'SET_CHAIN_ID':
			return {
				...state,
				network: action.network
			}
		case 'RESET_WEB3_PROVIDER':
			return initialState
		default:
			throw new Error()
	}

}


export default function Home()
{

	const [state, dispatch] = useReducer(reducer, initialState)
	const { provider, etherProvider, address, network } = state

	const [sftContract, setSftContract] = useState(null);
	const [startCheckout, setStartCheckout] = useState(false);
	const [startTrace, setStartTrace] = useState(false);

	const connect = useCallback(async function ()
	{

		const provider = await web3Modal.connect()
		const web3Provider = new providers.Web3Provider(provider)
		const signer = web3Provider.getSigner()
		const address = await signer.getAddress()
		const network = await web3Provider.getNetwork()

		dispatch({
			type: 'SET_WEB3_PROVIDER',
			provider,
			etherProvider: web3Provider,
			address,
			network: network.name
		})

	}, [])

	const disconnect = useCallback(async function ()
	{
		await web3Modal.clearCachedProvider()
		if (provider?.disconnect && typeof provider.disconnect === 'function')
		{
			await provider.disconnect()
		}
		dispatch({
			type: 'RESET_WEB3_PROVIDER',
		})
	}, [provider])

	// auto load cached provider
	useEffect(() =>
	{
		if (web3Modal.cacheProvider)
		{
			connect()
		}
	}, [connect])


	// useEffect(() => {
	// 	if (!sftContract) {
	// 		loadContract()
	// 	}
	// 	if (!account) {
	// 		activate(connectors.Injected, err => console.log(err))
	// 	}
	// });



	// load contract
	const loadContract = async () => {

		if (typeof window.ethereum !== 'undefined') {
			// load the network provider 
			// const provider = new ethers.providers.Web3Provider(window.ethereum)
			// setLocalProvider(provider);


			// connet to contract on the network
			const contract = new ethers.Contract(contractAddress, ScienceFund.abi, web3Provider);
			const connectedContract = await contract.connect(web3Provider.getSigner(0));
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

		if (!address)
		{
			connect();
		}
	};

	const traceScreen = () => {
		//start trace screen
		setStartTrace(true);

		if (!address)
		{
			connect();
		}
	};



	return (
		<div className='w-screen mx-auto font-serif'>
			<Head>
				<title>Science Fund</title>
				<meta name='description' content='Science Fund Home Page' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className='w-screen mx-auto'>
				<section className='relative mx-auto bg-dark-water bg-fixed bg-cover w-screen'>
					{address ?
						<ConnectWallet
							onClick={disconnect}
							label='Disconnect'
						/>
						:
						<ConnectWallet
							onClick={connect}
							label='Connect Wallet'
						/>
					}

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

				<div className="w-screen bg-misty-forest bg-opacity-50 bg-cover h-full">

					<Summary />
					<FundingPools onClick={checkoutScreen} account={address} />

					<Trace onClick={traceScreen} account={address} />

					<WhyNFT />
				</div>



				{startCheckout && <CheckoutScreen
					close={() => {
						setStartCheckout(false);
					}}
					sftContract={sftContract}
					account={address}
				/>}

				{startTrace && <TraceScreen
					close={() => {
						setStartTrace(false);
					}}
					sftContract={sftContract}
					account={address}
				/>}





			</div>
			<footer className='flex flex-row justify-between my-2 mx-2'>
				<a>@ 2021 science fund dao</a>
				<a href='#'>white paper</a>
			</footer>
		</div>
	);
}
