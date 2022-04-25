import { gql } from "@apollo/client";
import { client } from "../../apollo-client";
import Link from "next/link";
import Cart from "../../components/Cart/Cart";
import { stringify } from "querystring";

export default function NewOrder({ data }) {
	console.log(data);
	// get all restaurants and display them here, similar to seeing all restaurants on other component
	return (
		<div>
			<Cart />
			{data.resturaunts.map((resturaunt:Record<string,any>) => {
				return (
					<div key={resturaunt.id}>
						<Link passHref href={`/Restaurants/${resturaunt.id}`}>
							<h2>
								<a>{resturaunt.name}</a>
							</h2>
						</Link>
					</div>
				);
			})}
		</div>
	);
}

export async function getStaticProps(context) {
	const getAllRestaurants = gql`
		query Resturaunts {
			resturaunts {
				id
				name
				opening_hour
				closing_hour
			}
		}
	`;
	const data = await client.query({
		query: getAllRestaurants,
	});
	return {
		props: data,
	};
}
