import React from "react";
import { api } from "../../../api";

import { useRouter } from "next/router";
import { useQuery } from "react-query";
import dynamic from "next/dynamic";
import Link from "next/link";

const ConfirmationEmail = dynamic(
    () => import("../../../components/SignupForm/ConfirmationEmail"),
    { ssr: false }
);

const EmailVerifyPage = () => {
    const router = useRouter();
    const { email } = router.query;

    const { data } = useQuery(
        ["check-user"],
        () => api.get(`/users?email=${email}`),
        {
            select: (res) => res.data,
            enabled: !!email,
            onSuccess: (data) => {
                if (data.verified === true) {
                    router.push("/signin");
                }
            },
        }
    );

    return (
        <div className="">
            <div className="flex">
                <div className="w-[100%] h-[100vh] 2xl:h-[1024px] 3xl:h-[1080px] modal-scroll">
                    <div className="w-[100%] xl:w-[44%] bg-[#EFF3FB] lg:bg-transparent h-[56px] lg:h-[70px] items-center flex justify-center lg:justify-start">
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
                    <div className=" w-[100%] mt-[40px] md:mt-[60px] xl:mt-[80px] 2xl:mt-[140px] 3xl:mt-[234px] mb-[50px] sm:mb-[35px] md:mb-[107px] lg:mb-[144px] xl:mb-[32px] 2xl:mb-[130px] 3xl:mb-[160px] px-[20px] sm:px-[115px] md:px-[159px] lg:px-[287px] xl:pl-[60px] xl:pr-[40px] 2xl:pl-[190px] 2xl:pr-[140px] 3xl:pl-[290px] 3xl:pr-[160px] text-center">
                        <div className="mt-[30px]">
                            <img
                                src="/img/mail-check.svg"
                                alt="mail-check"
                                className="w-[112px] h-[112px] mx-auto"
                            />
                            <h2 className="mt-[20px] text-[24px] leading-[36px] text-[#252C48] font-semibold">
                                Verify your email
                            </h2>
                            <h3 className="my-[16px] text-[14px] leading-[24px] text-[#3B415A] font-medium">
                                Check your email & click the link to verify your
                                email.
                            </h3>
                            <p className="tex-[16px] leading-[21px] lg:leading-[24px] text-[#3B415A] font-normal">
                                If your didn’t recieve the message in your
                                inbox,click the below button to resend
                                verification email to verify your account.
                            </p>
                            <ConfirmationEmail />
                        </div>
                    </div>
                </div>
                <div className="hidden xl:flex bg-[#EFF3FB] w-[100%] items-center xl:pl-[24px] xl:pr-[60px] 2xl:pl-[136px] 2xl:pr-[120px] 3xl:pl-[120px] 3xl:pr-[256px] 2xl:h-[1024px] 3xl:h-[1080px]">
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
        </div>
    );
};

export default EmailVerifyPage;
