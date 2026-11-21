import { AuthForm } from "@/components/AuthForm";
import { api } from "@/lib/axios";

export const SignIn = () => {
    return (
        <AuthForm
            mode="signin"
            onSubmit={async (data) => {
                console.log(data);
                const res = await api.post("/signin", {
                    email: data.email,
                    password: data.password,
                });
                console.log(res.data);
            }}
        />
    );
};
