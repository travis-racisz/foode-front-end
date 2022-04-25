import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
export default function Signin(){ 
    const {data: session, status} = useSession();
    useEffect(() => { 
        signIn()
    })
    if(status === "loading"){ 
        return( 
            <div>...loading</div>
        ) 
    } 
        
    return( 
        <div>
            {/* <h1>{session?.user.email}</h1> */}
        </div>
    ) 
}
       

    
