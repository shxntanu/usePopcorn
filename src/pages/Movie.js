import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import NavBar from "../components/NavBar";
import Search from "../components/Search";
import Numresults from "../utils/Numresults";
import Main from "../layout/Main";
import MovieBox from "../components/MovieBox";

function Movie() {
    const [query, setQuery] = useState("");
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();

    const { selectedID } = location.state;

    const API_KEY = "d1b83dd054786999cdeab1df570feb46";

    const {
        title,
        id,
        poster_path,
        vote_average,
        release_date,
        overview,
        runtime,
    } = movie;

    useEffect(
        function () {
            async function getMovieDetails() {
                setIsLoading(true);
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/${selectedID}?api_key=${API_KEY}`
                );
                const data = await res.json();
                // console.log(data);
                setMovie(data);
                setIsLoading(false);
            }
            getMovieDetails();
        },
        [selectedID]
    );

    return (
        <div className="details">
            <NavBar>
                <Search query={query} setQuery={setQuery} />
                {/* <Numresults movies={movies} /> */}
            </NavBar>
            <Main>
                <MovieBox>
                    <img
                    className="h-auto max-w-xl rounded-lg shadow-xl dark:shadow-gray-800 mx-auto"
                        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                        alt={`Poster of ${movie}`}
                    />
                </MovieBox>
            </Main>
        </div>
    );
}

export default Movie;
