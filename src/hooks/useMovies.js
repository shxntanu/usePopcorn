import { useState, useEffect } from "react";
const sampleData = require("../constants/sampleData.json");

export function useMovies(query) {
    const API_KEY = "d1b83dd054786999cdeab1df570feb46";

    const [movies, setMovies] = useState(sampleData);
    // const [movie, setMovie] = useState({});
    // const [similarMovies, setSimilarMovies] = useState({});
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

                  
                        const queryRes = await fetch(
                            `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`,
                            { signal: controller.signal }
                        );
                        if (query === "") return;
                        if (!queryRes.ok)
                            throw new Error("Something went wrong");
                        const movieQueryData = await queryRes.json();
                        setMovies(movieQueryData);
                        console.log(movieQueryData);
                        if (movieQueryData.results === [])
                            throw new Error("Movie not Found");
                    

                    // const similarMoviesRes = await fetch(
                    //     `https://api.themoviedb.org/3/movie/${selectedID}/recommendations?language=en-US&page=1&api_key=${API_KEY}`
                    // );
                    // const similarMoviesData = await similarMoviesRes.json();

                    // const movieDetailRes = await fetch(
                    //     `https://api.themoviedb.org/3/movie/${selectedID}?api_key=${API_KEY}`
                    // );
                    // const movieDetailData = await movieDetailRes.json();

                    // setSimilarMovies(similarMoviesData);
                    // setMovie(movieDetailData);
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

    return { movies,  isLoading, error };
}
