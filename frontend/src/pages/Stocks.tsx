import { Navbar } from "@/components/Navbar";
import { useMarket } from "@/hooks/useMarket";
import { Link } from "react-router";
import {
    ArrowUpRight,
    ArrowDownRight,
    RefreshCw,
    Search,
    AlertCircle,
} from "lucide-react";
import { useState } from "react";

const stockSymbols = [
    "BTCUSDT",
    "ETHUSDT",
    "BNBUSDT",
    "SOLUSDT",
    "XRPUSDT",
    "DOGEUSDT",
    "ADAUSDT",
    "TRXUSDT",
    "LINKUSDT",
    "AVAXUSDT",
];

export const Stocks = () => {
    const {
        data: markets,
        isPending,
        isFetching,
        error,
        refetch,
    } = useMarket(stockSymbols);

    const [searchTerm, setSearchTerm] = useState("");

    // Filter markets
    const filteredMarkets = markets?.filter((market) =>
        market.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const formatSymbol = (symbol: string) => {
        if (symbol.endsWith("USDT")) {
            return `${symbol.replace("USDT", "")}`;
        }
        return symbol;
    };

    // Format price to 2 decimal places (or more for small coins)
    const formatPrice = (price: string) => {
        const num = parseFloat(price);
        if (num < 0.01) return `$${num.toFixed(6)}`;
        if (num < 1) return `$${num.toFixed(4)}`;
        return `$${num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 overflow-x-hidden">
            <Navbar />

            <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Markets
                        </h1>
                        <p className="mt-2 text-zinc-400">
                            Real-time prices and 24h market data from Binance.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                            <input
                                type="text"
                                placeholder="Search symbol..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full sm:w-64 rounded-lg border border-zinc-800 bg-zinc-900/50 pl-9 pr-4 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-lime-500 focus:outline-none focus:ring-1 focus:ring-lime-500/50"
                            />
                        </div>
                        <button
                            onClick={() => refetch()}
                            disabled={isFetching}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-400 transition-colors hover:border-lime-500 hover:text-lime-400 disabled:opacity-50"
                        >
                            <RefreshCw
                                className={`h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
                            />
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="mb-8 flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
                        <AlertCircle className="h-5 w-5 shrink-0" />
                        <p className="text-sm">
                            Failed to load market data. Please try again.
                        </p>
                    </div>
                )}

                {isPending ? (
                    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40">
                        <div className="p-4 border-b border-zinc-800 bg-zinc-900/60">
                            <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
                        </div>
                        <div className="divide-y divide-zinc-800/50">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between p-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-zinc-800 animate-pulse" />
                                        <div className="space-y-2">
                                            <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
                                            <div className="h-3 w-16 bg-zinc-800 rounded animate-pulse" />
                                        </div>
                                    </div>
                                    <div className="h-6 w-20 bg-zinc-800 rounded animate-pulse" />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 shadow-2xl backdrop-blur-xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="border-b border-zinc-800 bg-zinc-900/60 text-zinc-400">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">
                                            Asset
                                        </th>
                                        <th className="px-6 py-4 font-medium text-right">
                                            Price
                                        </th>
                                        <th className="px-6 py-4 font-medium text-right">
                                            24h Change
                                        </th>
                                        <th className="px-6 py-4 font-medium text-right hidden md:table-cell">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800/50">
                                    {filteredMarkets?.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="px-6 py-12 text-center text-zinc-500"
                                            >
                                                No assets found matching "
                                                {searchTerm}"
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredMarkets?.map((market) => {
                                            const priceChange = parseFloat(
                                                market.priceChangePercent,
                                            );
                                            const isPositive = priceChange >= 0;

                                            return (
                                                <tr
                                                    key={market.symbol}
                                                    className="group transition-colors hover:bg-zinc-800/30"
                                                >
                                                    {/* Asset Column */}
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 text-sm font-bold text-lime-300">
                                                                {market.symbol
                                                                    .replace(
                                                                        "USDT",
                                                                        "",
                                                                    )
                                                                    .substring(
                                                                        0,
                                                                        2,
                                                                    )}
                                                            </div>
                                                            <div>
                                                                <p className="font-semibold text-white">
                                                                    {formatSymbol(
                                                                        market.symbol,
                                                                    )}
                                                                </p>
                                                                <p className="text-xs text-zinc-500">
                                                                    {market.symbol.replace(
                                                                        "USDT",
                                                                        "",
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Price Column */}
                                                    <td className="px-6 py-4 text-right">
                                                        <p className="font-medium text-white font-mono">
                                                            {formatPrice(
                                                                market.lastPrice,
                                                            )}
                                                        </p>
                                                    </td>

                                                    {/* 24h Change Column */}
                                                    <td className="px-6 py-4 text-right">
                                                        <div
                                                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${isPositive
                                                                    ? "bg-lime-500/10 text-lime-300"
                                                                    : "bg-red-500/10 text-red-400"
                                                                }`}
                                                        >
                                                            {isPositive ? (
                                                                <ArrowUpRight className="h-3 w-3" />
                                                            ) : (
                                                                <ArrowDownRight className="h-3 w-3" />
                                                            )}
                                                            {isPositive
                                                                ? "+"
                                                                : ""}
                                                            {priceChange.toFixed(
                                                                2,
                                                            )}
                                                            %
                                                        </div>
                                                    </td>

                                                    {/* Action Column */}
                                                    <td className="px-6 py-4 text-right hidden md:table-cell">
                                                        <Link
                                                            to="#"
                                                            className="inline-flex items-center justify-center rounded-md border border-zinc-700 px-4 py-1.5 text-xs font-semibold text-zinc-300 transition-colors hover:border-lime-500 hover:text-lime-400"
                                                        >
                                                            Trade
                                                        </Link>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {!isPending && (
                            <div className="flex items-center justify-between border-t border-zinc-800 bg-zinc-900/60 px-6 py-3 text-xs text-zinc-500">
                                <div className="flex items-center gap-2">
                                    <span className="relative flex h-2 w-2">
                                        <span
                                            className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${isFetching ? "bg-lime-400 animate-ping" : "bg-lime-500"}`}
                                        ></span>
                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-500"></span>
                                    </span>
                                    Live Data
                                </div>
                                <span>Auto-refreshes every 10s</span>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};
