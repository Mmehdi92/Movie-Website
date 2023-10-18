import React from "react";
import {BiSolidMoviePlay} from 'react-icons/bi'

export default function About() {
  return (
    <div className="max-w-6xl mx-auto space-y-4 px-5 mt-10 mb-10 min-h-screen">
      <h1 className="text-2xl  font-medium text-amber-600 tracking-wider">
        What is Movie Website <BiSolidMoviePlay className="inline-flex text-4xl animate-bounce space-x-1 ml-2"/>
      </h1>
      <h2 className="font-medium">Movie Website can help you:</h2>
      <div className="tracking-wide">
        <li className="">Jog your memory about a movie, show, or person on the tip of your tongue</li>
        <li className="">Find the best movie or show to watch next</li>
        <li className="">Empower you to share your entertainment knowledge and opinions with the world’s largest community of fans</li>
      </div>
      <br />
      
      <p>
        For fans deciding what to watch and where to watch it, we offer local
        movie showtimes, ticketing, trailers, critic and user reviews,
        personalized recommendations, photo galleries, entertainment news,
        quotes, trivia, box-office data, editorial feature sections and a
        universal Watchlist. <br/><br />
        To learn more about watching Trailers, Clips,
        Featurettes, and IMDb Originals, please see the IMDb Video FAQs.
      </p>
    </div>
  );
}
