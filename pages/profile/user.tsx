import { useSession } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"

export default function Profile(){ 
    const { data } = useSession()

    return( 
        <div className="profile-container">
            <h1 className="profile-welcome">Welcome, {data?.user.name}</h1>
            {/* <Image src = {data?.user.image}></Image> */}
            <Link passHref href = '/order/neworder'><button className="new-order-button">New Order</button></Link>
        </div>
    )
}