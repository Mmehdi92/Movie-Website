import mysql from "mysql2/promise";

export async function query({ query, values }) {
  const dbConnection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Valentina04-06",
    database: "moviedb",
  });

  try {
    console.log("Connected to DB!");
    console.log("Executing query:", query, values)
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
