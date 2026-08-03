import React from "react";

const Contact = () => {
    return (
        <div className="w-full">
            {/* Header */}
            <div className="text-center pt-14 md:pt-20 pb-4 px-4">
                <span className="uppercase tracking-[0.3em] text-xs md:text-sm text-brass-600 font-semibold">
                    Get In Touch
                </span>
                <h2 className="barlow-condensed-medium text-3xl md:text-5xl text-charcoal-900 mt-2 brass-underline inline-block">
                    Contact Us
                </h2>
            </div>

            <div className="w-full max-w-5xl mx-auto px-4 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-9 md:gap-12 items-start">
                {/* Map */}
                <div className="w-full h-80 md:h-[420px] border border-charcoal-200 rounded-2xl overflow-hidden shadow-xl">
                    <iframe
                        title="Map"
                        src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d851.8069203908888!2d75.56732862634244!3d31.352695735946998!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzHCsDIxJzA5LjYiTiA3NcKwMzQnMDIuNSJF!5e0!3m2!1sen!2sin!4v1751654196945!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>

                {/* Contact Info Cards */}
                <div className="space-y-5">
                    <div className="bg-gradient-to-br from-sky-100 via-sky-50 to-white border border-white/50 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex gap-4">
                        <div className="w-11 h-11 shrink-0 rounded-full bg-gradient-to-br from-brass-400 to-brass-500 text-charcoal-900 flex items-center justify-center shadow-md">
                            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                                <path d="M12 21c4.5-3 8-7 8-11.5A8 8 0 004 9.5C4 14 7.5 18 12 21z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                                <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.6" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="barlow-condensed-medium text-lg text-charcoal-900 mb-1">
                                Address
                            </h3>
                            <p className="opensans text-sm text-charcoal-500 leading-relaxed">
                                SM Metal Works
                                <br />
                                O-6 Industrial Area, Sodal Road, Jalandhar
                            </p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-sky-100 via-sky-50 to-white border border-white/50 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex gap-4">
                        <div className="w-11 h-11 shrink-0 rounded-full bg-gradient-to-br from-brass-400 to-brass-500 text-charcoal-900 flex items-center justify-center shadow-md">
                            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                                <path d="M4 5h2l2.5 5-1.5 1.5a11 11 0 005 5L13.5 15l5 2.5V20a1 1 0 01-1 1C9.5 21 3 14.5 3 6a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="barlow-condensed-medium text-lg text-charcoal-900 mb-1">
                                Phone
                            </h3>
                            <p className="opensans text-sm text-charcoal-500">
                                +91 98140-62802
                            </p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-sky-100 via-sky-50 to-white border border-white/50 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex gap-4">
                        <div className="w-11 h-11 shrink-0 rounded-full bg-gradient-to-br from-brass-400 to-brass-500 text-charcoal-900 flex items-center justify-center shadow-md">
                            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
                                <path d="M3 6.5l9 6 9-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="barlow-condensed-medium text-lg text-charcoal-900 mb-1">
                                Email
                            </h3>
                            <p className="opensans text-sm text-charcoal-500">
                                manojsharma1825@gmail.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;