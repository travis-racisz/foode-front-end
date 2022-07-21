import { useEffect, useContext } from "react"
import { CartContext } from "../../../context/ContextProvider";
export default function Available(){ 
    const { getPendingOrders, pendingOrders, driverAcceptsOrder, driverDetails } = useContext(CartContext);

    useEffect(() => { 
        getPendingOrders()
    }, [])
    return ( 
        <div className="available-container">
            {pendingOrders.map((order:any, index:number) => {
                return (
                    <div className="available-order" key={index}>
                        <div className="order-info">
                            <p>Order Status: {order.data.status}</p>
                            <p>Order Date: {order.data.total}</p>
                            <button onClick={() => driverAcceptsOrder(order.id, driverDetails)}>Accept Order</button>
                        </div>
                    </div>
                )}
            )}
            
        </div>
    )
}