import React from "react";
import FrequentlyQuestion from "../FrequentlyQuestion";
import { questionsData } from "./../../utils/constant/index";
import classnames from "classnames";
import Link from "next/link";

type BgColorType = {
    wrapperClass?: String;
};

const FreequentSection = ({ wrapperClass }: BgColorType) => {
    return (
        <div
            className={classnames(
                "w-[100%]  xl:py-[80px] lg:py-[40px] sm:py-[30px] py-[20px]",
                `${wrapperClass}`
            )}
        >
            <h1 className="text-[#252C48] text-[24px] font-medium leading-[28px] xs:leading-[36px] tracking-[0.25%] text-center px-[20px] mb-[8px] lg:mb-[20px] sm:text-[32px] sm:leading-[36px] sm:tracking-[0.25%] xl:text-[40px] 2xl:text-[40px] 2xl:leading-[60px]">
                Frequently asked questions
            </h1>
            <p className="text-[14px] font-normal leading-[21px] tracking-[0.5%] text-center px-[20px] text-[#3B415A] mb-[20px] sm:mb-[24px] lg:mb-[60px] w-[100%] xs:w-[335px] mx-auto xs:px-0 md:w-[400px] lg:w-[100%] xl:text-[16px]  2xl:leading-[24px]">
                Lorem ipsum dolor si, consectetur adipiscing elit. Adipiscing
                nisl, nam cursus quisque
            </p>
            <div className="flex flex-col md:w-[668px] sm:w-[600px] xs:w-[335px] w-[100%] px-[20px] sm:px-0 lg:w-[768px] 2xl:w-[1280px] 3xl:w-[1024px] mx-auto divide-y ">
                {questionsData.map((v, i) => (
                    <div className="" key={i}>
                        <FrequentlyQuestion data={v} />
                    </div>
                ))}
            </div>
            {/* still have question section  */}
            <div className="px-[20px] py-[40px] sm:py-[24px] lg:py-[60px] xl:py-[42px] 2xl:py-[60px] 3xl:py-[80px]">
                <div className="bg-[#F9F9FF] sm:bg-white  w-[100%] rounded-[6px] xs:w-[335px] sm:w-[600px] md:w-[668px] lg:w-[930px] 2xl:w-[1280px] 3xl:w-[1560px]   mx-auto">
                    <div className="px-[15.5px] py-[20px] sm:py-[24px] lg:py-[40px] 2xl:py-[32px] 3xl:py-[47px] text-center">
                        <h1 className="text-[24px] sm:text-[32px] lg:text-[24px] font-medium leading-[36px] tracking-[0.25%] text-[#252C48] ">
                            Still have questions?
                        </h1>
                        <p className="text-[#667085] font-normal text-[12px] sm:text-[14px] sm:leading-[21px] leading-[18px] mt-[8px] mb-[20px] sm:mb-[39px] lg:mb-[30px] xl:mb-[24px] 2xl:mb-[32px] xl:text-[16px] xl:leading-[24px]">
                            Can’t find the answer you’re looking for? Please
                            chat to our friendly team.
                        </p>
                        <Link href="/contact-us">
                            <button className="bg-[#7266FC] w-[152px] sm:w-[164px] lg:w-[174px] xl:h-[56px]  hover:bg-[#473bc7] h-[48px] rounded-[6px] text-[12px] sm:text-[14px] text-white lg:text-[16px]">
                                Get in touch
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FreequentSection;
