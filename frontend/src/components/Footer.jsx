import React from "react";
import { assets } from "../assets/assets";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className=" py-6 mt-12">
            <div className="w-full flex flex-col gap-8">
                <div className="w-full flex flex-col gap-10 md:flex-row justify-between">
                    <div className="flex flex-col items-center md:flex-row gap-10">
                        <img src={assets.SMlogo2} alt="logo" />
                        <div className="w-72 sm:w-84">
                            <h2 className="text-xl font-semibold mb-2">SM Metal Works</h2>
                            <p className="text-sm text-gray-900">
                                Leading bathroom brass ware manufacturer providing high quality taps, showers,
                                accessories and fittings to customer across the country.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Products</h3>
                            <ul className="text-sm text-gray-900 space-y-1">
                                <li>
                                    <Link to="/" className="hover:underline">Faucets</Link>
                                </li>
                                <li>
                                    <Link to="/" className="hover:underline">Bath Essentials</Link>
                                </li>
                                <li>
                                    <Link to="/" className="hover:underline">Bathroom Sets</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                            <p className="text-sm text-gray-900">O-6 Industrial Area, Sodal Road, Jalandhar</p>
                            <p className="text-sm text-gray-900 mt-1">Phone: +91 98140-62802</p>
                            <p className="text-sm text-gray-900">Email: manojsharma1825@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 border-t border-gray-400 pt-2 text-center text-sm text-gray-800">
                &copy; {new Date().getFullYear()} SM Metal Works. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer;