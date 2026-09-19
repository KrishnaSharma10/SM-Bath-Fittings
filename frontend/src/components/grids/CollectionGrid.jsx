import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CollectionCard from "../cards/CollectionCard";
import { getAllCollectionsbyCategory } from "../../api/ExploreApi";

const CollectionGrid = ({ onLoad }) => {
    const { categoryId } = useParams();
    const [collections, setCollections] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCollections = async () => {
            setloading(true);
            setError(null);
            try {
                const data = await getAllCollectionsbyCategory(categoryId);
                setCollections(data);
                onLoad?.(data.length);
            } catch (err) {
                console.error("Error fetching collections:", err);
                setError("Failed to load collections.");
                onLoad?.(null);
            } finally {
                setloading(false);
            }
        };
        fetchCollections();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryId]);

    const gridClass = "grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-3";

    if (loading) {
        return (
            <div className={gridClass}>
                {[0, 1, 2].map((i) => (
                    <div key={i} className="h-[280px] animate-pulse rounded-[3px] border border-slate-200 bg-white" />
                ))}
            </div>
        );
    }

    if (error) {
        return <p className="py-10 text-center text-[15px] text-brand-red">{error}</p>;
    }

    if (collections.length === 0) {
        return <p className="py-10 text-center text-[15px] text-slate-500">No collections in this category yet.</p>;
    }

    return (
        <div className={gridClass}>
            {collections.map((collection) => (
                <CollectionCard
                    key={collection._id}
                    name={collection.name}
                    description={collection.description}
                    image={collection.image}
                    id={collection._id}
                />
            ))}
        </div>
    );
};

export default CollectionGrid;