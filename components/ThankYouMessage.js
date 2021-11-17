import { useEffect, useState } from "react";
import { BigNumber } from "@ethersproject/bignumber";

import DisplayTokenURI from "./receiptDisplay";
import ProgressIndicator from "./ProgressIndicator";


export default function ThankYouMessage(props) {
    const { txhash, txSuccess, account, sftContract } = props
    const [tokenURI, setTokenURI] = useState(undefined);

    const loadReceipt = async () => {

        if (txSuccess)
        {

            try {
                // await for the tx to finish otherwise the display is from a previous token

                const balanceHex = await sftContract.balanceOf(account)
                const ownerTotal = BigNumber.from(balanceHex).toNumber();
                var id_hex = await sftContract.tokenOfOwnerByIndex(account, ownerTotal - 1);
                const sft = await sftContract.tokenURI(id_hex)

                setTokenURI(sft);


            }
            catch (e) {
                console.log(e, 'error in loading user receipt')
            }
        }
    }

    useEffect(() => { loadReceipt() }, [txSuccess])

    return (

        <div className=''>


            {/* display real receipt */}
            {tokenURI && <DisplayTokenURI json={tokenURI} />

            }
            {!tokenURI && <div className='mx-auto  my-auto my-10 w-full h-96 bg-white rounded shadow-2xl p-2' style={{ height: "428px" }}>
                <h1 className="text-blue-900 text-2xl font-thin my-10">Transaction Sent!</h1>
                <p className="text-sm w-3/4 mx-auto"> The transaction is sent successfully to the Ethereum Rinkeby Testnet.
                </p>


                <ProgressIndicator label="mining your transaction" />

            </div >
            }


            <div className="h-48 mt-10">
                {tokenURI &&
                    <>
                    <button className='block mx-auto bg-gray-900 text-white w-1/2 hover:bg-gray-700 py-2 px-4 my-8 rounded' >
                        <h2>Save your NFT receipt</h2>
                    </button>

                    <button className='block mx-auto text-blue-900 w-1/2 hover:underline py-1  px-2 my-1 rounded'>
                        <h2><a href="/">Share on social media</a></h2>
                    </button>

                    <button className='block mx-auto text-blue-900 w-1/2 hover:underline py-1 px-2 my-1 rounded'>
                        <h2><a href={`https://rinkeby.etherscan.io/tx/${ txhash }`}>See your transaction on Etherscan.io</a></h2>
                    </button>
                    </>}
            </div>





        </div>

    );
}