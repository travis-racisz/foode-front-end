import { useEffect, useContext } from "react";
import Link from "next/link";
import { CartContext } from "../../context/ContextProvider";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
export default function SignIn(){ 
    const context = useContext(CartContext);

        
    return( 
        <div className="sign-up-container"> 
        <div className="sign-up-box">
            <h1 className="title">Foode</h1>
            <Link passHref href = "/"><HiOutlineArrowSmLeft className='back-arrow' /></Link>
            <p className='create-account'>Sign In</p>
            <button onClick = {() => context.signInWithFacebook()} className="continue-with-facebook">Continue with Facebook</button>
            <div className="privacy-statement-container"> 
            <Link href="/tos"><p className = "privacy-statement">By creating an account you agree to our Terms of Service and Privacy Policy</p></Link>
            </div>
        </div>
    </div>
    ) 
}
       