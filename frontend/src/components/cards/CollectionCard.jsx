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
 * Collection card.
 * Fills the width of its grid cell. Most collection images already have the collection name
 * printed on them, so the image gets a clean white stage and is shown whole (object-contain)
 * instead of being cropped.
 */
const CollectionCard = ({ image, name, id, description, className = "" }) => {
    return (
        <Link
            to={`/explore/category/collections/${name}/${id}`}
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
            {/* Image stage. Switch object-contain to object-cover if your photos should fill the frame. */}
            <div className="flex aspect-[2/1] items-center justify-center overflow-hidden bg-white p-4">
                <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
            </div>

            {/* Text */}
            <div className="flex flex-1 flex-col border-t border-slate-100 px-5 pb-5 pt-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-red">Collection</p>

                <h3 className="mt-1.5 text-[22px] font-extrabold leading-tight tracking-[-0.03em] text-brand-ink">
                    {name}
                </h3>

                {description && (
                    <p className="mt-2 line-clamp-1 text-[14px] leading-[1.65] text-slate-500">{description}</p>
                )}

                <span className="mt-auto inline-flex items-center gap-2 pt-3 text-[12px] font-bold uppercase tracking-[0.08em] text-brand-blue transition-colors duration-300 group-hover:text-brand-red">
                    View collection
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

export default CollectionCard;