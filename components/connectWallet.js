export default function ConnectWallet(props) {
	const { onClick, label } = props
	return (
		<div
			className='fixed top-0 right-2 border-2 border-gray-400 rounded-2xl my-3 mx-2 py-1 hover:bg-gray-900' onClick={onClick}>
			<button className='mx-5 px-2 font-light text-s text-gray-400 hover:text-gray-100'>
				{label}
			</button>
		</div>
	);
}
