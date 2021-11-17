export default function BigButton(props) {

	const { label, onClick } = props

	return (
		<button className='border-2 hover:bg-gray-900 hover:text-gray-200  py-2 px-5 rounded-xl my-5 mx-5 ' onClick={onClick}>
			<p className='text-l font-bold text-grey-100 mx-3 font-light uppercase px-10'>
				{label}
			</p>
		</button>
	);
}
