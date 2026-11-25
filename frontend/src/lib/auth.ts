import { isAxiosError } from "axios";
import { api } from "./axios";

export type User = {
    id: string;
    username: string;
    email: string;
};

export type ProfileResponse = {
    user: {
        _id: string;
        username: string;
        email: string;
    };
};

export const CURRENT_USER_QUERY_KEY = ["auth", "currentUser"] as const;

export const getCurrentUser = async (): Promise<User | null> => {
    try {
        const res = await api.get<ProfileResponse>("/profile");
        return {
            id: res.data.user._id,
            username: res.data.user.username,
            email: res.data.user.email,
        };
    } catch (error) {
        if (isAxiosError(error) && error.response?.status == 401) {
            return null;
        }
        throw error;
    }
};

export const getApiErrorMessage = (error: unknown): string => {
    if (isAxiosError(error)) {
        const data = error.response?.data as
            | { message?: string; error?: string }
            | undefined;

        return (
            data?.message ??
            data?.error ??
            error.message ??
            "something went wrong"
        );
    }

    return error instanceof Error ? error.message : "something went wrong";
};
// NOTE:
// Previously fetchUser() updated Zustand manually
// Now, getCurrentUser() simply returns the user andTanStack Query will manage the returned data
