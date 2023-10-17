import Results from "./components/Results";
const APIKEY = process.env.APIKEY;
import Image from "next/image";
export default async function Home({ searchParams }) {
  const genre = searchParams.genre || "fetchPopular";

  const res = await fetch(
    `https://api.themoviedb.org/3/${
      genre === "fetchTopRated" ? "movie/top_rated" : "trending/all/week"
    }?api_key=${APIKEY}&language=en-US&page=1`,
    { next: { revalidate: 1000 } }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  const results = data.results; // array of movies


  return (
    <div className="">
      <Results results={results} />
    </div>
  );
}
