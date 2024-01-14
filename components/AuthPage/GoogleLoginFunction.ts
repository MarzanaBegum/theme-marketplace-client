import { setCookie } from "cookies-next";
import router from "next/router";
import { toast } from "react-toastify";
import { api } from "../../api";
import { GoogleLoginType } from "./ContinueWithGoogle";

type DispatchString = React.Dispatch<React.SetStateAction<string>>;

const handleGoogleLogin: (
    setError?: DispatchString,
    pushUrl?: string
) => GoogleLoginType =
    (setError, pushUrl) => async (data, setGoogleLoading) => {
        setError && setError("");

        try {
            if (!data) throw new Error();
            const res = await api.post("/auth/google-signin", data);
            // save token,userdata to cookie
            const token = res?.data?.token;

            setCookie("auth", token, {
                expires: new Date(Date.now() + 87400e6),
            });

            await router.push(pushUrl || "/");

            toast.success("Google Login successfull");
            setGoogleLoading(false);
        } catch (err: any) {
            setGoogleLoading(false);
            setError &&
                setError(
                    err?.response
                        ? err?.response.data.message
                        : "Google Login failed, Please try again"
                );
        }
    };

export default handleGoogleLogin;
