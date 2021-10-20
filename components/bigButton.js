export default function BigButton(props) {
	return (
		<button className='from-gray-900 to-gray-500 bg-gradient-to-tl border-2  border-transparent hover:border-gray-100 py-2 px-5 rounded my-5 mx-5'>
			<a href='/'>
				<p className='text-xl text-grey-100 hover:text-grey-700 mx-3 font-light uppercase '>
					{props.label}
				</p>
			</a>
		</button>
	);
}
