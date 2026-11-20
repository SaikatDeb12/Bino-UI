import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema, type AuthFormValues } from "@/schema/auth.schema";
import { Link } from "react-router";

type AuthFormProps = {
    mode: "signin" | "signup";
    onSubmit: () => void | Promise<void>;
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

    const isSignup = mode === "signup";

    return (
        <section className="mx-auto w-[92%] rounded-xl border border-[#343a34] bg-[#181c19] p-[clamp(22px,4vw,36px)] max-w-md">
            <h1 className="text-[clamp(28px,4vw,40px)] leading-[1.15] font-semibold tracking-[-0.045em]">
                {isSignup ? "Create an account" : "Log in"}
            </h1>

            <form className="mt-7 grid gap-5" onSubmit={handleSubmit(onSubmit)}>
                {isSignup && (
                    <label className="grid gap-[7px] text-sm">
                        Username
                        <input
                            {...register("username")}
                            autoComplete="username"
                            minLength={3}
                            maxLength={20}
                            className="w-full rounded-md border border-[#424a42] bg-[#111512] px-3 py-2.5 outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b5ed83]"
                        />
                        {errors.username && (
                            <span className="text-sm text-[#ffb4ab]">
                                {errors.username.message}
                            </span>
                        )}
                    </label>
                )}

                <label className="grid gap-[7px] text-sm">
                    Email
                    <input
                        {...register("email")}
                        type="email"
                        autoComplete="email"
                        className="w-full rounded-md border border-[#424a42] bg-[#111512] px-3 py-2.5 outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b5ed83]"
                    />
                    {errors.email && (
                        <span className="text-sm text-[#ffb4ab]">
                            {errors.email.message}
                        </span>
                    )}
                </label>

                <label className="grid gap-[7px] text-sm">
                    Password
                    <input
                        {...register("password")}
                        type="password"
                        autoComplete={
                            isSignup ? "new-password" : "current-password"
                        }
                        minLength={8}
                        maxLength={72}
                        className="w-full rounded-md border border-[#424a42] bg-[#111512] px-3 py-2.5 outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b5ed83]"
                    />
                    {errors.password && (
                        <span className="text-sm text-[#ffb4ab]">
                            {errors.password.message}
                        </span>
                    )}
                </label>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex cursor-pointer items-center justify-center rounded-md bg-[#b5ed83] px-[15px] py-[9px] text-sm font-semibold text-[#172011] transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-55"
                >
                    {isSubmitting
                        ? "Please wait..."
                        : isSignup
                            ? "Create account"
                            : "Log in"}
                </button>
            </form>

            <p className="mt-5 text-sm text-zinc-400">
                {isSignup ? "Already have an account? " : "New to Exchange? "}
                <Link
                    className="text-zinc-100 underline hover:text-white"
                    to={isSignup ? "/signin" : "/signup"}
                >
                    {isSignup ? "Sign in" : "Sign up"}
                </Link>
            </p>
        </section>
    );
};
