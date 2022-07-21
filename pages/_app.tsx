import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ContextProvider } from "../context/ContextProvider";
import "../styles/header.css"
import "../styles/signupuser.css"
import { ApolloProvider } from "@apollo/client";
import { client } from '../apollo-client';
import Error from "../components/Error";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.


function MyApp({ Component, pageProps: { session, ...pageProps } }:any) {
	return (
		<SessionProvider session={session}>
			<ApolloProvider client={client}>
				<ContextProvider>
					<Error></Error>
					<Component {...pageProps} />
				</ContextProvider>
			</ApolloProvider>
			
		</SessionProvider>
	);
}

export default MyApp;
