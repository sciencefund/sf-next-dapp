
export default function TopicCard(props) {
	return (
		<div className='w-64 h-96 text-white mx-3 px-1 from-gray-900 to-blue-900 bg-gradient-to-tl'>
			<img src={props.imagePath} width='300' height='300' />
			<div className='text-gray-100  rounded my-5 text-left'>
				<h2 className='text-base px-3 font-bold'>{props.topic}</h2>

				<p className='text-sm px-3 py-1'>{props.description}</p>
				<button className='text-xs text-gray-400 hover:text-blue-100 mx-3'>
					Read More &raquo;
				</button>
			</div>
		</div>
	);
}
