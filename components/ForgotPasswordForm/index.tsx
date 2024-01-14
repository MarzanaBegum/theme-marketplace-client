import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import LoadingAnimation from "./../LoadingAnimation/index";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { api } from "../../api";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import InputField from "../Shared/InputField";

const labelStyle = "text-[14px] text-[#252C48] font-medium";
const inputStyle =
    "w-[100%] h-[48px] lg:h-[54px] mt-[8px] py-[15px] px-[16px] text-[14px] font-normal text-[#A0A4AB] rounded-[6px] outline-none border border-[#C8CBD0]";

const schema = yup.object({
    email: yup.string().email().required(),
});
const ForgotPasswordForm = () => {
    const [buttonLoading, setButtonLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: any) => {
        setError("");
        if (buttonLoading) return;
        try {
            setButtonLoading(true);
            const res = await api.post("/auth/forgot-password", data);
            toast.success(res.data.message);

            await router.push("/");
            setButtonLoading(false);
        } catch (err: any) {
            setButtonLoading(false);
            setError(err?.response?.data?.message);
        }
    };

    return (
        <div className="w-[100%] mt-[40px] px-[20px] sm:px-[115px] md:px-[159px] lg:px-[287px] xl:pl-[60px] xl:pr-[40px] 2xl:pl-[190px] 2xl:pr-[140px] 3xl:pl-[290px] 3xl:pr-[160px] ">
            <div className="pt-[50px] sm:pt-0"></div>

            <h2 className="text-[24px] mb-[8px] text-[#252C48] font-semibold text-center">
                Forgot password
            </h2>
            <h3 className="mb-[20px] text-[14px] leading-[24px] text-[#3B415A] font-medium text-center">
                Enter your email, we will send you a verification link
            </h3>
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
            <div className="pt-1"></div>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                <button
                    type="submit"
                    className="w-[100%] h-[48px] xl:h-[56px] mt-[20px] sm:mt-[24px] lg:mt-[30px] text-[16px] font-bold cursor-pointer rounded-[6px] bg-[#7266FC] hover:bg-brand-dark transition-all duration-200 text-[#FFFFFF]"
                >
                    {buttonLoading ? (
                        <span className="flex items-center justify-center">
                            <LoadingAnimation color="white" />
                        </span>
                    ) : (
                        "Send"
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
                Back to{" "}
                <Link href="/signin">
                    <span className="cursor-pointer text-[#7266FC]">
                        Sign In
                    </span>
                </Link>
            </h2>
        </div>
    );
};
export default ForgotPasswordForm;
