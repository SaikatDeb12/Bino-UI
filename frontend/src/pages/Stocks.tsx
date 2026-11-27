import { Navbar } from "@/components/Navbar";
import { useMarket } from "@/hooks/useMarket";

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
    return (
        <>
            <Navbar />
            <div></div>
        </>
    );
};
