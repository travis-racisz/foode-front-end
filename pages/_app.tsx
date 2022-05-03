import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Cart from "../components/Cart/Cart";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { ContextProvider } from "../context/ContextProvider";
import "../styles/header.css"
import "../styles/signupuser.css"
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.


function MyApp({ Component, pageProps: { session, ...pageProps } }:any) {
	return (
		<SessionProvider session={session}>
			
				<ContextProvider>
					<Component {...pageProps} />
				</ContextProvider>
			
		</SessionProvider>
	);
}

export default MyApp;
