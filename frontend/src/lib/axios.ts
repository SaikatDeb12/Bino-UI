import axios, { isAxiosError } from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8000/api/v1/auth",
    withCredentials: true,
});

const refreshApi = axios.create({
    baseURL: "http://localhost:8000/api/v1/auth",
    withCredentials: true,
});

let refreshPromise: Promise<void> | null = null;

const excludedEndpoints = ["/signin", "/signup", "/logout", "/refresh"];

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        if (!isAxiosError(error)) {
            return Promise.reject(error);
        }

        const originalRequest = error.config;

        const requestUrl = originalRequest?.url?.split("?")[0] ?? "";

        const shouldSkipRefresh = excludedEndpoints.some((endpoint) =>
            requestUrl.endsWith(endpoint),
        );

        if (
            error.response?.status === 401 &&
            originalRequest &&
            !originalRequest._retry &&
            !shouldSkipRefresh
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

                // return the original error.
                return Promise.reject(error);
            }
        }

        const data = error.response?.data as { message?: string } | undefined;

        error.message = data?.message ?? "Couldn't connect to server";

        return Promise.reject(error);
    },
);
