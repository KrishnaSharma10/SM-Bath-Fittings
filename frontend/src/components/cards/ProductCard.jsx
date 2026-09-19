import React from "react";

const ExpandIcon = () => (
    <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M7 17 17 7" />
        <path d="M8 7h9v9" />
    </svg>
);


const ProductCard = ({ name, image, catNo, collectionName, index, onOpen }) => {
    return (
        <button
            type="button"
            onClick={onOpen}
            aria-label={`View ${name} larger`}
            className="
                group relative flex h-full w-full cursor-zoom-in flex-col overflow-hidden
                rounded-[3px] border border-slate-200 border-t-[3px] border-t-brand-blue bg-white text-left
                shadow-sm
                transition-[translate,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                hover:-translate-y-2 hover:shadow-[0_22px_44px_-14px_rgba(13,43,94,0.28)]
                focus-visible:-translate-y-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue
                motion-reduce:transition-none motion-reduce:hover:translate-y-0
            "
        >
            {/* Image stage */}
            <span className="relative block h-[240px] overflow-hidden bg-brand-sky">
                {/* Faint decorative arc */}
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-28 -right-20 h-72 w-72 rounded-full border border-brand-blue/10"
                />

                {/* Labels */}
                <span className="absolute inset-x-5 top-4 z-10 flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-[0.14em]">
                    <span className="truncate pr-3 text-brand-ink">{collectionName}</span>
                    <span className="text-brand-red">{String(index + 1).padStart(2, "0")}</span>
                </span>

                <span className="flex h-full items-center justify-center px-6 pb-5 pt-11">
                    <img
                        src={image}
                        alt={name}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                </span>
            </span>

            {/* Text */}
            <span className="flex flex-1 flex-col px-5 pb-5 pt-4">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-brand-red">
                    Catalog item
                </span>

                <span className="mt-2 flex items-start justify-between gap-3">
                    <span className="text-[22px] font-extrabold leading-tight tracking-[-0.03em] text-brand-ink">
                        {name}
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-brand-blue transition-colors duration-300 group-hover:border-brand-blue group-hover:bg-brand-blue group-hover:text-white">
                        <ExpandIcon />
                    </span>
                </span>

                <span className="mt-auto block pt-5">
                    <span className="block border-t border-slate-100 pt-3">
                        <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400">
                            Cat. no.
                        </span>
                        <span className="mt-1 block font-mono text-[13px] font-bold text-brand-blue">
                            {catNo || "—"}
                        </span>
                    </span>
                </span>
            </span>

            {/* Red accent line that draws in along the bottom edge on hover */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-brand-red transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
            />
        </button>
    );
};

export default ProductCard;