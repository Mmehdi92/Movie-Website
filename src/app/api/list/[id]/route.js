import { query } from "@/utils/dbConnection";

export async function GET(req, { params }) {
  const userId = params.id;

  try {
    const result = await query({
      query: "SELECT * FROM lists WHERE user_id = ?",
      values: [userId],
    });

    if (result.length === 0) {
      return new Response(JSON.stringify({ message: "No lists found" }));
    }

    return new Response(JSON.stringify(result));
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error.message }, { status: 500 })
    );
  }
}

export async function DELETE(req, { params }) {
const listId = params.id;
  try {
    const result = await query({
      query: "DELETE FROM lists WHERE id = ?",
      values: [listId],
    });

    console.log(result);
    return new Response(JSON.stringify(result));
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error.message }, { status: 500 })
    );
  }
}
