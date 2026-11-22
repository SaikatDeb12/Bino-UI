import { AuthForm } from "@/components/AuthForm";
import { api } from "@/lib/axios";

export const SignUp = () => {
    return (
        <AuthForm
            mode="signup"
            onSubmit={async (data) => {
                try {
                    console.log(data);
                    //got the form data
                    const res = await api.post("/signup", data);
                    console.log(res.data);
                } catch (error) {
                    console.log("error while signup: ", error);
                }
            }}
        />
    );
};
