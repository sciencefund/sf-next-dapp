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
                        heading="Immutable"
                        content="For each donation, we mint an NFT receipt - a traceable, immutable funding record that will help drive the next century of scientific breakthroughs.
                        " />
                    <IconCircle
                        iconPath="sync-alt-solid.svg"
                        heading="Impact"
                        content="Removing inefficiency, overhead, and insider politics means your donation will have significantly more impact, and faster, than traditional funding organizations." />
                    <IconCircle
                        iconPath="microscope-solid.svg"
                        heading="Better Science"
                        content="Empower scientists to freely, openly, and rapidly pursue scientific knowledge. No years to publish, or political nonsense. " />
                </div>

            </div>


        </section >
    )
}