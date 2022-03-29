import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import React, { createContext, useState } from 'react'
import {CartContext} from '../context/ContextProvider'
import Cart from '../components/Cart/Cart'
import { client } from "../apollo-client"
import { gql } from '@apollo/client'





function MyApp({ 
  Component, 
  pageProps: { 
    session,
    ...pageProps
  } }) {
    const [cart, setCart] = useState([])
    const [ id, setId ] = useState(0)
    function addToCart(item){ 
      setId(prev => prev + 1)
      const itemWithId = {...item, id: id}
        setCart([...cart, itemWithId])
    }
    function removeFromCart(item){ 
        setCart(cart.filter(cartItem => cartItem.id !== item.id))
    }

    function submitOrder(cart){ 
      // make grahpql mutation 
      const mutation = gql`
        mutation AddOrder($userId: String, $status: String, $price: Int, $menuItems: [InputMenuItems]) {
          addOrder(userId: $userId, status: $status, price: $price, menuItems: $menuItems) {
            url
            }
          }
        `

        client.mutate({
          mutation,
          variables: {
            status: "pending",
            price: cart.reduce((acc, item) => acc + item.price, 0),
            menuItems: cart.map(item => ({
              name: item.name,
              price: item.price,
              description: item.description
            }))
          }
    })
  }
  

  return ( 
    <SessionProvider session = {session}>
      <CartContext.Provider value={ { cart, addToCart, removeFromCart, submitOrder, session } }>
        <a href = "/">Home</a>
        <Component {...pageProps} />
        <Cart />
      </CartContext.Provider>
    </SessionProvider>
  )
}

export default MyApp
