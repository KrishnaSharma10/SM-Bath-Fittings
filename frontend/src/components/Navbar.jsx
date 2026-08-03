import React, { useState } from "react";
import { assets } from "../assets/assets.js";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const [visible, setvisible] = useState(false);

    return (
        <div className="relative">
            <style>{`
                @keyframes navWaterShimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .nav-water-bg {
                    background: linear-gradient(120deg, #ffffff 0%, #eaf4fb 50%, #ffffff 100%);
                }
                .nav-water-shimmer {
                    animation: navWaterShimmer 10s ease-in-out infinite;
                }
            `}</style>

            <div className="nav-water-bg relative flex items-center justify-between py-5 px-4 md:px-8 font-medium sm:relative overflow-hidden border-b border-sky-100 shadow-sm">
                {/* Shimmer sweep */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="nav-water-shimmer absolute top-0 left-0 h-full w-1/4 bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                </div>

                <NavLink to='/' className="relative z-10">
                    <img src={assets.SMlogo} className="w-48 cursor-pointer" alt="Logo" />
                </NavLink>

                <ul className="relative z-10 hidden sm:flex gap-5 text-sm text-gray-700">

                    <NavLink to='/' className="flex flex-col items-center gap-1 group">
                        {({ isActive }) => (
                            <>
                                <p className="transition duration-200 group-hover:-translate-y-0.5">HOME</p>
                                <hr className={`w-2/4 h-[1.5px] bg-sky-500 border-none ${isActive ? "block" : "hidden group-hover:block"}`} />
                            </>
                        )}
                    </NavLink>

                    <NavLink to='/collection' end={false} className="flex flex-col items-center gap-1 group">
                        {({ isActive }) => (
                            <>
                                <p className="transition duration-200 group-hover:-translate-y-0.5">COLLECTION</p>
                                <hr className={`w-2/4 h-[1.5px] bg-sky-500 border-none ${isActive ? "block" : "hidden group-hover:block"}`} />
                            </>
                        )}
                    </NavLink>

                    <NavLink to='/about' className="flex flex-col items-center gap-1 group">
                        {({ isActive }) => (
                            <>
                                <p className="transition duration-200 group-hover:-translate-y-0.5">ABOUT</p>
                                <hr className={`w-2/4 h-[1.5px] bg-sky-500 border-none ${isActive ? "block" : "hidden group-hover:block"}`} />
                            </>
                        )}
                    </NavLink>

                    <NavLink to='/contactus' className="flex flex-col items-center gap-1 group">
                        {({ isActive }) => (
                            <>
                                <p className="transition duration-200 group-hover:-translate-y-0.5">CONTACT</p>
                                <hr className={`w-2/4 h-[1.5px] bg-sky-500 border-none ${isActive ? "block" : "hidden group-hover:block"}`} />
                            </>
                        )}
                    </NavLink>

                </ul>

                <div className="relative z-10 flex items-center">
                    <a
                        href="/catalogue.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full border border-transparent text-sky-900 bg-gradient-to-r from-sky-200 to-sky-100 hover:from-sky-300 hover:to-sky-200 shadow hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                    >
                        <span>CATALOGUE</span>
                        <svg
                            viewBox="0 0 256 256"
                            height="18"
                            width="18"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-sky-900"
                            fill="currentColor"
                        >
                            <path d="M74.34 85.66a8 8 0 0 1 11.32-11.32L120 108.69V24a8 8 0 0 1 16 0v84.69l34.34-34.35a8 8 0 0 1 11.32 11.32l-48 48a8 8 0 0 1-11.32 0ZM240 136v64a16 16 0 0 1-16 16H32a16 16 0 0 1-16-16v-64a16 16 0 0 1 16-16h52.4a4 4 0 0 1 2.83 1.17L111 145a24 24 0 0 0 34 0l23.8-23.8a4 4 0 0 1 2.8-1.2H224a16 16 0 0 1 16 16m-40 32a12 12 0 1 0-12 12a12 12 0 0 0 12-12" />
                        </svg>
                    </a>

                    <img
                        onClick={() => setvisible(true)}
                        src={assets.menuicon}
                        className="w-5 cursor-pointer sm:hidden"
                        alt=""
                    />
                </div>

                <div className={`fixed inset-0 z-50 nav-water-bg transition-transform duration-300 ease-in-out ${visible ? "translate-x-0" : "translate-x-full"
                    }`}>
                    <div className="flex flex-col text-gray-700">
                        <div onClick={() => setvisible(false)} className="flex items-center gap-4 p-3">
                            <img className="h-4 rotate-180" src={assets.dropdownicon} alt="" />
                            <p>Back</p>
                        </div>
                        <NavLink onClick={() => { setvisible(false) }} to='/' className="py-2 pl-6 border border-sky-100">HOME</NavLink>
                        <NavLink onClick={() => { setvisible(false) }} to='/collection' className="py-2 pl-6 border border-sky-100">COLLECTION</NavLink>
                        <NavLink onClick={() => { setvisible(false) }} to='/about' className="py-2 pl-6 border border-sky-100">ABOUT US</NavLink>
                        <NavLink onClick={() => { setvisible(false) }} to='/contactus' className="py-2 pl-6 border border-sky-100">CONTACT US</NavLink>
                        <a
                            href="/catalogue.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-2 pl-6 border-b border-sky-100 bg-sky-100 text-sky-900"
                        >
                            VIEW CATALOGUE PDF
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;