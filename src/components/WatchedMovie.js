export default function WatchedMovie({ movie, onDeleteWatched }) {
    return (
        <li>
            <img src={movie.poster} alt={`${movie.itle} poster`} />
            <h3>{movie.title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.Rating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                </p>
                <button
                    className="btn-delete"
                    onClick={() => onDeleteWatched(movie.imdbID)}
                >
                    X
                </button>
            </div>
        </li>
    );
}
