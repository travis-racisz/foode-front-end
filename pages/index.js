import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'





export default function Home() {
  const {data: session} = useSession()

  if(session){ 
    return( 
      <>
          <h1>Logged in as {session.user.email}</h1>
          <img src = {session.user.image}></img>
          <Link href = "/order/NewOrder">Place an order</Link>
      </>
    )
  }
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
