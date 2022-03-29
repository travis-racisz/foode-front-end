import { useSession, signOut } from "next-auth/react"

export default function UserAuthSuccess(){ 
    const {data:session} = useSession()
    if(session){ 
        return( 
            <div> 
                signed in as {session.user.email}
                <button onClick = {() => signOut()}>Sign Out</button>
            </div>
        )
    }
    return( 
        <div> 
            Successful login! Good Job!
        </div>
    )
}