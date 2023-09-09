import { useNavigate } from "react-router-dom";

function SuggestedMovie({ title, poster_path, release_date, selectedID }) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/movie/${selectedID}`, {
            state: {
                selectedID: selectedID,
            },
        });
    };
    return (
        <div className="transform transition duration-500 hover:scale-110 p-5 shrink-0 max-w-xl max-h-min" onClick={handleClick}>
            <img
                className=" w-auto min-w-fit max-w-xl max-h-96 rounded-lg shadow-xl dark:shadow-gray-800"
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                alt={`Poster of ${title}`}
            />
            <div className="pt-3 max-w-xs">
                <span>{title}</span>
                <p>{release_date}</p>
            </div>
        </div>
    );
}

export default SuggestedMovie;
