import { gql } from "@apollo/client"
import { client } from "../../apollo-client"
import Link from 'next/link'

export default function NewOrder({data}){ 
    console.log(data)
    // get all restaurants and display them here, similar to seeing all restaurants on other component
    return( 
        <div> 
            {data.resturaunts.map(resturaunt => { 
                return( 
                    <div key = {resturaunt.id}>
                        <Link href = {`/Restaurants/${resturaunt.id}`}><h2><a>{resturaunt.name}</a></h2></Link>
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
        props: data
    }
}