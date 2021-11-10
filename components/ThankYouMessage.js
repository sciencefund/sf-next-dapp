import { useEffect, useState } from "react";
import { BigNumber } from "@ethersproject/bignumber";

import DisplayTokenURI from "./receiptDisplay";



export default function ThankYouMessage(props) {
    const { txhash, account, sftContract } = props
    const [tokenURI, setTokenURI] = useState(undefined);


    const loadReceipt = async () => {
        if (!account) {
            "Connect Wallet"
        }
        if (account) {

            try {
                const balanceHex = await sftContract.balanceOf(account)
                const ownerTotal = BigNumber.from(balanceHex).toNumber();
                var id_hex = await sftContract.tokenOfOwnerByIndex(account, ownerTotal - 1);
                const sft = await sftContract.tokenURI(id_hex)

                // simulate a delay
                setTimeout(() =>
                {
                    setTokenURI(sft);
                }, 2000)

                // var id_number = BigNumber.from(id_hex).toNumber();
                console.log(sft, id_hex)
            }
            catch (e) {
                console.log(e, 'error in loading user receipt')
            }
        }
    }

    useEffect(() => { loadReceipt() }, [])

    return (

        <div className='my-10 max-w-lg mx-auto text-center w-3/5'>

            <div className="my-10 h-24">
                    <h1 className="text-blue-900 text-2xl font-thin my-5">Thank You!</h1>
                <p className="text-sm w-4/5 mx-auto"> The transaction is sent successfully. Here is your transaction hash <a href="/" className="text-blue-900 text-sm break-words ">{txhash}</a></p>
            </div>


            {/* display real receipt */}
            {tokenURI && <DisplayTokenURI json={tokenURI} />}
            {!tokenURI && <div className='mx-auto  my-auto my-10 w-auto h-96 bg-white rounded shadow-2xl p-2' >
                <h1 className="text-blue-900 text-2xl font-thin my-10">Transaction Sent!</h1>
                <p className="text-sm w-1/2 mx-auto"> The transaction is sent successfully to the Ethereum public blockchain.
                </p>
                <p className="my-24 px-5 w-1/2 mx-auto text-blue-900 italic">Waiting for your transaction to be mined ...</p>
            </div >
            }


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

    );
}