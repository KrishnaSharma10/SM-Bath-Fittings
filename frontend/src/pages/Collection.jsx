import React, { useEffect, useState } from "react";
import TitleCard from "../components/cards/CategoryCard";
import { getAllCategories } from "../api/CategoryApi"; // adjust path as needed

const Collection = () => {
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

    if (loading) {
        return <div className="text-center mt-10 text-xl">Loading categories...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-20 p-6 flex-wrap">
            {categories.map((category) => (
                <TitleCard
                    key={category._id}
                    title={category.name}
                    summary={category.description}
                    image={category.titleImage} // assuming this field holds the image URL
                    id={category._id}
                />
            ))}
        </div>
    );
};

export default Collection;
