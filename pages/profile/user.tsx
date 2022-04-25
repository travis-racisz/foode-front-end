import { useSession } from "next-auth/react"

export default function Profile(){ 
    const { data } = useSession()
    console.log(data)
    return( 
        <div>
            <h1>Profile</h1>
        </div>
    )
}