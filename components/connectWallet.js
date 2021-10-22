
export default function ConnectWallet() {


	const handleClick = () => {
		console.log(" connecting ")
	}


	return (
		<div className='fixed top-0 right-2 border-2 border-gray-400 rounded-2xl my-3 mx-2 py-1 hover:bg-gray-900' onClick={handleClick}>
			<a className='mx-5 my-3 px-2 lowercase font-light text-s text-gray-400 hover:text-gray-100'>
				Connect Wallet
			</a>
		</div>

	);
}
