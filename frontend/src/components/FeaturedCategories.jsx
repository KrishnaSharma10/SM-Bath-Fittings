import React, { useEffect, useState } from "react";
import CategoryCard from "./cards/CategoryCard";
import { getAllCategories } from "../api/ExploreApi";

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
        // Negative margins cancel the horizontal padding in MainLayout so the section lines up with the navbar.
        <section className="-mx-4 sm:-mx-[1vw] md:-mx-[2vw] lg:-mx-[4vw]">
            <div className="mx-auto max-w-[1320px] px-4 py-16 md:px-8 md:py-24 xl:px-0">
                {/* Header */}
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-red sm:text-[12px]">
                            Browse by use
                        </p>
                        <h2 className="mt-3 text-[40px] font-extrabold leading-[1.05] tracking-[-0.05em] text-brand-ink sm:text-[52px] lg:text-[64px]">
                            Find the right range
                        </h2>
                    </div>

                    <p className="max-w-[470px] text-[15px] leading-[1.65] text-slate-500 sm:text-[16px] lg:pb-2">
                        Start with a category, then move through collections and product codes with confidence.
                    </p>
                </div>

                {/* States */}
                {loading && (
                    <div className="mt-12 grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                className="h-[420px] animate-pulse rounded-[3px] border border-slate-200 bg-white"
                            />
                        ))}
                    </div>
                )}

                {error && <p className="mt-12 py-10 text-center text-[15px] text-brand-red">{error}</p>}

                {/* Cards: first one is wider, like the design */}
                {!loading && !error && (
                    <div className="mt-12 grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
                        {categories.slice(0, 3).map((category) => (
                            <CategoryCard
                                key={category._id}
                                id={category._id}
                                title={category.name}
                                summary={category.description}
                                image={category.titleImage}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedCategories;