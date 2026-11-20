import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema, type AuthFormValues } from "@/schema/auth.schema";

type AuthFormProps = {
    mode: "signup" | "signin";
    onSubmit: (data: AuthFormValues) => void | Promise<void>;
};

export const AuthForm = ({ mode, onSubmit }: AuthFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<AuthFormValues>({
        resolver: zodResolver(authSchema(mode)),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });

    const isSignUp = mode == "signup";

    return (
        <div className="flex justify-center items-center">
            <form></form>
        </div>
    );
};
