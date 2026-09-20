import axios from "axios";
import { getToken, clearToken } from "../utils/auth";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Send the admin token with every request (public pages simply ignore it)
api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// If the server says the token is no longer valid, clear it and go back to the login page.
// A wrong password also returns 401, so the login request itself is skipped.
api.interceptors.response.use(
    (res) => res,
    (err) => {
        const isLoginRequest = err.config?.url?.includes("/auth/login");
        if (err.response?.status === 401 && getToken() && !isLoginRequest) {
            clearToken();
            window.location.assign("/login?expired=1");
        }
        return Promise.reject(err);
    }
);

export default api;