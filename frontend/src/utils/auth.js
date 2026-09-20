const KEY = "adminToken";

export const getToken = () => sessionStorage.getItem(KEY);
export const setToken = (token) => sessionStorage.setItem(KEY, token);
export const clearToken = () => sessionStorage.removeItem(KEY);