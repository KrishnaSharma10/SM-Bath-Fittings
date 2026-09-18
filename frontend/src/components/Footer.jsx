import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const exploreLinks = [
    { to: "/", label: "Home" },
    { to: "/collection", label: "Collection" },
    { to: "/about", label: "About" },
    { to: "/contactus", label: "Contact" },
];

const linkClass = "transition-colors duration-200 hover:text-brand-red";

const Footer = () => {
    return (
        // Negative margins cancel the horizontal padding in MainLayout so the footer runs edge to edge.
        <footer className="-mx-4 mt-16 bg-brand-navy text-brand-mist sm:-mx-[1vw] md:-mx-[2vw] lg:-mx-[4vw]">
            <div className="mx-auto max-w-[1320px] px-5 pt-14 md:px-8 xl:px-0">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.5fr_1fr_0.85fr] lg:gap-8">
                    {/* Brand */}
                    <div>
                        <Link to="/" className="inline-block bg-white p-3">
                            <img src={assets.SMlogo2} alt="SM Valves & Cocks" className="h-20 w-auto" />
                        </Link>
                        <p className="mt-4 max-w-[320px] text-[15px] leading-[1.65]">
                            Dependable bathroom fittings for homes, hospitality and projects across India.
                            Manufactured in Jalandhar, Punjab.
                        </p>
                    </div>

                    {/* Explore */}
                    <div>
                        <h3 className="text-[13px] font-medium uppercase tracking-[0.14em] text-white">Explore</h3>
                        <ul className="mt-6 space-y-2 text-[15px]">
                            {exploreLinks.map(({ to, label }) => (
                                <li key={to}>
                                    <Link to={to} className={linkClass}>
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h3 className="text-[13px] font-medium uppercase tracking-[0.14em] text-white">Connect</h3>
                        <ul className="mt-6 space-y-2 text-[15px]">
                            <li>
                                <a href="tel:+919814062802" className={linkClass}>
                                    +91 98140-62802
                                </a>
                            </li>
                            <li>
                                <a href="mailto:manojsharma1825@gmail.com" className={`${linkClass} break-all`}>
                                    manojsharma1825@gmail.com
                                </a>
                            </li>
                            <li>O-6 Industrial Area, Sodal Road, Jalandhar</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 flex flex-col gap-2 border-t border-white/10 py-6 font-mono text-[11px] tracking-wide text-brand-muted sm:flex-row sm:items-center sm:justify-between">
                    <p>&copy; {new Date().getFullYear()} SM Metal Works. Made in India.</p>
                    <p>For architects, dealers &amp; homeowners</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;