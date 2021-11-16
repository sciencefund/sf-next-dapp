import { useEffect, useState } from "react"


import { ethers } from "ethers"
import { BigNumber } from "@ethersproject/bignumber";

import ScienceFund from "../artifacts/contracts/ScienceFund.sol/ScienceFund.json";

import ModalDisplayScreen from "./modalDisplayScreen"
import DisplayTokenURI from "./receiptDisplay";


export default function TraceScreen(props)
{

    const { close, provider, account } = props


    const [total, setTotal] = useState(null)
    const [tokenIds, setTokenIds] = useState([]);
    const [tokenUris, setTokenUris] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const updateTotal = (userTotal) => {
        setTotal(userTotal);
    }


    const updateTokens = (userTokenIDs, userTokenUris) => {
        setTokenIds(userTokenIDs);
        setTokenUris(userTokenUris);
    }
    //load user tokens from contract 
    const loadUserTokens = async () =>
    {
        if (account) {
            // load the network provider 
            const web3Provider = new ethers.providers.Web3Provider(provider)
            // connet to contract on the network
            const contract = new ethers.Contract(process.env.NEXT_PUBLIC_RINKEBY_CONTRACT_ADDRESS, ScienceFund.abi, web3Provider);
            const sftContract = contract.connect(web3Provider.getSigner(0));

            try {
                //  find out the total number of SFTs
                const balanceHex = await sftContract.balanceOf(account)
                const ownerTotal = BigNumber.from(balanceHex).toNumber();
                updateTotal(ownerTotal);

                // Array of tokenURIs, tokenIDs
                const tokenURIs = [];
                const tokenIDs = [];
                for (let i = 0; i < ownerTotal; i++) {

                    var id_hex = await sftContract.tokenOfOwnerByIndex(account, i);
                    tokenIDs.push(id_hex);
                    const tokenURI = await sftContract.tokenURI(id_hex)
                    tokenURIs.push(tokenURI);
                }
                updateTokens(tokenIDs, tokenURIs)
                setIsLoading(false);

            } catch (e) {
                console.log(e, 'error in loading user tokens')
                setIsLoading(false);
            }
        }

    }

    useEffect(() =>
    {
        loadUserTokens()
    }, [])

    return (

        <ModalDisplayScreen close={close}>
            <div className='my-10 px-5 max-4/5 mx-auto text-center'>

                <div className="my-12 h-12">
                    <h1 className="text-blue-900 text-2xl font-thin">
                        {isLoading && 'Loading Your Science Fund Tokens...'}
                        {!isLoading && `Here are your ${ total } Science Fund Tokens.`}
                    </h1>
                </div>

                {/* all tokens receipt */}
                {!isLoading &&
                <div className="grid gap-10 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 overflow-hidden">
                    {tokenUris.map((content, index) => <DisplayTokenURI key={index} json={content} />)}
                </div>
                }

            </div>

        </ModalDisplayScreen>
    )
}