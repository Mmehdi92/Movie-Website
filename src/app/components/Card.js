import Image from "next/image";
import Link from "next/link";
import React from "react";
import {FaRegThumbsUp} from "react-icons/fa";

export default function Card({ result }) {
  return (
    <div className="cursor-pointer sm:p-3 sm:hover:shadow-slate-400 sm:shadow-md rounded-lg sm:border sm:border-slate-400 sm:m-2 transition-shadow duration-200">
      <Link href={`/movie/${result.id}`}>
        <Image
          className=""
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
          <h2 className="truncate text-lg font-bold">{result.title || result.original_title}</h2>
          <p className=" flex items-center truncate ">{result.release_date || "Date unknow"} <FaRegThumbsUp className="h-5 mr-1 ml-3 text-md" /><span className="dark:text-amber-600 text-emerald-600 font-bold">{result.vote_count}</span></p>
        </div>
    
      </Link>
    </div>
    
  );
}
