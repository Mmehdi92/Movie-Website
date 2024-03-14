'use client'
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegThumbsUp } from "react-icons/fa";

export default function Card({ result }) {

  
  return (
    <div  className="sm:hover:animate-pulse sm:hover:scale-[1.1] sm:hover:m-[20px] sm:hover:shadow-2xl dark:sm:hover:bg-black  sm:hover:bg-amber-200 cursor-pointer sm:p-3 sm:hover:shadow-slate-400 sm:shadow-md rounded-lg sm:border sm:border-slate-400 sm:m-2 transition-shadow duration-200">
      <Link href={`/movie/${result.id}`}>
        <Image
          className="rounded-lg"
          src={`https://image.tmdb.org/t/p/original/${
            result.backdrop_path || result.poster_path
          }`}
          alt="Movie Poster"
          width={800}
          height={600}
          priority={true}
          placeholder="blur"
          blurDataURL="/spinner.svg"
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        ></Image>
        <div className="p-2">
          <p className="line-clamp-2 text-md">{result.overview}</p>
          <br />
          <h2 className="text-lg font-bold truncate">
            {result.title || result.name}
          </h2>
          <p className="flex items-center truncate ">
            {result.release_date || result.first_air_date}{" "}
            <FaRegThumbsUp className="h-5 ml-3 mr-1 text-md" />
            <span className="font-bold dark:text-amber-600 text-emerald-600">
              {result.vote_count}
            </span>
          </p>
        </div>
      </Link>
    </div>
  );
}
