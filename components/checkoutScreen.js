import { useState } from "react";
import { ethers } from "ethers"



import ModalDisplayScreen from "./modalDisplayScreen";
import MintWindow from "./mintWindow";
import ThankYouMessage from "./ThankYouMessage";
import PreviewWindow from "./previewWindow";
import CheckoutScreenHeader from "./checkoutScreenHeader";





export default function CheckoutScreen(props) {
    // This component contains all the states related to this transaction
    const { close, contract, account, network } = props

    const [txHash, setTxHash] = useState(false);
    const [txSuccess, setTxSuccess] = useState(false);
    const [txError, setTxError] = useState(undefined);

    const preview = false;


    const mintSFT = async (amountInETH, selectedPool) =>
    {
        const overrides = {
            value: ethers.utils.parseEther(amountInETH.toString())
        }

        try
        {
            // const sftContract = contract.connect(web3Provider.getSigner(0));
            // sent transaction to network
            const tx = await contract.donate(selectedPool, overrides)

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
        <ModalDisplayScreen close={close} network={network}>


            {!preview && (!txHash) &&
            <CheckoutScreenHeader
                heading="Donate to Science fund"
                subheading="Place your donation in ETH. Additional instructions or help please contact us at:"
                link="contact@sciencefund.io"
            >

                    <MintWindow mintSFT={mintSFT} network={network} />
                </CheckoutScreenHeader>
            }


            {txHash && !txError && <CheckoutScreenHeader
                heading="Thank You!"
                subheading="The transaction is sent successfully. Here is your transaction hash "
                link={txHash}
            >
                <ThankYouMessage
                    txhash={txHash}
                    txSuccess={txSuccess}
                    account={account}
                    sftContract={contract}
            />

            </CheckoutScreenHeader>
            }

            {preview && <PreviewWindow
                onClick={() => { }}
                pool={"funding pool"}
                amount={2.5}
            />}

        </ModalDisplayScreen>




    );
}