import { useState } from "react";

import Head from "next/head";
import TopicCard from "../components/topicCard";
import BigButton from "../components/bigButton";
import ConnectWallet from "../components/connectWallet";

export default function Home() {

	const [initialState, setInitialState] = useState(
		{
			userAddress: undefined,
			selectedNetwork: undefined,
			balance: undefined,
		}
	);

	const readWallet = async () => {
		const [selectedAddress] = await window.ethereum.enable();
		console.log(`connecting to ${selectedAddress}`)
		setInitialState({ userAddress: selectedAddress });
	}

	const donate = () => {
		// trigger a pop-up window 
		if (!initialState.userAddress) {
			readWallet();
		} else {
			console.log("ready to donate")
		}
	}

	return (
		<div className='container mx-auto font-serif'>
			<Head>
				<title>Science Fund</title>
				<meta name='description' content='Science Fund Home Page' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<body className='w-screen mx-auto' >
				<section className='relative mx-auto bg-dark-water bg-fixed bg-cover w-screen'>
					{initialState.userAddress ?
						< ConnectWallet connect={() => { }} label="Logout" /> :
						< ConnectWallet connect={readWallet} label="Connect Wallet" />}

					<div className='text-center text-white mx-auto w-3/4 py-48'>
						<p className='text-grey-800 text-3xl italic mb-4 '>
							Reimagining the path to discovery
						</p>
						<h1 className='text-grey-900 text-6xl uppercase mb-6 font-bold tracking-wide'>
							science fund
						</h1>
						<BigButton
							label='Stay tuned'
							href='https://docs.google.com/forms/d/e/1FAIpQLSf7upF5dRzrnZUDeW2NgEcyRkeaeFCDpDKFwMHMfTr6zPObLg/viewform'
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

						<button className='bg-gray-900 text-white hover:bg-gray-700 py-2 px-4 rounded my-5' onClick={donate}>
							{initialState.userAddress ? <h2>Mint Tokens</h2> : <h2>Connect wallet to donate</h2>}
						</button>
					</div>

					<div className='flex flex-row justify-evenly
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
							<h2>Connect wallet to trace</h2>
						</button>
					</div>

				</section>
			</body>
			<footer className='flex flex-row justify-between my-2'>
				<a>@ 2021 science fund dao</a>
				<a href='#'>white paper</a>
			</footer>
		</div>
	);
}
