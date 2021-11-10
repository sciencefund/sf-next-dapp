import SvgImage from "./svgImage";
import ModalDisplayScreen from "./modelDisplayScreen";

export default function ThankYouMessage(props) {
    const { txhash, blockhash, pool, amount, account, close } = props

    return (

        <ModalDisplayScreen close={close}>
            <div className='my-10 max-w-lg mx-auto text-center'>


                <div className="my-10 h-24">
                    <h1 className="text-blue-900 text-2xl font-thin my-5">Thank You!</h1>
                    <p className="text-sm w-4/5 mx-auto"> The transaction is successful. Link to transaction <a href="/" className="text-blue-900">receipt</a> on Etherscan.io</p>

                </div>


                {/* actual receipt */}
                <div className='mx-auto my-10 w-min h-auto bg-white rounded shadow-2xl p-2' >
                    <SvgImage
                        pool={pool}
                        amount={amount}
                        id="id" />
                </div >


                <div className="h-48 mt-10">
                    <button className='block mx-auto bg-gray-900 text-white w-1/2 hover:bg-gray-700 py-2 px-4 my-8 rounded' >
                        <h2>Save Your NFT Receipt</h2>
                    </button>

                    <button className='block mx-auto text-blue-900 w-1/2 hover:underline py-1  px-2 my-1 rounded'>
                        <h2><a src="/">Share on social media</a></h2>
                    </button>

                    <button className='block mx-auto text-blue-900 w-1/2 hover:underline py-1 px-2 my-1 rounded'>
                        <h2><a src="/">Link to trace your token</a></h2>
                    </button>
                </div>





            </div>
        </ModalDisplayScreen >
    );
}