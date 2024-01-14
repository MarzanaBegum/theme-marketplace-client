import { useAtom } from "jotai";
import { NextPage } from "next";
import Link from "next/link";
import { USER_STATE } from "../../state";

const HeroSection: NextPage = () => {
    const [user] = useAtom(USER_STATE);
    return (
        <div className="w-[100%] bg-[#F9F9FF] ">
            <div className="px-[20px] py-[40px]  sm:py-[60px]   lg:py-[80px ] xl:py-[80px]">
                <div className="mx-auto w-[100%] xs:w-[335px] sm:w-[493px] xl:w-[620px] 2xl:w-[617px] text-center">
                    <h1 className="font-medium 2xl:font-bold text-[24px] sm:text-[32px] xl:text-[40px] xl:leading-[60px] sm:leading-[42px]  leading-[36px] tracking-[0.25%] 2xl:text-[40px] ">
                        <span className="text-[#7266FC]">
                            Download unlimited{" "}
                        </span>{" "}
                        product for your creative business
                    </h1>
                    <Link href={user ? "/product" : "/signup"}>
                        <button className="w-[100%] xs:w-[181px] sm:w-[249px] 2xl:w-[276px] 2xl:h-[56px] lg:w-[253px] sm:text-[14px] xl:w-[276px] h-[48px] bg-[#7266FC] hover:bg-[#5b52c5] rounded-[6px] text-white text-[12px] leading-[18px] mt-[20px] lg:mt-[40px] sm:mt-[24px] xl:text-[16px] font-medium xl:font-semibold">
                            {user ? "Explore Products" : "Join with us"}
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
