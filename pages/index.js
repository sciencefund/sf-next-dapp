import Head from "next/head";
import TopicCard from "../components/topicCard";
import BigButton from "../components/bigButton";

export default function Home() {
	return (
		<div className='container mx-auto w-full'>
			<Head>
				<title>Science Fund</title>
				<meta name='description' content='Science Fund Home Page' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className='container mx-auto'>
				<section className='flex flex-col items-center justify-center  bg-dark-water text-white h-screen w-screen '>
					<p className='text-grey-800 text-2xl italic mt-34 mb-4 '>
						Reimagining the path to discovery
					</p>
					<h1 className='text-grey-900 text-6xl uppercase mb-6'>
						science fund
					</h1>

					<div className='flex flex-row justify-between '>
						<BigButton label='Donate' />
						<BigButton label='Trace' />
					</div>
				</section>
				{/* Curated Pool */}
				<section className='container mx-auto px-4'>
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

						<button className='bg-gray-900 text-white hover:bg-gray-700 py-2 px-4 rounded my-5'>
							<h2>Connect wallet to donate</h2>
						</button>
					</div>

					<div className='flex flex-row justify-evenly'>
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
						<TopicCard
							imagePath='/images/topics/earth.jpg'
							topic='Climate Change'
							description='Are we the first generation to feel the effect of climate change and last generation to do something about it? '
						/>
						<TopicCard
							imagePath='/images/topics/microbiology.jpg'
							topic='Microbiology'
							description='The microbes within us and grander view of life.'
						/>
					</div>
				</section>
			</main>
			<footer className='flex flex-row justify-between my-2'>
				<a>@ 2021 science fund dao</a>
				<a href='#'>white paper</a>
			</footer>
		</div>
	);
}
