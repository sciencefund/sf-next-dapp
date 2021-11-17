export default function ProgressIndicator(props){
    const {label} = props

    return(
 
        <div className='flex items-center justify-center 
         text-blue-900 py-2 px-4 my-20 rounded mx-auto' >
            <div style={{ "borderTopColor": "transparent" }} className="w-6 h-6 border-2 border-solid border-blue-900 rounded-full animate-spin mx-2">
            </div>
        <h2 className="text-xl capitalize">{label}</h2>

    </div>
    )
    
}