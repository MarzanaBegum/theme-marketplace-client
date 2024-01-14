import axios from "axios";
import { getCookie } from "cookies-next";

export const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://themehive.onrender.com";

export const api = axios.create({
    baseURL: API_URL + "/api",
});

api.interceptors.request.use(
    function (config) {
        const token = getCookie("auth");
        if (token && config && config.headers) {
            config.headers["user-hash"] = token;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
