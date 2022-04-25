import Image from "next/image";
import Link from "next/link";

export default function Header(){ 
    return (
        <div className = "header-container">
            <div className="foode"> 
                <Link href = "/">FOODE</Link>
            </div>

            
            <div className="header-text"> 
                <h2>Bringing food delivery to Yokota AFB</h2>
            </div>

            <div className="header-image"> 
                <Image src = "/foode.jpg" width={300} height = {500} alt = "salad on a pedestal"></Image>

            </div>
            <div className="header-links"> 
                <Link href = "/signin"><a className="link">Sign In</a></Link>
                <div className="signup-circle"> 
                    <Link href = "/signup"><a className="link-signup">Sign Up</a></Link>
                </div>
            </div>
        </div>
    );
}