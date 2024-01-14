import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
import LoadingAnimation from "./../../../components/LoadingAnimation/index";
import PasswordResetModal from "./../../../components/Modal/PasswordResetModal";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "../../../api";
import InputPassword from "../../../components/Shared/InputPassword";
import { GetServerSideProps } from "next";
import Meta from "../../../components/Shared/Meta";

const schema = yup.object({
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
const ResetPassword = () => {
    const router = useRouter();
    const { token } = router.query;

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const handleModal = () => {
        setModalOpen(!modalOpen);
    };

    const onSubmit = async (data: any) => {
        setError("");
        if (isLoading) return;
        setIsLoading(true);
        try {
            const { password } = data;
            await api.put("/auth/reset-password", { password, token });
            setIsLoading(false);
            handleModal();
            reset();
        } catch (err: any) {
            setIsLoading(false);
            setError(err?.response?.data?.message);
        }
    };

    return (
        <>
            <div className="">
                <Meta title="Password Reset - ThemeHive" />
                <div className="flex">
                    <div className="w-[100%] h-[100vh] 2xl:h-[1024px] 3xl:h-[1080px] modal-scroll">
                        <div className="bg-[#EFF3FB] lg:bg-transparent h-[56px] lg:h-[70px] items-center flex justify-center lg:justify-start">
                            <img
                                src="/logo/logo-icon.svg"
                                alt="logo"
                                className="lg:ml-[55px] lg:hidden xl:ml-[64.45px] 2xl:ml-[45.77px] 3xl:ml-[51.56px] h-[36px] "
                            />
                            <img
                                src="/logo/logo-full.svg"
                                alt="logo"
                                className="lg:ml-[55px] hidden lg:block xl:ml-[64.45px] 2xl:ml-[45.77px] 3xl:ml-[51.56px] h-[36px] "
                            />
                        </div>
                        <div className="w-[100%] mt-[40px] md:mt-[60px] xl:mt-[80px] 2xl:mt-[140px] 3xl:mt-[234px] mb-[50px] sm:mb-[35px] md:mb-[107px] lg:mb-[144px] xl:mb-[32px] 2xl:mb-[130px] 3xl:mb-[160px] px-[20px] sm:px-[115px] md:px-[159px] lg:px-[287px] xl:pl-[60px] xl:pr-[40px] 2xl:pl-[190px] 2xl:pr-[140px] 3xl:pl-[290px] 3xl:pr-[160px] ">
                            <div className="text-[24px] mb-[8px] text-[#252C48] font-semibold text-center">
                                Reset Password
                            </div>
                            <h3 className="mb-[20px] text-[14px] leading-[24px] text-[#3B415A] font-medium text-center">
                                Enter your new password must be different form
                                previouse used passwords.
                            </h3>
                            {error && (
                                <>
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
                                    <div className="pt-2"></div>
                                </>
                            )}
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <InputPassword
                                        {...register("password")}
                                        placeholder="*********"
                                        label="New Password"
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
                                <div className="pt-4"></div>
                                <div>
                                    <InputPassword
                                        {...register("confirm_password")}
                                        placeholder="*********"
                                        label="Confirm New Password"
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
                                    className="w-[100%] h-[48px] xl:h-[56px] mt-[20px] sm:mt-[24px] lg:mt-[30px] text-[16px] font-bold cursor-pointer rounded-[6px] bg-[#7266FC] hover:bg-brand-dark transition-all duration-200 text-[#FFFFFF]"
                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center">
                                            <LoadingAnimation color="white" />
                                        </span>
                                    ) : (
                                        "Change Password"
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
                    </div>
                    <div className="hidden 2xl:h-[1024px] 3xl:h-[1080px] xl:flex bg-[#EFF3FB] w-[100%] items-center xl:pl-[24px] xl:pr-[60px] 2xl:pl-[136px] 2xl:pr-[120px] 3xl:pl-[120px] 3xl:pr-[256px]">
                        <div className="w-[100%] py-[20px]">
                            <img
                                src="/img/signup.svg"
                                alt="image"
                                className="w-[100%]"
                            />
                            <h1 className="mt-[24px] text-[24px] leading-[36px] text-[#252C48] font-semibold text-center">
                                Get access to 5,496 resources
                            </h1>
                        </div>
                    </div>
                </div>
                <PasswordResetModal
                    modalOpen={modalOpen}
                    handleModal={() => {}}
                />
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { params } = context;
    const { token } = params as any;
    if (!token) {
        return {
            props: {},
            redirect: {
                permanent: false,
                destination: "/",
            },
        };
    }
    console.log(token);
    return {
        props: {},
    };
};

export default ResetPassword;
