import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TitleCard from "./cards/CategoryCard";
import { getAllCategories } from "../api/CategoryApi";

const FeaturedCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getAllCategories();
                setCategories(data);
            } catch (err) {
                console.error("Error fetching categories:", err);
                setError("Failed to load categories.");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <section className="w-full max-w-[1400px] mx-auto px-4 mt-20">
            <div className="text-center mb-10">
                <span className="uppercase tracking-[0.3em] text-xs md:text-sm text-brass-600 font-semibold">
                    Explore
                </span>
                <h2 className="barlow-condensed-medium text-3xl md:text-5xl text-charcoal-900 mt-2 brass-underline inline-block">
                    Featured Categories
                </h2>
            </div>

            {loading && (
                <div className="text-center py-10 text-charcoal-400 montserrat">
                    Loading categories...
                </div>
            )}

            {error && (
                <div className="text-center py-10 text-red-500 montserrat">
                    {error}
                </div>
            )}

            {!loading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.slice(0, 4).map((category) => (
                        <TitleCard
                            key={category._id}
                            title={category.name}
                            summary={category.description}
                            image={category.titleImage}
                            id={category._id}
                        />
                    ))}
                </div>
            )}

            <div className="flex justify-center mt-10">
                <Link
                    to="/collection"
                    className="inline-flex items-center gap-2 px-7 py-2.5 bg-gradient-to-r from-brass-500 to-brass-400 text-charcoal-900 text-sm font-semibold rounded-full hover:from-brass-400 hover:to-brass-300 shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                    View All Collections
                </Link>
            </div>
        </section>
    );
};

export default FeaturedCategories;