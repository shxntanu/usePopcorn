import { useState } from "react";

export default function MovieBox({ children }) {
    return (
        <div className="movieBox">
            {children}
        </div>
    );
}