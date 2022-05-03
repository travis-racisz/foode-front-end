import { ApolloClient, InMemoryCache } from "@apollo/client";

console.log(process.env.NODE_ENV)


export const client = new ApolloClient({
	uri:  process.env.NODE_ENV === "development" ? "http://localhost:8174/graphql" : "https://foode-backend.herokuapp.com/graphql",
	cache: new InMemoryCache({
			addTypename: false
		}),
	});




