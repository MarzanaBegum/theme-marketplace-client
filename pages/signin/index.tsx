import Link from "next/link";
import React from "react";
import SigninForm from "./../../components/SigninForm/index";
import Meta from "../../components/Shared/Meta";

const SigninPage = () => {
    return (
        <div>
            <Meta title="Login - ThemeHive" />
            <div className="flex">
                <div className="w-[100%] h-[100vh] 2xl:h-[1024px] 3xl:h-[1080px] modal-scroll">
                    <div className="w-[100%] bg-[#EFF3FB] lg:bg-transparent h-[56px] lg:h-[70px] items-center flex justify-center lg:justify-start">
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
                    <SigninForm />
                </div>
                <div className="w-[100%] xl:flex items-center 2xl:h-[1024px] 3xl:h-[1080px] hidden xl:pl-[24px] xl:pr-[60px] 2xl:pl-[136px] 2xl:pr-[120px] 3xl:pl-[120px] 3xl:pr-[256px] bg-[#EFF3FB]">
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
export default SigninPage;
