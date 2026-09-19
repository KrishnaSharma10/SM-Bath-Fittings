import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductGrid from "./grids/ProductGrid";

const FeaturedProducts = () => {
    const { title } = useParams();
    const navigate = useNavigate();

    return (
        // Negative margins cancel the horizontal padding in MainLayout so the section lines up with the navbar.
        <section className="-mx-4 sm:-mx-[1vw] md:-mx-[2vw] lg:-mx-[4vw]">
            <div className="mx-auto max-w-[1320px] px-4 py-10 md:px-8 md:py-14 xl:px-0">
                {/* Header */}
                <div className="flex items-center justify-between gap-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-red sm:text-[12px]">
                        Collection
                    </p>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="text-[12px] font-bold uppercase tracking-[0.08em] text-brand-blue transition-colors duration-200 hover:text-brand-red"
                    >
                        &larr; Back
                    </button>
                </div>

                <h1 className="mt-3 text-[40px] font-extrabold leading-[1.05] tracking-[-0.05em] text-brand-ink sm:text-[52px] lg:text-[64px]">
                    {title}
                </h1>
                <p className="mt-4 max-w-[560px] text-[15px] leading-[1.65] text-slate-500 sm:text-[17px]">
                    Tap any product to view it larger. Catalogue numbers are listed for quick reference when
                    specifying or ordering.
                </p>

                {/* Grid */}
                <div className="mt-10">
                    <ProductGrid />
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;