import mysql from "mysql2/promise";

export async function query({ query, values = [] }) {
  const dbConnection = await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
  });

  try {
    const [rows] = await dbConnection.execute(query, values);
    dbConnection.end();
    return rows;
  } catch (error) {
    console.error("Error executing query:", error);
    throw new Error(error);
  }
}

export default { query };
