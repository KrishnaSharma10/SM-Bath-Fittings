import React from "react";
import { Link } from "react-router-dom";

const TitleCard = ({ title, summary, image }) => {
    return (
        <div className="group relative sm:w-36 sm:h-44 md:w-70 md:h-104 lg:w-80 rounded-lg overflow-hidden shadow-xl">
            {/* Entire card is a link */}
            <Link to="/" className="block w-full h-full relative">
                {/* Image */}
                <img src={image} alt={title} className="w-full h-full object-cover" />

                {/* Black overlay on hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none"></div>

                {/* Summary text - left side center, only on hover */}
                <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none z-20 w-3/5 text-white text-sm md:text-base font-light bg-black/15 p-2 rounded">
                    {summary}
                </div>

                {/* Title at bottom (always visible) */}

            </Link>
            <div className="barlow-condensed-medium-italic absolute bottom-0 left-0 w-full bg-gradient-to-t from-gray-100 via-transparent to-transparent p-3 z-10 pointer-events-none">
                <h2 className="text-3xl text-black">{title}</h2>
            </div>
        </div>
    );
};

export default TitleCard;
