import React from "react";
import { assets } from "../assets/assets.js";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="flex items-center justify-between py-5 font-medium font-opensans">
            <img src={assets.SMlogo} className="w-48" alt="" />
            <ul className="hidden sm:flex gap-5 text-sm">

                <NavLink to='/' className="flex flex-col items-center group">
                    {({ isActive }) => (
                        <>
                            <p className="transition duration-200 group-hover:-translate-y-0.5">HOME</p>
                            <hr className={`w-2/4 h-[1.5px] bg-black border-none ${isActive ? "block" : "hidden group-hover:block"}`} />
                        </>
                    )}
                </NavLink>

                <NavLink to='/collection' className="flex flex-col items-center group">
                    {({ isActive }) => (
                        <>
                            <p className="transition duration-200 group-hover:-translate-y-0.5">COLLECTION</p>
                            <hr className={`w-2/4 h-[1.5px] bg-black border-none ${isActive ? "block" : "hidden group-hover:block"}`} />
                        </>
                    )}
                </NavLink>

                <NavLink to='/about' className="flex flex-col items-center group">
                    {({ isActive }) => (
                        <>
                            <p className="transition duration-200 group-hover:-translate-y-0.5">ABOUT US</p>
                            <hr className={`w-2/4 h-[1.5px] bg-black border-none ${isActive ? "block" : "hidden group-hover:block"}`} />
                        </>
                    )}
                </NavLink>

                <NavLink to='/contact' className="flex flex-col items-center group">
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
                    className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition duration-200"
                >
                    View Catalogue pdf
                </a>
            </div>
        </div>
    );
};

export default Navbar;
