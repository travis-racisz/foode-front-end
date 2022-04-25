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

		if (context?.cart.length > 0) {
			context?.cart.forEach((cartItem: Record<string, any>) => {
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

		context?.setTotal(0);
		setOptionsTotal(0);
	}, [context?.cart, context]);

	useEffect(() => {
		const reducedCart = context?.cart.reduce(
			(previous: number, current: Record<string, number>) => previous + current.price,
			0
		);
		context?.setTotal(reducedCart + optionsTotal);
	}, [context?.cart, optionsTotal, context]);
	return (
		<div>
			<div onClick={() => setShowCart((prev) => !prev)}>
				<GrCart className="cart-icon"/>
			</div>

			{showCart ? (
				<div style={{ border: "2px solid grey" }}>
					{context?.cart.map((item: Record<string, any>) => {
						return (
							<div
								style={{
									border: "2px solid black",
									margin: "5px",
									padding: "5px",
									width: "500px",
								}}
								key={item.name}
							>
								<p>{item.name}</p>
								<p>${item.price / 100}.00</p>
								<div>
									{
										item.options &&
											item.options.map((option: Record<string, any>) => {
												return (
													<div key={option.name}>
														<p>{option.name} </p>
														<p>
															$
															{option.value / 100}
															.00
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
					<h1>Total: ${context?.total} </h1>
					<button onClick={() => context?.addOrder(context.cart, context.total, context.restaurant.id)}>
						Checkout
					</button>
				</div>
			) : null}
		</div>
	);
}
