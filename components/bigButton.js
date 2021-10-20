export default function BigButton(props) {
	return (
		<button className='bg-gray-900 hover:bg-gray-700 py-2 px-5 rounded my-5 mx-5'>
			<a href={props.href}>
				<p className='text-l font-bold text-grey-100 hover:text-grey-700 mx-3 font-light uppercase '>
					{props.label}
				</p>
			</a>
		</button>
	);
}
