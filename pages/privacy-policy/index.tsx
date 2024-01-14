import React, { useState } from "react";
import Layout from "../../components/Shared/Layout/Layout";
import WishCartHead from "../../components/WishCartPage/WishCartHead";
import { privacyPolicyData } from "../../utils/constant";
import Meta from "../../components/Shared/Meta";

export default function PrivacyPolicy() {
    const [getIndex, setGetIndex] = useState(0);
    return (
        <div>
            <Meta title="Privacy Policy" />
            <Layout>
                <WishCartHead
                    title="Privacy Policy"
                    desc="Lorem ipsum is a placeholder text commonly used to demonstrate the visual"
                />
                <div className="bg-surface-muted">
                    <div className="container py-[40px] sm:py-[60px] lg:py-[40px] xl:py-[80px]">
                        <div className="w-[100%] xl:w-[900px] 2xl:w-[1196px] 3xl:w-[1164px]">
                            <div className="mb-[16px] sm:mb-[24px] px-[20px]">
                                <ul className="flex flex-col gap-[12px] sm:gap-[16px] lg:gap-[12px] 2xl:gap-[16px] list-disc">
                                    {privacyPolicyData.map((item: any) => (
                                        <div key={item.id}>
                                            <li
                                                onMouseOver={() => {
                                                    setGetIndex(item.id);
                                                }}
                                                onMouseLeave={() => {
                                                    setGetIndex(item.id);
                                                }}
                                                className={`${
                                                    getIndex === item.id &&
                                                    "hover:text-[#7266FC]"
                                                } cursor-pointer text-[20px] leaing-[30px] sm:text-[24px] sm:leading-[36px] lg:text-[20px] lg:leading-[30px] font-medium xl:text-[24px] xl:leading-[36px] text-neutral xl:font-semibold`}
                                            >
                                                <a href={item.url}>
                                                    {item.title}
                                                </a>
                                            </li>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                            <p className="mb-[20px] sm:mb-[24px] text-[14px] leading-[20px] xl:text-[16px] xl:leading-[24px] font-normal">
                                Data protection is of a particularly high
                                priority for ThemeHive.com. Personal data
                                processing, including your name, address, email,
                                or phone number, will always be in line with the
                                General Data Protection Regulation (GDPR) and
                                other data protection regulations applicable to
                                ThemeHive.com.
                            </p>
                            <div>
                                <ul className="flex flex-col gap-[20px] sm:gap-[24px] lg:gap-[16px] xl:gap-[24px] list-decimal list-inside">
                                    {privacyPolicyData.map((item: any) => (
                                        <div key={item.id} id={item.wrapId}>
                                            <li className="text-[20px] leading-[30px] mb-[16px] sm:text-[24px] sm:leaing-[36px] lg:text-[20px] lg:leading-[30px] font-medium xl:text-[24px] xl:leading-[36px] text-neutral xl:font-semibold">
                                                {item.title}
                                            </li>
                                            <p className="text-[14px] leading-[20px] xl:text-[16px] xl:leading-[24px] font-normal text-neutral-muted">
                                                {item.description}
                                            </p>
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
}
