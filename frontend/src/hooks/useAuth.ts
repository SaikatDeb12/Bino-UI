import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/axios";
import { CURRENT_USER_QUERY_KEY, getCurrentUser, type User } from "@/lib/auth";

import type { AuthFormValues } from "@/schema/auth.schema";

// GET current user / restore session
export const useCurrentUser = () => {
    return useQuery({
        queryKey: CURRENT_USER_QUERY_KEY,
        queryFn: getCurrentUser,
    });
};

// Helper: after signin/signup, fetch the authenticated user.
const getAuthenticatedUser = async (): Promise<User> => {
    const user = await getCurrentUser();

    if (!user) {
        throw new Error("Unable to restore authenticated user");
    }

    return user;
};

// POST signin
export const useSignIn = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (
            data: Pick<AuthFormValues, "email" | "password">,
        ) => {
            await api.post("/signin", data);

            return getAuthenticatedUser();
        },

        onSuccess: (user) => {
            queryClient.setQueryData(CURRENT_USER_QUERY_KEY, user);
        },
    });
};

// POST signup
export const useSignUp = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (
            data: Pick<AuthFormValues, "username" | "email" | "password">,
        ) => {
            await api.post("/signup", data);

            return getAuthenticatedUser();
        },

        onSuccess: (user) => {
            queryClient.setQueryData(CURRENT_USER_QUERY_KEY, user);
        },
    });
};

// POST logout
export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            await api.post("/logout");
        },

        onSuccess: () => {
            queryClient.setQueryData(CURRENT_USER_QUERY_KEY, null);
        },
    });
};
