import React from "react";
import { assets } from "../assets/assets";

const Sidebar = () => {
    return (
        <div className="h-screen w-64 flex flex-col justify-between items-center sm:justify-center sm:items-center">
            <div className="p-6 text-center text-2xl font-bold border-b border-gray-700 w-full">
                Admin Panel
            </div>

            <nav className="flex-1 flex flex-col justify-center space-y-6 px-6">
                <button className="w-full py-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition cursor-pointer">
                    Add Collection
                </button>
                <button className="w-full py-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition cursor-pointer">
                    Update Collection
                </button>
                <button className="w-full py-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition cursor-pointer">
                    Delete Product/Collection
                </button>
            </nav>

            <div className="p-6">
                <img src={assets.SMlogo} className="w-32 cursor-pointer" alt="Logo" />
            </div>
        </div>
    );
};

export default Sidebar;
