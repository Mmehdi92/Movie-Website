import { query } from "@/utils/dbConnection";
import { getSesusession } from "next-auth/react";

import bcrypt from "bcrypt";

export const POST = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = await req.json();

    console.log(firstName);
    if (!firstName || !lastName || !email || !password) {
      return new Response(JSON.stringify({ message: "Missing fields" }));
    }

    const existingUser = await query({
      query: "SELECT * FROM user WHERE email = ?",
      values: [email],
    });

    if (existingUser.length > 0) {
      console.log("User already exists");
      return new Response(
        JSON.stringify({ message: "User already exists", status: 409 })
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const newUser = await query({
      query:
        "INSERT INTO user (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
      values: [firstName, lastName, email, hashedPassword],
    });

    return new Response(console.log(newUser[0]), JSON.stringify(newUser[0]), {
      status: 201,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error.message }, { status: 500 })
    );
  }
};

// export const PATCH = async (req, res) => {
//   try {
//     // Retrieve the session
//     const session = await getSession({ req });
//     console.log(session);

//     // Check if the user is authenticated
//     if (!session || !session.user) {
//       return new Response(
//         JSON.stringify({ message: "Unauthorized", status: 401 })
//       );
//     }

//     // Extract user ID from the session
//     const userId = JSON.stringify(session.user?.id);

//     // The rest of your PATCH logic goes here...

//     const { firstName, lastName, email, } = await req.json();

//     // Use userId in your query or logic as needed
//     const updatedUser = await query({
//       query:
//         "UPDATE user SET first_name=?, last_name=?, email=?,  WHERE id=?",
//       values: [firstName, lastName, email, userId],
//     });

//     return new Response(JSON.stringify(updatedUser), { status: 200 });
//   } catch (error) {
//     return new Response(
//       JSON.stringify({ message: error.message }, { status: 500 })
//     );
//   }
// };
