import { useEffect, useState } from "react"

import { BigNumber } from "@ethersproject/bignumber";
import ModalDisplayScreen from "./modelDisplayScreen"


function DisplayTokenURI(props) {
    const { json } = props

    //TODO: instead of counting char: parse it properly data:application/json 
    const json0 = json.substring(23)
    const obj = JSON.parse(json0)
    console.log(obj.image);


    return (
        <div className='mx-auto my-10 w-full h-auto bg-white rounded shadow-2xl p-2 '>
            <img src={obj.image} alt="SFT" />
        </div >
    )
}


export default function TraceScreen(props) {
    // const context = useWeb3React();
    // const { library, account, activate } = context;

    const { close, account, sftContract } = props

    const [total, setTotal] = useState(null)
    const [tokenIds, setTokenIds] = useState([]);
    const [tokenUris, setTokenUris] = useState([]);

    const updateTotal = (userTotal) => {
        setTotal(userTotal);
    }


    const updateTokens = (userTokenIDs, userTokenUris) => {
        setTokenIds(userTokenIDs);
        setTokenUris(userTokenUris);
    }
    //load user tokens from contract 
    const loadUserTokens = async () => {
        if (!account) {
            "Connect Wallet"
        }

        if (account) {

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
                    console.log(id_hex);
                    tokenIDs.push(id_hex);

                    const tokenURI = await sftContract.tokenURI(id_hex)
                    console.log(tokenURI)

                    tokenURIs.push(tokenURI);

                    // var id_number = BigNumber.from(id_hex).toNumber();
                    console.log(tokenURI, id_hex)

                }
                console.log(tokenIDs)
                updateTokens(tokenIDs, tokenURIs)

                // const tokenURI = await sftContract.tokenURI(tokenIDs[2])

                // console.log(tokenURI)

                // tokenURIs.push(tokenURI);


                // console.log(await sftContract.ownerOf(1), 'ownerOf 1')
                // const token1 = await sftContract.sfTokens(1);
                // console.log(token1.id, 'sfTokens  id')
                // console.log(token1.value, 'sfTokens  value')
                // console.log(token1.pool, 'sfTokens  pool')
                // console.log(token1.stage, 'sfTokens  stage')


            } catch (e) {
                console.log(e, 'error in loading user tokens')
            }
        }

    }

    useEffect(() => {
        loadUserTokens();
    }, [])

    return (
        <ModalDisplayScreen close={close}>
            <div className='my-10 px-5 max-4/5 mx-auto text-center'>

                <div className="my-10 h-24">
                    <h1 className="text-blue-900 text-2xl font-thin my-5">Loading Your Science Fund Tokens</h1>
                    <p className="text-sm w-4/5 mx-auto"> You have <span className="font-bold text-xl">{total} </span>Science Fund Tokens.</p>
                </div>

                {/* all tokens receipt */}
                <div className="grid gap-10 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 overflow-hidden">
                    {tokenUris.map((content, index) => <DisplayTokenURI key={index} json={content} />)}
                </div>




            </div>

        </ModalDisplayScreen>

    )
}


