import MovieDAO from "@/dao/MovieDao/DaoMovie";

export async function GET(req, { params }) {
  // console.log({ params });
  const listId = params.id;

  try {
    const movies = await MovieDAO.getMoviesByListId(listId);

    if (movies.length === 0) {
      return new Response(
        JSON.stringify({ message: "No movies found", status: 404 })
      );
    }

    return new Response(JSON.stringify(movies));
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error.message }, { status: 500 })
    );
  }
}

export async function DELETE( req,{ params }) {
  const movieId = params.id;

  try {
    const result = await MovieDAO.deleteMovie(movieId);
    // console.log(result);
    return new Response(JSON.stringify(result));
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error.message }, { status: 500 })
    );
  }
}
