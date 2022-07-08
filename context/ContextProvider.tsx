import { createContext, useState, VoidFunctionComponent } from "react";
import { addDoc, doc, collection, onSnapshot, updateDoc } from "../lib/firebase";
import { db, auth } from "../lib/firebase";
import { gql } from "@apollo/client"
import { client } from "../apollo-client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getAuth, 
	createUserWithEmailAndPassword, 
	FacebookAuthProvider,
	getRedirectResult,
	signInWithPopup
 } from "firebase/auth";
import { getDoc, setDoc } from "firebase/firestore";



const facebookProvider = new FacebookAuthProvider();


interface driverRegistrationInterface { 
	firstName: string, 
	lastName: string, 
	email: string, 
	password: string, 
	failedLoginAttempts: number, 
	account_locked_until: string, 
	currently_delivering: boolean, 
	stripe_id: string, 
}




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
	clientSecret: string,
	setClientSecret: (clientSecret: string) => void
	error: boolean,
	setError: (error: boolean) => void, 
	orderStatus: string,
	orderId: string,
	setOrderStatus: (orderStatus: string) => void
	driverAcceptsOrder: (orderId: string, driverDetails:Record<string, any>) => void, 
	listenForDriverAndUpdateDocument: (orderId: string) => void,
	handleSubmit: (e: any, elements:any, stripe: any, setErrorMessage: any, setProcessing: any) => void,
	createPaymentIntent: (total: number, orderId:String) => void,
	phoneNumber: string,
	setPhoneNumber: (phoneNumber: any) => void
	user: Record<string, any>,
	setUser: (user: Record<string, any>) => void, 
	signInWithEmail: (email: string, password: string) => void,
	signInWithFacebook: () => void,
	driverRegistration: any, 
	setDriverRegistration: any
}

export const CartContext = createContext<CartContextInterface | null> (null);
	
export function ContextProvider(props:any) {
	const [cart, setCart] = useState<any>([]);
	const [id, setId] = useState(0);
	const [option, setOption] = useState({});
	const [restaurant, setRestaurant] = useState<Record<string, any>>({});
	const [total, setTotal] = useState(0);
	const [ clientSecret, setClientSecret ] = useState<string>("");
	const [ error, setError] = useState<boolean>(false);
	const [ orderStatus, setOrderStatus ] = useState<string>("");
	const [ orderId, setOrderId ] = useState<string>('');
	const [ paymentIntentId, setPaymentIntentId ] = useState<string>("");
	const [ phoneNumber, setPhoneNumber ] = useState<string>("");
	const [ user, setUser ] = useState<Record<string,any>>({});
	const [ driverRegistration, setDriverRegistration ] = useState<driverRegistrationInterface>({ 
		firstName: "", 
		lastName: "", 
		email: "", 
		password: "" , 
		failedLoginAttempts: 0, 
		stripe_id: "" , 
		account_locked_until: "", 
		currently_delivering: false
	})
	const router = useRouter()

	useEffect(() => { 
		localStorage.setItem("restaurantId", JSON.stringify(restaurant.id));
	}, [restaurant])

	async function createPaymentIntent(total: number, orderId:String){ 
		const createPaymentIntentMutation = gql` 
			mutation createPaymentIntent($total: Float!, $orderId: String!){
				createPaymentIntent(total: $total, orderId: $orderId){
					client_secret
					id
				}
			}
		`

		const { data } = await client.mutate({
			mutation: createPaymentIntentMutation,
			variables: {
				total: total,
				orderId: orderId
			}
		})
		console.log(data.createPaymentIntent, "data.createPaymentIntent.clientSecret");
		setClientSecret(data.createPaymentIntent.client_secret);
		setPaymentIntentId(data.createPaymentIntent.id);
		router.push({ 
			pathname: `/payment/${data.createPaymentIntent.clientSecret}`
		})
	}

	async function signInWithFacebook(){ 
		signInWithPopup(auth, facebookProvider)
		.then((result) => {
			console.log(result, "this is the result")
			// The signed-in user info.
			const user = result.user;

			// This gives you a Facebook Access Token. You can use it to access the Facebook API.
			const credential = FacebookAuthProvider.credentialFromResult(result);
			const accessToken = credential.accessToken;
			setUser(user)
			
			// ...
		})
		.then(async () => { 
			router.push("/profile/user")
			const userRef = doc(db, 'users', user.email, );
			
			// check if the document exists
			const userDoc = await getDoc(userRef)
			if(!userDoc.exists()){ 
				console.log('sign up')
				await setDoc(userRef, { 
					email: user.email,
					displayName: user.displayName,
					photoURL: user.photoURL,
					phoneNumber: user.phoneNumber,
				})
				return;
			}
			// if it doesnt exist, create it

			// get the users profile info from the database
		})
		.catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.email;
			console.log(error, "error")
			// The AuthCredential type that was used.
			const credential = FacebookAuthProvider.credentialFromError(error);

			// ...
		});
	}

	async function handleSubmit(event: any, elements: any, stripe: any, setErrorMessage: any, setProcessing: any){ 
		event.preventDefault()
			setProcessing(true)
			setError(false)
		console.log('fired')
		const unsub1 = onSnapshot(doc(db, `orders`, orderId),
		 async (doc) => {
			 console.log(doc)
			if (doc.exists) {
				const data = doc.data();
				console.log(data, "data");
				if (data?.status === "accepted") {
					if(!stripe || !elements){ 
						return
					}
					const {error} = await stripe.confirmPayment({
						//`Elements` instance that was used to create the Payment Element
						elements,
						confirmParams: {
							return_url: 'http://localhost:3000/order/complete',
						},
					});
					if (error) {
						setError(true)
						setProcessing(false)
						// This point will only be reached if there is an immediate error when
						// confirming the payment. Show error to your customer (for example, payment
						// details incomplete)
						setErrorMessage(error.message);
					}
					setOrderStatus("accepted");
					unsub1()
				}
				if (data?.status === "canceled") {
					router.push('/order/complete')
					setOrderStatus("canceled");
					unsub1()
				}
			}
		})

		

		
	
		
	
		
		  
	}

	async function signInWithEmail(email:string, password:string){ 
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in 
				const user = userCredential.user;
				setUser(user)
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorMessage)
				// ..
			});
	}
	
	async function addOrder(orderDetails:any, total:number, restaurantId: string) {

		const newOrderMutation = gql` 
			mutation Mutation($restaurantId: Int, $total: Float, $order: [OrderInput]) {
				addOrder(RestaurantId: $restaurantId, total: $total, order: $order) {
				orderId
				client_secret
				}
			}
		`

		try{ 
			const orderStatus = await client.mutate({
				mutation: newOrderMutation,
				variables: {
					restaurantId: parseInt(restaurantId),
					total: total,
					order: orderDetails, 
					hasPayed: false
				}
			})

			console.log(orderStatus.data?.addOrder)
			createPaymentIntent(total, orderStatus.data?.addOrder.orderId);
			localStorage.setItem("orderId", JSON.stringify(orderStatus.data.addOrder.orderId));
			setOrderId(orderStatus.data?.addOrder.orderId);
			setClientSecret(orderStatus.data?.addOrder.client_secret);
			
		} 
		catch(err){ 
			setError(err.message);
		}
	}

	// useEffect(() => { 
	// 	console.log(orderId, "orderId in useEffect")
	// }, [orderId])


	function listenForDriverAndUpdateDocument(orderId: string) {
		// console.log(orderId, "orderId");
		

		// get realtime updates from firestore
		const unsub1 = onSnapshot(doc(db, `orders`, orderId),
		 (doc) => {
			if (doc.exists) {
				const data = doc.data();
				if (data?.status === "accepted") {
					setOrderStatus("accepted");
				}
				if (data?.status === "delivered") {
					setOrderStatus("delivered");
				}
				if (data?.status === "canceled") {
					setOrderStatus("canceled");
				}
			}
		})

	}

	async function driverAcceptsOrder(orderId: string, driverDetails: Record<string, any>){ 
		const orderRef = collection(db, "orders");
		const driverDetailsDev = { 
			driverName: "John Handcock",
			phoneNumber: "939-200-9954"
		}
		await updateDoc(doc(orderRef, orderId), {
			status: "accepted",
			driverDetails: driverDetailsDev,
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
		}

			item.options = displayOptions;
			
			
			setId((prev) => prev + 1);
			const itemWithId = { ...item, id: id };
			console.log(itemWithId, "itemWithId");
			 
		setCart([...cart, itemWithId]);
	}

	function removeFromCart(item:any) {
		setCart(cart.filter((cartItem:any) => cartItem.id !== item.id));
	}


	function signUpDriver(email:string, password:string){ 
		// send mutation to back end with username and password
		// return if the account was successfully created 
	}

	return (
		<CartContext.Provider
			value={{
				// uploadImage,
				user, 
				setUser, 
				signInWithEmail, 
				signInWithFacebook,
				phoneNumber, 
				setPhoneNumber,
				createPaymentIntent,
				driverAcceptsOrder,
				orderId,
				cart,
				orderStatus,
				setOrderStatus,
				error, 
				setError,
				clientSecret,
				setClientSecret,
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
				handleSubmit,
				listenForDriverAndUpdateDocument,
				driverRegistration, 
				setDriverRegistration,
				// submitOrder,
				addOrder,
			}}>
			{props.children}
		</CartContext.Provider>
	);
}
