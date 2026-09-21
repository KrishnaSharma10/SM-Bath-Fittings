import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { clearToken } from "../utils/auth";

const AdminLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        clearToken();
        navigate("/login", { replace: true });
    };

    return (
        <div className="min-h-screen bg-brand-page">
            {/* Full-width top bar: logo on the left, Log out on the right */}
            <header className="border-b border-slate-200 bg-white">
                <div className="flex items-center justify-between gap-4 px-5 py-5 sm:px-10">
                    <Link to="/admin" className="flex items-center gap-3">
                        <img src={assets.SMlogo} alt="SM Bath Fittings" className="w-32 sm:w-36" />
                        <span className="hidden border-l border-slate-200 pl-3 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-red sm:block">
                            Admin
                        </span>
                    </Link>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="cursor-pointer font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-brand-blue transition-colors duration-200 hover:text-brand-red focus-visible:text-brand-red focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
                    >
                        Log out
                    </button>
                </div>
            </header>

            <main className="mx-auto max-w-[1100px] px-4 py-8 md:px-8 md:py-12">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;