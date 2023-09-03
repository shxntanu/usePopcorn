import { useState, useEffect } from "react";
const sampleData = require('../constants/sampleData.json')

export function useMovies(query) {
    const API_KEY = "d1b83dd054786999cdeab1df570feb46";

    const [movies, setMovies] = useState(sampleData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(
        function () {
            //   callback?.();
            const controller = new AbortController();

            async function fetchMovies() {
                try {
                    setIsLoading(true);
                    setError("");

                    const res = await fetch(
                        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`,
                        { signal: controller.signal }
                    );

                    if (query === "") return;

                    if (!res.ok) throw new Error("Something went wrong");

                    const data = await res.json();

                    console.log(data)
                    if (data.results === [])
                        throw new Error("Movie not Found");

                    setMovies(data);
                    setError("");
                } catch (err) {
                    // console.error(err.message);

                    if (err.name !== "AbortError") {
                        setError(err.message);
                    }
                } finally {
                    setIsLoading(false);
                }
            }
            //   handleCloseMovie();
            fetchMovies();

            return function () {
                controller.abort();
            };
        },
        [query]
    );

    return { movies, isLoading, error };
}
