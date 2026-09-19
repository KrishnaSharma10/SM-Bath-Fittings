import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CollectionGrid from "./grids/CollectionGrid";

/**
 * Page section: eyebrow, title, description and the grid.
 * Put this on the collections page instead of <CollectionGrid />.
 */
const FeaturedCollections = () => {
    const params = useParams();
    // The category name comes from your route, e.g. /collection/category/:categoryName/:categoryId.
    // If your route uses a different param name, change it here.
    const categoryName = params.categoryName || params.name || params.title || "Collections";

    // Filled in by CollectionGrid once the data has loaded (null while loading or on error)
    const [count, setCount] = useState(null);

    return (
        // Negative margins cancel the horizontal padding in MainLayout so the section lines up with the navbar.
        <section className="-mx-4 sm:-mx-[1vw] md:-mx-[2vw] lg:-mx-[4vw]">
            <div className="mx-auto max-w-[1320px] px-4 py-12 md:px-8 md:py-16 xl:px-0">
                {/* Header */}
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-red sm:text-[12px]">
                            {categoryName}
                            {count !== null && ` · ${String(count).padStart(2, "0")} ${count === 1 ? "family" : "families"}`}
                        </p>
                        <h1 className="mt-3 text-[40px] font-extrabold leading-[1.05] tracking-[-0.05em] text-brand-ink sm:text-[52px] lg:text-[64px]">
                            Choose a collection.
                        </h1>
                    </div>

                    <p className="max-w-[420px] text-[15px] leading-[1.65] text-slate-500 sm:text-[16px] lg:pb-2">
                        Compare families by form and finish, then open a range to see catalogued products, codes
                        and rates.
                    </p>
                </div>

                {/* Grid */}
                <div className="mt-12">
                    <CollectionGrid onLoad={setCount} />
                </div>
            </div>
        </section>
    );
};

export default FeaturedCollections;