
export default function TextBox(props){

    return (
            <div className="mx-8 my-3 text-base text-green font-sans bg-opacity-50 bg-green-900 p-5 rounded-xl">
                 {props.children}
             </div>
    )
}