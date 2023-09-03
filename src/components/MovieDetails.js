import { useEffect, useRef, useState } from "react";
import { useKey } from "../hooks/useKey";
import StarRating from "./StarRating";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

export default function MovieDetails({
    selectedID,
    onCloseMovie,
    onAddWatched,
    watched,
}) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState("");

    const navigate = useNavigate();

    const toMoviePage = () => {
        navigate("/movie", {
            state: {
                selectedID: selectedID,
            },
        });
    };

    const API_KEY = "d1b83dd054786999cdeab1df570feb46";

    const countRef = useRef(0);

    useEffect(
        function () {
            if (userRating) countRef.current++;
        },
        [userRating]
    );

    const isWatched = watched.map((movie) => movie.id).includes(selectedID);
    const watchedUserRating = watched.find(
        (movie) => movie.id === selectedID
    )?.userRating;

    const {
        title,
        id,
        poster_path,
        vote_average,
        release_date,
        overview,
        runtime,
    } = movie;

    function handleAdd(newMovie) {
        const newWatchedMovie = {
            id: selectedID,
            title,
            release_date,
            poster_path,
            vote_average,
            userRating,
            overview,
            runtime,
            countRatingDecisions: countRef.current,
        };
        onAddWatched(newWatchedMovie);
        // onCloseMovie();
    }

    useKey("Escape", onCloseMovie);

    useEffect(
        function () {
            async function getMovieDetails() {
                setIsLoading(true);
                const res = await fetch(
                    `https://api.themoviedb.org/3/movie/${selectedID}?api_key=${API_KEY}`
                );
                const data = await res.json();
                console.log(data);
                setMovie(data);
                setIsLoading(false);
            }
            getMovieDetails();
        },
        [selectedID]
    );

    useEffect(
        function () {
            if (!title) return;
            document.title = `Movie | ${title}`;

            return function () {
                document.title = "usePopcorn";
            };
        },
        [title]
    );

    return (
        <div className="details">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>
                            &larr;
                        </button>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                            alt={`Poster of ${movie}`}
                        />
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>{release_date}</p>
                            <p>
                                <span>⭐️</span>
                                {vote_average} Average Rating
                            </p>
                        </div>
                    </header>

                    <section>
                        <div className="rating">
                            {isWatched ? (
                                <p>
                                    You have rated the movie {watchedUserRating}{" "}
                                    <span>⭐️</span>
                                </p>
                            ) : (
                                <>
                                    <StarRating
                                        maxRating={10}
                                        size={24}
                                        onSetRating={setUserRating}
                                    />
                                    {userRating > 0 && (
                                        <button
                                            className="btn-add"
                                            onClick={handleAdd}
                                        >
                                            + Add to List
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                        <p>
                            <em>{overview}</em>
                        </p>
                        <button
                            className="btn-add"
                            onClick={() => {
                                toMoviePage();
                            }}
                        >
                            Watch Movie
                        </button>
                    </section>
                </>
            )}
        </div>
    );
}
