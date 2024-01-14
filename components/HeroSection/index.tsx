import { NextPage } from "next";
import TrustedBrand from "../TrustedBrand";
import { useRouter } from "next/router";
import usePlanAvailable from "../../hooks/usePlanAvailable";
import Link from "next/link";

import { AnimatePresence, motion } from "framer-motion";

const HeroSection: NextPage = () => {
    const router = useRouter();
    const isPlan = usePlanAvailable();
    return (
        <>
            <div className="py-[40px] sm:py-[60px] lg:pt-[80px] lg:pb-0  xl:pt-[60px] 2xl:pt-[50px] 3xl:pt-[80px] lg:bg-[#EFF3FB] relative z-[1]">
                <div className="relative lg:overflow-hidden">
                    <div className="2xl:w-[730px] xl:w-[548px] lg:w-[454px] sm:w-[411px] xs:w-[335px] w-[100%] mx-auto text-center px-[20px] xs:px-0">
                        <p className="text-[#7266FC]  xl:text-[20px] md:leading-[42px]  text-[14px] font-medium 3xl:mb-[13px] 2xl:mb-[10px]">
                            Made by Design and Development
                        </p>
                        <h1 className="text-[#252C48] 3xl:text-[56px] 2xl:text-[48px] 2xl:leading-[58px] md:tracking-[0.25%]  xl:text-[40px] sm:text-[32px] xl:leading-[60px] font-medium tracking-[-0.6%] 3xl:leading-[80px] 2xl:mb-[20px] 3xl:mb-[26px] sm:mb-[24px] xl:mb-[30px] lg:mb-[20px] lg:text-[32px] sm:leading-[42px] text-[24px] leading-[36px] ">
                            Quality resources shared by the community
                        </h1>
                        <Link href={isPlan ? "/product" : "/unlimited-access"}>
                            <button className="relative lg:w-[317px] lg:h-[56px] w-[240px] h-[48px] text-[14px] rounded-[6px] text-white bg-[#252C48] hover:text-brand hover:bg-white transition duration-500 lg:text-[16px] font-semibold cursor-pointer hidden sm:inline-block home-main-btn">
                                {isPlan
                                    ? "Explore All Products"
                                    : "Get access to 5,496 resources"}
                            </button>
                        </Link>
                    </div>
                    {/* small screen unlimited access button  */}
                    <Link href={isPlan ? "/product" : "/unlimited-access"}>
                        <button className="w-[181px] h-[48px] bg-[#7266FC] transition duration-300 hover:bg-[#574dc4] mt-[24px] rounded-[6px] mx-auto flex justify-center gap-[8px] items-center cursor-pointer sm:hidden">
                            <img
                                src="/images/diamondIcon.svg"
                                alt=""
                                className="w-[16px] h-[14px]"
                            />
                            <p className="text-white text-[12px] font-medium ">
                                {isPlan
                                    ? "Explore All Products"
                                    : "Get unlimited access"}
                            </p>
                        </button>
                    </Link>
                    {/* small screen unlimited access button end */}
                    <div className="  lg:pt-[500px] xl:pt-[520px] 2xl:pt-[620px] 3xl:pt-[670px]"></div>
                    <AnimatePresence>
                        <div className="hidden lg:block">
                            <motion.img
                                initial={{ bottom: "-100%" }}
                                animate={{ bottom: 0 }}
                                transition={{ duration: 0.65 }}
                                className="absolute lg:h-[453px] xl:h-[517px] 2xl:h-[618px] 3xl:w-fit left-0 z-10 3xl:h-[706.6px] 2xl:-bottom-[100px] 3xl:bottom-0  bottom-0"
                                src="/hero-img/1.png"
                                alt=""
                            />
                            <motion.img
                                initial={{ bottom: "-100%" }}
                                animate={{ bottom: 0 }}
                                transition={{ duration: 0.6 }}
                                className="absolute  hidden xl:block xl:h-[442px] xl:left-[13%] 2xl:h-[528px] 3xl:w-fit left-[13.5%] z-[11] 2xl:-bottom-[100px] 3xl:bottom-0  3xl:h-[604px] bottom-0"
                                src="/hero-img/2.png"
                                alt=""
                            />
                            <motion.img
                                initial={{ bottom: "-100%" }}
                                animate={{ bottom: 0 }}
                                transition={{ duration: 0.55 }}
                                className="absolute lg:h-[392px] lg:left-[18.5%] xl:h-[382.4px] xl:left-[26%] 2xl:h-[457px]  3xl:w-fit left-[27%] 2xl:-bottom-[100px] 3xl:bottom-0  3xl:h-[522px] z-[12] bottom-0"
                                src="/hero-img/3.png"
                                alt=""
                            />

                            <motion.img
                                initial={{ bottom: "-100%" }}
                                animate={{ bottom: 0 }}
                                transition={{ duration: 0.5 }}
                                className="absolute 2xl:-bottom-[100px] 3xl:bottom-0  lg:h-[345px] 3xl:h-[460px] xl:h-[336.5px] 2xl:h-[402px]   right-0 left-0 z-[13] mx-auto bottom-0"
                                src="/hero-img/4.png"
                                alt=""
                            />

                            <motion.img
                                initial={{ bottom: "-100%" }}
                                animate={{ bottom: 0 }}
                                transition={{ duration: 0.55 }}
                                className="absolute 2xl:-bottom-[100px] 3xl:bottom-0  lg:h-[392px] lg:right-[18.5%] xl:h-[382.4px] xl:right-[26%]  2xl:h-[457px]   right-[27%] 3xl:h-[522px] z-[12] bottom-0"
                                src="/hero-img/5.png"
                                alt=""
                            />
                            <motion.img
                                initial={{ bottom: "-100%" }}
                                animate={{ bottom: 0 }}
                                transition={{ duration: 0.6 }}
                                className="absolute 2xl:-bottom-[100px] 3xl:bottom-0  2xl:h-[528px]   hidden xl:block xl:h-[442px] xl:right-[13%]  right-[13.5%] z-[11]  3xl:h-[604px] bottom-0"
                                src="/hero-img/6.png"
                                alt=""
                            />
                            <motion.img
                                initial={{ bottom: "-100%" }}
                                animate={{ bottom: 0 }}
                                transition={{ duration: 0.65 }}
                                className="absolute 2xl:-bottom-[100px] 3xl:bottom-0  lg:h-[453px] xl:h-[517px] 3xl:h-[706.6px] 2xl:h-[618px]  right-0 z-10 bottom-0"
                                src="/hero-img/7.png"
                                alt=""
                            />
                        </div>
                    </AnimatePresence>
                </div>

                {/* trusted brand page start*/}
                <div className="py-[40px] hidden xl:py-[80px]">
                    <TrustedBrand />
                </div>
            </div>
            <div className="lg:pt-[50px]  xl:pt-[20px] 2xl:pt-[50px] 3xl:pt-[60px]"></div>
        </>
    );
};

export default HeroSection;
