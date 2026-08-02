import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation, EffectFade } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { assets } from "../assets/assets";

const slidesData = [
    {
        img: assets.slider1,
        tag: "SM Bath Fittings",
        text1: "Timeless Elegance",
        text2:
            "Discover bath fittings that blend classic design with cutting-edge precision. Designed to elevate every space.",
    },
    {
        img: assets.slider2,
        tag: "New Collection",
        text1: "Your Bathroom, Reimagined",
        text2:
            "Upgrade your space with fittings that reflect elegance, comfort, and precision.",
    },
];

const Slider = () => {
    // Using state (not refs) for nav elements — this is the reliable pattern
    // for swiper/react; refs are often still null when Swiper initializes.
    const [prevEl, setPrevEl] = useState(null);
    const [nextEl, setNextEl] = useState(null);

    return (
        <div className="w-full max-w-[1400px] mx-auto mt-12 px-4">
            <style>{`
                .hero-slider .swiper-pagination-bullet {
                    display: none;
                }
                .hero-pagination {
                    align-items: center;
                }
                .hero-bullet {
                    position: relative;
                    display: inline-block !important;
                    width: 34px;
                    height: 3px;
                    border-radius: 999px;
                    background: rgba(250, 246, 238, 0.25);
                    cursor: pointer;
                    overflow: hidden;
                    opacity: 1 !important;
                    margin: 0 !important;
                    transition: width 0.3s ease;
                }
                .hero-bullet-fill {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(90deg, #a67632, #e3bd7d);
                    transform: scaleX(0);
                    transform-origin: left;
                }
                .swiper-pagination-bullet-active.hero-bullet {
                    width: 48px;
                }
                .swiper-pagination-bullet-active .hero-bullet-fill {
                    animation: heroFillBar 5.5s linear forwards;
                }
                @keyframes heroFillBar {
                    from { transform: scaleX(0); }
                    to { transform: scaleX(1); }
                }
                .hero-text-outline {
                    text-shadow:
                        -2px -2px 0 #171412,
                        2px -2px 0 #171412,
                        -2px 2px 0 #171412,
                        2px 2px 0 #171412,
                        0 4px 18px rgba(0,0,0,0.55);
                }
            `}</style>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                <Swiper
                    modules={[Pagination, Autoplay, Navigation, EffectFade]}
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                    speed={1000}
                    pagination={{
                        clickable: true,
                        el: ".hero-pagination",
                        renderBullet: (index, className) =>
                            `<span class="${className} hero-bullet"><span class="hero-bullet-fill"></span></span>`,
                    }}
                    navigation={{ prevEl, nextEl }}
                    autoplay={{ delay: 5500, disableOnInteraction: false }}
                    loop={true}
                    className="hero-slider w-full h-[420px] md:h-[520px] lg:h-[620px]"
                >
                    {slidesData.map((slide, index) => (
                        <SwiperSlide key={index}>
                            {({ isActive }) => (
                                <div className="relative w-full h-full overflow-hidden">
                                    {/* Image with slow Ken Burns zoom */}
                                    <img
                                        src={slide.img}
                                        alt={slide.text1}
                                        className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
                                            isActive ? "scale-110" : "scale-100"
                                        }`}
                                    />

                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/85 via-charcoal-900/45 to-transparent" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent" />

                                    {/* Content */}
                                    <div className="absolute inset-0 flex flex-col justify-center items-start px-6 sm:px-10 md:px-16 lg:px-24 text-white">
                                        <span
                                            className={`inline-block uppercase tracking-[0.3em] text-[11px] md:text-xs text-charcoal-900 mb-3 font-bold px-3 py-1.5 rounded-full bg-gradient-to-r from-brass-400 to-brass-300 shadow-md transition-all duration-700 delay-100 ${
                                                isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                                            }`}
                                        >
                                            {slide.tag}
                                        </span>

                                        <h2
                                            className={`hero-text-outline barlow-condensed-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-[1.05] transition-all duration-700 delay-200 ${
                                                isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                                            }`}
                                        >
                                            {slide.text1}
                                        </h2>

                                        <p
                                            className={`hero-text-outline opensans text-sm md:text-lg max-w-md md:max-w-xl text-charcoal-100 transition-all duration-700 delay-300 ${
                                                isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                                            }`}
                                        >
                                            {slide.text2}
                                        </p>

                                        <Link
                                            to="/collection"
                                            className={`mt-7 inline-flex items-center gap-2 px-6 py-2.5 bg-brass-400 text-charcoal-900 text-sm font-semibold rounded-full hover:bg-brass-300 shadow-lg hover:-translate-y-0.5 transition-all duration-700 delay-500 ${
                                                isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                                            }`}
                                        >
                                            Explore Collection
                                            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                                                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </Link>
                                    </div>

                                    {/* Slide counter */}
                                    <div className="hero-text-outline absolute bottom-6 right-6 md:right-10 text-cream/70 barlow-condensed-medium text-sm tracking-widest">
                                        <span className="text-brass-300 text-lg">0{index + 1}</span>
                                        <span className="mx-1">/</span>
                                        <span>0{slidesData.length}</span>
                                    </div>
                                </div>
                            )}
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom arrows */}
                <button
                    ref={setPrevEl}
                    aria-label="Previous slide"
                    type="button"
                    className="absolute top-1/2 left-3 md:left-5 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-charcoal-900/40 backdrop-blur-sm border border-cream/20 text-cream flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:bg-brass-400 hover:text-charcoal-900 hover:border-brass-400"
                >
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                        <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <button
                    ref={setNextEl}
                    aria-label="Next slide"
                    type="button"
                    className="absolute top-1/2 right-3 md:right-5 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-charcoal-900/40 backdrop-blur-sm border border-cream/20 text-cream flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 hover:bg-brass-400 hover:text-charcoal-900 hover:border-brass-400"
                >
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                {/* Custom progress-bar pagination */}
                <div className="hero-pagination absolute bottom-6 left-6 md:left-10 z-10 flex gap-2" />
            </div>
        </div>
    );
};

export default Slider;