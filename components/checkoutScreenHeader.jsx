

export default function CheckoutScreenHeader(props) {
    const {heading, subheading, link} = props

return(
    <div className='my-10 max-w-lg mx-auto text-center w-3/5'>

            <div className="my-10 h-24">
                    <h1 className="text-blue-900 text-2xl font-thin my-5">{heading}</h1>
                    
                <p className="text-sm w-4/5 mx-auto">{subheading}
                <a href="/" className="text-blue-900 text-sm break-words ">{link}</a></p>
            </div>
            {props.children}
    </div>
    );
}
