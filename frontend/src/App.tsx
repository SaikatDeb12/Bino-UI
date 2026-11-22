import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import Home from "./pages/Home";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

export const App = () => {
    const checking = useAuthStore((state) => state.checking);
    const checkSession = useAuthStore((state) => state.checkSession);
    const sessionError = useAuthStore((state) => state.sessionError);

    useEffect(() => {
        void checkSession();
    }, [checkSession]);
    return (
        <div>
            <Router>
                {checking ? (
                    <p>Restoring session...</p>
                ) : (
                    <>
                        {sessionError && (
                            <p style={{ color: "red" }}>{sessionError}</p>
                        )}
                    </>
                )}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
