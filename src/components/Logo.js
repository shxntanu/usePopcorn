import { useNavigate } from "react-router";

export default function Logo() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/`, {});
    };

    return (
        <div
            onClick={handleClick}
            className="cursor-pointer relative inline-flex flex-shrink-0 flex-grow-0 justify-items-start items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group"
        >
            <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                <svg
                    className="w-6 h-6 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 30 30"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 5l-7 7m0 0 7 7m-7-7h18"
                    ></path>
                </svg>
            </span>
            <span className="relative w-full text-left text-4xl pb-2 transition-colors duration-200 ease-in-out group-hover:text-white">
                🍿 usePopcorn
            </span>
        </div>
    );
}
