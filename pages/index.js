import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { signIn } from 'next-auth/react'





export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Foode</title>
        <meta name="Foode" content="Be a foode" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1> 
        Foode
        
      </h1>
      <div> 
        <ul> 
          <li><Link href = "/Restaurants/AllRestaurants"><a>See all resturaunts</a></Link></li>
          <button onClick={() => signIn() }>signIn</button>
        </ul>

      </div>

      
    </div>
  )
}
