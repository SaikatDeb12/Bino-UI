import { Navigate, Link, useNavigate } from "react-router";
import {
    User,
    Mail,
    ShieldCheck,
    Clock,
    Wallet,
    ArrowRight,
    Settings,
    LogOut,
} from "lucide-react";
import { useCurrentUser, useLogout } from "@/hooks/useAuth";

export const Profile = () => {
    const { data: isUser } = useCurrentUser();
    const logout = useLogout();
    const navigate = useNavigate();

    if (!isUser) {
        return <Navigate to="/" replace />;
    }

    const initials = isUser.username.substring(0, 2).toUpperCase();

    const handleLogout = async () => {
        try {
            await logout.mutateAsync();

            navigate("/", { replace: true });
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
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
            <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-5xl space-y-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-white">
                                Account Overview
                            </h1>
                            <p className="mt-1 text-sm text-zinc-400">
                                Manage your profile and security settings.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link
                                to="#"
                                className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-lime-300 hover:text-lime-300"
                            >
                                <Settings className="h-4 w-4" />
                                Settings
                            </Link>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="md:col-span-1 space-y-6">
                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-xl flex flex-col items-center text-center">
                                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-lime-300 text-3xl font-bold text-zinc-950 shadow-[0_0_20px_rgba(163,230,53,0.3)] mb-4">
                                    {initials}
                                </div>
                                <h2 className="text-xl font-bold text-white">
                                    {isUser.username}
                                </h2>
                                <p className="text-sm text-zinc-400 mb-6">
                                    {isUser.email}
                                </p>

                                <div className="w-full space-y-3 border-t border-zinc-800 pt-6">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-zinc-400 flex items-center gap-2">
                                            <ShieldCheck className="h-4 w-4 text-lime-400" />{" "}
                                            KYC Status
                                        </span>
                                        <span className="font-medium text-lime-400">
                                            Verified
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-zinc-400 flex items-center gap-2">
                                            <Clock className="h-4 w-4" /> Member
                                            Since
                                        </span>
                                        <span className="font-medium text-white">
                                            Oct 2023
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleLogout}
                                disabled={logout.isPending}
                                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-400 transition-colors hover:bg-red-500/20 disabled:opacity-60"
                            >
                                <LogOut className="h-4 w-4" />
                                {logout.isPending
                                    ? "Signing out..."
                                    : "Sign Out"}
                            </button>
                        </div>

                        <div className="md:col-span-2 space-y-6">
                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-xl">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                        <Wallet className="h-5 w-5 text-lime-400" />{" "}
                                        Portfolio Balance
                                    </h3>
                                    <Link
                                        to="/stocks"
                                        className="text-sm text-lime-300 hover:text-lime-400 flex items-center gap-1 transition-colors"
                                    >
                                        Trade Now{" "}
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="rounded-xl bg-zinc-950/50 p-4 border border-zinc-800/50">
                                        <p className="text-sm text-zinc-400 mb-1">
                                            Total Value
                                        </p>
                                        <p className="text-2xl font-bold text-white">
                                            $12,450.00
                                        </p>
                                        <p className="text-xs text-lime-400 mt-1">
                                            +5.4% this week
                                        </p>
                                    </div>
                                    <div className="rounded-xl bg-zinc-950/50 p-4 border border-zinc-800/50">
                                        <p className="text-sm text-zinc-400 mb-1">
                                            Available Cash
                                        </p>
                                        <p className="text-2xl font-bold text-white">
                                            $2,100.50
                                        </p>
                                        <p className="text-xs text-zinc-500 mt-1">
                                            USDT
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-xl">
                                <h3 className="text-lg font-semibold text-white mb-6">
                                    Personal Information
                                </h3>

                                <div className="space-y-5">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400">
                                            <User className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
                                                Username
                                            </p>
                                            <p className="text-sm font-medium text-zinc-200">
                                                {isUser.username}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400">
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
                                                Email Address
                                            </p>
                                            <p className="text-sm font-medium text-zinc-200">
                                                {isUser.email}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400">
                                            <ShieldCheck className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
                                                Account ID
                                            </p>
                                            <p className="text-sm font-mono text-zinc-400">
                                                {isUser.id}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
