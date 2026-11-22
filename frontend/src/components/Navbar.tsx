import { useAuthStore } from "@/store/useAuthStore";
import { Link, useNavigate } from "react-router";
export const Navbar = () => {
    const navigate = useNavigate();
    const isUser = useAuthStore((state) => state.user);
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
                            className="hidden text-sm font-medium text-zinc-300 hover:text-white transition-colors sm:block"
                        >
                            {`${isUser.username}`}
                        </Link>
                        <Link
                            to="/stocks"
                            className="rounded-lg bg-lime-300 px-4 py-2 text-sm font-semibold text-zinc-950 transition-all hover:bg-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-500/50"
                        >
                            Stocks
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};
