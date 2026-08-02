import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const stats = [
    { value: "15+", label: "Years of Experience" },
    { value: "500+", label: "Dealers Nationwide" },
    { value: "1000+", label: "Products Delivered" },
    { value: "50k+", label: "Happy Customers" },
];

const values = [
    {
        title: "Quality First",
        text: "Every product goes through rigorous quality checks before it leaves our facility.",
    },
    {
        title: "Honest Craftsmanship",
        text: "We believe in building fittings that last, not ones that need replacing every year.",
    },
    {
        title: "Customer Focused",
        text: "From dealers to homeowners, we listen first and design around real needs.",
    },
];

const AboutUs = () => {
    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative w-full h-[320px] md:h-[420px] overflow-hidden">
                <img
                    src={assets.aboutHero}
                    alt="SM Metal Works Workshop"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-charcoal-900/70 flex flex-col items-center justify-center text-center px-4">
                    <span className="uppercase tracking-[0.3em] text-xs md:text-sm text-brass-300 font-semibold mb-3">
                        Our Story
                    </span>
                    <h1 className="barlow-condensed-medium text-4xl md:text-6xl text-cream font-bold">
                        About SM Metal Works
                    </h1>
                    <p className="opensans text-charcoal-100 max-w-xl mt-4 text-sm md:text-base">
                        Crafting bath fittings that combine precision engineering with timeless design.
                    </p>
                </div>
            </section>

            {/* Our Story */}
            <section className="max-w-[1400px] mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <span className="uppercase tracking-[0.3em] text-xs md:text-sm text-brass-600 font-semibold">
                        Who We Are
                    </span>
                    <h2 className="barlow-condensed-medium text-3xl md:text-4xl text-charcoal-900 mt-2 mb-5 brass-underline inline-block">
                        Built on Precision, Driven by Design
                    </h2>
                    <p className="opensans text-charcoal-500 leading-relaxed mb-4 text-sm md:text-base">
                        Founded with a simple goal — to bring high-quality, precision-engineered
                        taps and bath fittings to every Indian home — SM Metal Works has spent
                        years perfecting the craft of brass fitting manufacturing.
                    </p>
                    <p className="opensans text-charcoal-500 leading-relaxed text-sm md:text-base">
                        Today, our products are trusted by dealers, architects, and homeowners
                        across the country, combining durable materials with designs that suit
                        every kind of bathroom — from minimal modern spaces to classic interiors.
                    </p>
                </div>

                <div className="relative">
                    <img
    src="https://placehold.co/900x700/e7e4e1/453e39?text=Our+Workshop"
    alt="Our Workshop"
    className="w-full h-[320px] md:h-[400px] object-cover rounded-2xl shadow-xl"
/>
                    <div className="absolute -bottom-6 -left-6 bg-charcoal-900 text-cream px-6 py-4 rounded-xl shadow-lg hidden sm:block">
                        <p className="barlow-condensed-medium text-2xl text-brass-300">15+ Years</p>
                        <p className="opensans text-xs text-charcoal-300">of Craftsmanship</p>
                    </div>
                </div>
            </section>

            {/* Stats Row */}
            <section className="w-full bg-charcoal-900 py-14">
                <div className="max-w-[1400px] mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, index) => (
                        <div key={index}>
                            <p className="barlow-condensed-medium text-3xl md:text-5xl text-brass-300 font-bold">
                                {stat.value}
                            </p>
                            <p className="opensans text-xs md:text-sm text-charcoal-300 mt-2 uppercase tracking-widest">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Our Values */}
            <section className="max-w-[1400px] mx-auto px-4 py-20">
                <div className="text-center mb-14">
                    <span className="uppercase tracking-[0.3em] text-xs md:text-sm text-brass-600 font-semibold">
                        What Drives Us
                    </span>
                    <h2 className="barlow-condensed-medium text-3xl md:text-5xl text-charcoal-900 mt-2">
                        Our Core Values
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    {values.map((value, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-sky-100 via-sky-50 to-white border border-white/50 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brass-400 to-brass-500 text-charcoal-900 flex items-center justify-center mb-4 font-bold barlow-condensed-medium">
                                {index + 1}
                            </div>
                            <h3 className="barlow-condensed-medium text-xl text-charcoal-900 mb-2">
                                {value.title}
                            </h3>
                            <p className="opensans text-sm text-charcoal-500 leading-relaxed">
                                {value.text}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-[1400px] mx-auto px-4 pb-20">
                <div className="rounded-2xl bg-gradient-to-r from-charcoal-900 via-charcoal-800 to-charcoal-900 px-8 py-14 md:px-16 text-center shadow-2xl">
                    <h2 className="barlow-condensed-medium text-3xl md:text-4xl text-cream mb-4">
                        Explore Our Full Range of Bath Fittings
                    </h2>
                    <p className="opensans text-charcoal-300 max-w-xl mx-auto mb-8 text-sm md:text-base">
                        From taps to accessories, discover fittings designed to last a lifetime.
                    </p>
                    <Link
                        to="/collection"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-brass-400 text-charcoal-900 text-sm font-semibold rounded-full hover:bg-brass-300 shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                    >
                        View Collection
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;