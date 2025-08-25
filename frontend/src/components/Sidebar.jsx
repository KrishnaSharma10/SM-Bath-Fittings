import React from "react";
import { assets } from "../assets/assets";

const Sidebar = () => {
    return (
        <div className="h-screen w-64 flex flex-col justify-center">
            {/* Logo Section */}
            <div className="p-6 text-center text-2xl font-bold border-b border-gray-700">
                <img src={assets.SMlogo} className="w-48 cursor-pointer" alt="Logo" />
            </div>

            {/* Menu Section */}
            <nav className="flex-1 flex flex-col justify-center space-y-6 px-6">
                <button className="w-full py-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition">
                    Add Collection
                </button>
                <button className="w-full py-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition">
                    Delete Product/Collection
                </button>
                <button className="w-full py-3 rounded-lg bg-gray-200 hover:bg-gray-300 transition">
                    Update Collection
                </button>
            </nav>
        </div>
    );
};

export default Sidebar;
