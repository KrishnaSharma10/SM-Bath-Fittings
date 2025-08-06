import api from "./api";

export const getAllCategories = async () => {
    const res = await api.get(import.meta.env.VITE_GETCATEGORIES_ENDPOINT);
    return res.data;
};

export const getAllCollectionsbyCategory = async (categoryId) => {
    const res = await api.get(`${import.meta.env.VITE_GETCOLLECTIONS_ENDPOINT}${categoryId}`);
    return res.data;
}