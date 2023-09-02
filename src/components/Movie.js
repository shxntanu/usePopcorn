export default function Movie({ movie, onSelectMovie }) {
    return (
        <li onClick={() => onSelectMovie(movie.id)}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} poster`} />
            <h3>{movie.title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.release_date}</span>
                </p>
            </div>
        </li>
    );
}
