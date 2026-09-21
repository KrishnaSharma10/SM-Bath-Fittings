import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

/* Shared building blocks for the admin pages */

const labelClass =
    "block font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-brand-ink sm:text-[11px]";

// Input, select and textarea share one look. Pass hasError to turn the border red.
export const inputClass = (hasError = false) =>
    `w-full rounded-[3px] border bg-slate-50/70 px-4 py-3.5 text-[15px] text-brand-ink outline-none transition-colors duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:bg-white focus:ring-2 ${
        hasError
            ? "border-brand-red focus:border-brand-red focus:ring-brand-red/15"
            : "border-slate-200 focus:border-brand-blue focus:ring-brand-blue/15"
    }`;

export const primaryButtonClass =
    "rounded-[3px] bg-brand-blue px-5 py-3.5 text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60";

export const secondaryButtonClass =
    "rounded-[3px] border border-slate-300 bg-white px-5 py-3.5 text-[14px] font-semibold text-brand-ink transition-colors duration-200 hover:border-brand-blue hover:bg-brand-sky disabled:cursor-not-allowed disabled:opacity-60";

export const dangerButtonClass =
    "rounded-[3px] border border-brand-red/40 bg-white px-5 py-3.5 text-[14px] font-semibold text-brand-red transition-colors duration-200 hover:border-brand-red hover:bg-brand-red hover:text-white disabled:cursor-not-allowed disabled:opacity-60";

/** Admin / Add a collection */
export const Breadcrumb = ({ items }) => (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 font-mono text-[11px]">
        {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
                <React.Fragment key={`${item.label}-${i}`}>
                    {item.to && !isLast ? (
                        <Link
                            to={item.to}
                            className="font-bold text-brand-blue transition-colors duration-200 hover:text-brand-red"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span className="text-slate-500" aria-current={isLast ? "page" : undefined}>
                            {item.label}
                        </span>
                    )}
                    {!isLast && (
                        <span className="text-slate-400" aria-hidden="true">
                            &gt;
                        </span>
                    )}
                </React.Fragment>
            );
        })}
    </nav>
);

/** Page heading used at the top of every admin page */
export const PageHeader = ({ eyebrow, title, text }) => (
    <header>
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-brand-red">{eyebrow}</p>
        <h1 className="mt-2 text-[36px] font-extrabold leading-[1.05] tracking-[-0.05em] text-brand-ink sm:text-[48px]">
            {title}
        </h1>
        {text && <p className="mt-3 text-[15px] leading-[1.6] text-slate-500">{text}</p>}
    </header>
);

/** Success or error banner */
export const Notice = ({ type = "error", children }) => (
    <p
        role={type === "error" ? "alert" : "status"}
        className={`border px-4 py-3 text-[14px] leading-[1.5] ${
            type === "error"
                ? "border-brand-red/30 bg-brand-red/5 text-brand-red"
                : "border-emerald-300 bg-emerald-50 text-emerald-800"
        }`}
    >
        {children}
    </p>
);

/** Label + field + error text. Give the input the same id, and aria-describedby={`${id}-error`} when it has an error. */
export const Field = ({ id, label, required = false, error, hint, className = "", children }) => (
    <div className={className}>
        <label htmlFor={id} className={labelClass}>
            {label}
            {required && (
                <span className="ml-1.5 text-brand-red" aria-hidden="true">
                    *
                </span>
            )}
        </label>
        <div className="mt-2">{children}</div>
        {error ? (
            <p id={`${id}-error`} className="mt-2 text-[13px] font-medium text-brand-red">
                {error}
            </p>
        ) : (
            hint && <p className="mt-2 text-[13px] leading-[1.5] text-slate-500">{hint}</p>
        )}
    </div>
);

export const ChevronDown = () => (
    <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
        aria-hidden="true"
    >
        <path d="m6 9 6 6 6-6" />
    </svg>
);

/**
 * "Are you sure?" box for deleting things. Cancel is focused first, Esc and the backdrop cancel.
 * Pass the explanation as children.
 */
export const ConfirmDialog = ({
    open,
    title,
    children,
    confirmLabel = "Yes, delete",
    busyLabel = "Deleting...",
    busy = false,
    error = "",
    onConfirm,
    onCancel,
}) => {
    const cancelRef = useRef(null);

    // Lock page scroll while open, focus Cancel, and return focus to the button that opened it
    useEffect(() => {
        if (!open) return;
        const trigger = document.activeElement;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        cancelRef.current?.focus();
        return () => {
            document.body.style.overflow = previousOverflow;
            trigger?.focus?.();
        };
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => {
            if (e.key === "Escape" && !busy) onCancel();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, busy, onCancel]);

    if (!open) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-navy/70 p-4"
            onClick={() => !busy && onCancel()}
        >
            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="confirm-title"
                aria-describedby="confirm-text"
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-[460px] border border-slate-200 border-t-[3px] border-t-brand-red bg-white p-7 shadow-2xl"
            >
                <h2 id="confirm-title" className="text-[24px] font-extrabold leading-tight tracking-[-0.03em] text-brand-ink">
                    {title}
                </h2>
                <div id="confirm-text" className="mt-3 text-[15px] leading-[1.6] text-slate-600">
                    {children}
                </div>

                {error && (
                    <div className="mt-4">
                        <Notice type="error">{error}</Notice>
                    </div>
                )}

                <div className="mt-7 flex flex-wrap items-center gap-3">
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={busy}
                        className="rounded-[3px] bg-brand-red px-5 py-3.5 text-[14px] font-semibold text-white transition-[filter] duration-200 hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {busy ? busyLabel : confirmLabel}
                    </button>
                    <button ref={cancelRef} type="button" onClick={onCancel} disabled={busy} className={secondaryButtonClass}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};