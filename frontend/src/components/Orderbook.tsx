import { useOrderbook, type Order } from "@/hooks/useOrderbook";
import { formatPrice } from "@/lib/format";

type OrderRowsProps = {
    orders: Order[];
    color: string;
};

const formatQuantity = (quantity: string) => {
    return Number(quantity).toLocaleString(undefined, {
        maximumFractionDigits: 8,
    });
};

const OrderRows = ({ orders, color }: OrderRowsProps) => {
    return (
        <ul>
            {orders.map(([price, qty]) => (
                <li key={price}>
                    <span className={color}>{formatPrice(price)}</span>
                    <span>{formatQuantity(qty)}</span>
                </li>
            ))}
        </ul>
    );
};

export const Orderbook = ({ symbol }: { symbol: string }) => {
    const { data, isPending, error, isFetching } = useOrderbook(symbol);

    const asks = data?.asks ?? [];
    const bids = data?.bids ?? [];

    const bestAsk = asks[0]?.[0];
    const bestBid = bids[0]?.[0];

    const spread =
        bestAsk && bestBid ? Number(bestAsk) - Number(bestBid) : null;
    const baseAsset = symbol.replace(/USDT$/, "");
    const quoteAsset = "USDT";
    return (
        <section>
            <h2>Order Book</h2>
            <p>
                Price({quoteAsset}) Amount({baseAsset})
            </p>
            {isPending && <p>Loading orderbook...</p>}
            {error && <p>{error?.message}</p>}
            {data && (
                <>
                    <OrderRows
                        orders={[...asks].reverse()}
                        color="text-red-400"
                    />
                    <div>
                        {spread != null && (
                            <p>{`Spread : ${formatPrice(String(spread))}`}</p>
                        )}
                        {isFetching && <span>Updating...</span>}
                    </div>

                    <OrderRows orders={bids} color="text-lime-300" />
                    {asks.length == 0 && bids.length == 0 && (
                        <p>No orders available.</p>
                    )}
                </>
            )}
        </section>
    );
};
