import { useAuthStore } from "@/store/useAuthStore";
import { Navigate } from "react-router";

export const Profile = () => {
    const isUser = useAuthStore((state) => state.user);
    if (!isUser) {
        return <Navigate to={"/"} />;
    }
    return (
        <div>
            <h2>Profile</h2>
            <p>{`Welcome ${isUser?.username}`}</p>
        </div>
    );
};
