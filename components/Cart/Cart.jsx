import React from 'react'
import { useContext, useEffect, useState } from "react"
import { CartContext } from "../../context/ContextProvider"
import {GrCart} from 'react-icons/gr'
import { signIn, useSession } from "next-auth/react"

export default function Cart(props){ 
   const {cart, removeFromCart, submitOrder} = useContext(CartContext)
   const [ total, setTotal ] = useState(0)
   const [showCart, setShowCart] = useState(false)

   useEffect(() => {
       
           const reducedCart = cart.reduce((previous, current) => previous + current.price, 0)
           setTotal(reducedCart)
       
       }, [cart])
    return( 
        <div> 
            <div onClick = {() => setShowCart(prev => !prev)}><GrCart /></div>
            {showCart ? <div style = {{border: "2px solid grey"}}> 
                {cart.map(item => {
                    console.log(item)
                    return(
                        <div key = {item.name}>
                            <p>{item.name}</p>
                            <p>${item.price / 100}.00</p>
                            <button onClick = { () => removeFromCart(item)}>X</button>
                        </div>
                )})}
                <h1>Total: ${total / 100}.00 </h1>
                <button onClick = {() => submitOrder(cart)}>Checkout</button>
            </div> : null}
            
        </div>
    )
}