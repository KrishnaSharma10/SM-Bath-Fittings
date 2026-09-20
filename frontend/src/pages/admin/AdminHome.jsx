import React from "react";
import { Link } from "react-router-dom";

const actions = [
    {
        to: "/admin/collections/new",
        label: "New",
        title: "Add a collection",
        text: "Create a new collection inside a category.",
    },
    {
        to: "/admin/products/new",
        label: "New",
        title: "Add a product",
        text: "Add a product to one of your collections.",
    },
    {
        to: "/admin/collections",
        label: "Manage",
        title: "Edit a collection",
        text: "Change a collection's details, or delete it.",
    },
    {
        to: "/admin/products",
        label: "Manage",
        title: "Edit a product",
        text: "Change a product's details, or delete it.",
    },
];

const AdminHome = () => {
    return (
        <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-red sm:text-[12px]">Admin</p>
            <h1 className="mt-3 text-[32px] font-extrabold leading-[1.05] tracking-[-0.04em] text-brand-ink sm:text-[44px]">
                What would you like to do?
            </h1>

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {actions.map(({ to, label, title, text }) => (
                    <Link
                        key={to}
                        to={to}
                        className="
                            group flex flex-col rounded-[3px]
                            border border-slate-200 border-t-[3px] border-t-brand-blue bg-white p-6
                            shadow-sm
                            transition-[translate,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                            hover:-translate-y-1.5 hover:shadow-[0_18px_36px_-14px_rgba(13,43,94,0.28)]
                            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue
                            motion-reduce:transition-none motion-reduce:hover:translate-y-0
                        "
                    >
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-brand-red">
                            {label}
                        </span>
                        <span className="mt-2 text-[24px] font-extrabold leading-tight tracking-[-0.03em] text-brand-ink">
                            {title}
                        </span>
                        <span className="mt-2 text-[14px] leading-[1.6] text-slate-500">{text}</span>
                        <span className="mt-5 text-[12px] font-bold uppercase tracking-[0.08em] text-brand-blue transition-colors duration-300 group-hover:text-brand-red">
                            Open &rarr;
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default AdminHome;