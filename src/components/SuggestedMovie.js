function SuggestedMovie({ title, poster_path, release_date }) {
    return (
        <div className="shrink-0 max-w-fit">
            <img
                className="transform transition duration-500 hover:scale-110 w-auto object-fill rounded-lg shadow-xl dark:shadow-gray-800"
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

export default SuggestedMovie;
