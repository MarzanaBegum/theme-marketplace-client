import Link from "next/link";
import React, { useState } from "react";
import ContactCardBottom from "../../components/ContactCardBottom";
import AccountIcon from "../../components/CustomIcons/AccountIcon";
import CustomBillingIcon from "../../components/CustomIcons/BillingIcon";
import BuyingCartIcon from "../../components/CustomIcons/BuyingCart";
import CopyrightIcon from "../../components/CustomIcons/CopyrightIcon";
import CustomLicenseIcon from "../../components/CustomIcons/LicenseIcon";
import NoteListIcon from "../../components/CustomIcons/NoteListIcon";
import TechnicalIcon from "../../components/CustomIcons/TechnicalIcon";
import Layout from "../../components/Shared/Layout/Layout";
import SupportHead from "../../components/Shared/SupportHead";
import SupportCard from "../../components/SupportCard";
import {
    gettingStartedData,
    supportData,
    licenseData,
    accountData,
    copyrightData,
    TechnicalData,
    buyingData,
} from "../../utils/constant";
import Meta from "../../components/Shared/Meta";

const supportCardData = [
    {
        id: 1,
        title: "Billing",
        description:
            "If you need help before, during or after your purchase, this is the place to be.",
        Icon: CustomBillingIcon,
    },
    {
        id: 2,
        title: "License",
        description:
            "Have a question about licensing? Check out our frequently asked question to findyour answer.",
        Icon: CustomLicenseIcon,
    },
    {
        id: 3,
        title: "Account",
        description: "Set up your account and keep it safe and sound",
        Icon: AccountIcon,
    },
    {
        id: 4,
        title: "Copyright & Trademarks",
        description:
            "Find out about Copyright and Trademark protection, what intellectual Property is and why is impotand to you.",
        Icon: CopyrightIcon,
    },
    {
        id: 5,
        title: "Technical Support",
        description:
            "Find out about Copyright and Trademark protection, what intellectual Property is and why is impotand to you.",
        Icon: TechnicalIcon,
    },
    {
        id: 6,
        title: "Buying and Item Support",
        description:
            "If you need help before, during or after your purchase, this is the place to be.",
        Icon: BuyingCartIcon,
    },
];

export default function SupportPage() {
    const [isHover, setIsHover] = useState(false);
    const [getId, setGetId] = useState(0);
    const data = [
        ...licenseData,
        ...supportData,
        ...accountData,
        ...copyrightData,
        ...TechnicalData,
        ...buyingData,
    ];
    console.log(data, "data*****&&&&&&");
    return (
        <>
            <Meta title="Support" />
            <Layout>
                <SupportHead
                    data={data}
                    title="How can we help you?"
                    description="make it easier or possible to do something by offering one's
            services or resources."
                />
                <div className="bg-surface-muted">
                    <div className="container py-[40px] sm:py-[60px] lg:pt-[41px] lg:pb-[40px] xl:py-[80px]">
                        <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2 lg:grid-cols-3 sm:gap-[24px] lg:gap-[30px] xl:gap-[24px] text-center place-content-center">
                            {supportCardData.map((item) => (
                                <SupportCard item={item} key={item.id} />
                            ))}
                        </div>
                        {/* Getting started */}
                        <div className="py-[40px] sm:py-[24px] lg:py-[40px] xl:pb-[40px] xl:pt-[80px] 2xl:pt-[24px] 3xl:pt-[80px]">
                            <h2 className="text-[24px] leading-[36px] sm:text-[32px] sm:leading-[42px] lg:text-[24px] lg:leading-[36px] xl:text-[40px] xl:leading-[60px] font-medium text-neutral">
                                Getting started
                            </h2>
                            <div className="grid grid-cols-1 pt-[26px] gap-[26px] sm:pt-[34px] lg:grid-cols-2 lg:gap-[30px] xl:gap-[24px] xl:pt-[50px] place-content-center">
                                {supportData.map((item, index) => (
                                    <div
                                        key={item.id}
                                        onMouseOver={() => {
                                            setIsHover(true), setGetId(item.id);
                                        }}
                                        onMouseLeave={() => {
                                            setIsHover(false),
                                                setGetId(item.id);
                                        }}
                                        className="group transition duration-600 border-b border-b-[#9AA5B5] hover:border-b-brand pb-[10px] cursor-pointer"
                                    >
                                        <Link
                                            href={`/support/${item.rootUrl}${item.url}`}
                                        >
                                            <div className="flex gap-[10px] lg:gap-[8px] xl:gap-[10px]">
                                                <NoteListIcon
                                                    color={
                                                        item.id === getId &&
                                                        isHover === true
                                                            ? "#7266FC"
                                                            : "#252C48"
                                                    }
                                                    width="24px"
                                                    height="24px"
                                                />
                                                <h1 className="text-[12px] leading-[18px] sm:text-[14px] sm:leading-[21px] font-normal lg:text-[16px] lg:leading-[19px] xl:leading-[24px] lg:font-medium group-hover:text-brand text-neutral">
                                                    {item.title}
                                                </h1>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <ContactCardBottom
                            title="If you can’t find your answer, Contact us here"
                            description="Can’t find the answer you’re looking for? Please chat to our
            friendly team."
                        />
                    </div>
                </div>
            </Layout>
        </>
    );
}
