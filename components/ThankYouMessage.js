import SvgImage from "./svgImage";


export default function ThankYouMessage(props) {
    const { txhash, blockhash, pool, amount, account, close } = props

    return (
        <div className='fixed top-0 left-0 bg-opacity-30 bg-black h-screen w-full '>


            <div className='relative  w-3/4 h-auto border-4 border-white mx-auto mt-24 p-2 bg-white rounded shadow-2xl'>
                <button
                    className='absolute top-0 right-0 w-8 h-8 bg-gray-900 text-white border-2 rounded-full shadow-2xl text-xl hover:bg-gray-700'
                    onClick={close}>
                    &times;
                </button>
                <div className='my-10 max-w-lg mx-auto text-center'>


                    <div className="mb-10">
                        <h1 className="text-blue-900 text-2xl font-thin my-2">Thank You!</h1>
                        <p className="text-sm mx-auto"> The transaction is successful. Link to transaction <a href="/" className="text-blue-900">receipt</a></p>
                    </div>

                    {/* actual receipt */}
                    <SvgImage
                        pool={pool}
                        amount={amount}
                        account={account}
                        txhash={txhash} />


                    <div className="h-auto mt-20">


                        <button className='block mx-auto bg-gray-900 text-white w-1/2 hover:bg-gray-700 py-2 px-4 my-8 rounded'>
                            <h2>Print Transaction Receipt</h2>
                        </button>


                        <button className='block mx-auto text-blue-900 w-1/2 hover:underline py-1  px-2 my-1 rounded'>
                            <h2><a src="/">Share on social media</a></h2>
                        </button>

                        <button className='block mx-auto text-blue-900 w-1/2 hover:underline py-1 px-2 my-1 rounded'>
                            <h2><a src="/">Link to trace your token</a></h2>
                        </button>
                    </div>





                </div>


            </div>
        </div>
    );
}