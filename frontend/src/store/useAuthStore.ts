import { api } from "@/lib/axios";
import { create } from "zustand";
import { isAxiosError } from "axios";

type User = {
    id: string;
    username: string;
    email: string;
};

type ProfileResponse = {
    user: {
        _id: string;
        username: string;
        email: string;
    };
};

type AuthStore = {
    user: User | null;
    checking: boolean;
    sessionError: string | null;
    setUser: (user: User) => void;
    clearUser: () => void;
    fetchUser: () => Promise<User>;
    checkSession: () => Promise<void>;
    // setCheck: (check: boolean) => void;
    // setSessionError: (error: string) => void;
};

// export const AuthStore = create<AuthStore>((set) => ({
//     user: null,
//     checking: true,
//     sessionError: null,
//     setUser: (user) => set({ user, sessionError: null }),
//     setCheck: (checking) => set({ checking }),
//     setSessionError: (error) => set({ sessionError: error }),
// }));
//

export const useAuthStore = create<AuthStore>((set, get) => ({
    user: null,
    checking: true,
    sessionError: null,

    setUser: (user) => set({ user, sessionError: null }),

    clearUser: () => set({ user: null, sessionError: null }),

    fetchUser: async () => {
        const res = await api.get<ProfileResponse>("/profile");

        const user: User = {
            id: res.data.user._id,
            username: res.data.user.username,
            email: res.data.user.email,
        };

        set({ user, sessionError: null });
        return user;
    },

    checkSession: async () => {
        set({ checking: true, sessionError: null });

        try {
            await get().fetchUser();
        } catch (error) {
            if (isAxiosError(error) && error.response?.status === 401) {
                // No valid session, then user as a guest.
                set({ user: null, sessionError: null });
            } else {
                set({
                    user: null,
                    sessionError: isAxiosError(error)
                        ? error.message
                        : "Failed to restore session",
                });
            }
        } finally {
            set({ checking: false });
        }
    },
}));
