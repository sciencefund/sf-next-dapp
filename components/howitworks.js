
import TextBox from "./textBox"


export default function HowItWorks()
{


    return (
        <section className='container mx-auto w-full px-4 max-w-6xl '>




            <div className='grid md:grid-cols-3 sm:grid-cols-1 py-5 px-10'>

                <TextBox>
                    <h1 className="font-bold font-serif text-lg">Curated Funding Pool</h1>
                    <p className='mx-auto my-3 font-sans text-base my-2'>Each donation is assigned to a funding pool, where researchers can apply through our open protocol with their track record from early published groundwork. As research comes out from funded work, we track and analyze impact to inform and improve future decisions.
                    </p>
                </TextBox>

                <TextBox>
                    <h1 className="font-bold font-serif text-lg">Impact Tracing </h1>
                    <p className='mx-auto my-3 font-sans text-base my-2'>We revolutionize the role and experience of donors: Their NFTs are a personal key to unlock an continuously evolving experiencedata trail about their donation’s impact.

                    </p>
                </TextBox>
                <TextBox>
                    <h1 className="font-bold font-serif text-lg">
                        Future Participation
                    </h1>
                    <p className='mx-auto my-3 font-sans text-base my-2'>The NFT receipts become the key to future interactions with the scientists they supported and endless new forms of participatory governance to the field they contributed to can evolve.
                    </p>
                </TextBox>


            </div>
        </section >
    )
}