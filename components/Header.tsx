import Image from "next/image";
import Link from "next/link";

export default function Header(){ 
    return (
        <>
            <div className="bg-red" > 
                <div className="flex gap-1 m-2 justify-between"> 
                    <span className = "text-white text-6xl"><Link  href = "/">FOODE</Link></span>
                    <div className=" flex justify-end gap-2"> 
                        <span><Link href = "/user/signup"><a className="text-white">Sign Up</a></Link></span> 
                        <span><Link href = "/user/signin"><a className="bg-white rounded-xl pl-3 pr-3 block">Sign In</a></Link></span> 

                    </div>
                    
                </div>
            </div>
                <div className=" absolute right-2 top-2 self-end flex gap-2"> 
                </div>
            <div className = "w-screen max-w-full bg-red flex space-between space-x-0">

               
                <Image className="m-0 p-0" src = "/foode.jpg" width={450} height = {800} alt = "salad on a pedestal"></Image>

                
                
                <div className="self-center text-white text-lg pr-20 md:pr-0 w-screen flex flex-col justify-center items-center "> 
                    <h2>Bringing food delivery to Yokota AFB</h2>
                </div>

                
            </div>
        </>
    );
}