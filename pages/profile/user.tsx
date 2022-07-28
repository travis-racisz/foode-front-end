import { useContext, useEffect } from 'react';
import Link from "next/link"
import Image from "next/image"
import { CartContext } from '../../context/ContextProvider';
import { parseCookies } from '../../lib/parseCookies';
import { gql, useQuery } from '@apollo/client';
function Profile({ token }){ 

    const getUserProfile = gql` 
        query getUserProfile($token: String!) {
            getUserProfile(token: $token) {
                email
                firstName 
                lastName
            }
        }
    `
    const { data, loading, error } = useQuery(getUserProfile, { variables: {token: token} })

    console.log(data, 'data')

    if(loading){ 
        return ( 
            <div> 
                loading...
            </div>
        )
    }

    if(error){ 
        return (
            <div>
                {error.message}
            </div>
        )
    }
    

    // if(!user){ 
    //     return ( 
    //         <div> 
    //             <h1>Oops something went wrong, <Link href = "/">Return Home?</Link></h1>
    //         </div>
    //     )
    // }

    return( 
        <div className="container">
            <div className='container flex flex-col items-center h-screen w-screen' > 
                <h1 className="text-2xl text-slate-700 self-center justify-self-center mb-40 ">Welcome, {data.getUserProfile.email}</h1>

                <h2>Your Recent Orders</h2>
                <ul> 
                    <li>
                        Order 1
                    </li>
                    <li>
                        Order 2
                    </li>
                    <li>
                        Order 3
                    </li>
                </ul>
            <Link passHref href = '/order/neworder'><button className="new-order-button">New Order</button></Link>
            </div>
        </div>
    )
}

export function getServerSideProps({ req }){
    const cookies = parseCookies(req)
    return { 
        props: {token: cookies.token}
    } 

}

export default Profile