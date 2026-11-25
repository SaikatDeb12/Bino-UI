import { AuthForm } from "@/components/AuthForm";
import { useNavigate } from "react-router";

import { useSignUp } from "@/hooks/useAuth";
import { getApiErrorMessage } from "@/lib/auth";
import type { AuthFormValues } from "@/schema/auth.schema";

export const SignUp = () => {
    const navigate = useNavigate();
    const signUp = useSignUp();

    const handleSignUp = async (data: AuthFormValues) => {
        try {
            await signUp.mutateAsync({
                username: data.username,
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
            mode="signup"
            onSubmit={handleSignUp}
            submitError={
                signUp.isError ? getApiErrorMessage(signUp.error) : null
            }
        />
    );
};
