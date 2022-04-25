import { HiOutlineArrowSmLeft } from 'react-icons/hi';
import Link from 'next/link'
import { signIn } from 'next-auth/react';
export default function SignUp(){ 
    return( 
        <div className="sign-up-container"> 
            <div className="sign-up-box">
                <h1 className="title">Foode</h1>
                <Link href = "/"><HiOutlineArrowSmLeft className='back-arrow' /></Link>
                <p className='create-account'>Create an account</p>
                <button onClick = {() => signIn()} className="continue-with-facebook">Continue with Facebook</button>
                <div className="privacy-statement-container"> 
                    <p className = "privacy-statement">By creating an account you agree to our <Link href="tos">Terms of Service</Link> and <Link href = "privacy">Privacy Policy</Link></p>
                </div>
            </div>
        </div>
    )
}