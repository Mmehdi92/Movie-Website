import { query } from "@/utils/dbConnection";

export async function GET(req, res) {
  //   if (!session) {
  //     return new Response(JSON.stringify({ message: "Unauthorized" }));
  //   }
  const userId = req.query.userId;

  try {
    const result = await query({
      query: "SELECT * FROM lists WHERE user_id = ?",
      values: [userId],
    });

    if (result.length === 0) {
      return new Response(
        JSON.stringify({ message: "No lists found", status: 404 })
      );
    }

    // Send the result as JSON
    return new Response(JSON.stringify(result));
  } catch (error) {
    // Send the error message as JSON
    return new Response(
      JSON.stringify({ message: error.message }, { status: 500 })
    );
  }
}

export async function POST(req) {
  try {
    const { list_name, userId } = await req.json();
    if (!list_name || !userId) {
      return new Response(JSON.stringify({ message: "Missing fields" }));
    }

    const newList = await query({
      query: "INSERT INTO lists (list_name, user_id) VALUES (?, ?)",
      values: [list_name, userId],
    });

    return new Response(JSON.stringify(newList[0]), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error.message }, { status: 500 })
    );
  }
}
