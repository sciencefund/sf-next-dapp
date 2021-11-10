import { useState } from "react";
import { ethers } from "ethers"

import ModalDisplayScreen from "./modelDisplayScreen";

import MintWindow from "./mintWindow";
import ThankYouMessage from "./ThankYouMessage";
import PreviewWindow from "./previewWindow";
import TxMessage from "./txMessage";



export default function CheckoutScreen(props) {
    // This component contains all the states related to this transaction
    const { close, sftContract, account } = props

    const [preview, setPreview] = useState(false)

    const [value, setValue] = useState(0.2);
    const [pool, setPool] = useState(undefined);

    const [txState, setTxState] = useState({
        txSent: undefined,
        txError: undefined,
        txSuccessHash: undefined, //hash
        txBlockHash: undefined,
        txAmount: undefined,
        txPool: undefined,
    })


    const readyToPreview = (amountInEth, selectedPool) => {

        setValue(amountInEth);
        setPool(selectedPool);
        setPreview(true)
    }

    const mintSFT = async () => {

        const overrides = {
            value: ethers.utils.parseEther(value.toString())
        }

        try {
            setTxState({
                txSent: undefined,
                txError: undefined,
                txSuccessHash: undefined, //txhash
                txBlockHash: undefined
            });


            // sent transaction to network
            const tx = await sftContract.donate(pool, overrides)

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
                        txBlockHash: receipt.blockHash,
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

            {(!preview) && <MintWindow readyToPreview={readyToPreview} />}


            {preview && !txState.txSent && <PreviewWindow onClick={() => { mintSFT() }}
                pool={pool}
                amount={value}
                account={account}
                close={close} />}

            {txState.txSent && preview && <TxMessage />}


            {txState.txSuccessHash && <ThankYouMessage
                txhash={txState.txSuccessHash}
                blockhash={txState.txBlockHash}
                pool={pool}
                amount={value}
                account={account}
                close={() => {
                    close();
                    setTxState({ txSuccessHash: undefined })
                }}
            />
            }

        </ModalDisplayScreen>




    );
}