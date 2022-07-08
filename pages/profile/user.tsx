import { useContext } from 'react';
import Link from "next/link"
import Image from "next/image"
import { CartContext } from '../../context/ContextProvider';

export default function Profile(){ 
    const { user } = useContext(CartContext);
    console.log(user, "user")

    if(!user){ 
        return ( 
            <div> 
                <h1>Oops something went wrong, <Link href = "/">Return Home?</Link></h1>
            </div>
        )
    }

    return( 
        <div className="profile-container">
            <div className='profile-name-image'> 
            {user ? 
            <>
                <Image className='profile-image' src = {user.photoURL} height = {"200px"} width = {"200px"}></Image>
                <h1 className="profile-welcome">Welcome, {user.email}</h1>
            </>
                : null }
            </div>
            <div> 
                <div> 
                    <h2>Your Orders</h2>
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
                </div> 
            </div>
            <Link passHref href = '/order/neworder'><button className="new-order-button">New Order</button></Link>
        </div>
    )
}