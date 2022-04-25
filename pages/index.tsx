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
	const { data: authenticated } = useSession();
	

	


	return (
		<div className={styles.container}>
			<Head>
				<title>Foode</title>
				<meta name="Foode" content="Be a foode" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			{authenticated && <Cart />}
			<div className="homepage-icon-container"> 
				<Link href = "/driver/signup" passHref><AiFillCar className = "restaurant-icon" /></Link>
				<p>Become a Driver today!</p>

			</div>
			<div className="homepage-icon-container"> 
				<Link href = "/partners/signup" passHref><IoIosRestaurant className="restaurant-icon" /></Link>
				<p>Become a Partner Today!</p>
			</div>
			<div className="homepage-icon-container"> 
				<Link href = "/signup" passHref><MdFastfood className="restaurant-icon" /></Link>
				<p className="icon-text">Order online!</p>
			</div>

			
		</div>
	);
}
