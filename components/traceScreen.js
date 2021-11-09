import ModalDisplayScreen from "./modelDisplayScreen"

export default function TraceScreen(props) {

    const { close, account, sftContract } = props

    //load user tokens from contract 
    const loadUserTokens = async () => {
        if (!account) {
            activate(connectors.Injected, err => console.log(err))

        }


        if (account) {
            const balanceHex = await sftContract.balanceOf(account)
            console.log(BigNumber.from(balanceHex).toNumber(), 'balance')

            // console.log(await sftContract.ownerOf(1), 'ownerOf 1')
            const token1 = await sftContract.sfTokens(1);
            console.log(token1.id, 'sfTokens  id')
            console.log(token1.value, 'sfTokens  value')
            console.log(token1.pool, 'sfTokens  pool')
            console.log(token1.stage, 'sfTokens  stage')

            //call tokenURI

            const tokenURI = await sftContract.tokenURI(1)
            console.log(tokenURI, 'tokenURI')

        }

        // console.log(ethers.utils.formatEther(BigNumber.from(tokenValue).toString()), 'token value in ETH')
    }

    return (
        <ModalDisplayScreen close={close}>
            <div className="w-full h-96">
                <h1>Trace Your Tokens</h1>
            </div>

        </ModalDisplayScreen>

    )
}