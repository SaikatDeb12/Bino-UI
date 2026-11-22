import axios, { isAxiosError } from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8000/api/v1/auth",
    withCredentials: true,
});

// avoiding interceptor, request loops
const refreshApi = axios.create({
    baseURL: "http://localhost:8000/api/v1/auth",
    withCredentials: true,
});

let refreshPromise: Promise<void> | null = null;

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (!isAxiosError(error)) {
            return Promise.reject(error);
        }

        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            originalRequest &&
            !originalRequest._retry &&
            !originalRequest.url?.includes("/refresh")
        ) {
            originalRequest._retry = true;

            try {
                if (!refreshPromise) {
                    refreshPromise = refreshApi
                        .post("/refresh")
                        .then(() => undefined)
                        .finally(() => {
                            refreshPromise = null;
                        });
                }

                await refreshPromise;

                return api(originalRequest);
            } catch (refreshError) {
                window.dispatchEvent(new Event("auth:expired"));
                return Promise.reject(refreshError);
            }
        }

        error.message =
            error.response?.data?.message ?? "couldn't connect to server";

        return Promise.reject(error);
    },
);
