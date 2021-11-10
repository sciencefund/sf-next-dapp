export default function ModalDisplayScreen(props) {

    const { close } = props

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
                {props.children}
            </div>
        </div>
    )
}