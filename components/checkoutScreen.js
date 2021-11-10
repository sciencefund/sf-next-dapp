import { useState } from "react";
import { ethers } from "ethers"

import ModalDisplayScreen from "./modalDisplayScreen";

import MintWindow from "./mintWindow";
import ThankYouMessage from "./ThankYouMessage";

// import PreviewWindow from "./previewWindow";
// import TxMessage from "./txMessage";



export default function CheckoutScreen(props) {
    // This component contains all the states related to this transaction
    const { close, sftContract, account } = props

    // const [preview, setPreview] = useState(false)
    // const [value, setValue] = useState(0.2);
    // const [pool, setPool] = useState(undefined);
    // const [tokenURI, setTokenURI] = useState(undefined);

    const [txHash, setTxHash] = useState();
    const [txState, setTxState] = useState({
        txSent: false,
        txError: undefined,
        txSuccessHash: undefined, //hash
        txBlockHash: undefined,
        txAmount: undefined,
        txPool: undefined,
    })


    const readyToMint = (amountInEth, selectedPool) => {
        // setValue(amountInEth);
        // setPool(selectedPool);
        mintSFT(amountInEth, selectedPool);

    }



    const mintSFT = async (amountInETH, selectedPool) => {

        const overrides = {
            value: ethers.utils.parseEther(amountInETH.toString())
        }

        try {
            // setTxState({
            //     txSent: undefined,
            //     txError: undefined,
            //     txSuccessHash: undefined, //txhash
            //     txBlockHash: undefined
            // });


            // sent transaction to network
            const tx = await sftContract.donate(selectedPool, overrides)

            setTxState({
                txSent: true,
            })

            // wait for the transaction to be mined
            const receipt = await tx.wait();
            console.log(receipt, "receipt value");

            //how to confirm tx value and tx pool from tx receipt?

            // simulate a delay of 2s for localnetwork
            setTimeout(() => {
                if (receipt.status === 1) {

                    setTxState({
                        txSuccessHash: receipt.transactionHash,

                    });
                }
            }, 2000)

        } catch (error) {

            console.log(error, 'tx error')
            setTxState({ txError: error });

        } finally {
            //update transaction states

        }
    }




    return (

        <ModalDisplayScreen close={close}>

            {(!txState.txSent) && <MintWindow readyToMint={readyToMint} />}

            {txState.txSent && <ThankYouMessage
                txhash={txState.txSuccessHash}
                account={account}
                sftContract={sftContract}
                close={() => {
                    close();
                    setTxState({ txSent: false });
                }}
            />
            }

        </ModalDisplayScreen>




    );
}