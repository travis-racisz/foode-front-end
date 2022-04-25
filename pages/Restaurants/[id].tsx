import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { client } from "../../apollo-client";
import Menus from "../../components/restaurants/Menus";
import { useContext, useEffect } from "react";
import { CartContext } from "../../context/ContextProvider";

export default function Restaurant({ data }:any) {
	const router = useRouter();

	const context = useContext(CartContext);

	useEffect(() => {
		context?.setRestaurant(data.resturaunt[0]);
	}, []);

	return (
		<div>
			<h1>{data.resturaunt[0].name}</h1>
			<h3>Menus</h3>
			<div>
				{data.resturaunt[0].menu.map((menu:any) => {
					return (
						<div key={menu.name}>
							<Menus data={menu} />
						</div>
					);
				})}
			</div>
		</div>
	);
}

export async function getStaticProps(context:any) {
	const query = gql`
		query Resturaunt($resturauntId: Int) {
			resturaunt(id: $resturauntId) {
				name
				stripe_id
				id
				menu {
					name
					MenuItems {
						name
						price
						description
						priceId
						optionsgroup {
							name
							description
							numberOfChoices
							options {
								name
								priceId
								value
							}
						}
					}
				}
			}
		}
	`;

	const data = await client.query({
		query: query,
		variables: { resturauntId: parseInt(context.params.id) },
	});
	return {
		props: data,
	};
}

export async function getStaticPaths() {
	// get all restaurants and build dynamic routes for each restaurant
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
	const paths = data.data.resturaunts.map((restaurant:any) => {
		return {
			params: {
				id: restaurant.id,
			},
		};
	});
	return {
		paths,
		fallback: false,
	};
}
