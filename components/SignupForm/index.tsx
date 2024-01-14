import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import InputField from "../Shared/InputField";
import InputPassword from "../Shared/InputPassword";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import LoadingAnimation from "../LoadingAnimation";
import { api } from "../../api";
import ContinueWithGoogle from "../AuthPage/ContinueWithGoogle";
import handleGoogleLogin from "../AuthPage/GoogleLoginFunction";

export type SignupInput = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirm_password: string;
};

const schema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup
        .string()
        .required()
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
    confirm_password: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords does not match")
        .required(),
});

const SignupForm = () => {
    const [buttonLoading, setButtonLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupInput>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: SignupInput) => {
        const { confirm_password, ...rest } = data;
        if (buttonLoading) return;
        try {
            setButtonLoading(true);
            setError("");
            const res = await api.post("/auth/signup", {
                ...rest,
                verified: false,
            });
            toast.success(res?.data?.message);
            router.push(`/signup/email-verification/${rest.email}`);
            await new Promise((resolve) => {});
        } catch (error: any) {
            setButtonLoading(false);
            setError(
                error?.response ? error.response.data?.message : error.message
            );
            console.log(error);
        }
    };
    return (
        <div className="px-[20px] mb-[50px] sm:mb-[35px] sm:px-[115px] mt-[40px] md:mt-[60px] md:px-[159px] md:mb-[107px] lg:px-[287px] xl:mt-[40px] 2xl:mt-[80px] lg:mb-[144px] xl:pl-[60px] xl:pr-[40px] xl:mb-[32px] 2xl:pl-[190px] 2xl:pr-[140px] 2xl:mb-[130px] 3xl:pl-[290px] 3xl:pr-[160px] 3xl:mb-[160px]">
            <div className="w-[100%]">
                <div className="text-[24px] mb-[20px] sm:mb-[24px] lg:mb-[20px] 2xl:mb-[16px] text-[#252C48] font-semibold text-center">
                    Sign Up
                </div>
                <ContinueWithGoogle
                    onGoogleLogin={handleGoogleLogin(setError)}
                />
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
                <div className="flex items-center my-[14px] sm:my-[24px] lg:my-[20px] 2xl:my-[24px]">
                    <hr className="w-[50%] bg-[#00000026] opacity-60" />
                    <h3 className=" text-[#9AA5B5] text-[14px] font-medium mx-[10px]">
                        OR
                    </h3>
                    <hr className="w-[50%] bg-[#00000026] opacity-60" />
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-[16px] xl:gap-[20px] 2xl:gap-[24px]"
                >
                    <div className="flex flex-col gap-[16px] sm:gap-[24px] xl:gap-[20px] 2xl:gap-[24px] sm:flex-row">
                        <div className="w-[100%]">
                            <InputField
                                {...register("firstName")}
                                placeholder="Gregg"
                                label="First Name"
                                className={`${
                                    errors.firstName
                                        ? "!border-error text-error"
                                        : "focus:border-brand"
                                }`}
                            />
                            {errors.firstName && (
                                <p className="mt-2 text-sm first-letter:capitalize text-error">
                                    {errors.firstName?.message?.toString()}
                                </p>
                            )}
                        </div>
                        <div className="w-[100%]">
                            <InputField
                                {...register("lastName")}
                                placeholder="Micky"
                                label="Last Name"
                                className={`${
                                    errors.lastName
                                        ? "!border-error text-error"
                                        : "focus:border-brand"
                                }`}
                            />
                            {errors.lastName && (
                                <p className="mt-2 text-sm first-letter:capitalize text-error">
                                    {errors.lastName?.message?.toString()}
                                </p>
                            )}
                        </div>
                    </div>
                    <div>
                        <InputField
                            placeholder="digitalgregg@gmail.com"
                            label="Your Email"
                            {...register("email")}
                            className={`${
                                errors.email
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
                                errors.password
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
                    <div>
                        <InputPassword
                            {...register("confirm_password")}
                            placeholder="*********"
                            label="Confirm Password"
                            className={`${
                                errors.confirm_password
                                    ? "!border-error text-error"
                                    : "focus:border-brand"
                            }`}
                        />
                        {errors.confirm_password && (
                            <p className="mt-2 text-sm first-letter:capitalize text-error">
                                {errors.confirm_password?.message?.toString()}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-[100%] h-[48px] xl:h-[56px] text-[16px] font-bold cursor-pointer rounded-[6px] bg-[#7266FC] hover:bg-brand-dark transition-all duration-200 text-[#FFFFFF]"
                    >
                        {buttonLoading ? (
                            <span className="flex items-center justify-center">
                                <LoadingAnimation color="white" />
                            </span>
                        ) : (
                            "Sign up"
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
                    Already have an Account?{" "}
                    <Link href="/signin">
                        <span className="cursor-pointer text-[#7266FC]">
                            Sign In
                        </span>
                    </Link>
                </h2>
            </div>
        </div>
    );
};

export default SignupForm;
