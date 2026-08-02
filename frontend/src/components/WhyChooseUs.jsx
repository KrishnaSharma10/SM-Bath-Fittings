import React from "react";

const features = [
    {
        title: "Premium Grade Brass",
        text: "Every tap is crafted from high-grade, corrosion-resistant brass built to withstand years of daily use without losing shine or performance.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
                <path d="M12 2L4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        title: "Precision Engineering",
        text: "Every fitting is machined to tight tolerances for a smooth flow, leak-free joints, and a lasting seal you can rely on.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009.6 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 005.28 15a1.65 1.65 0 00-1.51-1H3.7a2 2 0 110-4h.09A1.65 1.65 0 005.28 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009.6 4.68a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9c.14.4.4.75.75 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="1.2" />
            </svg>
        ),
    },
    {
        title: "Wide Design Range",
        text: "From minimal modern to classic finishes, our range covers every bathroom style, size, and budget.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
                <rect x="3" y="3" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
                <rect x="14" y="3" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
                <rect x="3" y="14" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
                <rect x="14" y="14" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
            </svg>
        ),
    },
    {
        title: "Water-Efficient Flow",
        text: "Engineered aerators and cartridges reduce water wastage without compromising on pressure or comfort.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
                <path d="M12 3s6 6.5 6 11a6 6 0 11-12 0c0-4.5 6-11 6-11z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        title: "Warranty & Support",
        text: "Every product is backed by a solid warranty and a responsive after-sales team ready to assist dealers and homeowners alike.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
                <path d="M12 2l7 3v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V5l7-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        title: "Trusted Nationwide",
        text: "Stocked and recommended by dealers and plumbing professionals across the country for consistent quality.",
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
                <path d="M12 21c4.5-3 8-7 8-11.5A8 8 0 004 9.5C4 14 7.5 18 12 21z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.6" />
            </svg>
        ),
    },
];

const WhyChooseUs = () => {
    return (
        <section className="w-full bg-charcoal-900 mt-24 py-20">
            <div className="max-w-[1400px] mx-auto px-4">
                <div className="text-center mb-14">
                    <span className="uppercase tracking-[0.3em] text-xs md:text-sm text-brass-300 font-semibold">
                        Why SM Metal Works
                    </span>
                    <h2 className="barlow-condensed-medium text-3xl md:text-5xl text-cream mt-2">
                        Built for Bathrooms That Last
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-sky-100 via-sky-50 to-white border border-white/40 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brass-400 to-brass-500 text-charcoal-900 flex items-center justify-center mb-4 shadow-md">
                                {feature.icon}
                            </div>
                            <h3 className="barlow-condensed-medium text-xl text-charcoal-900 mb-2">
                                {feature.title}
                            </h3>
                            <p className="opensans text-sm text-charcoal-500 leading-relaxed">
                                {feature.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;