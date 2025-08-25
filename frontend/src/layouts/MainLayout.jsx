import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
    return (
        <div className='h-screen montserrat bg-gradient-to-b from-white via-blue-200 to-white transition-colors duration-500 px-4 sm:px-[1vw] md:px-[2vw] lg:px-[4vw]'>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default MainLayout;
