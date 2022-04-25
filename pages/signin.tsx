import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
export default function Signin(){ 
    const {data: session} = useSession();
    useEffect(() => { 
        signIn()
    })
    // if(loading){ 
    //     return( 
    //         <div>...loading</div>
    //     ) 
    // } 
        
    return( 
        <div>
            <h1>{session?.user.email}</h1>
        </div>
    ) 
}
       

    
