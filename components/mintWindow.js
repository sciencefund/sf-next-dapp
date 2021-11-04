import { useState } from "react";




export default function MintWindow(props) {
    const { readyToPreview } = props;

    const [value, setValue] = useState(0.1);
    const [selectedPool, setSelectedPool] = useState('Science Fund General Pool');

    const exRate = 4146.55;
    const userDonate = (event) => {
        setValue(event.target.value)

    };


    const userChangePool = event => {
        setSelectedPool(event.target.value)

    }


    return (
        <div className='my-10 max-w-lg mx-auto text-center w-3/5' >
            <div>
                <h1 className="text-blue-900 text-xl font-thin my-2">Donate to Science Fund</h1>
                <p className="text-xs mx-auto"> Place your donation in ETH. Additional instructions or help please contact us at: <a href="/" className="text-blue-900">contact@sciencefund.io</a></p>
            </div>

            <hr className="my-11 w-full mx-auto" />



            <label className='block my-8 text-center mx-auto'>
                <div className='text-gray-700 w-4/5 mx-auto max-w-64 text-base font-semibold '>
                    Which funding pool would you like to donate to?
                </div>
                <select onChange={userChangePool} value={selectedPool}
                    className='block w-4/5 max-w-64 mx-auto my-8 py-1 rounded-xl bg-gray-100 text-sm'>
                    <option value>Science Fund General Pool</option>
                    <option>Predicting New Outbreaks</option>
                </select>
            </label>


            <p className="text-xs mx-auto">We are currently only accepting donations
                for our Pandemic Preparedness funding drive or the Science Fund general pool.
                Stay tuned for
                additional funding drives soon. </p>


            <hr className="my-11 w-full mx-auto" />

            <label className='block my-4  mx-auto'>
                <div className='block my-2 text-gray-700 text-lg font-semibold'>
                    Donation Amount</div>
                <input
                    type='number'
                    min='0.00001'
                    name='value'
                    className='inlineblock w-1/2 max-w-32 pl-5 py-1 rounded bg-gray-100'
                    placeholder='0.1'
                    onChange={userDonate}
                />
                <span className="text-gray-700 mx-2 text-xl">ETH</span>
                <span className='text-gray-700 text-xs font-light'>
                    = {Math.round(exRate * value * 100) / 100} USD
                </span>
            </label>


            <hr className="my-11 w-full mx-auto" />


            <p className="text-xs mx-auto">Ready to mint your unique NFT receipt?
                It is an immutable, permanent record
                of your contribution to future generations.
                Add a few finishing touches on the next page!</p>

            <button className='bg-gray-900 text-white w-2/3 hover:bg-gray-700 py-2 px-4 my-8 rounded'>
                <h2 onClick={() => readyToPreview(value, selectedPool)}>Preview</h2>
            </button>

        </div >

    )



}