import { useCurrentUser, useLogout } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router";
export const Navbar = () => {
    const navigate = useNavigate();
    const { data: isUser } = useCurrentUser();
    const logout = useLogout();

    const initials = isUser
        ? isUser.username.substring(0, 2).toUpperCase()
        : "";

    const handleLogout = async () => {
        try {
            await logout.mutateAsync();

            navigate("/", { replace: true });
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
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
                {!isUser ? (
                    <div className="flex items-center gap-4">
                        <Link
                            to="/signin"
                            className="hidden text-sm font-medium text-zinc-300 hover:text-white transition-colors sm:block"
                        >
                            Log in
                        </Link>
                        <Link
                            to="/signup"
                            className="rounded-lg bg-lime-300 px-4 py-2 text-sm font-semibold text-zinc-950 transition-all hover:bg-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-500/50"
                        >
                            Get Started
                        </Link>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <Link
                            to="/profile"
                            className="hidden sm:flex items-center justify-center"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-300 text-xl font-bold text-zinc-950 shadow-[0_0_20px_rgba(163,230,53,0.3)]">
                                {initials}
                            </div>
                        </Link>
                        <button
                            onClick={handleLogout}
                            disabled={logout.isPending}
                            className="rounded-lg bg-lime-300 px-4 py-2 text-sm font-semibold text-zinc-950 transition-all hover:bg-lime-400 disabled:opacity-60"
                        >
                            {logout.isPending ? "Logging out..." : "Logout"}
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};
