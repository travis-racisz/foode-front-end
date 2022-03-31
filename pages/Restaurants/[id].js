import { useRouter } from "next/router"
import { gql, useQuery } from "@apollo/client"
import { client } from '../../apollo-client.js'
import Menus from "../../components/restaurants/Menus.jsx"


export default function Restaurant({data}){
    console.log(data.resturaunt) 
    const router = useRouter()
    const {id} = router.query
    console.log(data)
    
    return ( 
        <div> 
            <h1>{data.resturaunt[0].name}</h1>
            <h3>Menus</h3>
            <div>
                {data.resturaunt[0].menu.map(menu => { 
                    return ( 
                    <div key = {menu.name}>
                        <Menus data = {menu}/>
                    </div> 
                    )

                })}
            </div>
        </div>
    )

}

export async function getStaticProps(context){ 
    const query = gql` 
    query Resturaunt($resturauntId: Int) {
        resturaunt(id: $resturauntId) {
          name
          stripe_id
          id
          menu {
            name
            MenuItems {
              name
              price
              description
            }
          }
        }
      }
      `

      const data = await client.query({ 
          query: query, 
          variables: {resturauntId: parseInt(context.params.id)}
      })
    return { 
        props: data
    }
}

export async function getStaticPaths(){ 
    // get all restaurants and build dynamic routes for each restaurant
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
  const paths = data.data.resturaunts.map(restaurant => { 
      return { 
          params: { 
              id: restaurant.id
          }
      }
  })
    return { 
        paths, 
        fallback: false
    }
}