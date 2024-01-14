import React from "react";
import ForgotPasswordForm from "./../../components/ForgotPasswordForm/index";
import Link from "next/link";
import Meta from "../../components/Shared/Meta";

const index = () => {
    return (
        <div className="">
            <Meta title="Forgot Password - ThemeHive" />
            <div className="flex">
                <div className="w-[100%] flex  sm:items-center h-[100vh] 2xl:h-[1024px] 3xl:h-[1080px] modal-scroll">
                    <div className="w-[100%] xl:w-[44%] bg-[#EFF3FB] absolute top-0 left-0 right-0 lg:bg-transparent h-[56px] lg:h-[70px] items-center flex justify-center lg:justify-start">
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
                    <ForgotPasswordForm />
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
export default index;
