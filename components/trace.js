import TextBox from "./textBox"
export default function Trace(props) {

    const { onClick, account } = props

    return (
        <section className='container mx-auto px-4 py-20 max-w-6xl'>
            <div className='grid md:grid-cols-2 sm:grid-cols-1 py-10 px-10 '>
                <div className="my-auto mx-auto w-11/12 pb-10">
                    <h1 className='text-4xl  my-5'>
                        Trace Your Tokens{" "}
                    </h1>
                    <p className="font-thin  text-base">
                        You are able to trace through the entire funding cycle by connecting your wallet below.
                    </p>
                    <button
                        className='border-2 border-gray-300 rounded-xl hover:bg-gray-900 hover:text-white py-2 px-4 rounded my-5'
                        onClick={onClick}>
                        {account ? (
                            <h2>Trace Your Tokens</h2>
                        ) : (
                            <h2>Connect wallet to trace</h2>
                        )}
                    </button>
                </div>
                <div>
                    <TextBox >
                        <h1 className="font-bold text-lg">Upon Allocation</h1>
                        <p className='mx-auto my-3 font-sans my-2 '>
                        We update your SFT allocation hash to reflect the recepient and the project receiving your support.
                    </p>
                    </ TextBox>

                    <TextBox>
                        <h1 className="font-bold text-lg">Upon Completion</h1>
                        <p className='mx-auto my-3 font-sans my-2 '>
                            We update your SFT completion hash to include the impact of your funding. The SFT is then sealed and immutable for eternity.
                        </p>
                    </TextBox>
                </div>


            </div>
        </section >



    )
}