import { HiOutlineArrowSmLeft } from 'react-icons/hi';
import Link from 'next/link'
import { signIn } from 'next-auth/react';
import { useContext } from 'react'
import { CartContext } from '../context/ContextProvider';

export default function SignUp(){ 
    const { signInWithFacebook } = useContext(CartContext);
    return( 
        <div className="sign-up-container"> 
            <div className="sign-up-box">
                <h1 className="title">Foode</h1>
                <Link passHref href = "/"><HiOutlineArrowSmLeft className='back-arrow' /></Link>
                <p className='create-account'>Create an account</p>
                <button onClick = {() => signInWithFacebook()} className="continue-with-facebook">Continue with Facebook</button>
                <div className="privacy-statement-container"> 
                    <p className = "privacy-statement">By creating an account you agree to our <Link href="tos">Terms of Service</Link> and <Link href = "privacy">Privacy Policy</Link></p>
                </div>
            </div>
        </div>
    )
}