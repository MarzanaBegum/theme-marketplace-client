import React from "react";
import Marquee from "react-fast-marquee";
import { brandData } from "./../../utils/constant/index";

const TrustedBrand = () => {
    return (
        <div className="w-[100%]">
            <div className="text-center">
                <h1 className="text-[32px] xl:text-[40px]  text-[#252C48] mb-[8px] font-medium">
                    Used by trusted brands
                </h1>
                <p className="text-[#3B415A] text-[14px] xl:text-[16px] font-normal mb-[40px] 3xl:mb-[42px]">
                    and thousands of designers and creative agencies worldwide
                </p>
            </div>

            {/* brand logo marquee  */}
            <Marquee gradient={false} pauseOnHover={true}>
                <div className="flex gap-[90px] xl:gap-[100px]">
                    {brandData.map((item, index) => (
                        <div className="" key={index}>
                            <img
                                src={item.logo}
                                alt="brand logo"
                                className="w-[121px] h-[24px] xl:w-[143px] xl:h-[28px] 2xl:w-[180px] 2xl:h-[35px] cursor-pointer"
                            />
                        </div>
                    ))}
                </div>
            </Marquee>
        </div>
    );
};

export default TrustedBrand;
