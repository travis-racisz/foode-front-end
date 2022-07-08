import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

export default function SignInWithFacebook() {
	const { data: session, status } = useSession();
	console.log(session, 'session');
	console.log(status, 'status');
	if (session) {
		console.log(session, "session");
		return (
			<>
				<h1>Logged in as {session.user?.email}</h1>
				<Image alt = "users profile picture"src={`${session.user?.image}`}></Image>
				<Link href="/order/NewOrder">Place an order</Link>
			</>
		);
	}

	if (status === "loading") {
		return <div>...loading</div>;
	}
	return (
		<form action="/api/auth/signin/facebook">
			<div style={{ border: "1px solid yellow" }}>
				<button type="submit">Sign In with Facebook</button>
			</div>
		</form>
	);
}
