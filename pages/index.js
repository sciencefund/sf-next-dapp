import { useState, useEffect, useReducer, useCallback } from "react";

import Head from "next/head";

import { ethers } from "ethers"
import Web3Modal from "web3modal"
import WalletConnectProvider from '@walletconnect/web3-provider'


import ScienceFund from "../artifacts/contracts/ScienceFund.sol/ScienceFund.json";

import BigButton from "../components/bigButton";
import ConnectWallet from "../components/connectWallet";
import CheckoutScreen from "../components/checkoutScreen";
import Summary from "../components/summary";
import WhyNFT from "../components/whyNFT";
import HowItWorks from "../components/howitworks";
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
	web3Provider: null,
	address: null,
	network: null,
	contract: null,
}

function reducer(state, action)
{
	switch (action.type)
	{
		case 'SET_WEB3_PROVIDER':
			return {
				...state,
				provider: action.provider,
				web3Provider: action.web3Provider,
				address: action.address,
				network: action.network,
				contract: action.contract
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
	const { provider, web3Provider, address, network, contract } = state

	const [startCheckout, setStartCheckout] = useState(false);
	const [startTrace, setStartTrace] = useState(false);

	const connect = async () =>
	{
		const provider = await web3Modal.connect()
		const web3Provider = new ethers.providers.Web3Provider(provider)
		const signer = web3Provider.getSigner()
		const address = await signer.getAddress()
		const network = await web3Provider.getNetwork()

		// conncet to contract on the network
		const contract = new ethers.Contract(process.env.NEXT_PUBLIC_RINKEBY_CONTRACT_ADDRESS, ScienceFund.abi, web3Provider);
		const sftContract = contract.connect(signer);

		dispatch({
			type: 'SET_WEB3_PROVIDER',
			provider: provider,
			web3Provider: web3Provider,
			address: address,
			network: network.name,
			contract: sftContract
		})
	}

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


	//listen to events specified by EIP-1193
	useEffect(() =>
	{
		if (provider?.on)
		{
			// https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
			provider.on('chainChanged', () => { window.location.reload() })

			//subscription cleanup
			return () =>
			{
				if (provider.removeListener)
				{
					provider.removeListener('chainChanged', () => { window.location.reload() })
				}
			}
		}

	}, [provider])

	const checkoutScreen = () =>
	{
		//start checkout screen
		setStartCheckout(true);

		if (!address)
		{
			connect();
		}
	};

	const traceScreen = () =>
	{
		//start trace screen
		setStartTrace(true);

		if (!address)
		{
			connect();
		}
	};



	return (
		<div className='w-screen mx-auto font-serif overflow-x-hidden'>
			<Head>
				<title>Science Fund</title>
				<meta name='description' content='Science Fund Home Page' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className='w-screen mx-auto'>
				<section className='relative mx-auto bg-gradient-to-r from-gray-900 via-green-700 to-gray-900 bg-opacity-10 w-screen'>
					{web3Provider ?
						<ConnectWallet
							onClick={disconnect}
							label='Disconnect'
							network={network}
						/>
						:
						<ConnectWallet
							onClick={connect}
							label='Connect Wallet'
							network={network}
						/>
					}

					<div className='text-center text-white mx-auto w-3/4 py-48 h-min-96'>
						<p className='text-grey-800 text-3xl italic mb-4 '>
							Reimagining the path to discovery
						</p>
						<h1 className='text-grey-900 text-6xl uppercase mb-6 font-bold tracking-wide'>
							science fund
						</h1>
						<p className='mx-auto my-20 font-thin font-sans text-2xl md:w-96 sm:w-full '>  Bringing a continuously evolving impact trail to backers of scientific knowledge with NFTs and beyond.
						</p>
						<a href="#Donate">
							<BigButton label="Learn more" onClick={() => { }} />
						</a>
					</div>
					<div className="h-18">
					</div>
				</section>


				<section className="p-10">
					<Summary />
				</section>

				<section id="Donate">
					<div className="w-screen bg-misty-forest bg-opacity-10 bg-cover h-full text-gray-300 py-24 pb-36">
						<div className="mx-auto text-center w-3/4 py-8">
							<h1 className='mb-4 text-4xl'>
								How It Works{" "}
							</h1>
							<div className="flex items-center justify-around">
								<BigButton
									label=
									"Mint Tokens"
									onClick={checkoutScreen}
								/>
								<BigButton
									label="Trace Tokens"
									onClick={traceScreen}
								/>
							</div>
						</div>
						<HowItWorks />

					</div>
				</section>

				<section id="pandemic">

				</section>

				{/* <WhyNFT /> */}

				{startCheckout && contract && <CheckoutScreen
					close={() =>
					{
						setStartCheckout(false);
					}}
					contract={contract}
					account={address}
					network={network}
				/>}

				{startTrace && web3Provider && <TraceScreen
					close={() =>
					{
						setStartTrace(false);
					}}
					contract={contract}
					account={address}
					network={network}
				/>}





			</div>
			<footer className='mx-auto text-center my-2 mx-2 p-5'>
				<a>@ 2021 Science Fund. All Rights Reserved.</a>
			</footer>
		</div>
	);
}
