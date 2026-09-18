import React from "react";
import { Link } from "react-router-dom";

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

const ArrowIcon = ({ className = "" }) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" className={className} aria-hidden="true">
        <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const DownloadCatalog = () => {
    return (
        // Negative margins cancel the horizontal padding in MainLayout so the banner lines up with the navbar.
        <section className="-mx-4 sm:-mx-[1vw] md:-mx-[2vw] lg:-mx-[4vw]">
            <div className="mx-auto max-w-[1320px] px-4 py-14 md:px-8 md:py-20 xl:px-0">
                <div className="flex flex-col gap-8 border-l-[5px] border-brand-red bg-brand-sky px-6 py-10 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:py-14 lg:pl-16 lg:pr-[60px]">
                    {/* Text */}
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-red sm:text-[12px]">
                            For your next project
                        </p>
                        <h2 className="mt-3 max-w-[620px] text-[34px] font-extrabold leading-[1.05] tracking-[-0.05em] text-brand-ink sm:text-[46px] lg:text-[60px]">
                            A catalogue built for decisions.
                        </h2>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3.5">
                        <a
                            href="/catalogue.pdf"
                            download
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
                            <DownloadIcon />
                            <span>Download PDF catalogue</span>
                        </a>

                        <Link
                            to="/contactus"
                            className="
                                group inline-flex items-center justify-center gap-3
                                rounded-[3px] border border-slate-200 bg-white
                                px-5 py-[15px]
                                text-[15px] font-semibold text-brand-blue
                                transition-all duration-300 ease-out
                                hover:-translate-y-1 hover:border-brand-blue hover:bg-brand-sky hover:shadow-md
                                active:translate-y-0
                            "
                        >
                            <span>Contact us</span>
                            <ArrowIcon className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DownloadCatalog;