import { useState, useEffect } from "react";
const KEY = "2b0774b2";
export function useMovies(query) {
  const [movies, setMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      const controller = new AbortController(); //web api to abort web requests to stop unnecessary requests
      async function fetchMovie() {
        try {
          setMovies([]);
          setError("");
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal } //linking the abort to the request
          );
          if (!res.ok) throw new Error("Something went wrong with fetching");
          const data = await res.json();
          if (data.Response === "False") throw new Error("no movies found");
          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            //when we abort a request no error should be shown
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length === 0) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovie();
      return function () {
        controller.abort(); //clean up function
      };
    },
    [query]
  );
  return {movies,isLoading,error};
}
