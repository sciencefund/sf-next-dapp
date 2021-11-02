export default function TxMessage(props) {



    return (
        <div className='fixed top-0 left-0 bg-opacity-30 bg-black h-screen w-full '>


        <div className='relative  w-3/4 h-auto border-4 border-white mx-auto mt-24 p-2 bg-white rounded shadow-2xl'>
            <button
                className='absolute top-0 right-0 w-8 h-8 bg-gray-900 text-white border-2 rounded-full shadow-2xl text-xl hover:bg-gray-700'
                onClick={props.close}>
                &times;
            </button>
            <div className='my-10 max-w-lg mx-auto text-center w-1/2'>

                {/* <h2>{props.msg}</h2> */}

                <div className="mb-10">
                    <h1 className="text-blue-900 text-xl font-thin my-2">Thank You!</h1>
                    <p className="text-xs mx-auto"> The transaction is successful. Link to transaction <a href="/"
                        className="text-blue-900">receipt on Etherscan</a></p>
                </div>

                <div className="border-2 border-gray-400 h-96 w-80 mx-auto shadow-2xl">



            </div>






            </div>


        </div>
    </div>
);
}