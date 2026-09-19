import React from "react";
import { assets } from "../assets/assets";

const Slider2 = () => {
    return (
        <section className="relative -mx-4 overflow-hidden bg-[#062850] sm:-mx-[1vw] md:-mx-[2vw] lg:-mx-[4vw]">
            <div className="mx-auto flex max-w-[1320px] flex-col justify-center gap-10 px-5 py-12 sm:py-14 md:px-8 lg:min-h-[345px] lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:py-10 xl:px-0">
                {/* Text */}
                <div className="max-w-[720px]">
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-red sm:text-[12px]">
                        Talk to SM Bath Fittings
                    </p>

                    <h2 className="mt-4 text-[40px] font-extrabold leading-[1.02] tracking-[-0.05em] text-white sm:mt-5 sm:text-[60px] lg:text-[68px] xl:text-[72px]">
                        A useful conversation starts here.
                    </h2>

                    <p className="mt-5 max-w-[520px] text-[15px] leading-[1.6] text-sky-100 sm:mt-6 sm:text-[16px]">
                        Tell us what you are working on. We can help with product families, catalogue
                        references and the right point of contact in Jalandhar.
                    </p>
                </div>

                {/* Logo card */}
                <figure className="w-[210px] shrink-0 self-start sm:w-[230px] lg:mr-6 lg:self-center xl:mr-16">
                    <div className="flex aspect-[1.1/1] items-center justify-center border border-white/10 bg-[#2b2826] p-3 shadow-[0_12px_32px_rgba(0,0,0,0.35)]">
                        <img
                            src={assets.SMlogo3}
                            alt="SM Bath Fittings logo"
                            className="h-full w-full object-contain"
                        />
                    </div>
                    <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.1em] text-slate-400">
                        SM Bath Fittings · Jalandhar
                    </figcaption>
                </figure>
            </div>
        </section>
    );
};

export default Slider2;