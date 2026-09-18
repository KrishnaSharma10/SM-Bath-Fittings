import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-brand-page">
            {/* Full-width navbar, no side padding */}
            <Navbar />

            {/* Side padding applies only to page content. Hero and footer cancel it with negative margins. */}
            <div className="px-4 sm:px-[1vw] md:px-[2vw] lg:px-[4vw]">
                <main>{children}</main>
                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;