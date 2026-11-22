import { AuthForm } from "@/components/AuthForm";
import { api } from "@/lib/axios";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router";

export const SignIn = () => {
    const fetchUser = useAuthStore((state) => state.fetchUser);
    const navigate = useNavigate();
    return (
        <AuthForm
            mode="signin"
            onSubmit={async (data) => {
                console.log(data);
                try {
                    await api.post("/signin", {
                        email: data.email,
                        password: data.password,
                    });
                    // console.log(res.data);
                    await fetchUser();
                    navigate("/");
                } catch (error) {
                    console.log("signin failed with error", error);
                }
            }}
        />
    );
};
