import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import { useState } from "react";

export default function DonateWindow(props) {
	const { mintSFT } = props;
	const [value, setValue] = useState(1);
	const [selectedPool, setSelectedPool] = useState('Science Fund General Pool');
	const exRate = 4146.55;
	const userDonate = (event) => {
		setValue(event.target.value);

	};
	const userChangePool = event => {
		setSelectedPool(event.target.value);
	}

	return (
		// background modal screen
		<div className='fixed top-0 left-0 bg-opacity-30 bg-black h-screen w-full '>

			{/* foreground modal screen */}
			<div className='relative  w-3/4 h-auto border-4 border-white mx-auto mt-24 p-2 bg-white rounded shadow-2xl'>

				{/* close button */}
				<button
					className='absolute top-0 right-0 w-8 h-8 bg-gray-900 text-white border-2 rounded-full shadow-2xl text-xl hover:bg-gray-700'
					onClick={props.close}>
					&times;
				</button>


				{/* page 1 checkout info */}
				<div className='my-10 max-w-lg mx-auto text-center w-3/5'>


					<div>
						<h1 className="text-blue-900 text-xl font-thin my-2">Donate to Science Fund</h1>
						<p className="text-xs mx-auto"> Place your donation in ETH. Additional instructions or help please contact us at: <a href="/" className="text-blue-900">contact@sciencefund.io</a></p>
					</div>


					<hr className="my-11 w-full mx-auto" />



					<label className='block my-8 text-center mx-auto'>
						<div className='text-gray-700 w-4/5 mx-auto max-w-64 text-base font-semibold '>
							Which funding pool would you like to donate to?
						</div>
						<select onChange={userChangePool} value={selectedPool}
							className='block w-4/5 max-w-64 mx-auto my-8 py-1 rounded-xl bg-gray-100 text-sm'>
							<option value>Science Fund General Pool</option>
							<option>Predicting New Outbreaks</option>
						</select>
					</label>



					<p className="text-xs mx-auto">We are currently only accepting donations
						for our Pandemic Preparedness funding drive or the Science Fund general pool.
						Stay tuned for
						additional funding drives soon. </p>


					<hr className="my-11 w-full mx-auto" />


					<label className='block my-4  mx-auto'>
						<div className='block my-2 text-gray-700 text-lg font-semibold'>
							Donation Amount</div>
						<input
							type='number'
							min='0.00001'
							name='value'
							className='inlineblock w-1/2 max-w-32 pl-5 py-1 rounded bg-gray-100'
							placeholder='1'
							onChange={userDonate}
						/>
						<span className="text-gray-700 mx-2 text-xl">ETH</span>
						<span className='text-gray-700 text-xs font-light'>
							= {Math.round(exRate * value * 100) / 100} USD
						</span>
					</label>

					<hr className="my-11 w-full mx-auto" />


					<p className="text-xs mx-auto">Ready to mint your unique NFT receipt?
						It is an immutable, permanent record
						of your contribution to future generations.
						Add a few finishing touches on the next page!</p>
					<button className='bg-gray-900 text-white w-2/3 hover:bg-gray-700 py-2 px-4 my-8 rounded'>
						<h2 onClick={() => mintSFT(value, selectedPool)}>Mint</h2>
					</button>
				</div>



			</div>

		</div>
	);
}
