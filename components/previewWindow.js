import ModalDisplayScreen from "./modalDisplayScreen";
import SvgImage from "./svgImage";

export default function PreviewWindow(props) {
    const { onClick, pool, amount } = props

    console.log(pool, 'pool');
    console.log(amount, 'amountInETH')


    return (

            <div className='my-10 max-w-lg mx-auto text-center'>

                <div className="my-10 h-24">
                    <h1 className="text-blue-900 text-2xl font-thin my-5">Preview Your Token</h1>
                    <p className="text-sm w-4/5 mx-auto"> Preview a sample of the generated NFT receipt from Science Fund to be part of the discovery process.</p>
                </div>


                {/* actual receipt */}

                <div className='mx-auto my-10 w-min h-auto bg-white rounded shadow-2xl p-2' >
                    <SvgImage
                        pool={pool}
                        amount={amount}
                        id='id' />
                </div >



                <div className="h-48 mt-10">
                    <button className='block mx-auto bg-gray-900 text-white w-1/2 hover:bg-gray-700 py-2 px-4 my-8 rounded' onClick={onClick}>
                        <h2>Mint</h2>
                    </button>

                    <button className='block mx-auto text-blue-900 w-1/2 hover:underline py-1  px-2 my-1 rounded'>
                        <h2><a src="/"></a></h2>
                    </button>

                    <button className='block mx-auto text-blue-900 w-1/2 hover:underline py-1 px-2 my-1 rounded'>
                        <h2><a src="/">Back</a></h2>
                    </button>
                </div>
            </div>


    );
}