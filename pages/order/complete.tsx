import { CartContext } from "../../context/ContextProvider";
import { useContext } from "react";
import Link from "next/link";
import { useEffect } from "react";

export default function Complete(){ 
    const context = useContext(CartContext);
    useEffect(() => { 
        const orderId = JSON.parse(localStorage.getItem("orderId"))
        context.listenForDriverAndUpdateDocument(orderId);
        
        
    }, [context.orderId, context.orderStatus])


    if(context.orderStatus === "canceled"){ 
        return( 
            <div className="complete-container">
                <p>We&apos;re sorry, there aren&apos;t any drivers available right now.</p>
                <p>We have automatically refunded your order.</p>
                <p>Please return to the <Link href = '/'><a>home page</a></Link> to place another order.</p>
            </div> 
        )
    } 
    if(context.orderStatus === "accepted"){
        return( 
            <div className="complete-container">
                <p>Your order has been accepted and it is on its way!</p>
                <h2>Driver Details</h2>
                <p>Driver Name: {context.driverDetails.firstName} {context.driverDetails.lastName}</p>
                <p>Drivers Phone Number: {context.driverDetails.phoneNumber}</p>
                <p>Please only contact the driver if there are any issues</p>
            </div>

        )
    }
    return( 
        <div className="complete-container">
            <h1>Thank you for your order!</h1>
            <h3>We are currently looking for a driver to get your order delivered</h3>
            <p>Please wait</p>
        </div>
    )
}