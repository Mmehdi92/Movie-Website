import ListDAO from "@/dao/ListDao/ListDao";
import { query } from "@/utils/dbConnection";

export async function GET(req, { params }) {
  const userId = params.id;
  try {
    const result = await ListDAO.getListByUserId(userId);
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

export async function DELETE(req, { params }) {
  const listId = params.id;
  try {
    const result = await ListDAO.deleteList(listId);
    if (result.affectedRows === 0) {
      return new Response(
        JSON.stringify({ message: "List not found or failed to delete." })
      );
    }

    return new Response(JSON.stringify(result));
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error.message }, { status: 500 })
    );
  }
}
