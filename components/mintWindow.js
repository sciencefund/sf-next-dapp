import { useState } from "react";


export default function MintWindow(props) {
    const { mintSFT, network } = props;


    const [minValue, setMinValue] = useState(true);
    const [rightNetwork, setRightNetwork] = useState(true);
    const [value, setValue] = useState(0.3001);
    const [selectedPool, setSelectedPool] = useState('Pandemic Preparedness');

    const exRate = 4740.29;
    const userDonate = (event) => {
        setValue(event.target.value)
        //check value
        if (event.target.value <= 0.3)
        {
            setMinValue(false)
        } else
        {
            setMinValue(true)
        }
    };


    const userChangePool = event => {
        setSelectedPool(event.target.value)

    }

    const handleClick = () =>
    {
        //check network
        if (network != "rinkeby")
        {
            setRightNetwork(false)
            //TODO: UI to prompt change screen
        }
        //call mintSFT
        if (value > 0.3 && network == "rinkeby")
        {
            mintSFT(value, selectedPool);
        }
    }



    return (
        <div className="w-4/5 mx-auto">


            <hr className="my-11 w-full" />



            <label className='block my-8 text-center mx-auto'>
                <div className='text-gray-700 w-4/5 mx-auto max-w-64 text-base font-semibold '>
                    Which funding pool would you like to donate to?
                </div>
                <select onChange={userChangePool} value={selectedPool}
                    className='block w-4/5 max-w-64 mx-auto my-8 py-1 rounded-xl bg-gray-100 text-sm'>
                    <option value>Pandemic Preparedness</option>
                    <option >Science Fund General Pool</option>
                </select>
            </label>


            <p className="text-xs w-full mx-auto">We are currently only accepting donations
                for our Pandemic Preparedness funding drive or the Science Fund general pool.
                Stay tuned for additional funding drives soon. Alternatively you can donate to our general pool and leave it to Science Fund to put your donation to good use.</p>


            <hr className="my-11 w-full " />

            <label className='block my-4 mx-auto'>
                <div className='my-2 text-gray-700 text-lg font-semibold'>
                    Donation Amount</div>
                <div className="flex items-start justify-center">
                    <div className="text-left">
                        <input
                            type='number'
                            min='0.3'
                            name='value'
                            className={`inlineblock max-w-32 pl-5 py-1 rounded bg-gray-100 ${ !minValue && ' border-red-500' }`}
                            placeholder='0.3'
                            onChange={userDonate}
                        /><span className="text-gray-700 mx-2 text-xl">ETH</span>
                        <p className={`text-2xs italic ${ minValue ? 'text-gray-500' : 'text-red-500' }`}>Minimum of 0.3 ETH is required.</p>
                    </div>
                    <div>
                        <span className='text-gray-700 text-xs font-light'>
                    = {Math.round(exRate * value * 100) / 100} USD
                </span>
                    </div>
                </div>
            </label>


            <hr className="my-11 w-full mx-auto" />


            <p className="text-xs mx-auto">Ready to mint your unique NFT receipt?
                It is an immutable, permanent record
                of your contribution to the future of scientific knowledge.
            </p>

            <button className='bg-gray-900 text-white w-2/3 hover:bg-gray-700 py-2 px-4 my-8 rounded'>
                <h2 onClick={handleClick}>Mint</h2>
            </button>

        </div >

    )



}