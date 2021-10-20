import Image from "next/image";

export default function TopicCard(props) {
	return (
		<div className='text-white h-96 w-48 mx-3 my-1 px-1 flex flex-col justify-between from-gray-900 to-blue-900 bg-gradient-to-tl'>
			<Image src={props.imagePath} width='200' height='200' />
			<h2 className='text-lg px-3 font-bold'>{props.topic}</h2>
			<p className='text-sm px-3 py-1'>{props.description}</p>

			<button className='bg-blue-400 text-black hover:bg-blue-700 py-1 px-5 rounded my-5'>
				<p className='text-base text-blue-900 hover:text-blue-100 mx-3'>
					Donate
				</p>
			</button>
		</div>
	);
}
