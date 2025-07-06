import React from "react";
import { Link } from "react-router-dom";

const TitleCard = ({ title, summary, image }) => {
    return (
        <div className="border-solid border-2 group relative w-58 h-80 md:w-70 md:h-104 lg:w-80 rounded-2xl overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-105">
            {/* Entire card is a link */}
            <Link to="/" className="block w-full h-full relative">
                {/* Background Image with zoom on hover */}
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />

                {/* Dark gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                {/* Summary Text - shows on hover, centered */}
                <div className="absolute left-3 right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none z-20 text-white text-sm md:text-base font-light backdrop-blur-md bg-black/30 p-3 rounded-xl shadow-md">
                    {summary}
                </div>
            </Link>

            {/* Title at bottom - always visible */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white via-white/70 to-transparent p-3 z-10 pointer-events-none rounded-b-2xl">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 barlow-condensed-medium-italic">
                    {title}
                </h2>
            </div>
        </div>
    );
};

export default TitleCard;
