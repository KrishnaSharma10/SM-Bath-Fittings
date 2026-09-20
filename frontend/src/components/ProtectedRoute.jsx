import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { verifySession } from "../api/AdminApi";
import { getToken, clearToken } from "../utils/auth";

/**
 * Wraps the admin area. Checks the token with the server once when you enter /admin.
 * (The real protection is on the backend. This only decides what the admin gets to see.)
 */
const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const [status, setStatus] = useState(getToken() ? "checking" : "denied"); // checking | ok | denied | offline
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        if (!getToken()) return;
        let cancelled = false;
        setStatus("checking");

        verifySession()
            .then(() => !cancelled && setStatus("ok"))
            .catch((err) => {
                if (cancelled) return;
                if (err.response) {
                    // The server answered and refused the token
                    clearToken();
                    setStatus("denied");
                } else {
                    // The server could not be reached, so don't log the admin out
                    setStatus("offline");
                }
            });

        return () => {
            cancelled = true;
        };
    }, [attempt]);

    if (status === "checking") {
        return (
            <div className="flex min-h-screen items-center justify-center bg-brand-page">
                <p className="font-mono text-[12px] tracking-wide text-slate-500">Checking session...</p>
            </div>
        );
    }

    if (status === "offline") {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-brand-page px-4 text-center">
                <p className="text-[15px] text-slate-600">Cannot reach the server right now.</p>
                <button
                    type="button"
                    onClick={() => setAttempt((n) => n + 1)}
                    className="rounded-[3px] bg-brand-blue px-5 py-3 text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-brand-dark"
                >
                    Try again
                </button>
            </div>
        );
    }

    if (status === "denied") {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    return children;
};

export default ProtectedRoute;