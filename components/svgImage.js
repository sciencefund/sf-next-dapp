


export default function SvgImage(props) {
    // This component contains all the states related to this transaction

    const { pool, amount, account, txhash } = props

    return (


        <div className='mx-auto w-3/4 h-auto border-4 border-white mt-24 p-2 bg-white rounded shadow-2xl' >


            <svg version="1.1"
                viewBox="0 0 331 426"
                width="331" height="426"
                preserveAspectRatio="xMidYMin"
                xmlns="http://www.w3.org/2000/svg">

                <rect width="100%" height="100%" fill="#FFFFFF" />

                <text x="165" y="60" font-size="45" text-anchor="middle" fill="black" font-weight="normal">SFT</text>

                <text x="165" y="90" font-size="12" text-anchor="middle" fill="black" font-weight="noraml" font-style="italic">Reimagine Scientific Discovery</text>

                <filter id="insetshadow">
                    <feOffset
                        in="SourceGraphic"
                        dx="0"
                        dy="20"
                        result="offOut" />

                    <feGaussianBlur
                        in="offOut"
                        stdDeviation='20'
                        result='offset-blur'
                    />
                    <feComposite
                        operator='out'
                        in='SourceGraphic'
                        in2='offset-blur'
                        result='inverse'
                    />
                    <feFlood
                        flood-color='#F99500'
                        flood-opacity='.35'
                        result='color'
                    />
                    <feComposite
                        operator='in'
                        in='color'
                        in2='inverse'
                        result='shadow'
                    />


                </filter>
                <g filter="url(#insetshadow)">
                    <circle cx="167" cy="212" r="100" fill="#FFFFFF" stroke="#F99500"
                        stroke-width="5" />

                </g>
                <circle cx="168" cy="167" r="15" fill="#FFFFFF" stroke="#F99500" stroke-width="4" />

                <circle cx="217" cy="208" r="15" fill="#FFFFFF" stroke="#F99500" stroke-width="4" />

                <circle cx="125" cy="241" r="15" fill="#FFFFFF" stroke="#F99500" stroke-width="4" />

                <line x1="168" y1="188" x2="168" y2="312" stroke="#068B0B" stroke-width="4" stroke-linecap="round" />

                <path d="M 168 312 Q 168 241, 198 218" stroke="#068B0B" stroke-width="4" fill="transparent" stroke-linecap="round" />

                <path d="M 168 312 Q 168 261, 144 249" stroke="#068B0B" stroke-width="4" fill="transparent" stroke-linecap="round" />



                <g>

                    <text x="165" y="344" font-size="12" text-anchor="middle" font-weight="normal" fill="black">{amount} ETH | allocation status</text>

                    <text x="165" y="362" font-size="8" text-anchor="middle" font-weight="normal" fill="black">allocation Hash : to be assigned</text>

                    <text x="165" y="380" font-size="8" text-anchor="middle" font-weight="normal" fill="black">completion hash: to be assigned</text>

                    <text x="165" y="409" font-size="12" text-anchor="middle" font-weight="bold" fill="#F99500">{pool}</text>
                </g>

            </svg>


        </div >


    );
}