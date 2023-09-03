export default function WatchedMovie({ movie, onDeleteWatched }) {
    return (
        <li>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} poster`} />
            <h3>{movie.title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.vote_average}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                </p>
                <p>
                    <span>🕒</span>
                    <span>{movie.runtime}</span>
                </p>
                <button
                    className="btn-delete"
                    onClick={() => onDeleteWatched(movie.id)}
                >
                    X
                </button>
            </div>
        </li>
    );
}
