import dbConnection from "@/utils/dbConnection";
import List from "../../models/list";

class ListDAO {
    static async getListByUserId(userId) {
        try {
            const result = await dbConnection.query({
                query: "SELECT * FROM lists WHERE user_id = ?",
                values: [userId],
            });

            return result.map(row => new List(row.id, row.list_name, row.user_id));
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }

    static async createList(listName, userId) {
        try {
          const result = await dbConnection.query('INSERT INTO lists (list_name, user_id) VALUES (?, ?)', [listName, userId]);
          return new List(result[0].insertId, listName, userId);
        } catch (error) {
          console.error('Error creating a new list:', error);
          throw error;
        }
      }


      static async updateList(listId, listName) {
        try {
          const result = await dbConnection.query('UPDATE lists SET list_name = ? WHERE id = ?', [listName, listId]);
          return result[0];
        } catch (error) {
          console.error('Error updating list:', error);
          throw error;
        }
      }

      static async deleteList(listId) {
        try {
          const result = await dbConnection.query('DELETE FROM lists WHERE id = ?', [listId]);
    
          if (result.affectedRows === 0) {
            throw new Error('List not found or failed to delete.');
          }
    
          return result;
        } catch (error) {
          console.error('Error deleting list:', error);
          throw error;
        }
      }
}

export default ListDAO;