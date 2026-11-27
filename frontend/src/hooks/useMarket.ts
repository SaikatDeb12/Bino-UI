import { binance } from "@/lib/binance";
import { useQuery } from "@tanstack/react-query";

export type Market = {
    symbol: string;
    lastPrice: string;
    priceChangePercent: string;
};

const fetchMarket = async (symbols: string[]): Promise<Market[]> => {
    const { data } = await binance.get("/ticker/24hr", {
        params: {
            symbols: JSON.stringify(symbols),
        },
    });
    return data;
};

export const useMarket = (symbols: string[]) => {
    return useQuery({
        queryKey: ["market"],
        queryFn: () => fetchMarket(symbols),
        enabled: symbols.length > 0,
        staleTime: 5_000,
        refetchInterval: 10_000,
    });
};
