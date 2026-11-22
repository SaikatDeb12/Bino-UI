import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema, type AuthFormValues } from "@/schema/auth.schema";
import { Link, Navigate, useNavigate } from "react-router";
import { Input } from "./ui/input";
import { useAuthStore } from "@/store/useAuthStore";

type AuthFormProps = {
    mode: "signin" | "signup";
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

    const isSignup = mode === "signup";
    const navigate = useNavigate();
    const isUser = useAuthStore((state) => state.user);
    if (isUser) {
        return <Navigate to={"/"} />;
    }

    return (
        <>
            <nav className="sticky top-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-lime-300 text-lg font-bold text-zinc-950">
                            E
                        </div>
                        <span
                            className="text-xl font-bold tracking-tight text-white hover:cursor-pointer"
                            onClick={() => navigate("/")}
                        >
                            Exchange<span className="text-lime-300">.</span>
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
                        <Link
                            to="#"
                            className="hover:text-lime-400 transition-colors"
                        >
                            Markets
                        </Link>
                        <Link
                            to="#"
                            className="hover:text-lime-400 transition-colors"
                        >
                            Trade
                        </Link>
                        <Link
                            to="#"
                            className="hover:text-lime-400 transition-colors"
                        >
                            Earn
                        </Link>
                        <Link
                            to="#"
                            className="hover:text-lime-400 transition-colors"
                        >
                            Support
                        </Link>
                    </div>
                </div>
            </nav>
            <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-4 py-12">
                <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
                    <div className="h-[400px] w-[400px] rounded-full bg-lime-500/10 blur-[100px]" />
                </div>

                <section className="w-full max-w-md overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 shadow-2xl backdrop-blur-xl">
                    <div className="p-8 sm:p-10">
                        <div className="mb-8 space-y-2 text-center">
                            <h1 className="text-2xl font-bold tracking-tight text-zinc-100 sm:text-3xl">
                                {isSignup
                                    ? "Create an account"
                                    : "Welcome back"}
                            </h1>
                            <p className="text-sm text-zinc-400">
                                {isSignup
                                    ? "Enter your details to create your account"
                                    : "Enter your credentials to access your account"}
                            </p>
                        </div>

                        <form
                            className="grid gap-5"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            {isSignup && (
                                <label className="grid gap-2 text-sm font-medium text-zinc-300">
                                    Username
                                    <Input
                                        {...register("username")}
                                        autoComplete="username"
                                        minLength={3}
                                        maxLength={20}
                                        placeholder="johndoe"
                                    />
                                    {errors.username && (
                                        <span className="text-xs font-normal text-red-400">
                                            {errors.username.message}
                                        </span>
                                    )}
                                </label>
                            )}

                            <label className="grid gap-2 text-sm font-medium text-zinc-300">
                                Email
                                <Input
                                    {...register("email")}
                                    type="email"
                                    autoComplete="email"
                                    placeholder="name@example.com"
                                />
                                {errors.email && (
                                    <span className="text-xs font-normal text-red-400">
                                        {errors.email.message}
                                    </span>
                                )}
                            </label>

                            <label className="grid gap-2 text-sm font-medium text-zinc-300">
                                Password
                                <Input
                                    {...register("password")}
                                    type="password"
                                    autoComplete={
                                        isSignup
                                            ? "new-password"
                                            : "current-password"
                                    }
                                    minLength={8}
                                    maxLength={72}
                                    placeholder="••••••••"
                                />
                                {errors.password && (
                                    <span className="text-xs font-normal text-red-400">
                                        {errors.password.message}
                                    </span>
                                )}
                            </label>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="mt-2 inline-flex w-full cursor-pointer items-center justify-center rounded-lg bg-lime-300 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-all hover:bg-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-500/50 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-60"
                            >
                                {isSubmitting
                                    ? "Please wait..."
                                    : isSignup
                                        ? "Create account"
                                        : "Sign in"}
                            </button>
                        </form>
                    </div>

                    <div className="border-t border-zinc-800 bg-zinc-900/50 p-6 text-center text-sm">
                        <span className="text-zinc-400">
                            {isSignup
                                ? "Already have an account? "
                                : "Don't have an account? "}
                        </span>
                        <Link
                            className="font-medium text-lime-400 transition-colors hover:text-lime-300"
                            to={isSignup ? "/signin" : "/signup"}
                        >
                            {isSignup ? "Sign in" : "Sign up"}
                        </Link>
                    </div>
                </section>
            </div>
        </>
    );
};
