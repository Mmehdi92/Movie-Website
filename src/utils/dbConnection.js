import mysql from "mysql2/promise";

export async function query({ query, values }) {
  const dbConnection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    console.log("Connected to DB!");
    console.log("Executing query:", query, values);
    const [rows, fields] = await dbConnection.execute(query, values);
    console.log("Query executed:", rows);
    dbConnection.end();
    console.log("Connection closed");
    return rows;
  } catch (error) {
    console.error("Error executing query:", error);
    throw new Error(error);
  }
}
