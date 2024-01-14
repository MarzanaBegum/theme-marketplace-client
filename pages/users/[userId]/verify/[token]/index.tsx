import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { api } from "../../../../../api";

export default function TokenVerifyPage({ error }: { error: boolean }) {
    useEffect(() => {
        if (error) {
            toast.error("Email already verified, Please login");
        }
        error = false;
    }, []);
    return (
        <div className="w-[100%]">
            <div>
                <div className="bg-[#EFF3FB] lg:bg-transparent h-[56px] lg:h-[70px] items-center flex justify-center lg:justify-start">
                    <Link href={"/"}>
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
                    </Link>
                </div>
            </div>
            <div className="flex justify-center mt-[48px] lg:mt-[56px] mb-[30px] text-center">
                <div>
                    <img
                        src="/img/verify-logo.svg"
                        alt="logo"
                        className="w-[240px] h-[260px] xl:w-[320px] xl:h-[320px]"
                    />
                    <h2 className="text-[24px] font-medium leading-[29px] xl:text-[30px] 2xl:text-[40px] 2xl:leading-[60px] text-[#1F1F1F] mb-2 mt-[24px] xl:mt-[32px]">
                        Congratulations!
                    </h2>
                    <p className="tex-[16px] font-medium leading-[22px] text-[#666666] mb-[32px] 2xl:mb-[40px]">
                        Your email is verified!
                    </p>
                    <Link href="/signin">
                        <button className="w-[175px] h-[48px] 2xl:w-[200px] 2xl:h-[52px] text-[16px] font-semibold cursor-pointer rounded-[6px] text-[#FFFFFF] bg-[#7266FC] hover:bg-brand-dark">
                            Go To Login
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
    try {
        const { userId, token } = query;
        if (!userId || !token) throw new Error();

        const { data } = await api.post(
            `/auth/signup/${userId}/verify/${token}`
        );

        await api.post(`/notifications`, {
            userId: data.user._id,
            title: "Welcome",
            description: "Welcome to ThemeHive!",
        });

        return {
            props: {}, // will be passed to the page component as props
        };
    } catch (err: any) {
        const errMessage = err.response
            ? err.response.data.message
            : err.message;

        return {
            props: {
                error: true,
            },
        };
    }
}
