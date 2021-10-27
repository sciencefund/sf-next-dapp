
export default function TxMessage(props) {



    return (
        <div className='fixed top-0 left-0 bg-opacity-30 bg-black h-screen w-full '>
            <div className='relative w-1/3 h-96 border-4 border-white mx-auto mt-24 p-2 bg-white rounded shadow-2xl'>
                <button
                    className='absolute top-0 right-0 w-8 h-8 bg-gray-900 text-white border-2 rounded-full shadow-2xl text-xl hover:bg-gray-700'
                    onClick={props.close}>
                    &times;
                </button>
                <div className='my-4 mx-5'>
                    <h2>{props.msg}</h2>
                </div>
            </div>



        </div>
    );
}