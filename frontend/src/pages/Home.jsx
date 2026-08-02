import React from "react";
import Slider from "../components/Slider";
import FeaturedCategories from "../components/FeaturedCategories";
import WhyChooseUs from "../components/WhyChooseUs";
import DownloadCatalog from "../components/DownloadCatalog";

const Home = () => {
    return (
        <div>
            <Slider />
            <FeaturedCategories />
            <WhyChooseUs />
            <DownloadCatalog />
        </div>
    );
};

export default Home;