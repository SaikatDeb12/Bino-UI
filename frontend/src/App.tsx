import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import Home from "./pages/Home";
import { useEffect } from "react";
import { Profile } from "./pages/Profile";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "./hooks/useAuth";
import { CURRENT_USER_QUERY_KEY } from "./lib/auth";

export const App = () => {
    const queryClient = useQueryClient();
    const { isPending, isError, error, data, refetch } = useCurrentUser();

    useEffect(() => {
        const handleAuthExpired = () => {
            queryClient.setQueryData(CURRENT_USER_QUERY_KEY, null);
        };
        window.addEventListener("auth:expired", handleAuthExpired);

        return () => {
            window.removeEventListener("auth:expired", handleAuthExpired);
        };
    }, [queryClient]);

    if (isPending) {
        return <p>Restoring session</p>;
    }

    if (isError && data === undefined) {
        return (
            <div className="p-8 text-white">
                <p>Failed to restore session: {error.message}</p>

                <button onClick={() => void refetch()}>Retry</button>
            </div>
        );
    }

    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
