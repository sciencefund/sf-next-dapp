import IconCircle from "./iconCircle"

export default function Summary() {

    return (
        <section className='container mx-auto px-4  max-w-6xl '>
            <div className='container mx-auto py-10 px-10'>
                <h1 className='text-3xl mt-5 text-center font-bold font-sans uppercase'>
                    Decentralise science funding
                    {" "}
                </h1>
                <h5 className="text-base text-center text-gray-500 my-3 capitalize "> creating a powerful new incentive structure for the pursuit of scientific discovery</h5>



                <div className="grid lg:grid-cols-3 gap-4 my-20 md:grid-cols-2 sm:grid-cols-1">
                    <IconCircle
                        iconPath="ethereum-1.svg"
                        heading="On-chain NFT Receipt"
                        content="Traceable, immutable, verifiable funding records as NFTs living permanently on Ethereum public blockchain." />
                    <IconCircle
                        iconPath="sync-alt-solid.svg"
                        heading="From Donation to Creation"
                        content="Bring donors into the sceicne via the NFT receipt and involve them in the journey from lab to life" />
                    <IconCircle
                        iconPath="microscope-solid.svg"
                        heading="Backing science, not beaureaucracy"
                        content="Empower scientists to freely, openly, and rapidly pursue science. No years to publish, or political nonsense." />
                </div>

            </div>


        </section >
    )
}