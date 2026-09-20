import React, { useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { login, errorMessage } from "../api/AdminApi";
import { setToken } from "../utils/auth";

const inputClass =
    "mt-1.5 w-full rounded-[3px] border border-slate-300 bg-white px-3.5 py-3 text-[15px] text-brand-ink outline-none transition-colors duration-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const expired = searchParams.get("expired") === "1";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        setError("");
        setLoading(true);
        try {
            const { token } = await login(username.trim(), password);
            setToken(token);

            // Go back to the admin page they were trying to open, otherwise the admin home
            const from = location.state?.from;
            navigate(typeof from === "string" && from.startsWith("/admin") ? from : "/admin", { replace: true });
        } catch (err) {
            const status = err.response?.status;
            if (status === 401) setError("Wrong username or password.");
            else if (status === 429) setError("Too many attempts. Please wait a few minutes and try again.");
            else setError(errorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-brand-page px-4 py-10">
            <div className="w-full max-w-[400px]">
                <div className="border border-slate-200 border-t-[3px] border-t-brand-blue bg-white p-7 shadow-sm sm:p-9">
                    <img src={assets.SMlogo} alt="SM Bath Fittings" className="w-40" />

                    <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.14em] text-brand-red">Admin</p>
                    <h1 className="mt-2 text-[30px] font-extrabold leading-tight tracking-[-0.04em] text-brand-ink">
                        Sign in
                    </h1>

                    {expired && !error && (
                        <p className="mt-5 bg-brand-sky px-4 py-3 text-[14px] text-brand-ink" role="status">
                            Your session ended. Please sign in again.
                        </p>
                    )}

                    {error && (
                        <p
                            className="mt-5 border border-brand-red/30 bg-brand-red/5 px-4 py-3 text-[14px] text-brand-red"
                            role="alert"
                        >
                            {error}
                        </p>
                    )}

                    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                        <div>
                            <label htmlFor="username" className="text-[13px] font-semibold text-slate-700">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                autoComplete="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={inputClass}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="text-[13px] font-semibold text-slate-700">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`${inputClass} pr-16`}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((v) => !v)}
                                    className="absolute right-3 top-1/2 mt-[3px] -translate-y-1/2 text-[12px] font-semibold text-brand-blue hover:text-brand-red"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-[3px] bg-brand-blue px-5 py-3.5 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </button>
                    </form>
                </div>

                <p className="mt-5 text-center text-[13px]">
                    <Link to="/" className="font-semibold text-brand-blue transition-colors duration-200 hover:text-brand-red">
                        &larr; Back to website
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;