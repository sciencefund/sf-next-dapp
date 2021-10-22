import Image from "next/image";

export default function TopicCard(props) {
	return (
		<div className='flex w-72 h-96 flex-col justify-between items-stretch text-white mx-3 my-1 px-1 from-gray-900 to-blue-900 bg-gradient-to-tl text-center'>
			<Image src={props.imagePath} width='300' height='300' />
			<h2 className='text-lg px-3 font-bold'>{props.topic}</h2>
			<p className='text-sm px-3 py-1'>{props.description}</p>

			<button className='bg-blue-400 text-black hover:bg-blue-700 py-1 px-5 rounded my-5'>
				<p className='text-base text-blue-900 hover:text-blue-100 mx-3'>
					Read more
				</p>
			</button>
		</div>
	);
}
