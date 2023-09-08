import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import NavBar from "../components/NavBar";
import Search from "../components/Search";
import Badge from "../components/Badge";
import Numresults from "../utils/Numresults";

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
            <div className="main">
                <div className="movieBox">
                    <div className="flex flex-row items-center mt-20 mx-20">
                        <img
                            className="object-fill h-min max-w-xl rounded-lg shadow-xl dark:shadow-gray-800"
                            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                            alt={`Poster of ${movie}`}
                        />
                        <div className="flex flex-col ml-20 space-y-5">
                            <p className="logo body text-6xl">{title}</p>
                            <p className="body pr-24">{overview}</p>
                            <div>
                            <Badge content="hello"/>
                            </div>
                            <div className="flex flex-row space-x-5">
                                <button className="btn-add w-52">
                                    &#9658; Watch Now
                                </button>
                                <button className="btn-add w-52">
                                    &#x2b; Add to list
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Movie;
