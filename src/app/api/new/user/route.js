import {query}  from "@/utils/dbConnection";
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
        JSON.stringify({ message: "User already exists", status: 409 }),
        
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const newUser = await query({
      query:
        "INSERT INTO user (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
      values: [firstName, lastName, email, hashedPassword],
    });

    return new Response(
      console.log(newUser[0]),
      JSON.stringify(newUser[0]),{status: 201}
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error.message }, { status: 500 })
    );
  }
};
