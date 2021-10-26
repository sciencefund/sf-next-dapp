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
	console.log(selectedPool,'selected')

	return (
		<div className='fixed top-0 left-0 bg-opacity-30 bg-black h-screen w-full '>
			<div className='relative w-1/3 h-96 border-4 border-white mx-auto mt-24 p-2 bg-white rounded shadow-2xl'>
				<button
					className='absolute top-0 right-0 w-8 h-8 bg-gray-900 text-white border-2 rounded-full shadow-2xl text-xl hover:bg-gray-700'
					onClick={props.close}>
					&times;
				</button>
				<div className='my-4 mx-5'>
					<label className='block my-4'>
						<span className='text-gray-700 text-xl font-bold '>
							Funding pool
						</span>
						<select onChange={userChangePool} value={selectedPool} className='block w-full mt-1 pl-5 py-1 rounded-xl bg-gray-100'>
							<option selected>Science Fund General Pool</option>
							<option>Neuroscience</option>
							<option>Infectious Diseases</option>
						</select>
					</label>
					<label className='block my-4'>
						<span className='text-gray-700 text-xl font-bold'>
							Your donation (ETH)
						</span>
						<input
							type='number'
							min='0.00001'
							name='value'
							className='block w-full pl-5 py-1 rounded bg-gray-100'
							placeholder='1'
							onChange={userDonate}
						/>
						<span className='text-gray-700 text-xs font-light ml-5'>
							~ {Math.round(exRate * value * 100) / 100} USD
						</span>
					</label>
					<button className='bg-gray-900 text-white w-full hover:bg-gray-700 py-2 px-4 rounded my-5'>
						<h2 onClick={() => mintSFT(value, selectedPool)}>Mint</h2>
					</button>
				</div>
			</div>
		</div>
	);
}
