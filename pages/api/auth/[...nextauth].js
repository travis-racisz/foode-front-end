import NextAuth from "next-auth"
import FacebookProvider from 'next-auth/providers/facebook'
import {client} from '../../../apollo-client'
import { gql } from '@apollo/client'

const mutation = gql`
mutation addUser($email: String){
  addUser(email: $email){ 
    id, 
    email
  } 
}`




export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    FacebookProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
    })
  ],
  NEXTAUTH_URL: process.env.NEXTAUTH_URL, 
  secret: process.env.NEXT_AUTH_SECRET, 
  session: { 
    strategy: "jwt"
  }, 
  callbacks: { 
      async session({ session, token, user }){ 
          console.log("testing auth")
          client.mutate({ 
              mutation, 
              variables: {email: session.user.email}
          })
          return session
      }
  },
  pages: { 
      newUser: '/auth/registration', 
      signIn: "/auth/signinwithfacebook"
  }
})