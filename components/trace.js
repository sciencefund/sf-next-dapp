export default function Trace(props) {

    const { onClick, account } = props

    return (
        <section className='container mx-auto px-4 py-20 max-w-6xl'>
            <div className='grid md:grid-cols-2 sm:grid-cols-1 py-10 px-10 '>
                <div className="my-auto mx-auto w-11/12 pb-10">
                    <h1 className='text-4xl text-gray-900  my-5'>
                        Trace Your Tokens{" "}
                    </h1>
                    <p className="font-thin text-gray-900 text-base">
                        You are able to trace through the entire funding cycle by connecting your wallet below.
                    </p>
                    <button
                        className='border-2 border-gray-700 rounded-xl hover:bg-gray-900 hover:text-white text-gray-700 py-2 px-4 rounded my-5'
                        onClick={onClick}>
                        {account ? (
                            <h2>Trace Your Tokens</h2>
                        ) : (
                            <h2>Connect wallet to trace</h2>
                        )}
                    </button>
                </div>
                <div>
                    <h1 className="font-bold text-gray-700 text-xl">Upon Allocation</h1>
                    <p className='mx-auto my-3 text-lg text-gray-900 font-sans my-2 '>
                        We update your SFT allocation hash to reflect the recepient and the project receiving your support.
                    </p>
                    <h1 className="font-bold text-gray-700 text-xl">Upon Completion</h1>
                    <p className='mx-auto my-3 text-lg text-gray-900 font-sans my-2 '>
                        We update your SFT completion hash to include see the impact of your funding. The SFT is then sealed and immutable for eternity.
                    </p>
                </div>


            </div>
        </section >



    )
}