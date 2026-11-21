import * as React from "react";
import { cn } from "cn";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
    return (
        <input
            type={type}
            className={cn(
                "w-full rounded-lg border bg-zinc-900/50 px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 transition-colors hover:border-zinc-700 focus:border-lime-500 focus:outline-none focus:ring-1 focus:ring-lime-500/50 disabled:cursor-not-allowed disabled:opacity-50",
                className,
            )}
            {...props}
        />
    );
}

export { Input };
