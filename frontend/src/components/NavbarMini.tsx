import { useNavigate, Link } from "react-router";

export const NavbarMini = () => {
    const navigate = useNavigate();
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
            </div>
        </nav>
    );
};
