import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React, { useState } from "react";
import Button from "../Shared/Button";
import LoadingAnimation from "../SvgCustomIcons/LoadingAnimation";

export type GoogleLoginData = {
    email: string;
    firstName: string;
    lastName: string;
    profile: string;
};

export type GoogleLoginType = (
    data: GoogleLoginData | undefined,
    setGoogleLoading: React.Dispatch<React.SetStateAction<boolean>>
) => any;

type CWGType = {
    onGoogleLogin?: GoogleLoginType;
};

function ContinueWithGoogle({ onGoogleLogin }: CWGType) {
    const [googleLoading, setGoogleLoading] = useState(false);

    const googleLogin = useGoogleLogin({
        onSuccess: async (res) => {
            setGoogleLoading(true);
            try {
                const apiResponse = await axios.get(
                    "https://www.googleapis.com/oauth2/v3/userinfo",
                    { headers: { Authorization: `Bearer ${res.access_token}` } }
                );
                const userInfo = apiResponse.data;
                onGoogleLogin &&
                    onGoogleLogin(
                        {
                            email: userInfo.email,
                            firstName: userInfo.given_name,
                            lastName: userInfo.family_name || " ",
                            profile: userInfo.picture,
                        },
                        setGoogleLoading
                    );
            } catch (error: any) {
                setGoogleLoading(false);
                onGoogleLogin && onGoogleLogin(undefined, setGoogleLoading);
            }
        },
        onError: (err) => {
            setGoogleLoading(false);
            onGoogleLogin && onGoogleLogin(undefined, setGoogleLoading);
        },
    });

    return (
        <div>
            <Button
                onClick={() => googleLogin()}
                className="flex bg-[#4285F4] hover:bg-[#6a9ef1] items-center justify-center gap-2 !text-sm"
            >
                {googleLoading ? (
                    <div className="flex items-center justify-center gap-2">
                        <LoadingAnimation color="#fff" />
                        <div>Loading...</div>
                    </div>
                ) : (
                    <>
                        <img src="/icons/google.svg" alt="" />
                        <div>Continue With Google</div>
                    </>
                )}
            </Button>
        </div>
    );
}

export default ContinueWithGoogle;
