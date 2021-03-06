


export default function SvgImage(props) {
    // This component contains all the states related to this transaction

    const { pool, amount, id } = props

    const color = "rgb(255, 0, 0)"

    return (
        <svg version="1.1" viewBox="0 0 331 426"
                width="331" height="426"
                preserveAspectRatio="xMidYMin"
                xmlns="http://www.w3.org/2000/svg">

            <rect width="100%" height="100%" fill="#FFFFFF" />

            <text x="165" y="60" font-size="45" text-anchor="middle" fill="black" font-weight="normal">SFT -{id}</text>

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
                    flood-color={color}
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
                <circle cx="167" cy="212" r="100" fill="#FFFFFF" stroke={color}
                        stroke-width="5" />

                </g>
            <circle cx="168" cy="167" r="15" fill="#FFFFFF" stroke={color} stroke-width="4" />

            <circle cx="217" cy="208" r="15" fill="#FFFFFF" stroke={color} stroke-width="4" />

            <circle cx="125" cy="241" r="15" fill="#FFFFFF" stroke={color} stroke-width="4" />

                <line x1="168" y1="188" x2="168" y2="312" stroke="#068B0B" stroke-width="4" stroke-linecap="round" />

                <path d="M 168 312 Q 168 241, 198 218" stroke="#068B0B" stroke-width="4" fill="transparent" stroke-linecap="round" />

                <path d="M 168 312 Q 168 261, 144 249" stroke="#068B0B" stroke-width="4" fill="transparent" stroke-linecap="round" />



                <g>

                <text x="165" y="342" font-size="12" text-anchor="middle" font-weight="normal" fill="black">{amount} ETH | awaiting allocation </text>

                <text x="165" y="362" font-size="10" text-anchor="middle" font-weight="normal" fill="black">Allocation Hash : to be assigned</text>

                <text x="165" y="380" font-size="10" text-anchor="middle" font-weight="normal" fill="black">Completion Hash: to be assigned</text>

                <text x="165" y="409" font-size="12" text-anchor="middle" font-weight="bold" fill={color}>{pool}</text>
                </g>

            </svg>





    );
}