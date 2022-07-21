import { HiOutlineArrowSmLeft } from 'react-icons/hi';
import Link from 'next/link'
import { signIn } from 'next-auth/react';
import { useContext } from 'react'
import { CartContext } from '../../context/ContextProvider';
import SignUp from '../../components/auth/SignUp';

export default function signup(){ 
    const { signInWithFacebook } = useContext(CartContext);
    return( 
        <div className="sign-up-container"> 
            <SignUp></SignUp>
        </div>
    )
}