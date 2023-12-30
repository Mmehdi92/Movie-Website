import { query } from "@/utils/dbConnection";

export async function GET(req, { params }) {
  console.log({ params });
  const listId = params.id; 

  try {
    const result = await query({
      query: "SELECT * FROM favorite_movies WHERE list_id = ?",
      values: [listId],
    });

    if (result.length === 0) {
      return new Response(
        JSON.stringify({ message: "No lists found", status: 404 })
      );
    }

    return new Response(JSON.stringify(result));
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error.message }, { status: 500 })
    );
  }
}
