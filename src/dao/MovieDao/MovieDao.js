import dbConnection from "@/utils/dbConnection";
import Movie from "../../models/movie";

class MovieDAO {
  static async addMovie(movieTitle, userId, movieId, listId) {
    try {
      const result = await dbConnection.query({
        query:
          "INSERT INTO favorite_movies (movie_title, user_id, movie_id, list_id) VALUES (?, ?, ?, ?)",
        values: [movieTitle, userId, movieId, listId],
      });

      return new Movie(result[0]);
    } catch (error) {
      console.error("Error adding movie:", error);
      throw error;
    }
  }

  static async getMoviesByListId(listId) {
    try {
      const result = await dbConnection.query({
        query: "SELECT * FROM favorite_movies WHERE list_id = ?",
        values: [listId],
      });

      return result;
    } catch (error) {
      console.error("Error getting movies by list id:", error);
      throw error;
    }
  }

  static async deleteMovie(movieId) {
    try {
      const result = await dbConnection.query({
        query: "DELETE FROM favorite_movies WHERE id = ?",
        values: [movieId],
      });

      return result;
    } catch (error) {
      console.error("Error deleting movie:", error);
      throw error;
    }
  }

  static async getMovieById(movieId) {
    try {
      const result = await dbConnection.query({
        query: "SELECT * FROM favorite_movies WHERE id = ?",
        values: [movieId],
      });

      return new Movie(result[0]);
    } catch (error) {
      console.error("Error getting movie by id:", error);
      throw error;
    }
  }
}

export default MovieDAO;
