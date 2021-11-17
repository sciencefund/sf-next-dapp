export default function ModalDisplayScreen(props) {

    const { close, network } = props

    return (

        <div className='fixed top-0 left-0 bg-opacity-30 bg-black h-screen w-full overflow-y-scroll'>
            {/* foreground modal screen */}
            <div className='relative  w-3/4 h-auto border-4 border-white mx-auto mt-24 p-2 bg-white rounded shadow-2xl'>

                {/* close button */}
                <button
                    className='absolute top-0 right-0 w-8 h-8 bg-gray-900 text-white border-2 rounded-full shadow-2xl text-xl hover:bg-gray-700'
                    onClick={close}>
                    &times;
                </button>
                {/* network indicator */}
                {network &&
                    <div className="capitalize text-gray-400 flex items-center">
                        <div className="rounded-full h-3 w-3 bg-green-900"></div>
                        <span className="mx-2">{network}</span>
                    </div>
                }
                {props.children}
            </div>
        </div>
    )
}