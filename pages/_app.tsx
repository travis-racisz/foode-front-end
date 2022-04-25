import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Cart from "../components/Cart/Cart";
import Link from "next/link";
import { ContextProvider } from "../context/ContextProvider";
import "../styles/header.css"
import "../styles/signupuser.css"

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
