import ModalDisplayScreen from "./modalDisplayScreen";

export default function TxMessage() {



    return (
        <ModalDisplayScreen close="">

            <div className='my-10 max-w-lg mx-auto text-center'>


                <div className="my-10 h-24">
                </div>


                <div className='mx-auto  my-auto my-10 w-auto h-96 bg-white rounded shadow-2xl p-2' >
                    <h1 className="text-blue-900 text-2xl font-thin my-10">Transaction Sent!</h1>
                    <p className="text-sm w-1/2 mx-auto"> The transaction is sent successfully to the Ethereum public blockchain.
                    </p>


                    <p className="my-24 px-5 w-1/2 mx-auto text-blue-900 italic">Waiting for your transaction to be mined ...</p>
                </div >


                <div className="h-48 mt-10">

                </div>
            </div>

        </ModalDisplayScreen>

);
}