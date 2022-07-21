import Link from "next/link";
import { useContext, useEffect } from "react"
import { gql, useQuery } from "@apollo/client"
import { CartContext } from "../../context/ContextProvider";

export default function Dashboard(){ 
    let token;
    const { driverDetails, getDriverProfile, setCompletedOrders, completedOrders, getLoginLink, setDriverDetails } = useContext(CartContext);
    if(typeof window !== "undefined"){
        token = localStorage.getItem('token')
    }

        //     const orderQuery = gql` 
		// 	query getDriversCompletedOrders($id: String!) {
		// 		getDriversCompletedOrders(id: $id) {
		// 			total
		// 			orderDetails{ 
		// 				name
		// 				price
		// 			}
		// 		}
		// 	}
		// `
		const query = gql`
			query getDriverProfile($token: String!) {
				getDriverProfile(token: $token) {
					id
					email
					verified
					stripe_id
				}
			}`
			
				// const data = await client.query({
				// 	query: query,
				// 	variables: {
				// 		token: token
				// 	}, 
				// 	errorPolicy: "all"
				// })

				const { loading, data, error } = useQuery(query, {
					variables: {
						token: token
						}, 
                        skip: !token,
						errorPolicy: "none", 
                        
					})
                // const ordersQuery = useQuery(orderQuery,{
                    
                //     variables: {
                //         id: data?.getDriverProfile.id, 
                // }
                    
                // })
                // if(ordersQuery.data){ 
                //     setCompletedOrders(ordersQuery?.data.getDriversCompletedOrders)
                // }
                if(data){ 
                    setDriverDetails(data.getDriverProfile)
                }

                
				
					
				if(error?.message === "TokenExpiredError: jwt expired"){ 
					return ( 
                        <div> 
                            <h1>Your session has expired. Please login again.</h1>
                            <Link href="/driver/auth/signIn"><a>Login</a></Link>
                        </div>
                    )
					// router.push('/driver/auth/signIn')
				}

                if(loading){ 
                    return (
                    <div>
                        <h1>Loading...</h1>
                    </div> )
                }
                
    
			
    return ( 
        <div>
            <h1>Welcome, { driverDetails?.email }</h1>
            <h2>your completed orders</h2>
            <div className="completed-orders">
                {completedOrders.map((order:any, index:number) => {
                    return (
                        <div className="completed-order" key={index}>
                            <div className="order-info">
                                <div>order details: {order.orderDetails.map((orderItem, index: number) => { 
                                    return( 
                                        <div key = {index}><p>{orderItem.name}</p></div>
                                    )
                                })}</div>
                                <div>order total: {order.total}</div>
                            </div>
                        </div>
                    )
                }
                )}
            </div>
            <button onClick = {() => getLoginLink(driverDetails.stripe_id)}>Login to Stripe</button>
            <br></br>
            <Link href = "/driver/orders/available">See available orders</Link>
        </div>
    )
}