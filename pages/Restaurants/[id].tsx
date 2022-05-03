import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import { client } from "../../apollo-client";
import Menus from "../../components/restaurants/Menus";
import { useContext, useEffect } from "react";
import { CartContext } from "../../context/ContextProvider";
import Cart from "../../components/Cart/Cart";
import { IoMdArrowRoundBack } from "react-icons/io";
export default function Restaurant({ data }:any) {
	const router = useRouter();

	const context = useContext(CartContext);

	useEffect(() => {
		context?.setRestaurant(data.resturaunt[0]);
	}, [context, data.resturaunt]);

	return (
		<div>
			<div> 
				<IoMdArrowRoundBack className="back-arrow" onClick={() => router.back()} />
			</div>

				<Cart />
			<h1 className="restaurant-name">{data.resturaunt[0].name}</h1>
			<h3 className="menus-h3">Menus</h3>
			<div>
				{data.resturaunt[0].menu.map((menu:any, index:number) => {
					return (
						<div key={index}>
							<Menus data={menu} index={index} />
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
