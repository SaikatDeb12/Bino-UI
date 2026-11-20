import { Outlet } from "react-router";
import { Navbar } from "./Navbar";

export const PageLayout = () => {
    return (
        <>
            <Navbar />
            <main className="shell py-10 sm:py-16">
                <Outlet />
            </main>
        </>
    );
};
