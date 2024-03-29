export const getMoviesByListId = async (listId) => {
  try {
    const response = await fetch(`/api/movie/${listId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteMovieById = async (id) => {
  try {
    const response = await fetch(`/api/movie/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error fetching user lists:", error.message);
  }
};

export const addMovieToList = async (newMovie) => {
  
  try {
    const response = await fetch(`/api/movie`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movieTitle: newMovie.movieTitle,
        movieId: newMovie.movieId,
        listId: newMovie.listId,
      }),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return new Response(JSON.stringify(response));
  } catch (error) {
    console.error("Error fetching user lists:", error.message);
  }
};
