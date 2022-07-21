import { useEffect, useContext } from "react";
import Link from "next/link";
import { CartContext } from "../../context/ContextProvider";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import SignIn from "../../components/auth/signin";
export default function signin(){ 
    const context = useContext(CartContext);

        
    return( 
        <div className="sign-up-container"> 
        <SignIn></SignIn>
        </div>
    ) 
}
       

    
