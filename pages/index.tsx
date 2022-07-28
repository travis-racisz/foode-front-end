import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import {AiFillCar} from 'react-icons/ai'
import { IoIosRestaurant } from 'react-icons/io'
import { MdFastfood } from 'react-icons/md'
import Header from "../components/Header";
import { useSession } from "next-auth/react";
import Cart from "../components/Cart/Cart";


export default function Home() {
	

	


	return (
		<div className='flex flex-col w-screen overscroll-none'>
			<Head>
				<title>Foode</title>
				<meta name="Foode" content="Be a foode" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<div className = "flex flex-row items-center justify-center"> 
				<Link href = "/driver/auth/signup">
					<>
						<Link href = "/driver/auth/signup" passHref><AiFillCar className = "restaurant-icon" /></Link>
						<p className="text-4xl">Sign up as Driver today!</p>
					
					</>

				</Link>
			</div>
			<div className = "flex flex-row items-center md:justify-center md:gap-40"> 
				<Link href = "/user/signup">
				<> 
					<Link href = "/signup" passHref><MdFastfood className="restaurant-icon" /></Link>
					<p className="text-4xl">Order online!</p>
				</>
			</Link>

			</div>
			

			
		</div>
	);
}
