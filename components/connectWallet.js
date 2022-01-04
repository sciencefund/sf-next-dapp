export default function ConnectWallet(props)
{
	const { onClick, label, network } = props
	return (
		<div className="fixed top-0 right-2 flex flex-row items-center">
			{network &&
				<div className="capitalize text-gray-400 flex items-center">
					<div className="rounded-full h-3 w-3 bg-green-900"></div>
					<span className="mx-2">{network}</span>
				</div>
			}
			<div
				className='border-2 border-gray-400 rounded-2xl my-3 mx-2 py-1 hover:bg-gray-900' onClick={onClick}>
				<button className='mx-5 px-2 font-light text-s text-gray-400 hover:text-gray-100'>
					{label}
				</button>
			</div>
		</div>
	);
}
