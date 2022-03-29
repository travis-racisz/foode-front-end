import React from 'react'
import { useContext, useEffect, useState } from "react"
import { CartContext } from "../../context/ContextProvider"
export default function menus(props){ 
    const {data} = props
    const [ showMenu, setShowMenu ] = useState(false)
    const { addToCart } = useContext(CartContext)


    function onClick(){ 
        setShowMenu(prev => !prev)
        localStorage.setItem("showMenu", showMenu)
    }

    return ( 
        <div> 
            <div>
                <h4 onClick={ onClick }>{data.name}</h4>
                        <>
                        {showMenu ? 
                        <>
                                <div style = {{border: "1px solid black"}}>
                                    {data.MenuItems.map(menuItem => { 
                                        
                                        return ( 
                                        <div key = {menuItem.name} style = {{border: "1px solid black"}}>
                                            <p>{menuItem.name}</p>
                                            <p>{menuItem.description}</p>
                                            <p>${menuItem.price / 100}.00</p>
                                            <button onClick = {() => addToCart(menuItem)}>Add</button>
                                        </div>
                                        )
                                    })}
                                </div> 
                            </>
                            : ""}
                            
                        </>
            </div>
        </div>
    )
}