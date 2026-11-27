import { useQuery } from "@tanstack/react-query";
import { binance } from "@/lib/binance";

export type Order = [price: string, quantity: string];

export type Orderbook = {
    lastUpdateId: number;
    bids: Order[];
    asks: Order[];
};

const fetchOrderbook = async (symbol: string): Promise<Orderbook> => {
    const { data } = await binance.get<Orderbook>("/depth", {
        params: {
            symbol,
            limit: 10,
        },
    });

    return data;
};

export const useOrderbook = (symbol: string) => {
    return useQuery({
        queryKey: ["binance", "orderbook", symbol],
        queryFn: () => fetchOrderbook(symbol),
        enabled: Boolean(symbol),
        staleTime: 1_000,
        refetchInterval: 2_000,
    });
};
