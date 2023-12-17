import MovieFilter from "./components/MovieFilter";
import Results from "./components/Results";
import SearchBox from "./components/SearchBox";
const APIKEY = process.env.REACT_APP_APIKEY;

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
      <MovieFilter />
      <SearchBox />

      <Results results={results} />
    </div>
  );
}
