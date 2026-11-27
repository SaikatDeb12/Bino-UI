import { useMarket } from "@/hooks/useMarket";
import { formatPair, formatPrice } from "@/lib/format";

const formatVolume = (value: string) =>
    Number(value).toLocaleString(undefined, {
        maximumFractionDigits: 2,
    });

export default function StockHeader({ symbol }: { symbol: string }) {
    const { data, isPending, error } = useMarket([symbol]);
    const market = data?.[0];
    const change = Number(market?.priceChangePercent ?? 0);
    const isPositive = change >= 0;

    return (
        <header>
            <h1>{formatPair(symbol)}</h1>
            {isPending && <p>Loading market...</p>}
            {error && <p role="alert">{error.message}</p>}
            {market && (
                <>
                    <div>
                        <h2>{formatPrice(market.lastPrice)}</h2>

                        <p className={isPositive ? "positive" : "negative"}>
                            {Number(market.priceChange) >= 0 ? "+" : ""}
                            {market.priceChange}
                            {" ("}
                            {change >= 0 ? "+" : ""}
                            {change.toFixed(2)}%{")"}
                        </p>
                    </div>
                    <div>
                        <p>24h High: {formatPrice(market.highPrice)}</p>
                        <p>24h Low: {formatPrice(market.lowPrice)}</p>
                        <p>24h Volume: {formatVolume(market.volume)}</p>
                        <p>
                            24h Quote Volume: {formatVolume(market.quoteVolume)}
                        </p>
                    </div>
                </>
            )}
        </header>
    );
}
