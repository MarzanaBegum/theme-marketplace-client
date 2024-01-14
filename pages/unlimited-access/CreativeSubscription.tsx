import React from "react";
import className from "classnames";
import freePricingQuery from "../../api-call/freePlanPricing";
import { useQuery } from "react-query";
import { useAtom } from "jotai";
import { USER_STATE } from "../../state";
import Link from "next/link";
import usePricingQuery from "../../api-call/usePricingQuery";

const CreativeSubscription = () => {
    const [user] = useAtom(USER_STATE);
    const pySpacing =
        "py-[40px] md:py-[60px] lg:py-[40px] xl:py-[80px] px-[20px]";

    const { data } = useQuery(["Get pricing data"], {
        ...usePricingQuery(),
        select: (d) => {
            return d
                ? d.find((v: any) =>
                      user
                          ? user.userStore.freebieUse
                              ? !v.isTrial
                              : v.isTrial
                          : v.isTrial
                  ) || undefined
                : undefined;
        },
    });

    return (
        <div className={className(`${pySpacing}`)}>
            <div
                id="subscription"
                className="3xl:w-[1560px] lg:w-[930px] xl:w-[1080px] 2xl:w-[1440px] md:w-[450px]  sm:w-[450px] w-[100%] xs:w-[335px] sm:border sm:border-[#7266FC] mx-auto rounded-[6px]"
            >
                <div className="sm:px-[20px] lg:px-[40px] sm:py-[20px] lg:py-[40px]">
                    <div className="flex justify-between items-center 2xl:gap-[193px] 3xl:gap-[332px] lg:gap-[21px] ">
                        {/* first section  */}
                        <div className="w-[467px]">
                            <h1 className="mb-[8px] text-[#252C48] leading-[36px] sm:text-[32px] sm:leading-[42px] md:text-[32px] lg:text-[24px] font-semibold md:leading-[42px] lg:leading-[36px] text-[24px] text-center sm:text-left">
                                The only creative Subscription you need
                            </h1>
                            <p className="text-[14px] xl:text-[16px] text-[#3B415A] font-normal hidden sm:block">
                                {data?.title} plan - From ${data?.price.monthly}{" "}
                                / {data?.isTrial ? "For week" : "Month"}
                            </p>
                            <div className="py-[18px] sm:py-[24px] lg:py-[30px] text-center sm:text-left">
                                <Link
                                    href={`/payment?type=subscription&id=${data?._id}&interval=monthly`}
                                >
                                    <button className="sm:w-[336px] hover:bg-brand-dark transit w-[181px] h-[48px] sm:h-[56px] rounded-[6px] bg-[#7266FC] text-[14px] lg:text-[16px] text-white leading-[24px] ">
                                        {data?.isTrial
                                            ? "Start 7 - day free trial"
                                            : `${data?.title} - ${data?.price.monthly}$ for 30 days`}
                                    </button>
                                </Link>
                            </div>
                            <img
                                src="/images/maskgroup.png"
                                alt=""
                                className="w-[100%] xs:w-[273.75px] h-[220px] sm:hidden mx-auto mb-[20px]"
                            />
                            <div className="">
                                {!user && (
                                    <h3 className="text-[#3B415A] text-[18px] sm:text-[16px] font-medium	leading-[24px] ">
                                        Already an ThemeHive Member?{" "}
                                        <Link
                                            href="/signin"
                                            className="text-brand"
                                        >
                                            Sign in here.
                                        </Link>
                                    </h3>
                                )}
                                <div className="flex flex-col gap-[12px] sm:gap-[16px] mt-[16px] sm:mt-[20px]">
                                    {data?.features?.map(
                                        (features: any, index: any) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-[8px] sm:gap-[16px] lg:gap-[17px]"
                                            >
                                                <div className="sm:w-[32px] w-[24px] h-[24px] sm:h-[32px] rounded-full bg-[#EFF3FB] flex items-center justify-center cursor-pointer">
                                                    <img
                                                        src={`/images/${
                                                            features.isValid ===
                                                            true
                                                                ? "checkedmark.svg"
                                                                : "darkCross.svg"
                                                        }`}
                                                        alt=""
                                                        className="w-[12px] h-[8.67px]"
                                                    />
                                                </div>
                                                <p
                                                    className={className(
                                                        "text-[14px] xl:text-[16px] font-normal leading-[24px]",
                                                        features?.isValid ===
                                                            true
                                                            ? "text-[#3B415A]"
                                                            : "text-[#9AA5B5]"
                                                    )}
                                                >
                                                    {features.text}
                                                </p>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* second section  */}
                        <img
                            src="images/maskgroup.png"
                            alt=""
                            className="3xl:w-[680px] 3xl:h-[584px] 2xl:w-[700px] 2xl:h-[584px] xl:w-[475px] xl:h-[523px] lg:w-[352.12px] lg:h-[388px] hidden lg:block"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreativeSubscription;
