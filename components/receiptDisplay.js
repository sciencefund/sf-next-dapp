
export default function DisplayTokenURI(props) {
    const { json } = props

    //TODO: instead of counting char: parse it properly data:application/json 
    const json0 = json.substring(23)
    const obj = JSON.parse(json0)

    //TODO: instead of counting char: parse it properly "data:image/svg+xml;base64,"
    // const json1 = obj.image.substring(26)
    // const decoded = atob(json1)


    return (
        <div className='mx-auto my-10 w-max h-auto bg-white rounded shadow-2xl p-2 '>
            <img src={obj.image} className="mx-auto" alt="SFT" />
        </div >
    )
}
