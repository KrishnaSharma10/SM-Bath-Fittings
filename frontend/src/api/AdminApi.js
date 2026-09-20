import api from "./api";

// Backend paths. If your VITE_API_BASE_URL already ends with /api or /api/catalog,
// shorten these two constants so the final URLs still come out right.
const AUTH = "/api/auth";
const CATALOG = "/api/catalog";

/* ---------- Session ---------- */
export const login = async (username, password) => {
    const res = await api.post(`${AUTH}/login`, { username, password });
    return res.data; // { token }
};

export const verifySession = async () => {
    const res = await api.get(`${AUTH}/verify`);
    return res.data; // { ok: true }
};

/* ---------- Categories (for the dropdowns) ---------- */
export const getCategories = async () => {
    const res = await api.get(`${CATALOG}/categories`);
    return res.data;
};

/* ---------- Collections ---------- */
export const listCollections = async ({ category, q } = {}) => {
    const res = await api.get(`${CATALOG}/collections`, {
        params: { category: category || undefined, q: q || undefined },
    });
    return res.data;
};

export const getCollection = async (id) => {
    const res = await api.get(`${CATALOG}/collection/${id}`); // includes productCount
    return res.data;
};

export const createCollection = async (data) => {
    const res = await api.post(`${CATALOG}/collections`, data);
    return res.data;
};

export const updateCollection = async (id, data) => {
    const res = await api.put(`${CATALOG}/collections/${id}`, data);
    return res.data;
};

export const deleteCollection = async (id) => {
    const res = await api.delete(`${CATALOG}/collections/${id}`);
    return res.data;
};

/* ---------- Products ---------- */
export const listProducts = async ({ category, collection, q } = {}) => {
    const res = await api.get(`${CATALOG}/products`, {
        params: { category: category || undefined, collection: collection || undefined, q: q || undefined },
    });
    return res.data;
};

export const getProduct = async (id) => {
    const res = await api.get(`${CATALOG}/products/${id}`);
    return res.data;
};

export const createProduct = async (data) => {
    const res = await api.post(`${CATALOG}/products`, data);
    return res.data;
};

export const updateProduct = async (id, data) => {
    const res = await api.put(`${CATALOG}/products/${id}`, data);
    return res.data;
};

export const deleteProduct = async (id) => {
    const res = await api.delete(`${CATALOG}/products/${id}`);
    return res.data;
};

/* ---------- Turn any error into a sentence the admin can read ---------- */
export const errorMessage = (err) => {
    if (err.response) {
        return err.response.data?.message || err.response.data?.error || "Something went wrong. Please try again.";
    }
    if (err.request) return "Cannot reach the server. Check your internet connection and try again.";
    return "Something went wrong. Please try again.";
};