import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

// Add your new hero photo to assets.js as `heroImg`.
// Until then it falls back to the old first slider image.
const heroImage = assets.heroImg || assets.slider1;

const DownloadIcon = () => (
    <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M12 3v11" />
        <path d="m7.5 10 4.5 4.5 4.5-4.5" />
        <path d="M4 15v3.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V15" />
    </svg>
);

const ArrowIcon = () => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
        <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const Slider = () => {
    return (
        // Negative margins cancel the horizontal padding in MainLayout so the hero runs edge to edge.
        <section className="relative -mx-4 overflow-hidden bg-brand-page sm:-mx-[1vw] md:-mx-[2vw] lg:-mx-[4vw] lg:h-[560px] xl:h-[600px]">
            {/* Background photo */}
            <img
                src={heroImage}
                alt="Modern bathroom with SM bath fittings"
                className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
            />

            {/* White fade on the left so the text stays readable */}
            <div className="absolute inset-0 hidden bg-linear-to-r from-white/95 from-0% via-white/85 via-30% to-transparent to-75% lg:block" />
            <div className="absolute inset-0 bg-white/80 lg:hidden" />

            {/* Content, aligned with the navbar container */}
            <div className="relative mx-auto flex h-full max-w-[1320px] flex-col justify-center px-5 py-12 sm:py-16 md:px-8 lg:py-10 xl:px-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-red sm:text-[12px] sm:tracking-[0.16em]">
                    Bath Fittings · Jalandhar, Punjab
                </p>

                <h1 className="mt-4 max-w-[720px] text-[38px] font-extrabold leading-[1.1] tracking-[-0.045em] text-brand-ink sm:mt-6 sm:text-[56px] lg:text-[68px] xl:text-[72px]">
                    Reliable fittings. Made for Indian homes.
                </h1>

                <p className="mt-4 max-w-[560px] text-[15px] leading-[1.6] text-slate-600 sm:mt-6 sm:text-[17px] lg:max-w-[600px] lg:text-[18px]">
                    A complete catalogue of bathroom fittings and fixtures, manufactured in India with clear
                    specifications and dependable finishes.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3.5">
                    <Link
                        to="/collection"
                        className="
                            inline-flex items-center justify-center gap-3
                            rounded-[3px] bg-brand-blue
                            px-5 py-[15px]
                            text-[15px] font-semibold text-white
                            shadow-sm
                            transition-all duration-300 ease-out
                            hover:-translate-y-1 hover:bg-brand-dark hover:text-brand-red hover:shadow-md
                            active:translate-y-0
                        "
                    >
                        <span>Explore the collection</span>
                        <ArrowIcon />
                    </Link>

                    <a
                        href="/catalogue.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            inline-flex items-center justify-center gap-3
                            rounded-[3px] border border-slate-200 bg-white
                            px-5 py-[15px]
                            text-[15px] font-semibold text-brand-blue
                            transition-all duration-300 ease-out
                            hover:-translate-y-1 hover:border-brand-blue hover:bg-brand-sky hover:shadow-md
                            active:translate-y-0
                        "
                    >
                        <DownloadIcon />
                        <span>Download catalogue</span>
                    </a>
                </div>

                {/* Badge: in the flow on mobile */}
                <div className="mt-7 self-start bg-brand-ink px-3.5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white sm:hidden">
                    Made in India · Est. 1975
                </div>
            </div>

            {/* Badge: bottom right on tablet and desktop */}
            <div className="absolute bottom-7 right-8 hidden bg-brand-ink px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-white sm:block lg:right-24">
                Made in India · Est. 1975
            </div>
        </section>
    );
};

export default Slider;