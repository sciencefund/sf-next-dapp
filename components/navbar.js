import Image from "next/image";

export default function NavBar() {
	return (
		<div className='container w-screen mx-auto fixed text-white'>
			<div className='flex flex-row justify-between'>
				<p className=' text-base mx-5 my-auto'>SF</p>

				<div className='flex justify-evenly'>
					<a className='mx-5 my-3 uppercase font-light text-xs'>
						Mission
					</a>
					<a className='mx-5 mr-10 my-3 uppercase font-light text-xs'>
						Team
					</a>
				</div>
			</div>
		</div>
	);
}
