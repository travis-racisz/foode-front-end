import { 
    ApolloClient, 
    InMemoryCache,
  } from "@apollo/client"



  
  export const client = new ApolloClient({ 
    uri: "https://foode-backend.herokuapp.com/graphql", 
    cache: new InMemoryCache(), 
  })