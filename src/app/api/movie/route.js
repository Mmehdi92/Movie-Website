import MovieDAO from "@/dao/MovieDao/DaoMovie";

// export async function GET(req, { params }) {
//   const responseObject = { message: "GET" };

//   return new Response(JSON.stringify(responseObject), {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// }

// export async function DELETE(req, { params }) {}

export async function POST(req) {
  try {
    const { movieTitle, movieId, listId } = await req.json();
    console.log(movieTitle, movieId, listId);
    if (!movieId || !movieTitle || !listId) {
      return new Response(JSON.stringify({ message: "Missing fields" }));
    }

    const result = await MovieDAO.addMovie(movieTitle, movieId, listId);
    console.log(result);

    return new Response(JSON.stringify(result));
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error.message }, { status: 500 })
    );
  }
}
