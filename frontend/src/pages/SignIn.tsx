import { AuthForm } from "@/components/AuthForm";
import { useNavigate } from "react-router";

import { useSignIn } from "@/hooks/useAuth";
import { getApiErrorMessage } from "@/lib/auth";
import type { AuthFormValues } from "@/schema/auth.schema";

export const SignIn = () => {
    const navigate = useNavigate();
    const signIn = useSignIn();

    const handleSignIn = async (data: AuthFormValues) => {
        try {
            await signIn.mutateAsync({
                email: data.email,
                password: data.password,
            });

            navigate("/", { replace: true });
        } catch (error) {
            console.log("signin failed with error : ", error);
        }
    };

    return (
        <AuthForm
            mode="signin"
            onSubmit={handleSignIn}
            submitError={
                signIn.isError ? getApiErrorMessage(signIn.error) : null
            }
        />
    );
};
