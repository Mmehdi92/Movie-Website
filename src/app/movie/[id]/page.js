import Image from "next/image";
import React from "react";

export const metadata = {
  title: "Search Page",
  description: "This is a search page",
};

async function getMovie(movieId) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_APIKEY}`
    );
    return await res.json();
  } catch (error) {
    console.log(error.message);
  }
}

export default async function MoviePage({ params }) {
  const movieId = params.id;
  // console.log(movieId);
  const movie = await getMovie(movieId);
  return (
    <div className="w-full ">
      <div className="flex flex-col items-center content-center max-w-6xl p-4 mx-auto md:pt-8 xl:flex-row md:space-x-6">
        <Image
          className="ml-3 rounded-lg "
          src={`https://image.tmdb.org/t/p/original/${
            movie.backdrop_path || movie.poster_path
          }`}
          alt="Movie Poster"
          width={800}
          height={600}
          priority={true}
          placeholder="blur"
          blurDataURL="/spinner.svg"
          style={{
            maxWidth: "100%",
            height: "100%",
          }}
        ></Image>
        <div className="p-2">
          <h2 className="mb-3 text-lg font-bold">
            {movie.title || movie.name}
          </h2>
          <p className="mb-3 text-lg tracking-wide">
            <span className="font-semibold">
              Overview: <br />
            </span>
            {movie.overview}
          </p>
          <p className="mb-3">
            <span className="mr-1 font-semibold">Release Date:</span>{" "}
            {movie.release_date || movie.first_air_date}
          </p>
          <p className="mb-3">
            <span className="mr-1 font-semibold">Upvoted count: </span>{" "}
            {movie.vote_count}
          </p>
        </div>
      </div>
    </div>
  );
}
