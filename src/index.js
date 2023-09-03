import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

import Home from "./pages/Home";
import Movie from "./pages/Movie";

export default function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/movie" element={<Movie />} />
                </Routes>
            </Router>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
