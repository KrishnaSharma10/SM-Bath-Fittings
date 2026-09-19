import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../cards/ProductCard";
import ProductLightbox from "../ProductLightbox";
import { getAllProductsbyCollectionId } from "../../api/ExploreApi";

const SORTS = {
    featured: "Sort by featured",
    nameAsc: "Name A to Z",
    nameDesc: "Name Z to A",
    catNo: "Cat. no.",
};

const collator = (a, b) => (a || "").localeCompare(b || "", undefined, { numeric: true, sensitivity: "base" });

const ProductGrid = () => {
    const { collectionId, title } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sort, setSort] = useState("featured");
    const [activeIndex, setActiveIndex] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getAllProductsbyCollectionId(collectionId);
                setProducts(data);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError("Failed to load products.");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [collectionId]);

    const sorted = useMemo(() => {
        const list = [...products];
        if (sort === "nameAsc") list.sort((a, b) => collator(a.name, b.name));
        if (sort === "nameDesc") list.sort((a, b) => collator(b.name, a.name));
        if (sort === "catNo") list.sort((a, b) => collator(a.catNo, b.catNo));
        return list;
    }, [products, sort]);

    const gridClass = "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3";

    return (
        <div>
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 border-y border-slate-200 py-3.5">
                <p className="font-mono text-[11px] tracking-wide text-slate-500">
                    {loading ? "Loading products" : `Showing ${sorted.length} ${sorted.length === 1 ? "product" : "products"}`}
                </p>

                <div className="relative">
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        aria-label="Sort products"
                        className="cursor-pointer appearance-none rounded-[3px] border border-slate-200 bg-white py-2 pl-3.5 pr-9 text-[13px] text-slate-600 transition-colors duration-200 hover:border-brand-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
                    >
                        {Object.entries(SORTS).map(([value, label]) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                    <svg
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                        aria-hidden="true"
                    >
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </div>
            </div>

            <div className="mt-8">
                {loading && (
                    <div className={gridClass}>
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="h-[380px] animate-pulse rounded-[3px] border border-slate-200 bg-white" />
                        ))}
                    </div>
                )}

                {error && <p className="py-10 text-center text-[15px] text-brand-red">{error}</p>}

                {!loading && !error && sorted.length === 0 && (
                    <p className="py-10 text-center text-[15px] text-slate-500">No products in this collection yet.</p>
                )}

                {!loading && !error && sorted.length > 0 && (
                    <div className={gridClass}>
                        {sorted.map((product, index) => (
                            <ProductCard
                                key={product._id}
                                name={product.name}
                                image={product.image}
                                catNo={product.catNo}
                                collectionName={title}
                                index={index}
                                onOpen={() => setActiveIndex(index)}
                            />
                        ))}
                    </div>
                )}
            </div>

            {activeIndex !== null && (
                <ProductLightbox
                    products={sorted}
                    index={activeIndex}
                    onChange={setActiveIndex}
                    onClose={() => setActiveIndex(null)}
                />
            )}
        </div>
    );
};

export default ProductGrid;