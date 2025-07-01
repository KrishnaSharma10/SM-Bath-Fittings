import React, { useState } from "react";
import { assets } from "../assets/assets.js";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const [visible, setvisible] = useState(false);

    return (
        <div className="flex items-center justify-between py-5 font-medium font-opensans">
            <img src={assets.SMlogo} className="w-48" alt="" />
            <ul className="hidden sm:flex gap-5 text-sm">

                <NavLink to='/' className="flex flex-col items-center gap-1 group">
                    {({ isActive }) => (
                        <>
                            <p className="transition duration-200 group-hover:-translate-y-0.5">HOME</p>
                            <hr className={`w-2/4 h-[1.5px] bg-black border-none ${isActive ? "block" : "hidden group-hover:block"}`} />
                        </>
                    )}
                </NavLink>

                <NavLink to='/collection' className="flex flex-col items-center gap-1 group">
                    {({ isActive }) => (
                        <>
                            <p className="transition duration-200 group-hover:-translate-y-0.5">COLLECTION</p>
                            <hr className={`w-2/4 h-[1.5px] bg-black border-none ${isActive ? "block" : "hidden group-hover:block"}`} />
                        </>
                    )}
                </NavLink>

                <NavLink to='/about' className="flex flex-col items-center gap-1 group">
                    {({ isActive }) => (
                        <>
                            <p className="transition duration-200 group-hover:-translate-y-0.5">ABOUT US</p>
                            <hr className={`w-2/4 h-[1.5px] bg-black border-none ${isActive ? "block" : "hidden group-hover:block"}`} />
                        </>
                    )}
                </NavLink>

                <NavLink to='/contact' className="flex flex-col items-center gap-1 group">
                    {({ isActive }) => (
                        <>
                            <p className="transition duration-200 group-hover:-translate-y-0.5">CONTACT US</p>
                            <hr className={`w-2/4 h-[1.5px] bg-black border-none ${isActive ? "block" : "hidden group-hover:block"}`} />
                        </>
                    )}
                </NavLink>

            </ul>

            <div className="flex items-center">
                <a
                    href="/catalogue.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md border border-transparent text-black bg-red-200 hover:bg-red-300 hover:border-white/50 shadow hover:-translate-y-1 active:translate-y-0 transition-all duration-200"
                >
                    <span>CATALOGUE</span>
                    <svg
                        viewBox="0 0 256 256"
                        height="20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-black"
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

            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className="flex flex-col text-gray-600">
                    <div onClick={() => setvisible(false)} className="flex items-center gap-4 p-3">
                        <img className="h-4 rotate-180" src={assets.dropdownicon} alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => { setvisible(false) }} to='/' className="py-2 pl-6 border">HOME</NavLink>
                    <NavLink onClick={() => { setvisible(false) }} to='/' className="py-2 pl-6 border">COLLECTION</NavLink>
                    <NavLink onClick={() => { setvisible(false) }} to='/' className="py-2 pl-6 border">ABOUT US</NavLink>
                    <NavLink onClick={() => { setvisible(false) }} to='/' className="py-2 pl-6 border">CONTACT US</NavLink>
                    <a
                        href="/catalogue.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 pl-6 border-b bg-red-100 text-black"
                    >
                        VIEW CATALOGUE PDF
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
