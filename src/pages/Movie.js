import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import NavBar from "../components/NavBar";
import Search from "../components/Search";
import Badge from "../components/Badge";
import Numresults from "../utils/Numresults";
import SuggestedMovie from "../components/SuggestedMovie";
import Loader from "../components/Loader";

const sampleMovieData = require("../constants/sampleMovieData.json");

function Movie() {
    const [query, setQuery] = useState("");
    const [movie, setMovie] = useState(sampleMovieData);
    const [similarMovies, setSimilarMovies] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const location = useLocation();

    const { selectedID } = location.state;

    const API_KEY = "d1b83dd054786999cdeab1df570feb46";

    const {
        title,
        poster_path,
        backdrop_path,
        release_date,
        overview,
        genres,
    } = movie;

    let backdropURL = `https://image.tmdb.org/t/p/original${backdrop_path}`;

    const backgroundStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.6)), url(${backdropURL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    };

    useEffect(
        function () {
            try {
                async function getMovieDetails() {
                    var movieDetailRes = await fetch(
                        `https://api.themoviedb.org/3/movie/${selectedID}?api_key=${API_KEY}`
                    );

                    const movieDetailData = await movieDetailRes.json();

                    const similarMoviesRes = await fetch(
                        `https://api.themoviedb.org/3/movie/${selectedID}/recommendations?language=en-US&page=1&api_key=${API_KEY}`
                    );
                    const similarMoviesData = await similarMoviesRes.json();

                    // console.log(movieDetailData);
                    setMovie(movieDetailData);
                    setSimilarMovies(similarMoviesData);
                    setIsLoading(false);
                }
                getMovieDetails();
            } catch (error) {
                alert(error);
            }
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
                {isLoading && <Loader />}
                {!isLoading && (
                    <div className="movieBox" style={backgroundStyle}>
                        <div className="flex flex-row items-center mt-20 mx-20">
                            <img
                                className="object-fill h-min max-w-xl rounded-lg shadow-xl dark:shadow-gray-800"
                                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                                alt={`Poster of ${movie}`}
                            />
                            <div className="flex flex-col ml-20 space-y-5">
                                <p className="logo body text-6xl">{title}</p>
                                <div className="flex flex-row space-x-2">
                                    {genres &&
                                        genres.map(({ id, name }) => {
                                            return <Badge content={name} />;
                                        })}
                                    <span> • {release_date.slice(0, 4)}</span>
                                </div>
                                <p className="body pr-24">{overview}</p>
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
                        <div className="items-center mt-20 mx-20">
                            <p className="logo body text-5xl">Similar Movies</p>
                            <div className="py-10 flex flex-row flex-nowrap overflow-scroll">
                                {similarMovies.results.map(
                                    ({
                                        title,
                                        poster_path,
                                        release_date,
                                        id,
                                    }) => {
                                        return (
                                            // <SuggestedMovie
                                            //     title={title}
                                            //     poster_path={poster_path}
                                            //     release_date={release_date.slice(
                                            //         0,
                                            //         4
                                            //     )}
                                            //     key={id}
                                            // />
                                            <div className="shrink-0 max-w-fit">
                                                <img
                                                    className=" w-auto object-fill shadow-xl dark:shadow-gray-800"
                                                    src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                                                    alt={`Poster of ${title}`}
                                                />
                                                <div>
                                                    <span>{title}</span>
                                                    <p>{release_date}</p>
                                                </div>
                                            </div>
                                        );
                                    }
                                )}
                                {/* <SuggestedMovie title="Inception" poster_path="/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg" release_date="2014-09-44" /> */}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Movie;
