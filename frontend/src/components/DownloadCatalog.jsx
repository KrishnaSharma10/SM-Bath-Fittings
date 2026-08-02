import React from "react";

const DownloadCatalog = () => {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-4 my-20">
      <style>{`
        @keyframes floatBlob1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -15px) scale(1.1); }
        }
        @keyframes floatBlob2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, 15px) scale(1.15); }
        }
        @keyframes shimmerSweep {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(250%) skewX(-20deg); }
        }
        @keyframes iconPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(196, 145, 63, 0.35); }
          50% { box-shadow: 0 0 0 14px rgba(196, 145, 63, 0); }
        }
        .catalog-blob-1 { animation: floatBlob1 8s ease-in-out infinite; }
        .catalog-blob-2 { animation: floatBlob2 9s ease-in-out infinite; }
        .catalog-shimmer { animation: shimmerSweep 4.5s ease-in-out infinite; }
        .catalog-icon-badge { animation: iconPulse 2.5s ease-in-out infinite; }
      `}</style>

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sky-100 via-sky-50 to-white border border-white/60 px-8 py-14 md:px-16 md:py-16 text-center shadow-xl">
        {/* Floating animated blobs */}
        <div className="catalog-blob-1 absolute -top-10 -right-10 w-56 h-56 bg-brass-300/25 rounded-full blur-3xl" />
        <div className="catalog-blob-2 absolute -bottom-10 -left-10 w-56 h-56 bg-sky-300/40 rounded-full blur-3xl" />

        {/* Shimmer sweep across the card */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="catalog-shimmer absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </div>

        <div className="relative">
          {/* Icon badge */}
          <div className="catalog-icon-badge inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-brass-400 to-brass-500 text-charcoal-900 mb-5 shadow-md">
            <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
              <path d="M6 2h9l5 5v13a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              <path d="M15 2v5h5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              <path d="M9 15l3 3 3-3M12 18v-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <span className="block uppercase tracking-[0.3em] text-xs md:text-sm text-brass-600 font-semibold">
            Full Product Range
          </span>

          <h2 className="barlow-condensed-medium text-3xl md:text-5xl text-charcoal-900 mt-3 mb-4">
            Get Our Complete Catalog
          </h2>

          <p className="opensans text-charcoal-500 max-w-xl mx-auto mb-8 text-sm md:text-base">
            Browse our full range of taps and bath fittings offline —
            specifications, finishes, and dimensions, all in one download.
          </p>

          <a
            href="/catalogue.pdf"
            download
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-brass-500 to-brass-400 text-charcoal-900 text-sm font-semibold rounded-full hover:from-brass-400 hover:to-brass-300 shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
              <path
                d="M12 3v12m0 0l-4-4m4 4l4-4M4 20h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Download Catalog
          </a>
        </div>
      </div>
    </section>
  );
};

export default DownloadCatalog;