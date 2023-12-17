import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";
import { query } from "@/utils/dbConnection";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        console.log("next auth");
        // Check if there are any credentials
        if (!credentials.email || !credentials.password) {
          console.log("No credentials were found");
          throw new Error("Please enter your credentials");
        }

        // Check if user exists
        const user = await query({
          query: " SELECT * FROM user WHERE email = ?",
          values: [credentials.email],
        });

        // If no user is found, throw an error
        if (user.length === 0) {
          console.log("No user found");
          throw new Error("No user found");
        }

        // Check if password matches
        const passwordMatches = await bcrypt.compare(
          credentials.password,
          user[0].password
        );

       
        if (passwordMatches) {
          console.log(user[0], );
          return user[0]; 
        }

        
        console.log("Password does not match");
        throw new Error("Password is incorrect");
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      console.log(token);
      if (user) {
        token.uid = user;
      }
      
      return token;
    },
    session: async ({ session, token }) => {
      
      if (token && token.uid) {
        session.user = {
          id: token.uid.id,
          first_name: token.uid.first_name,
          last_name: token.uid.last_name,
          email: token.uid.email,
        };
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
