import Results from "@/app/components/Results";
import React from "react";

export default async function SearchPage({ params }) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.APIKEY}&query=${params.inputTerm}&language=en-US&page=1&include_adult=true`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  const results = data.results; // array of movies

  return (
    <div>
      {results && results.length === 0 ? (
        <h1 className="text-center pt-6">No Results Found</h1>
      ) : (
        <Results results={results} />
      )}
    </div>
  );
}
