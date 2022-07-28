import { createContext, useState, VoidFunctionComponent } from "react";
import { addDoc, doc, collection, onSnapshot, updateDoc } from "../lib/firebase";
import { db, auth } from "../lib/firebase";
import { gql, useQuery } from "@apollo/client"
import { client } from "../apollo-client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getAuth, 
	createUserWithEmailAndPassword, 
	FacebookAuthProvider,
	getRedirectResult,
	signInWithEmailAndPassword,
	signInWithPopup,
	setPersistence,
	browserLocalPersistence
 } from "firebase/auth";
import { getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import Cookie from 'js-cookie'


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
	createPaymentIntent: (total: Number, orderId:String) => void,
	phoneNumber: string,
	setPhoneNumber: (phoneNumber: any) => void
	user: Record<string, any>,
	setUser: (user: Record<string, any>) => void, 
	signInWithEmail: (email: string, password: string) => void,
	signInWithFacebook: () => void,
	getPendingOrders: () => void,
	orderDetails: Record<string, any>,
	pendingOrders: Array<any>,
	driverDetails: Record<string, any>,
	clearError: () => void,
	driverRegistration: any, 
	completeOrder: (orderId: string | string [], token: string) => void,
	signUpDriver: (email: string, password:string, confirmPassword: string) => void,
	getOrderDetails: (orderId: string | string[]) => void,
	authError: string,
	signInDriver: (email: string, password: string) => void,
	setDriverRegistration: any, 
	getDriverProfile: (token: string) => void,
	completedOrders: Array<any>,
	errorMessage: string,
	updateUser: (user: Record<string, any>, data: Record<string, any>) => void,
	setCompletedOrders: (completedOrders: Array<any>) => void,
	setDriverDetails: (driverDetails: Record<string, any>) => void,
	getLoginLink: (stripeAccount: string) => void, 
	updateOrderStatus:(status:string | string[], orderId: string | string[]) => void,
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
	const [ errorMessage, setErrorMessage ] = useState<string>("")
	const [ orderStatus, setOrderStatus ] = useState<string>("");
	const [ orderId, setOrderId ] = useState<string>('');
	const [ paymentIntentId, setPaymentIntentId ] = useState<string>("");
	const [ phoneNumber, setPhoneNumber ] = useState<string>("");
	const [ driver, setDriver ] = useState({})
	const [ user, setUser ] = useState<Record<string,any>>({});
	const [ pendingOrders, setPendingOrders ] = useState([])
	const [ authError, setAuthError ] = useState<string>("");
	const [ orderDetails, setOrderDetails ] = useState<Record<string, any>>({})
	const [ completedOrders, setCompletedOrders ] = useState([])
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
	const [ driverDetails, setDriverDetails ] = useState({})
	const router = useRouter()

	useEffect(() => { 
		
		localStorage.setItem("restaurantId", JSON.stringify(restaurant.id));
	}, [restaurant])

	useEffect(() => { 
		Cookie.set('user', JSON.stringify(user))
	}, [user])
	async function createPaymentIntent(total:Number, orderId:String){ 
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

	const updateUser = async (user: Record<string, any>, data: Record<string, any>) => {
		console.log(user, data, "user, data");
		// if(user.email == undefined){ 
		// 	console.log('user is undefined');
		// 	setErrorMessage('session expired please login again')
		// 	return 
		// }
		// try{ 
		// 	const userRef = doc(db, 'users', user.email);
		// 	await updateDoc(userRef, data)
		// 	router.push('/user/address')

		// } catch(err){ 
		// 	console.log(err)
		// }



	
	}

	async function signInWithFacebook(){ 
		signInWithPopup(auth, facebookProvider)
		.then(async (result) => {
			console.log(result, "this is the result")
			// The signed-in user info.
			const user = result.user
			setUser(user)

			const addFacebookUser = gql` 
				mutation addUser($email: String!){
					addUser(email: $email){
						id
						email
						firstName
						lastName
						phoneNumber
						token
					}
				}
			`

			try{ 
				const token = await client.mutate({ 
					mutation: addFacebookUser,
					variables: {
						email: user.email
					}
				})
				Cookie.set('token', token.data.addUser.token)
			} catch(error){ 
				console.log(error)
			}
			
			// ...
		})
		.then(async () => { 
			if(!user.completedRegistration){ 
				router.push("/user/register")
				return 
			}
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
					unsub1()
				}
				if (data?.status === "canceled") {
					setOrderStatus("canceled");
					unsub1()
				}
			}
		})
	

	}

	async function driverAcceptsOrder(orderId: string, driverDetails: Record<string, any>){ 
		const orderRef = collection(db, "orders");
		await updateDoc(doc(orderRef, orderId), {
			status: "accepted",
			driverDetails: driverDetails,
		});
		router.push(`/order/accepted/${orderId}`);
	}


	function updateOrderStatus(status, orderId){ 
		const orderRef = collection(db, "orders");
		updateDoc(doc(orderRef, orderId), {
			status: status,
		});
		
	}

	async function completeOrder(orderId, token){ 
		const mutation = gql`
			mutation driverCompletesDelivery($orderId: String!, $token: String!) {
				driverCompletesDelivery(orderId: $orderId, token: $token) {
					id
					status
					total
				}
			}`

			try{ 
				const { data, errors } = await client.mutate({ 
					mutation: mutation,
					variables: {
						orderId: orderId,
						token: token
					}
				})

			} catch(error: any){ 
				handleError(error)
			}
		

			// if(errors){ 
			// 	console.log(errors)
			// }

			// if(data?.driverCompletesDelivery.status === "success"){
			// 	router.push('/driver/dashboard')
			// }

		


	}

	function handleError(error){ 
		console.log(error)
		setErrorMessage(error.message)
		if(error.message.includes('jwt expired')){ 
			setErrorMessage("session has expired, please log in again")
			setUser(null)
			localStorage.removeItem("token")
			
		}
	}

	function clearError(){ 
		setErrorMessage("")
		router.push('/')
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



	async function getPendingOrders(){ 
		
		const orderRef = collection(db, "orders");
		// get all orders with status pending from firestore
		const q = query(orderRef, where('status', '==', 'pending'));
		const unsubscribe = onSnapshot(q, (snapshot) => {
			const pendingOrders = []
			console.log(snapshot.docs)
			snapshot.docs.map((doc) => { 
				if(doc.data()){ 
					const data = { 
						data: doc.data(),
						id: doc.id
					}
					pendingOrders.push(data)
				}
				// TODO CHANGE THIS SO IT ONLY RENDERS ONCE
				
			})
			setPendingOrders(pendingOrders)
			
		})
		// const querySnapshot = await getDocs(q)
		// querySnapshot.forEach((doc) => {
		// 	const data = { 
		// 		data: doc.data(),
		// 		id: doc.id
		// 	}
		// 	setPendingOrders(prev => { 
		// 		return [...prev, data]
		// 	})
		// })
	}

	async function getOrderDetails(orderId: string){
		const orderRef = doc(db, "orders", orderId);
		const querySnapshot = await getDoc(orderRef)
		setOrderDetails(querySnapshot.data())
	}

	function addToCart(item:any) {
		const displayOptions:Array<Object> = [];
		// loop through each cart item
		if (item.options) {
			for (let key in item.options) {
				// loop through each option in the cart item
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


	async function signUpDriver(email:string, password:string, confirmPassword: string){
		if(password !== confirmPassword){ 
			return setAuthError("Passwords do not match")
		} 
		const signUpMutation = gql` 
			mutation addDrivers($email: String!, $password: String!) {
				addDrivers(email: $email, password: $password) {
					url
				}
			}
		`

		try{ 
			const { data: { addDrivers } } = await client.mutate({
				mutation: signUpMutation,
				variables: {
					email: email,
					password: password
				}
			})
			if(addDrivers.url){ 
				router.push(addDrivers.url);
			}
			
		} catch(err){ 
			console.log(err, "err")
		}

		// const auth = getAuth()
		// createUserWithEmailAndPassword(auth, email, password)
		// .then(async (userCredentials) => { 
		// 		const userRef = doc(db, "users", userCredentials.user.uid);
		// 		setDriverDetails(userCredentials.user)
		// 		await setDoc(userRef, { 
		// 			uid: userCredentials.user.uid,
		// 			email: userCredentials.user.email,
		// 			emailVerified: userCredentials.user.emailVerified,
		// 		})
		// 		router.push("/driver/dashboard")
		// 	})
		// 	.catch(err => { 
		// 		console.log(err)
		// 		setAuthError(err.message)
		// 	})
	}

	async function signInDriver(email: string, password: string){ 
		const signInMutation = gql` 
			mutation loginDrivers($email: String!, $password: String!) {
				loginDrivers(email: $email, password: $password) {
					token	
					url
				}
			}
		`
			try { 
				const { data: { loginDrivers } } = await client.mutate({ 
					mutation: signInMutation,
					variables: {
						email: email,
						password: password
					}
				})
				console.log(loginDrivers, "loginDrivers")
				if(loginDrivers.token){ 
					localStorage.setItem("token", loginDrivers.token)
				}

				if(loginDrivers.url){ 
					router.push(loginDrivers.url)
				} 

				if(!loginDrivers.url){ 
					router.push("/driver/dashboard")
				}

			} catch(err){ 
				setAuthError(err.message)
			}

	}

	async function getDriverProfile(token){ 

		const orderQuery = gql` 
			query getDriversCompletedOrders($id: String!) {
				getDriversCompletedOrders(id: $id) {
					total
					orderDetails{ 
						name
						price
					}
				}
			}
		`
		const query = gql`
			query getDriverProfile($token: String!) {
				getDriverProfile(token: $token) {
					id
					email
					verified
					stripe_id
				}
			}`
			
				const {loading, data, error} = await client.query({
					query: query,
					variables: {
						token: token
					}, 
					errorPolicy: "all"
				})

				// const {loading, data, error } = useQuery(orderQuery, {
				// 	variables: {
				// 		token: token
				// 		}, 
				// 		errorPolicy: "all"
				// 	})
				
					
				if(error){ 
					console.log(error, "error message")
					// router.push('/driver/auth/signIn')
				}
				console.log(error, 'error')
				console.log(data, "getDriverProfile")
				// setDriverDetails(data.getDriverProfile)
				// const { data: { getDriversCompletedOrders } } = await client.query({
				// 	query: orderQuery,
				// 	variables: {
				// 		id: data.getDriverProfile.id, 
				// 	}
				// })
				// setCompletedOrders(getDriversCompletedOrders)
			
			
			}

			async function getLoginLink(stripeAccount){ 
				const loginLink = gql` 
					query getDriversStripeProfile($stripeAccount: String!) {
						getDriversStripeProfile(stripeAccount: $stripeAccount) {
							url
						}
					}

				`
				try{
					const {data: {getDriversStripeProfile: {url}}} = await client.query({ 
						query: loginLink,
						variables: {
							stripeAccount: stripeAccount
						}
					})
					console.log(url, "link")
					router.push(`${url}`)
			} catch(err){ 
				return err
			}
		}
			


	return (
		<CartContext.Provider
			value={{
				// uploadImage,
				user, 
				updateUser,
				clearError,
				setDriverDetails,
				errorMessage,
				setCompletedOrders,
				authError,
				getLoginLink,
				updateOrderStatus,
				setUser, 
				completedOrders,
				getDriverProfile,
				signInDriver,
				completeOrder,
				orderDetails, 
				signUpDriver,
				getOrderDetails,
				getPendingOrders,
				driverDetails,
				signInWithEmail, 
				signInWithFacebook,
				phoneNumber, 
				setPhoneNumber,
				createPaymentIntent,
				driverAcceptsOrder,
				orderId,
				cart,
				pendingOrders,
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
				setDriverRegistration,				// submitOrder,
				addOrder,
			}}>
			{props.children}
		</CartContext.Provider>
	);
}
