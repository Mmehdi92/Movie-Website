import { query } from "@/utils/dbConnection";


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

export async function POST(req, { params }) {
    
    try {
    const {movieTitle,userId,movieId,listId} = await req.json();
    if (  !movieId  || !movieTitle || !userId || !listId) {
        console.log(movieId,movieTitle,userId,listId);
        return new Response(JSON.stringify({ message: "Missing fields" }));
    }

    const addMovie = await query({
        query: "INSERT INTO favorite_movies (movie_title, user_id, movie_id, list_id) VALUES (?, ?, ?, ?)",
        values: [movieTitle,userId,movieId,listId],
    });

    return new Response(JSON.stringify(addMovie[0]), { status: 201 });
   } catch (error) {
    return new Response(
        JSON.stringify({ message: error.message }, { status: 500 })
    );
   }

}