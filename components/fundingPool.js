import TextBox from "./textBox"


export default function FundingPools(props) {

    const { onClick, account } = props
    return (
        <section className='container mx-auto w-full px-4 max-w-6xl '>
            <div className='grid md:grid-cols-2 sm:grid-cols-1 py-5 px-10'>
                <div className="my-auto mx-auto w-11/12 pb-10">
                    <h1 className='text-4xl my-5'>
                        Curated Funding Pools{" "}
                    </h1>
                    <button
                        className='border-2 border-gray-300 rounded-xl hover:bg-gray-900 hover:text-white text-gray-300 py-2 px-4 rounded my-5'
                        onClick={onClick}>
                        {account ? (
                            <h2>Donate to Science Fund</h2>
                        ) : (
                            <h2>Connect wallet to donate</h2>
                        )}
                    </button>
                </div>
                <div>
                    <TextBox>
                        <p>Funding drives raise donations from traditional and crypto native communities. Donation transactions include an NFT based Science Funding Token (SFT). SFTs are also allocated / held for external funding activities, giving us a comprehensive view of total global funding for a community.
                        Awardees are selected using a no-application competitive mechanism that tracks open, rapid research communications in relevant topic areas.
                        Funds raised through SFTs are tied to a specific cohort of awarded scientist as well as their results.
                    </p>
                    </TextBox>
                </div>


            </div>
        </section>
    )
}