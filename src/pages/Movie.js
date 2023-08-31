import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import NavBar from "../components/NavBar";
import Search from "../components/Search";
import Numresults from "../utils/Numresults";

function Movie({ movies }) {
    const [query, setQuery] = useState("");
    const { userId } = useParams();

    return (
        <div>
            <NavBar>
                <Search query={query} setQuery={setQuery} />
                <Numresults movies={movies} />
            </NavBar>
        </div>
    );
}

export default Movie;
