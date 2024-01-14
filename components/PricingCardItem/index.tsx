import React from "react";
import Link from "next/link";

const PricingCardItem = ({ item, toggle }: any) => {
    return (
        <div>
            <p className="font-bold lg:text-[24px] md:text-[20px] text-[18px]">
                {item?.title}
            </p>
            <h1 className="md:py-[20px] py-[16px] lg:text-[56px] md:text-[40px] text-[32px] font-semibold flex items-center gap-[8px]">
                {`$ ${toggle ? item?.price?.annually : item?.price?.monthly}`}
                <span className="font-medium md:text-[16px] text-[14px]">{`/ ${
                    toggle
                        ? "Annually"
                        : item?.isTrial === true && toggle === false
                        ? "For Week"
                        : "Monthly"
                }`}</span>
            </h1>
            <Link
                href={`/payment?type=subscription&id=${item?._id}&interval=${
                    toggle ? "annually" : "monthly"
                }`}
            >
                <button className="w-[100%] lg:h-[56px] h-[48px] rounded-[4px] border group-hover:border-white border-[#7266FC] text-[#7266FC] font-bold lg:text-[16px] text-[12px] group-hover:bg-white">
                    {item?.isTrial === true
                        ? "Start 7-day Free Trial"
                        : "Get Started Now"}
                </button>
            </Link>
            {item?.isTrial === true && (
                <p className="font-normal hidden text-[12px] text-[#3B415A] group-hover:text-white text-center mt-[5px]">
                    Renews at $9.99/m
                </p>
            )}
            {/* FEATURES  */}
            <div className="lg:mt-[40px] mt-[20px] sm:mt-[23px] ">
                {
                    <p className="text-[#252C48] group-hover:text-white md:text-[18px] lg:text-[20px] font-bold mb-[19px] sm:mb-[25px]">
                        Everything in {item?.title}:
                    </p>
                }
                <div className="flex flex-col gap-[27px] 3xl:mb-[38px] 2xl:mb-[25px] xl:mb-[18.5px] lg:mb-[25px] mb-[19px]">
                    {item.features.map((feature: any, i: any) => (
                        <div key={i}>
                            <li className="flex items-center justify-start gap-2 lg:gap-4">
                                <img
                                    className="lg:w-[32px] w-[24px] h-[24px] lg:h-[32px]"
                                    src={
                                        feature.isValid
                                            ? "/images/Checkmark.svg"
                                            : "/images/Closemark.svg"
                                    }
                                    alt=""
                                />
                                <span className="font-medium text-[16px] leading-[19.36px] text-[#3B415A] group-hover:text-white ">
                                    {feature.text}
                                </span>
                            </li>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PricingCardItem;
