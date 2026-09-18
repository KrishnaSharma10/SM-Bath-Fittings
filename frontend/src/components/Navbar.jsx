import React, { useState } from "react";
import { assets } from "../assets/assets.js";
import { NavLink } from "react-router-dom";

const links = [
    { to: "/", label: "Home", end: true },
    { to: "/collection", label: "Collection" },
    { to: "/about", label: "About" },
    { to: "/contactus", label: "Contact" },
];

const DownloadIcon = ({ className = "" }) => (
    <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
    >
        <path d="M12 3v11" />
        <path d="m7.5 10 4.5 4.5 4.5-4.5" />
        <path d="M4 15v3.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V15" />
    </svg>
);

const Navbar = () => {
    const [visible, setvisible] = useState(false);

    return (
        <header className="relative bg-white">
            <div className="mx-auto flex max-w-[1320px] items-center justify-between px-4 py-5 md:px-8 xl:px-0">
                {/* Logo */}
                <NavLink to="/" className="shrink-0">
                    <img src={assets.SMlogo} className="w-44 cursor-pointer sm:w-56" alt="SM Bath Fittings, Valves & Cocks" />
                </NavLink>

                {/* Right side: links + button */}
                <div className="flex items-center gap-8">
                    <nav className="hidden items-center gap-8 sm:flex">
                        {links.map(({ to, label, end }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={end}
                                className={({ isActive }) =>
                                    `text-[15px] font-medium transition-colors duration-200 hover:text-brand-red ${
                                        isActive ? "text-brand-red" : "text-slate-600"
                                    }`
                                }
                            >
                                {label}
                            </NavLink>
                        ))}
                    </nav>

                    <a
                        href="/catalogue.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            hidden sm:flex
                            items-center gap-2.5
                            rounded-[3px]
                            bg-brand-blue
                            px-5 py-3
                            text-[14px] font-semibold text-white
                            shadow-sm
                            transition-all duration-300 ease-out
                            hover:bg-brand-dark
                            hover:text-brand-red
                            hover:-translate-y-1
                            hover:shadow-md
                            active:translate-y-0
                        "
                    >
                        <DownloadIcon className="transition-colors duration-300 ease-out" />
                        <span>Download Catalogue</span>
                    </a>

                    <img
                        onClick={() => setvisible(true)}
                        src={assets.menuicon}
                        className="w-5 cursor-pointer sm:hidden"
                        alt="Open menu"
                    />
                </div>
            </div>

            {/* Mobile drawer */}
            <div
                className={`fixed inset-0 z-50 bg-white transition-transform duration-300 ease-in-out ${
                    visible ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex flex-col text-slate-700">
                    <div onClick={() => setvisible(false)} className="flex cursor-pointer items-center gap-4 p-4">
                        <img className="h-4 rotate-180" src={assets.dropdownicon} alt="" />
                        <p className="text-[15px] font-medium">Back</p>
                    </div>

                    {links.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            onClick={() => setvisible(false)}
                            to={to}
                            end={to === "/"}
                            className={({ isActive }) =>
                                `border-b border-slate-100 py-3 pl-6 text-[15px] font-medium ${
                                    isActive ? "text-brand-red" : ""
                                }`
                            }
                        >
                            {label}
                        </NavLink>
                    ))}

                    <a
                        href="/catalogue.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="m-6 flex items-center justify-center gap-3 rounded-[3px] bg-brand-blue px-6 py-3.5 text-[15px] font-semibold text-white"
                    >
                        <DownloadIcon />
                        <span>Download Catalogue</span>
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Navbar;