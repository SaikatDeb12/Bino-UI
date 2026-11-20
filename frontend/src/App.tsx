import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import Home from "./pages/Home";

export const App = () => {
    return (
        <div>
            <Router>
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
