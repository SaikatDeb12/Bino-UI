import { AuthForm } from "@/components/AuthForm";

export const SignUp = () => {
    return (
        <AuthForm
            mode="signup"
            onSubmit={async (data) => {
                console.log(data);
            }}
        />
    );
};
