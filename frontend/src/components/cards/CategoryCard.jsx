import React from "react";
import { Link } from "react-router-dom";

const ArrowIcon = ({ className = "" }) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" className={className} aria-hidden="true">
        <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

/**
 * Category card.
 * Fills the width of whatever grid cell it sits in, so set the width from the parent grid.
 * Pass `className` to add spacing or sizing where you use it.
 */
const CategoryCard = ({ id, title, summary, image, className = "" }) => {
    return (
        <Link
            to={`/collection/category/${title}/${id}`}
            className={`
                group relative flex h-full flex-col overflow-hidden
                rounded-[3px] border border-slate-200 border-t-[3px] border-t-brand-blue bg-white
                shadow-sm
                transition-[translate,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                hover:-translate-y-2 hover:shadow-[0_22px_44px_-14px_rgba(13,43,94,0.28)]
                focus-visible:-translate-y-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue
                motion-reduce:transition-none motion-reduce:hover:translate-y-0
                ${className}
            `}
        >
            {/* Image */}
            <div className="h-[220px] overflow-hidden bg-slate-100 sm:h-[250px] lg:h-[280px]">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
            </div>

            {/* Text */}
            <div className="flex flex-1 flex-col px-6 pb-7 pt-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-red">Category</p>

                <h3 className="mt-1.5 text-[24px] font-extrabold leading-tight tracking-[-0.03em] text-brand-ink lg:text-[26px]">
                    {title}
                </h3>

                <p className="mt-3 line-clamp-2 text-[14px] leading-[1.65] text-slate-500">{summary}</p>

                <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[12px] font-bold uppercase tracking-[0.08em] text-brand-blue transition-colors duration-300 group-hover:text-brand-red">
                    Explore range
                    <ArrowIcon className="transition-transform duration-300 ease-out group-hover:translate-x-1.5 motion-reduce:transition-none" />
                </span>
            </div>

            {/* Red accent line that draws in along the bottom edge on hover */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-brand-red transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
            />
        </Link>
    );
};

export default CategoryCard;