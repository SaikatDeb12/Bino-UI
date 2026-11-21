import axios, { isAxiosError } from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8000/api/v1/auth",
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (isAxiosError(error)) {
            error.message =
                error.response?.data?.message ?? "couldn't connect to server";
        }
        return Promise.reject(error);
    },
);
