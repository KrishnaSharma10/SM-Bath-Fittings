import api from "./api";

export const getAllProductsbyCollectionId = async (collectionId) => {
    const res = await api.get(`${import.meta.env.VITE_GETPRODUCTS_ENDPOINT}${collectionId}`);
    return res.data;
}