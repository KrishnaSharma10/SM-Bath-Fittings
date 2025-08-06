import React, { useEffect, useState } from "react";
import CollectionCard from "../cards/CollectionCard";
import { assets } from "../../assets/assets";
import { useParams } from "react-router-dom";
import { getAllCollectionsbyCategory } from "../../api/CategoryApi";

const CollectionGrid = () => {
    const { categoryId } = useParams();
    const [collections, setCollections] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCollections = async () => {
            try {
                const data = await getAllCollectionsbyCategory(categoryId);
                setCollections(data);
            } catch (err) {
                console.error("Error fetching collections:", err);
                setError("Failed to load collections.");
            } finally {
                setloading(false);
            }
        };
        fetchCollections();
    }, [categoryId]);

    if (loading) {
        return <div className="text-center mt-10 text-xl">Loading collections...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">{error}</div>;
    }

    return (
        <div className="w-full py-6 px-2 flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-18 max-w-screen-xl w-full justify-items-center">
                {collections.map((collection) => (
                    <CollectionCard
                        key={collection._id}
                        categoryid={collection.category}
                        name={collection.name}
                        description={collection.description}
                        image={collection.titleImage}
                        id={collection._id}
                    />
                ))}


            </div>
        </div>
    );
};

export default CollectionGrid;
