import { Outlet } from "react-router";
import { Navbar } from "./Navbar";

export const PageLayout = () => {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </>
    );
};
