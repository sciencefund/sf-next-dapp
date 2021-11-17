export default function IconCircle(props) {

    return (
        <div className="mx-auto text-center w-4/5 my-5">
            <div className="bg-gray-900 mx-auto w-36 h-36 rounded-full flex items-center justify-center">
                <img src={props.iconPath} alt="icon" className="w-1/2 mx-auto align-middle"></img>
            </div>
            <h3 className="font-bold my-3 text-xl font-sans w-3/4 mx-auto capitalize"> {props.heading} </h3>
            <p className="text-center text-gray-500 my-1 p-2"> {props.content}</p>
        </div>
    )
}