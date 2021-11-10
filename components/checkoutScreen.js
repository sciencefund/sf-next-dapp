import { useState } from "react";
import { ethers } from "ethers"

import ModalDisplayScreen from "./modalDisplayScreen";

import MintWindow from "./mintWindow";
import ThankYouMessage from "./ThankYouMessage";




export default function CheckoutScreen(props) {
    // This component contains all the states related to this transaction
    const { close, sftContract, account } = props

    const [txHash, setTxHash] = useState(undefined);
    const [txError, setTxError] = useState(undefined);



    const readyToMint = (amountInEth, selectedPool) => {

        mintSFT(amountInEth, selectedPool);

    }



    const mintSFT = async (amountInETH, selectedPool) => {

        const overrides = {
            value: ethers.utils.parseEther(amountInETH.toString())
        }

        try {



            // sent transaction to network
            const tx = await sftContract.donate(selectedPool, overrides)


            // wait for the transaction to be mined
            const receipt = await tx.wait();
            console.log(receipt, "receipt value");


            //TODO? the waiting 
            setTxHash(receipt.transactionHash);

        } catch (error) {

            console.log(error, 'tx error')
            setTxError(error);

        } finally {
            //update transaction states

        }
    }




    return (

        <ModalDisplayScreen close={close}>

            {(!txHash) && <MintWindow readyToMint={readyToMint} />}

            {txHash && !txError && <ThankYouMessage
                txhash={txHash}
                account={account}
                sftContract={sftContract}
            />
            }

        </ModalDisplayScreen>




    );
}