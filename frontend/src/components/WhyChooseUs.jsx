import React from "react";

const points = [
    {
        title: "Material first",
        text: "Reliable brass bodies, tested components and finishes selected for everyday use.",
    },
    {
        title: "Built in Punjab",
        text: "A family-led manufacturing practice with decades of hands-on knowledge.",
    },
    {
        title: "Easy to specify",
        text: "Clear product codes and rates for architects, dealers and homeowners.",
    },
];

const WhyChooseUs = () => {
    return (
        // Negative margins cancel the horizontal padding in MainLayout so the blue band runs edge to edge.
        <section className="-mx-4 bg-brand-blue sm:-mx-[1vw] md:-mx-[2vw] lg:-mx-[4vw]">
            <div className="mx-auto max-w-[1320px] px-4 py-16 md:px-8 md:py-24 xl:px-0">
                {/* Heading */}
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-amber sm:text-[12px]">
                    Why SM Bath Fittings
                </p>
                <h2 className="mt-3 max-w-[720px] text-[38px] font-extrabold leading-[1.05] tracking-[-0.05em] text-white sm:text-[52px] lg:text-[64px]">
                    Built for the work
                    <br className="hidden sm:block" /> a bathroom has to do.
                </h2>

                {/* Points */}
                <div className="mt-12 grid grid-cols-1 gap-10 md:mt-16 md:grid-cols-3 md:gap-10">
                    {points.map(({ title, text }, index) => (
                        <div
                            key={title}
                            className="border-t border-white/25 pt-7 transition-colors duration-300 hover:border-white/70"
                        >
                            <h3 className="text-[20px] font-bold tracking-[-0.01em] text-white">
                                {String(index + 1).padStart(2, "0")} · {title}
                            </h3>
                            <p className="mt-4 max-w-[420px] text-[14px] leading-[1.9] text-white/75">{text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;