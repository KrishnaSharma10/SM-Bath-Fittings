import React from "react";
import { Link } from "react-router-dom";

const CollectionCard = () => {
    return (
        <div className="border-solid border-2 group relative w-80 h-48 md:w-80 md:h-48 lg:w-84 rounded-2xl overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-105">
            <Link to="/" className="block w-full h-full relative">
                {/* You can place image, title, or content here */}
                <img
                    src="https://via.placeholder.com/300x200"
                    alt="Collection"
                    className="w-full h-2/3 object-cover"
                />
            </Link>
        </div>
    );
};

export default CollectionCard;
