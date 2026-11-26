import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/axios";
import { CURRENT_USER_QUERY_KEY, getCurrentUser, type User } from "@/lib/auth";

import type { AuthFormValues } from "@/schema/auth.schema";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

// GET current user / restore session
export const useCurrentUser = () => {
    const query = useQuery({
        queryKey: CURRENT_USER_QUERY_KEY,
        queryFn: getCurrentUser,
    });
    const setUser = useAuthStore((state) => state.setUser);

    useEffect(() => {
        if (query.isSuccess) {
            setUser(query.data);
        }
    }, [query.data, query.isSuccess, setUser]);

    return query;
};

// Helper: after signin/signup, fetch the authenticated user.
const getAuthenticatedUser = async (): Promise<User> => {
    const user = await getCurrentUser();

    if (!user) {
        throw new Error("Unable to restore authenticated user");
    }

    return user;
};

export const useSignIn = () => {
    const queryClient = useQueryClient();
    const setUser = useAuthStore((state) => state.setUser);

    return useMutation({
        mutationFn: async (
            data: Pick<AuthFormValues, "email" | "password">,
        ) => {
            await api.post("/signin", data);
            return getAuthenticatedUser();
        },

        onSuccess: (user) => {
            queryClient.setQueryData(CURRENT_USER_QUERY_KEY, user);
            setUser(user);
        },
    });
};

// POST signup
export const useSignUp = () => {
    const queryClient = useQueryClient();
    const setUser = useAuthStore((state) => state.setUser);

    return useMutation({
        mutationFn: async (
            data: Pick<AuthFormValues, "username" | "email" | "password">,
        ) => {
            await api.post("/signup", data);
            return getAuthenticatedUser();
        },

        onSuccess: (user) => {
            queryClient.setQueryData(CURRENT_USER_QUERY_KEY, user);
            setUser(user);
        },
    });
};
// POST logout
export const useLogout = () => {
    const queryClient = useQueryClient();
    const clearUser = useAuthStore((state) => state.clearUser);

    return useMutation({
        mutationFn: async () => {
            await api.post("/logout");
        },

        onSuccess: () => {
            queryClient.setQueryData(CURRENT_USER_QUERY_KEY, null);
            clearUser();
        },
    });
};
