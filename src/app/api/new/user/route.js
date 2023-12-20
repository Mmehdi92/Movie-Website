import { query } from "@/utils/dbConnection";

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

export async function PUT(req, res) {
  const { firstName, lastName, email, userId } = await req.json();
  if (!firstName || !lastName || !email || !userId) {
    return new Response(JSON.stringify({ message: "Missing fields" }));
  }
  console.log(firstName, lastName, email, userId);

  try {
    const updateUser = await query({
      query:
        "UPDATE user SET first_name = ?, last_name = ?, email = ? WHERE id = ?",
      values: [firstName, lastName, email, userId],
    });

    if (updateUser.affectedRows === 0) {
      return new Response(
        JSON.stringify({ message: "User not found or failed something bad happend", status: 404 })
      );
    }

    return new Response(JSON.stringify(updateUser[0]), { status: 200 });  

  } catch (error) {
    return  new Response (JSON.stringify({message: error.message}, {status: 500}))
  }
};
