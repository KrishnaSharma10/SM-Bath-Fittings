import api from "./api";

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
// Categories almost never change, so ask the server once and share the answer between pages
let categoriesRequest = null;
export const getCategories = () => {
    if (!categoriesRequest) {
        categoriesRequest = api
            .get(`${CATALOG}/categories`)
            .then((res) => res.data)
            .catch((err) => {
                categoriesRequest = null; // let the next call try again
                throw err;
            });
    }
    return categoriesRequest;
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

/* ---------- Image upload (goes to Cloudinary through the backend) ---------- */
export const uploadImage = async (file) => {
    const form = new FormData();
    form.append("image", file);
    // Do not set Content-Type by hand: the browser adds it, with the boundary the server needs
    const res = await api.post(`${CATALOG}/upload`, form);
    return res.data.url; // the https link to store on the collection or product
};

/* ---------- Turn any error into a sentence the admin can read ---------- */
export const errorMessage = (err) => {
    if (err.response) {
        return err.response.data?.message || err.response.data?.error || "Something went wrong. Please try again.";
    }
    if (err.request) return "Cannot reach the server. Check your internet connection and try again.";
    return "Something went wrong. Please try again.";
};