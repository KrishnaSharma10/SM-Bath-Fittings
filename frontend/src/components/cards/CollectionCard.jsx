import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";

const CollectionCard = ({ image, name, id, description }) => {
    return (
        <div className="w-58 h-32 md:w-100 md:h-48 rounded-2xl shadow-xl transition-transform duration-300 hover:scale-105 hover:border-3 border-2 border-black box-border overflow-hidden group">
            <Link to={`/collection/category/collections/${name}/${id}`} className="block w-full h-full relative">
                {/* Background Image */}
                <img
                    src={image}
                    alt="Collection"
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 group-hover:brightness-75"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Text Overlay */}
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-lg font-semibold">{name}</h3>
                    <p className="text-sm">Explore Now</p>
                </div>
            </Link>
        </div>
    );
};

export default CollectionCard;
