import React from "react";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/ContextProvider";
import { GrCart } from "react-icons/gr";

export default function Cart() {
	const context = useContext(CartContext);
	const [optionsTotal, setOptionsTotal] = useState<number>(0);
	const [showCart, setShowCart] = useState<Boolean>(false);

	useEffect(() => {
		// get cart and loop through options that is an object so use keys method to enter each object
		// get the values from the object and add them to a new array
		// once you get all of the values set the carts options to that new array
		// itll be easier to work with now

		const cartOptionsArr: Array<number> = [];

		if (context.cart.length > 0) {
			context.cart.forEach((cartItem: Record<string, any>) => {
				if (cartItem.options) {
					cartItem.options.reduce((prev: number, curr: Record<string, number>) => {
						cartOptionsArr.push(curr.value);
					}, 0);
					setOptionsTotal(
						cartOptionsArr.reduce((prev, curr) => {
							return prev + curr;
						}, 0)
					);
				}
			});
			return;
		}

		context.setTotal(0);
		setOptionsTotal(0);
	}, [context.cart, context]);

	useEffect(() => {
		const reducedCart = context?.cart.reduce(
			(previous: number, current: Record<string, number>) => previous + current.price,
			0
		);
		context?.setTotal(reducedCart + optionsTotal);
	}, [context?.cart, optionsTotal, context]);
	return (
		<div className="cart-sticky">
			<div onClick={() => setShowCart((prev) => !prev)}>
				<GrCart className="cart-icon"/>
			</div>
			
				<div className={showCart ? "show-modal" : "no-display"}>
					{context?.cart.map((item: Record<string, any>, index: number) => {
						return (
							<div
								className="cart-item"
								key={index}
							>
								<p className="cart-item-name">{item.name}</p>
								<p className="cart-item-price">${(item.price / 100).toFixed(2)}</p>
								<div>
									{
										item.options &&
											item.options.map((option: Record<string, any>, index: number) => {
												return (
													<div key={index}>
														<p>{option.name} </p>
														<p>
															$
															{(option.value / 100).toFixed(2)}
															
														</p>
													</div>
												);
											})
										// return(
										//     <div>
										//         <p key = {option.name}>{option.name}</p>
										//         <p>${option.value / 100}.00 </p>
										//     </div>
										// )
									}
								</div>
								<button onClick={() => context.removeFromCart(item)}>
									X
								</button>
							</div>
						);
					})}
					<h1>Total: ${(context?.total / 100 ).toFixed(2)} </h1>
					<button className="cart-checkout-button" onClick={() =>{  
						if(context.cart.length > 0){
							context?.addOrder(context.cart, context.total, context.restaurant.id)
						} else { 
							alert("Cart is empty")
						}
							
						
						} 
						
					
				}>
						Checkout
					</button>
				</div>
		</div>
	);
}
