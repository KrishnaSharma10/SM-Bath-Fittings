import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

const CloseIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M6 6l12 12M18 6 6 18" />
    </svg>
);

const ChevronIcon = ({ dir }) => (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d={dir === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
    </svg>
);

const roundBtn =
    "flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-brand-ink shadow-md transition-colors duration-200 hover:bg-brand-red hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/**
 * Full-screen viewer for a product photo.
 * Close with the X, the backdrop or Esc. Move between products with the arrows or the arrow keys.
 */
const ProductLightbox = ({ products, index, onClose, onChange }) => {
    const product = products[index];
    const total = products.length;
    const [shown, setShown] = useState(false);

    const go = useCallback((dir) => onChange((index + dir + total) % total), [index, total, onChange]);

    // Fade in after mount
    useEffect(() => {
        const id = requestAnimationFrame(() => setShown(true));
        return () => cancelAnimationFrame(id);
    }, []);

    // Lock page scroll, restore focus to the clicked card on close
    useEffect(() => {
        const trigger = document.activeElement;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prevOverflow;
            trigger?.focus?.();
        };
    }, []);

    // Keyboard
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") onClose();
            else if (e.key === "ArrowRight") go(1);
            else if (e.key === "ArrowLeft") go(-1);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [go, onClose]);

    if (!product) return null;

    return createPortal(
        <div
            role="dialog"
            aria-modal="true"
            aria-label={product.name}
            onClick={onClose}
            className={`fixed inset-0 z-[100] flex items-center justify-center bg-brand-navy/90 p-4 backdrop-blur-sm transition-opacity duration-300 ${
                shown ? "opacity-100" : "opacity-0"
            }`}
        >
            <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                autoFocus
                className={`${roundBtn} absolute right-4 top-4 z-20`}
            >
                <CloseIcon />
            </button>

            {total > 1 && (
                <>
                    <button
                        type="button"
                        aria-label="Previous product"
                        onClick={(e) => {
                            e.stopPropagation();
                            go(-1);
                        }}
                        className={`${roundBtn} absolute left-3 top-1/2 z-20 -translate-y-1/2 md:left-6`}
                    >
                        <ChevronIcon dir="left" />
                    </button>
                    <button
                        type="button"
                        aria-label="Next product"
                        onClick={(e) => {
                            e.stopPropagation();
                            go(1);
                        }}
                        className={`${roundBtn} absolute right-3 top-1/2 z-20 -translate-y-1/2 md:right-6`}
                    >
                        <ChevronIcon dir="right" />
                    </button>
                </>
            )}

            <figure
                onClick={(e) => e.stopPropagation()}
                className={`relative flex max-h-full w-full max-w-[960px] flex-col overflow-hidden rounded-[3px] bg-white shadow-2xl transition-[transform,opacity] duration-300 ease-out ${
                    shown ? "scale-100 opacity-100" : "scale-95 opacity-0"
                }`}
            >
                <div className="flex min-h-0 flex-1 items-center justify-center bg-brand-sky p-3 sm:p-6">
                    <img
                        key={product._id}
                        src={product.image}
                        alt={product.name}
                        className="max-h-[68vh] w-auto max-w-full object-contain"
                    />
                </div>

                <figcaption className="flex items-end justify-between gap-4 border-t-[3px] border-t-brand-blue px-5 py-4 sm:px-6">
                    <div className="min-w-0">
                        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-brand-red">
                            Catalog item
                        </p>
                        <p className="mt-1 truncate text-[22px] font-extrabold leading-tight tracking-[-0.03em] text-brand-ink sm:text-[26px]">
                            {product.name}
                        </p>
                    </div>

                    <div className="shrink-0 text-right">
                        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-400">Cat. no.</p>
                        <p className="mt-1 font-mono text-[15px] font-bold text-brand-blue">{product.catNo || "—"}</p>
                    </div>
                </figcaption>
            </figure>

            {total > 1 && (
                <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[11px] tracking-[0.14em] text-white/70">
                    {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </p>
            )}
        </div>,
        document.body
    );
};

export default ProductLightbox;