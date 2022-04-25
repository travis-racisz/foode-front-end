import { createContext, useState } from "react";
import { addDoc, doc, collection, onSnapshot, updateDoc } from "../lib/firebase";
import { db } from "../lib/firebase";
import { gql } from "@apollo/client"
import { client } from "../apollo-client";
import { useEffect } from "react";




interface CartContextInterface { 
	addOrder: (orderDetails: any, total: number, restaurantId: string) => void
	// listenForDriverAndUpdateDocument: (orderId: string) => void
	addToCart: (item: HTMLElement) => void
	removeFromCart: (item: Record<string, any>) => void
	cart: any,
	setCart: (cart: Array<any>) => void
	id: number,
	setId: (id: number) => void
	option: any,
	setOption: (option: string) => void
	restaurant: Record<string, any>,
	setRestaurant: (restaurant: Record<string, any>) => void
	total: number,
	setTotal: (total: number) => void
}

export const CartContext = createContext<CartContextInterface | null> (null);
	
export function ContextProvider(props:any) {
	const [cart, setCart] = useState<any>([]);
	const [id, setId] = useState(0);
	const [option, setOption] = useState({});
	const [restaurant, setRestaurant] = useState<Record<string, any>>({});
	const [total, setTotal] = useState(0);
	useEffect(() => { 
		localStorage.setItem("restaurantId", JSON.stringify(restaurant.id));
	}, [restaurant])

	async function addOrder(orderDetails:any, total:number, restaurantId: string) {
		console.log(typeof restaurantId, "restaurantId");
		const data = {
			orderDetails: orderDetails,
			total: total,
			status: "pending",
			restaurantId: restaurantId,
		};

		const newOrder = await addDoc(collection(db, `orders`), data);
		listenForDriverAndUpdateDocument(newOrder.id);

		const newOrderMutation = gql` 
			mutation AddOrder($orderId: String, $RestaurantId: Int, $total: Int) {
				addOrder(orderId: $orderId, RestaurantId: $RestaurantId, total: $total) {
					status
				}
			}
		`

		const orderStatus = await client.mutate({
			mutation: newOrderMutation,
			variables: {
				orderId: newOrder.id,
				RestaurantId: parseInt(restaurantId),
				total: total,
			}
		})
		console.log(orderStatus)
	}

	async function listenForDriverAndUpdateDocument(orderId: string) {
		onSnapshot(doc(db, "orderIds", orderId), async (document:any) => {
			if (document.data()?.status === "accepted") {
				clearTimeout();
				console.log("accepted")
			}
		
			if (document.data()?.status === "pending") {
				const orderRef = collection(db, "orders");
				await updateDoc(doc(orderRef, orderId), {
					status: "canceled",
				});
				console.log("canceled")
			}
		
			
			
		});
	}

	// function uploadImage(e) {
	// 	const file = e.target.files[0];
	// 	const uploader = document.getElementById("uploader");

	// 	const storageRef = firebase.storage().ref(`images/${file.name}`);
	// 	const task = storageRef.put(file);
	// 	task.on(
	// 		"state_changed",
	// 		function progress(snapshot) {
	// 			const percentage =
	// 				(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	// 			console.log(percentage);
	// 			uploader.value = percentage;
	// 		},
	// 		function error(err) {
	// 			console.log(err);
	// 		},
	// 		function complete() {
	// 			// alert("file Uploaded successfully")
	// 		}
	// 	);
	// }

	function addToCart(item:any) {
		const displayOptions:Array<Object> = [];
		// loop through each cart item
		if (item.options) {
			for (let key in item.options) {
				// loop through each option in the cart item
				console.log(item.options[key]);
				if (item.options[key].length > 0) {
					item.options[key].forEach((option:any) => {
						// push each option to the displayOptions array
						displayOptions.push(option.option);
					});
					// displayOptions.push(item.options[key])
				}
			}

			item.options = displayOptions;
		}

		setId((prev) => prev + 1);
		const itemWithId = { ...item, id: id };
		setCart([...cart, itemWithId]);
	}

	function removeFromCart(item:any) {
		setCart(cart.filter((cartItem:any) => cartItem.id !== item.id));
	}

	// function submitOrder(cart) {
	// 	// make graphql mutation
	// 	const mutation = gql`
	// 		mutation AddOrder(
	// 			$userId: String
	// 			$status: String
	// 			$price: Int
	// 			$menuItems: [InputMenuItems]
	// 		) {
	// 			addOrder(
	// 				status: $status
	// 				price: $price
	// 				menuItems: $menuItems
	// 			) {
	// 				url
	// 			}
	// 		}
	// 	`;

	// 	client.mutate({
	// 		mutation,
	// 		variables: {
	// 			status: "pending",
	// 			price: cart.reduce((acc, item) => acc + item.price, 0),
	// 			menuItems: cart.map((item) => ({
	// 				name: item.name,
	// 				price: item.price,
	// 				description: item.description,
	// 			})),
	// 		},
	// 	});
	// }

	return (
		<CartContext.Provider
			value={{
				// uploadImage,
				cart,
				setCart,
				id,
				setId,
				option,
				setOption,
				restaurant,
				setRestaurant,
				total,
				setTotal,
				addToCart,
				removeFromCart,
				// listenForDriverAndUpdateDocument,
				// submitOrder,
				addOrder,
			}}>
			{props.children}
		</CartContext.Provider>
	);
}
