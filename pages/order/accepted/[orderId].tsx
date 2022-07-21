import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { CartContext } from "../../../context/ContextProvider";

export default function Accepted() {
    let token; 
    const router = useRouter()
    const { orderId } = router.query
    const { orderDetails, getOrderDetails, updateOrderStatus, completeOrder} = useContext(CartContext);
    useEffect(() => { 
        token = localStorage.getItem('token')

        if(orderId){ 
            getOrderDetails(orderId)
        }
    }, [orderId, orderDetails])
    return (
        <div>
            <h1>Accepted {orderId}</h1>
            <div>Order Details: {orderDetails.orderDetails?.map((item: any, index: number) => { 
               
               return (  
                   <>
                        <h2 key={index}>item: {index + 1} {item.name}</h2>
                        <h3>Options</h3>
                            {item.options.map((option:Record<string, any>, index: number) => { 
                                return (
                                    <p key = {index}>{option.name}</p>
                                )
                            })}
                                    
                                    

                                
                            
        
                    </>
               )
            })}</div>
            <p>Order Status: {orderDetails.status}</p>
            {orderDetails.status === 'accepted' ? <button onClick={() => updateOrderStatus("delivering", orderId)}>food has been picked up</button> : <button className="new-order-button" onClick={() => completeOrder(orderId, token)}>Food has been delivered</button>}
            

        </div>
    );
}