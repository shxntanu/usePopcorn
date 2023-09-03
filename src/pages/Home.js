import { useState } from "react";

import { useMovies } from "../hooks/useMovies";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

import NavBar from "../components/NavBar";
import Search from "../components/Search";
import Loader from "../components/Loader";
import MovieList from "../components/MovieList";
import MovieDetails from "../components/MovieDetails";
import WatchedSummary from "../components/WatchedSummary";
import Box from "../components/Box";
import WatchedMovieList from "../components/WatchedMovieList";

import ErrorMessage from "../utils/ErrorMessage";
import Numresults from "../utils/Numresults";
import Main from "../layout/Main";

export default function Home() {
    const [query, setQuery] = useState("");
    const [selectedID, setSelectedID] = useState(null);
    const { movies, isLoading, error } = useMovies(query);
    const [watched, setWatched] = useLocalStorageState([], "watched");

    function handleSelectMovie(movieID) {
        setSelectedID((selectedID) =>
            movieID === selectedID ? null : movieID
        );
    }

    function handleCloseMovie() {
        setSelectedID(null);
    }

    function handleAddWatched(movie) {
        setWatched((watched) => [...watched, movie]);
    }

    function handleDeleteWatched(id) {
        setWatched((watched) => watched.filter((movie) => movie.id !== id));
    }

    return (
        <>
            <NavBar>
                <Search query={query} setQuery={setQuery} />
                <Numresults movies={movies.results} />
            </NavBar>
            <Main>
                <Box>
                    {isLoading && <Loader />}
                    {!isLoading && !error && (
                        <MovieList
                            movies={movies}
                            onSelectMovie={handleSelectMovie}
                        />
                    )}
                    {error && <ErrorMessage message={error} />}
                </Box>
                <Box>
                    <>
                        {selectedID ? (
                            <MovieDetails
                                selectedID={selectedID}
                                onCloseMovie={handleCloseMovie}
                                onAddWatched={handleAddWatched}
                                watched={watched}
                            />
                        ) : (
                            <>
                                <WatchedSummary watched={watched} />
                                <WatchedMovieList
                                    watched={watched}
                                    onDeleteWatched={handleDeleteWatched}
                                />{" "}
                            </>
                        )}
                    </>
                </Box>
            </Main>
        </>
    );
}
