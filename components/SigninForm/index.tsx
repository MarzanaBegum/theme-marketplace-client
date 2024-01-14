import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import LoadingAnimation from "./../../components/LoadingAnimation/index";
import { useRouter } from "next/router";
import InputField from "../Shared/InputField";
import InputPassword from "../Shared/InputPassword";
import { toast } from "react-toastify";
import { api } from "../../api";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { setCookie } from "cookies-next";
import ContinueWithGoogle from "../AuthPage/ContinueWithGoogle";
import handleGoogleLogin from "../AuthPage/GoogleLoginFunction";

type SigninInput = {
    email: string;
    password: string;
};

const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

const SigninForm = () => {
    const router = useRouter();

    const [buttonLoading, setButtonLoading] = useState(false);
    const [error, setError] = useState("");

    const [remember, setRemember] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SigninInput>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (signinData: SigninInput) => {
        if (buttonLoading) return;

        setError("");
        setButtonLoading(true);

        try {
            const response = await api.post("/auth/signin", signinData);

            // save token,userdata to cookie
            const token = response?.data?.token;
            const expires = remember
                ? new Date(Date.now() + 87400e6)
                : undefined;

            if (response?.data?.user.status !== "banned") {
                setCookie("auth", token, { expires });

                await router.push("/");
                toast.success("User signin successfully");
            } else {
                await router.push("/signup");
                toast.error("You were banned by admin !");
            }
            setButtonLoading(false);
        } catch (err: any) {
            const errMessage = err.response
                ? err.response.data.message
                : err.message;
            setError(errMessage);
            setButtonLoading(false);

            if (
                errMessage === "Your account isn't verified yet, Please verify"
            ) {
                toast.error(errMessage);
                await router.push(
                    "/signup/email-verification/" + signinData.email
                );
            }
        }
    };
    return (
        <div className="w-[100%] px-[20px] sm:px-[115px] md:px-[159px] lg:px-[287px] mt-[40px] md:mt-[60px] lg:mt-[50px] xl:mt-[40px] 2xl:mt-[140px] mb-[50px] sm:mb-[35px] md:mb-[107px] lg:mb-[144px] xl:mb-[32px] 2xl:mb-[130px] 3xl:mb-[160px] xl:pl-[60px] xl:pr-[40px] 2xl:pl-[190px] 2xl:pr-[140px] 3xl:pl-[290px] 3xl:pr-[160px] ">
            <div className="text-[24px] mb-[20px] sm:mb-[24px] lg:mb-[20px] 2xl:mb-[16px] text-[#252C48] font-semibold text-center">
                Sign In
            </div>
            <ContinueWithGoogle onGoogleLogin={handleGoogleLogin(setError)} />
            {error && (
                <div className="w-[100%] mt-[10px] flex items-center py-[8px] md:py-[15px] pl-[15px] pr-[14px] rounded-[4px] min-h-[48px] bg-[#FFE5E7]">
                    <img
                        src="/img/alert-icon.svg"
                        alt="alert icon"
                        className="w-[18.33px] h-[18.33px] mr-[9px]"
                    />
                    <h3 className="text-[13px] font-normal leading-[18px] text-[#252C48]">
                        {error}
                    </h3>
                </div>
            )}
            <div className="flex items-center my-[14px]  ">
                <hr className="w-[50%] bg-[#00000026] opacity-60" />
                <h3 className=" text-[#9AA5B5] text-[14px] font-medium mx-[10px]">
                    OR
                </h3>
                <hr className="w-[50%] bg-[#00000026] opacity-60" />
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-[16px] xl:gap-[20px] 2xl:gap-[24px]">
                    <div>
                        <InputField
                            placeholder="digitalgregg@gmail.com"
                            label="Your Email"
                            {...register("email")}
                            className={`${
                                errors.email || error
                                    ? "!border-error text-error"
                                    : "focus:border-brand"
                            }`}
                        />
                        {errors.email && (
                            <p className="mt-2 text-sm first-letter:capitalize text-error">
                                {errors.email?.message?.toString()}
                            </p>
                        )}
                    </div>
                    <div>
                        <InputPassword
                            {...register("password")}
                            placeholder="*********"
                            label="Password"
                            className={`${
                                errors.password || error
                                    ? "!border-error text-error"
                                    : "focus:border-brand"
                            }`}
                        />
                        {errors.password && (
                            <p className="mt-2 text-sm first-letter:capitalize text-error">
                                {errors.password?.message?.toString()}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex items-center justify-between mt-[6px] 2xl:mt-[8px]">
                    <RememberCheckbox
                        remember={remember}
                        setRemember={setRemember}
                    />
                    <Link href="/forgot-password">
                        <h3 className=" text-[#7266FC] text-[14px] font-medium">
                            Forgot password?
                        </h3>
                    </Link>
                </div>
                <button
                    type="submit"
                    className="w-[100%] h-[48px] xl:h-[56px] mt-[20px] sm:mt-[20px] text-[16px] font-bold cursor-pointer rounded-[6px] bg-[#7266FC] hover:bg-brand-dark transition-all duration-200 text-[#FFFFFF]"
                >
                    {buttonLoading ? (
                        <span className="flex items-center justify-center">
                            <LoadingAnimation color="white" />
                        </span>
                    ) : (
                        "Sign In"
                    )}
                </button>
            </form>
            <p className="mt-[16px] mb-[20px] xl:mb-[24px] text-[14px] font-normal md:leading-[21px] lg:leading-[17px] text-[#9AA5B5]">
                By continuing,you agree to ThemeHive{" "}
                <Link href="/terms-condition">
                    <span className="text-[#7266FC] cursor-pointer">
                        Terms of Services
                    </span>{" "}
                </Link>
                and{" "}
                <Link href="/privacy-policy">
                    <span className="text-[#7266FC] cursor-pointer">
                        Privacy policy
                    </span>{" "}
                </Link>
            </p>
            <h2 className="text-[#3B415A] text-[16px] text-center font-normal leading-[24px]">
                Don't have an Account?{" "}
                <Link href="/signup">
                    <span className="cursor-pointer text-[#7266FC]">
                        Sign Up
                    </span>
                </Link>
            </h2>
        </div>
    );
};
export default SigninForm;

type RCTYPE = {
    remember: boolean;
    setRemember: React.Dispatch<React.SetStateAction<boolean>>;
};
const RememberCheckbox = ({ remember, setRemember }: RCTYPE) => {
    return (
        <div
            onClick={() => setRemember(!remember)}
            className="flex items-center gap-[10px] cursor-pointer"
        >
            <div
                className={`w-[14px] h-[14px] border rounded-sm border-[#333] flex justify-center items-center ${
                    remember && "!border-[#7266FC] bg-[#7266FC]"
                }`}
            >
                {remember && <div className="text-[10px] text-white">✓</div>}
            </div>
            <div className="text-[#333] text-sm">Remember me</div>
        </div>
    );
};
