import { gql } from "@apollo/client"
import { client } from '../../apollo-client.js'
import Link from 'next/link'


export default function AllResturaunts({ data }){ 
    console.log(data)
    return( 
        <div> 
            <h1>All Restaurants</h1>
            {data.data.resturaunts.map(item => { 
                return(
                    <div key = {item.id}>
                        <Link href = {`/Restaurants/${item.id}`}><h2><a>{item.name}</a></h2></Link>
                        <h3>Opens: {item.opening_hour}</h3>
                        <h3>Closes: {item.closing_hour}</h3>
                    </div>
                )
            })}
        </div>
    )
}

export async function getStaticProps(context){ 
    const getAllRestaurants = gql` 
        query Resturaunts {
            resturaunts {
                id
                name
                opening_hour
                closing_hour
            }
        }
    `
  const data = await client.query({ 
      query: getAllRestaurants
  })
    return { 
        props: {data: data}
    }
}