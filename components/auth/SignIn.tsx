import { useEffect, useContext } from "react";
import Link from "next/link";
import { CartContext } from "../../context/ContextProvider";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
export default function SignIn(){ 
    const context = useContext(CartContext);

        
    return( 
        <div> 
        <div className="flex flex-col h-80h border-2 border-red rounded grid grid-cols-6 grid-rows-6 items-center justify-center w-screen md: w-80 ">
            <h1 className="text-red text-6xl col-start-3 col-end-5 md:text-10xl md:m-10 md:mt-12 lg:ml-32">Foode</h1>
            <Link passHref href = "/"><HiOutlineArrowSmLeft className='col-start-1 col-end-2 row-start-1 row-end-2 text-red text-6xl lg:text-8xl' /></Link>
            <p className='col-start-2 col-end-6 row-start-2 row-end-3 text-3xl md:text-2xl md:col-start-3 md:col-end-5 md: ml-10 lg:ml-32'>Sign in</p>
            <button onClick = {() => context.signInWithFacebook()} className="rounded bg-fb-blue m-4 text-xl text-white col-start-2 col-end-6 md:text-xl row-start-5 lg:text-4xl lg:col-start-3 lg:col-end-5">Continue with Facebook</button>
            <p className = " col-span-6 text-lg row-start-6 m-5 row-end-6 lg:col-start-2 lg:col-end-6 lg:text-xl" >By using foode you agree to our <Link href="tos">Terms of Service</Link> and <Link href = "privacy">Privacy Policy</Link></p>
        </div>
    </div>
    ) 
}
       