
export default function DisplayTokenURI(props) {
    const { json } = props

    //TODO: instead of counting char: parse it properly data:application/json 
    const json0 = json.substring(23)
    const obj = JSON.parse(json0)
    console.log(obj.image);


    return (
        <div className='mx-auto my-10 w-auto h-auto bg-white rounded shadow-2xl p-2 '>
            <img src={obj.image} alt="SFT" />
        </div >
    )
}
