import Movie from "./Movie";

export default function MovieList({ movies, onSelectMovie }) {
    return (
        <ul className="list list-movies">
            {movies.results?.map((movie) => (
                <Movie
                    movie={movie}
                    onSelectMovie={onSelectMovie}
                    key={movie.id}
                />
            ))}
        </ul>
    );
}
