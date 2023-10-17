import Image from "next/image";
import React from "react";


async function getMovie(movieId) {
try {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.APIKEY}`
      );
      return await res.json();
} catch (error) {
    console.log(error.message);
}
}

export default async function MoviePage({params}) {
  const movieId = params.id;
  // console.log(movieId);
  const movie = await getMovie(movieId);
  return <div className="w-full ">
    <div className="p-4 md:pt-8 flex flex-col xl:flex-row items-center content-center max-w-6xl mx-auto md:space-x-6">
    <Image
          className="rounded-lg ml-3  "
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
          <h2 className="text-lg  mb-3 font-bold">{movie.title || movie.name}</h2>
          <p className="text-lg mb-3 tracking-wide"><span className="font-semibold">Overview: <br /></span>
          {movie.overview}
          </p>
          <p className="mb-3"><span className="font-semibold mr-1">Release Date:</span> {movie.release_date || movie.first_air_date}</p>
          <p className="mb-3"><span className="font-semibold mr-1">Upvoted count: </span> {movie.vote_count}</p>
        </div>
      
    </div>
  
  </div>;
}
