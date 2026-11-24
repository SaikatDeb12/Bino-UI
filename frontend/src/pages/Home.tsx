import { Link } from "react-router";
import {
    ArrowRight,
    TrendingUp,
    ShieldCheck,
    Zap,
    BarChart3,
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { Navbar } from "@/components/Navbar";

export default function Home() {
    const isUser = useAuthStore((state) => state.user);
    const popularMarkets = [
        {
            pair: "BTC/USDT",
            price: "$64,231.50",
            change: "+2.45%",
            volume: "$1.2B",
        },
        {
            pair: "ETH/USDT",
            price: "$3,142.10",
            change: "+1.82%",
            volume: "$850M",
        },
        {
            pair: "SOL/USDT",
            price: "$145.22",
            change: "-0.54%",
            volume: "$420M",
        },
        {
            pair: "BNB/USDT",
            price: "$592.40",
            change: "+3.10%",
            volume: "$310M",
        },
    ];

    // const tickerData = [
    //     { pair: "BTC/USDT", price: "64,231.50", change: "+2.45%", isUp: true },
    //     { pair: "ETH/USDT", price: "3,142.10", change: "+1.82%", isUp: true },
    //     { pair: "SOL/USDT", price: "145.22", change: "-0.54%", isUp: false },
    //     { pair: "BNB/USDT", price: "592.40", change: "+3.10%", isUp: true },
    //     { pair: "XRP/USDT", price: "0.5821", change: "-1.20%", isUp: false },
    //     { pair: "ADA/USDT", price: "0.4512", change: "+0.95%", isUp: true },
    // ];

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 overflow-x-hidden">
            <Navbar />
            <main>
                <section className="relative mx-auto max-w-7xl px-4 pt-20 pb-24 sm:px-6 lg:px-8 lg:pt-32">
                    <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -z-10">
                        <div className="h-[500px] w-[800px] rounded-full bg-lime-500/10 blur-[120px]" />
                    </div>

                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
                        <div className="max-w-2xl">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-lime-500/30 bg-lime-500/10 px-3 py-1 text-sm text-lime-300">
                                <Zap className="h-4 w-4" />
                                <span>Trade with zero fees for 30 days</span>
                            </div>
                            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                                Buy & sell <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-lime-500">
                                    Crypto
                                </span>
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-zinc-400 max-w-lg">
                                Trade Bitcoin, Ethereum, and hundreds of other
                                cryptocurrencies in a secure, lightning-fast
                                environment.
                            </p>

                            <div className="mt-10 flex flex-col sm:flex-row gap-4">
                                {isUser ? (
                                    <Link
                                        to="/profile"
                                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-lime-300 px-6 py-3 text-base font-semibold text-zinc-950 transition-all hover:bg-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-500/50"
                                    >
                                        Welcome
                                        <ArrowRight className="h-5 w-5" />
                                    </Link>
                                ) : (
                                    <Link
                                        to="/signup"
                                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-lime-300 px-6 py-3 text-base font-semibold text-zinc-950 transition-all hover:bg-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-500/50"
                                    >
                                        Create Account
                                        <ArrowRight className="h-5 w-5" />
                                    </Link>
                                )}
                                <Link
                                    to="/stocks"
                                    className="inline-flex items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900/50 px-6 py-3 text-base font-semibold text-zinc-300 transition-all hover:bg-zinc-800 hover:text-white"
                                >
                                    Explore Markets
                                </Link>
                            </div>

                            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-zinc-800 pt-8 sm:grid-cols-3">
                                <div>
                                    <p className="text-2xl font-bold text-white">
                                        $2.5B+
                                    </p>
                                    <p className="text-sm text-zinc-500">
                                        24h Trading Volume
                                    </p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-white">
                                        150+
                                    </p>
                                    <p className="text-sm text-zinc-500">
                                        Supported Assets
                                    </p>
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-2xl font-bold text-white">
                                        10M+
                                    </p>
                                    <p className="text-sm text-zinc-500">
                                        Active Users
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 shadow-2xl backdrop-blur-xl">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">
                                            BTC/USDT
                                        </h3>
                                        <p className="text-sm text-zinc-400">
                                            Bitcoin
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-white">
                                            $64,231.50
                                        </p>
                                        <p className="text-sm font-medium text-lime-300">
                                            +2.45%
                                        </p>
                                    </div>
                                </div>

                                <div className="relative h-48 w-full rounded-lg overflow-hidden border border-zinc-800/50 bg-zinc-950/50 flex items-end p-2 gap-1">
                                    {[
                                        40, 60, 45, 70, 55, 80, 65, 90, 75, 100,
                                        85, 95,
                                    ].map((height, i) => (
                                        <div
                                            key={i}
                                            className="flex-1 bg-lime-500/20 rounded-t-sm"
                                            style={{
                                                height: `${height}%`,
                                                backgroundColor:
                                                    i === 11
                                                        ? "#a3e635"
                                                        : undefined, // Highlight last bar
                                            }}
                                        />
                                    ))}
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    <button className="rounded-lg bg-lime-300 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-lime-400 transition-colors">
                                        Buy BTC
                                    </button>
                                    <button className="rounded-lg bg-zinc-800 py-2.5 text-sm font-semibold text-white hover:bg-zinc-700 transition-colors">
                                        Sell BTC
                                    </button>
                                </div>
                            </div>

                            <div className="absolute -bottom-6 -right-6 rounded-xl border border-zinc-800 bg-zinc-900 p-4 shadow-xl backdrop-blur-md hidden sm:block">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-500/20 text-lime-300">
                                        <TrendingUp className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">
                                            Order Executed
                                        </p>
                                        <p className="text-xs text-zinc-400">
                                            0.5 BTC @ $64,200
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="border-t border-zinc-800/50 bg-zinc-900/20 py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-end justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-white">
                                    Popular Markets
                                </h2>
                                <p className="mt-1 text-sm text-zinc-400">
                                    Today's top movers and shakers
                                </p>
                            </div>
                            <Link
                                to="/stocks"
                                className="text-sm font-medium text-lime-300 hover:text-lime-300 flex items-center gap-1"
                            >
                                View all <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="border-b border-zinc-800 text-zinc-500">
                                    <tr>
                                        <th className="pb-3 font-medium">
                                            Pair
                                        </th>
                                        <th className="pb-3 font-medium">
                                            Price
                                        </th>
                                        <th className="pb-3 font-medium">
                                            24h Change
                                        </th>
                                        <th className="pb-3 font-medium hidden sm:table-cell">
                                            24h Volume
                                        </th>
                                        <th className="pb-3 font-medium text-right">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800/50">
                                    {popularMarkets.map((market) => (
                                        <tr
                                            key={market.pair}
                                            className="group hover:bg-zinc-800/20 transition-colors"
                                        >
                                            <td className="py-4 font-semibold text-white">
                                                {market.pair}
                                            </td>
                                            <td className="py-4 text-zinc-300">
                                                {market.price}
                                            </td>
                                            <td
                                                className={`py-4 font-medium ${market.change.startsWith("+") ? "text-lime-300" : "text-red-400"}`}
                                            >
                                                {market.change}
                                            </td>
                                            <td className="py-4 text-zinc-400 hidden sm:table-cell">
                                                {market.volume}
                                            </td>
                                            <td className="py-4 text-right">
                                                <Link
                                                    to="/stocks"
                                                    className="inline-flex rounded-md border border-zinc-700 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:border-lime-500 hover:text-lime-400 transition-colors"
                                                >
                                                    Trade
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                <section className="py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <h2 className="text-3xl font-bold text-white sm:text-4xl">
                                Why trade with Exchange?
                            </h2>
                            <p className="mt-4 text-lg text-zinc-400">
                                We provide the tools and security you need to
                                navigate the crypto markets with confidence.
                            </p>
                        </div>

                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Feature 1 */}
                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 hover:border-zinc-700 transition-colors">
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-lime-500/10 text-lime-300">
                                    <ShieldCheck className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-semibold text-white">
                                    Bank-grade Security
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                                    Your assets are protected with
                                    industry-leading security measures,
                                    including cold storage and 2FA.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 hover:border-zinc-700 transition-colors">
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-lime-500/10 text-lime-300">
                                    <Zap className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-semibold text-white">
                                    Lightning Execution
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                                    Our high-performance matching engine
                                    processes millions of transactions per
                                    second with minimal latency.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 hover:border-zinc-700 transition-colors">
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-lime-500/10 text-lime-300">
                                    <BarChart3 className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-semibold text-white">
                                    Advanced Trading
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                                    Access professional charting tools, multiple
                                    order types, and deep liquidity across all
                                    markets.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/40 px-6 py-16 sm:px-16 sm:py-24 text-center backdrop-blur-xl">
                        <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
                            <div className="h-[300px] w-[600px] rounded-full bg-lime-500/10 blur-[100px]" />
                        </div>

                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Start your crypto journey today
                        </h2>
                        <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-400">
                            Join millions of users who trust Exchange to buy,
                            sell, and manage their digital assets.
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                            <Link
                                to="/signup"
                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-lime-300 px-8 py-3 text-base font-semibold text-zinc-950 transition-all hover:bg-lime-400"
                            >
                                Get Started Now
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t border-zinc-800/50 bg-zinc-950 py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded bg-lime-300 text-xs font-bold text-zinc-950">
                            E
                        </div>
                        <span className="text-lg font-bold text-white">
                            Exchange<span className="text-lime-300">.</span>
                        </span>
                    </div>
                    <p className="text-sm text-zinc-500">
                        © {new Date().getFullYear()} Exchange Inc. All rights
                        reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-zinc-400">
                        <Link
                            to="#"
                            className="hover:text-lime-400 transition-colors"
                        >
                            Privacy
                        </Link>
                        <Link
                            to="#"
                            className="hover:text-lime-400 transition-colors"
                        >
                            Terms
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
