import React from "react";
import Slider2 from "../components/Slider2";
import DownloadCatalog from "../components/DownloadCatalog";

const PhoneIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path
            d="M4 5h2l2.5 5-1.5 1.5a11 11 0 005 5L13.5 15l5 2.5V20a1 1 0 01-1 1C9.5 21 3 14.5 3 6a1 1 0 011-1z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
        />
    </svg>
);

const MailIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3 6.5l9 6 9-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const PinIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path
            d="M12 21c4.5-3 8-7 8-11.5A8 8 0 004 9.5C4 14 7.5 18 12 21z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
        />
        <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
);

const InfoItem = ({ icon, label, children }) => (
    <div className="flex gap-4">
        <div className="mt-0.5 shrink-0 text-brand-red">{icon}</div>
        <div>
            <h3 className="text-[17px] font-medium text-brand-ink">{label}</h3>
            <div className="mt-2 space-y-1 text-[14px] leading-[1.6] text-slate-500">{children}</div>
        </div>
    </div>
);

const Contact = () => {
    return (
        <div className="w-full bg-slate-50">
            <Slider2 />

            <section className="mx-auto max-w-[1320px] px-5 py-14 md:px-8 md:py-20 xl:px-0">
                <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Left: contact details */}
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-red sm:text-[12px]">
                            The direct line
                        </p>

                        <h2 className="mt-4 text-[34px] font-extrabold leading-[1.1] tracking-[-0.04em] text-brand-ink sm:text-[44px] xl:text-[52px]">
                            Let&apos;s make the specification clearer.
                        </h2>

                        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2">
                            <InfoItem icon={<PhoneIcon />} label="Call">
                                <a
                                    href="tel:+919814062802"
                                    className="block font-bold text-brand-blue hover:text-brand-red"
                                >
                                    +91 98140-62802
                                </a>
                                <p>Monday to Saturday, 10:00–18:00</p>
                            </InfoItem>

                            <InfoItem icon={<MailIcon />} label="Email">
                                <a
                                    href="mailto:manojsharma1825@gmail.com"
                                    className="block break-all font-bold text-brand-blue hover:text-brand-red"
                                >
                                    manojsharma1825@gmail.com
                                </a>
                                <p>For catalogues, product questions and project notes</p>
                            </InfoItem>

                            <InfoItem icon={<PinIcon />} label="Address">
                                <p>SM Metal Works</p>
                                <p>O-6 Industrial Area, Sodal Road, Jalandhar</p>
                                <p>Punjab, India</p>
                            </InfoItem>
                        </div>
                    </div>

                    {/* Right: map */}
                    <div className="overflow-hidden border border-brand-ink bg-white shadow-sm">
                        <div className="h-80 w-full md:h-[420px]">
                            <iframe
                                title="SM Bath Fittings location map"
                                src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d851.8069203908888!2d75.56732862634244!3d31.352695735946998!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzHCsDIxJzA5LjYiTiA3NcKwMzQnMDIuNSJF!5e0!3m2!1sen!2sin!4v1751654196945!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>

                        <div className="flex flex-col gap-1 border-t border-brand-ink/20 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-[14px] font-semibold text-brand-ink">
                                SM Bath Fittings · Jalandhar, Punjab
                            </p>
                            <p className="font-mono text-[11px] tracking-[0.06em] text-slate-500">
                                31.3527° N · 75.5673° E
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <DownloadCatalog/>
        </div>
    );
};

export default Contact;