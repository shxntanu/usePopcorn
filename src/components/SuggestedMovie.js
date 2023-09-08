function SuggestedMovie({ title, poster_path, release_date }) {
    return (
        <div className=" max-w-max">
            <img
                className="object-fill w-fit shadow-xl dark:shadow-gray-800"
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
