import { AuthForm } from "@/components/AuthForm";

export const SignIn = () => {
    return (
        <AuthForm
            mode="signin"
            onSubmit={async (data) => {
                console.log(data);
            }}
        />
    );
};
