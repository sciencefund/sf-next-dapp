import { useState } from "react";
import { ethers } from "ethers"

import ScienceFund from "../artifacts/contracts/ScienceFund.sol/ScienceFund.json";


import ModalDisplayScreen from "./modalDisplayScreen";
import MintWindow from "./mintWindow";
import ThankYouMessage from "./ThankYouMessage";
import PreviewWindow from "./previewWindow";



const contractAddress = process.env.NEXT_PUBLIC_RINKEBY_CONTRACT_ADDRESS;



export default function CheckoutScreen(props) {
    // This component contains all the states related to this transaction
    const { close, provider, account } = props

    const [txHash, setTxHash] = useState(undefined);
    const [txSuccess, setTxSuccess] = useState(false);
    const [txError, setTxError] = useState(undefined);
    const [sftContract, setSftContract] = useState(undefined);

    const preview = false;
    const readyToMint = (amountInEth, selectedPool) => {

        mintSFT(amountInEth, selectedPool);

    }


    const mintSFT = async (amountInETH, selectedPool) => {


        // load the network provider 
        const web3Provider = new ethers.providers.Web3Provider(provider)
        // connet to contract on the network
        const contract = new ethers.Contract(process.env.NEXT_PUBLIC_RINKEBY_CONTRACT_ADDRESS, ScienceFund.abi, web3Provider);

        const sftContract = contract.connect(web3Provider.getSigner(0));
        setSftContract(sftContract);
        const overrides = {
            value: ethers.utils.parseEther(amountInETH.toString())
        }

        try {



            // sent transaction to network
            const tx = await sftContract.donate(selectedPool, overrides)

            console.log(tx.hash);
            setTxHash(tx.hash);

            // waiting...
            // for the transaction to be mined
            const receipt = await tx.wait();
            if (receipt.status == 1)
            {
                setTxSuccess(true);
            }



        } catch (error) {

            console.log(error, 'tx error')
            setTxError(error);

        } finally {
            //update transaction states

        }
    }




    return (

        <ModalDisplayScreen close={close}>

            {!preview && (!txHash) && <MintWindow readyToMint={readyToMint} />}

            {txHash && !txError && <ThankYouMessage
                txhash={txHash}
                txSuccess={txSuccess}
                account={account}
                sftContract={sftContract}
            />
            }
            {preview && <PreviewWindow
                onClick={() => { }}
                pool={"funding pool"}
                amount={2.5}
            />}

        </ModalDisplayScreen>




    );
}