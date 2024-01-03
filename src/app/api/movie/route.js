import MovieDAO from "@/dao/MovieDao/MovieDAO";


export async function GET(req, { params }) {
    const responseObject = { message: "GET" };

    return new Response(JSON.stringify(responseObject), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}


export async function DELETE(req, { params }) {
    
}

export async function POST(req) {
  try {
    const { movieTitle, userId, movieId, listId } = await req.json();
    if (!movieId || !movieTitle || !userId || !listId) {
      console.log(movieId, movieTitle, userId, listId);
      return new Response(JSON.stringify({ message: "Missing fields" }));
    }

    const addedMovie = await MovieDAO.addMovie(movieTitle, userId, movieId, listId);

    return new Response(JSON.stringify(addedMovie), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error.message }, { status: 500 })
    );
  }
}
