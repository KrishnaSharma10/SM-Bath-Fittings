import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { assets } from "../assets/assets";

const slidesData = [
    {
        img: assets.slider1,
        text1: "Timeless Elegance",
        text2:
            "Discover bath fittings that blend classic design with cutting-edge precision. Designed to elevate every space.",
    },
    {
        img: assets.slider2,
        text1: "Your Bathroom, Reimagined",
        text2:
            "Upgrade your space with fittings that reflect elegance, comfort, and precision.",
    },
];

/*  const Slider = () => {
    const swiperwrappedref = useRef(null);

    function adjustmargin() {
        const screenwidth = window.innerWidth;
        if (swiperwrappedref.current) {
            swiperwrappedref.current.style.marginLeft =
                screenwidth <= 520
                    ? "0px"
                    : screenwidth <= 650
                        ? "-50px"
                        : screenwidth <= 800
                            ? "-100px"
                            : "-150px";
        }
    }

    useEffect(() => {
        adjustmargin();
        window.addEventListener("resize", adjustmargin);
        return () => window.removeEventListener("resize", adjustmargin);
    }, []);

    return (
        <div className="mt-10 flex items-center justify-center w-full overflow-hidden">
            <div className="w-[90%] md:w-[80%]">
                <Swiper
                    className="w-full"
                    modules={[Pagination]}
                    grabCursor
                    initialSlide={1}
                    centeredSlides
                    slidesPerView="auto"
                    speed={800}
                    slideToClickedSlide
                    pagination={{ clickable: true }}
                    breakpoints={{
                        320: { spaceBetween: 20 },
                        640: { spaceBetween: 30 },
                        1024: { spaceBetween: 40 },
                    }}
                    onSwiper={(swiper) => {
                        swiperwrappedref.current = swiper.wrapperEl;
                    }}
                >
                    {slidesData.map((slide, index) => (
                        <SwiperSlide
                            key={index}
                            className="relative w-[300px] sm:w-[360px] h-[480px] rounded-xl overflow-hidden shadow-lg group transition duration-700"
                        >
                            <img
                                src={slide.img}
                                alt={slide.text1}
                                className="w-full h-full object-cover"
                            />

                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-500 flex flex-col justify-end p-6 text-white">
                                <h2 className="text-xl font-semibold mb-2">{slide.text1}</h2>
                                <p className="text-sm mb-4">{slide.text2}</p>
                                <button className="self-start px-4 py-2 bg-white text-black text-sm rounded hover:bg-orange-500 hover:text-white transition">
                                    Explore
                                </button>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};*/

const Slider = () => {
    return (
        <div className="w-full max-w-[1400px] mx-auto mt-12 px-4">
            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                loop={true}
                spaceBetween={20}
                slidesPerView={1}
                className="rounded-xl overflow-hidden"
            >
                {slidesData.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
                            <img
                                src={slide.img}
                                alt={slide.heading}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start px-6 md:px-16 lg:px-24 text-white">
                                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
                                    {slide.heading}
                                </h2>
                                <p className="text-sm md:text-lg max-w-xl drop-shadow-md">
                                    {slide.subheading}
                                </p>
                                <button className="mt-6 px-5 py-2 bg-white text-black text-sm rounded hover:bg-orange-500 hover:text-white transition duration-300">
                                    Explore Collection
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Slider;
