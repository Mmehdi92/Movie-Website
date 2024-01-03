import dbConnection from "@/utils/dbConnection";
import List from "../../models/list";

class ListDAO {
  static async getListByUserId(userId) {
    try {
      const result = await dbConnection.query({
        query: "SELECT * FROM lists WHERE user_id = ?",
        values: [userId],
      });

      return result;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  static async createList(listName, userId) {
    try {
      const result = await dbConnection.query({
        query: "INSERT INTO lists (list_name, user_id) VALUES (?, ?)",
        values: [listName, userId],
      });

      return new List(result[0]);
    } catch (error) {
      console.error("Error creating a new list:", error);
      throw error;
    }
  }

  static async updateList(listId, listName) {
    try {
      const result = await dbConnection.query({
        query: "UPDATE lists SET list_name = ? WHERE id = ?",
        values: [listName, listId],
      });
      return result[0];
    } catch (error) {
      console.error("Error updating list:", error);
      throw error;
    }
  }

  static async deleteList(listId) {
    try {
      const result = await dbConnection.query({
        query: "DELETE FROM lists WHERE id = ?",
        values: [listId],
      });

      if (result.affectedRows === 0) {
        throw new Error("List not found or failed to delete.");
      }

      return result;
    } catch (error) {
      console.error("Error deleting list:", error);
      throw error;
    }
  }
}

export default ListDAO;
