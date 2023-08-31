import { useEffect, useRef, useState } from "react";
import { useKey } from "../hooks/useKey";
import StarRating from "./StarRating";
import Loader from "./Loader";

export default function MovieDetails({
    selectedID,
    onCloseMovie,
    onAddWatched,
    watched,
}) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState("");

    const countRef = useRef(0);

    useEffect(
        function () {
            if (userRating) countRef.current++;
        },
        [userRating]
    );

    const isWatched = watched.map((movie) => movie.ID).includes(selectedID);
    const watchedUserRating = watched.find(
        (movie) => movie.ID === selectedID
    )?.userRating;

    const {
        Title: title,
        ID: id,
        Poster: poster_path,
        Rating: vote_average,
        Plot: plot,
        Release: release_date,
        Actors: actors,
        Director: director,
        Overview: overview
    } = movie;

    function handleAdd(newMovie) {
        const newWatchedMovie = {
            ID: selectedID,
            Title: title,
            Release: release_date,
            Poster: `https://image.tmdb.org/t/p/w500${poster_path}`,
            Rating: Number(vote_average),
            userRating,
            Overview: overview,
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
                    `https://api.themoviedb.org/3/search/movie?query=${selectedID}&api_key=${process.env.API_KEY}`
                );
                const data = await res.json();
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
                        <img src={poster_path} alt={`Poster of ${movie}`} />
                        <div className="details-overview">
                            <h2>{title}</h2>
                            <p>
                                {release_date}
                            </p>
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
                            <em>{plot}</em>
                        </p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>
            )}
        </div>
    );
}
