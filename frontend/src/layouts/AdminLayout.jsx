import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { clearToken } from "../utils/auth";

/**
 * Frame for every admin page: a top bar with Log out, and the page itself below it.
 * The pages are rendered through <Outlet />, so App.jsx uses <AdminLayout /> with child routes.
 */
const AdminLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        clearToken();
        navigate("/login", { replace: true });
    };

    return (
        <div className="min-h-screen bg-brand-page">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-4 px-4 py-3.5 md:px-8">
                    <Link to="/admin" className="flex items-center gap-3">
                        <img src={assets.SMlogo} alt="SM Bath Fittings" className="w-32 sm:w-40" />
                        <span className="hidden border-l border-slate-200 pl-3 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-red sm:block">
                            Admin
                        </span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <Link
                            to="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden text-[13px] font-semibold text-brand-blue transition-colors duration-200 hover:text-brand-red sm:block"
                        >
                            View website
                        </Link>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="rounded-[3px] border border-slate-300 bg-white px-4 py-2 text-[13px] font-semibold text-brand-ink transition-colors duration-200 hover:border-brand-blue hover:bg-brand-sky"
                        >
                            Log out
                        </button>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-[1100px] px-4 py-8 md:px-8 md:py-12">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;