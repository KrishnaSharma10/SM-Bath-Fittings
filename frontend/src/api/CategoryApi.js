import api from "./api";

export const getAllCategories = async () => {
    const res = await api.get(import.meta.env.VITE_GETCATEGORIES_ENDPOINT);
    return res.data;
};

export const getAllCollectionsbyCategory = async (categoryId) => {
    const res = await api.get(`${import.meta.env.VITE_GETCOLLECTIONS_ENDPOINT}${categoryId}`);
    return res.data;
}

export const createCollection = async (e) => {
    e.preventDefault();

    try {
        const res = await api.post(`${import.meta.env.VITE_CREATECOLLECTION_ENDPOINT}`, formData);
        alert("Collection added successfully");
        console.log(res.data);
    }
    catch (err) {
        console.error(err);
        alert("Error submitting form");
    }
};