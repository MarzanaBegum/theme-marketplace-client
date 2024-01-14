/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const Drawer = dynamic(() => import("react-modern-drawer"), {
    ssr: false,
});

import "react-modern-drawer/dist/index.css";
import { socialData } from "../../utils/constant";
import {
    Download,
    Billing,
    Notification,
    Setting,
    Logout,
} from "../SvgCustomIcons";
import Link from "next/link";
import { useAtom } from "jotai";
import { USER_STATE } from "../../state";
import Signin from "../SvgCustomIcons/Signin";
import CreateAccount from "../SvgCustomIcons/CreateAccount";
import Pricing from "../SvgCustomIcons/PricingIcon";
import classNames from "classnames";
import usePlanAvailable from "../../hooks/usePlanAvailable";
import { useDownloadLeft } from "../Shared/Layout/Header";

const profile = [
    {
        id: 1,
        title: "Downloads",
        Icon: Download,
        url: "downloads",
    },
    {
        id: 2,
        title: "Billings",
        Icon: Billing,
        url: "billing",
    },
    {
        id: 3,
        title: "Notifications",
        Icon: Notification,
        url: "notifications",
    },
    {
        id: 4,
        title: "Settings",
        Icon: Setting,
        url: "settings",
    },
    {
        id: 5,
        title: "Log out",
        Icon: Logout,
        url: "logout",
    },
];
const menu = [
    {
        id: 1,
        title: "Sign in",
        Icon: Signin,
        url: "/signin",
    },
    {
        id: 2,
        title: "Create an account",
        Icon: CreateAccount,
        url: "/signup",
    },
    {
        id: 3,
        title: "Pricing",
        Icon: Pricing,
        url: "/#pricing",
    },
];

const MobileDrawer = ({ toggleDrawer, isOpen, totalProduct }: any) => {
    // const myMenuItems = teamData.role === "admin" ? menuItems : userMenuItems;
    const [iconColor, setIconColor] = useState(false);
    const [getIndex, setIndex] = useState<any>({});
    const router = useRouter();
    const [user] = useAtom(USER_STATE);

    const mouseOver = (id: number) => {
        if (id) setIconColor(true);
    };
    const mouseLeave = (id: number) => {
        if (id) setIconColor(false);
    };

    const isPlan = usePlanAvailable();

    const { isLimit, downloaded, totalLimit } = useDownloadLeft();

    return (
        <>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction="right"
                className="!w-[100%] xs:!w-[295px] sm:!w-[360px] md:!w-[384px]"
                // size="45%"
                style={{ backgroundColor: "#FFFFFF" }}
            >
                <div className="drawer container1 w-[100%]">
                    <div className="container2 px-[20px] py-[34px]">
                        <div className="flex justify-between">
                            <img
                                src="/logo/logo-icon.svg"
                                alt=""
                                className="w-[30px]"
                            />
                            <img
                                onClick={toggleDrawer}
                                src="/images/xicon.svg"
                                alt="X "
                                className="w-[24px] h-[24px] cursor-pointer hover:rotate-180"
                            />
                        </div>
                        {/* unlimited access button  */}
                        <Link href={isPlan ? "/products" : "/unlimited-access"}>
                            <div className="w-[100%] h-[48px] bg-[#7266FC] transition duration-500 hover:bg-[#574dc4] mt-[40px] rounded-[6px] flex justify-center gap-[8px] items-center cursor-pointer">
                                <img
                                    src="/images/diamondIcon.svg"
                                    alt=""
                                    className="w-[16px] h-[14px]"
                                />
                                <p className="text-white text-[12px] font-medium tracking-[1.25px]">
                                    {isPlan
                                        ? "Explore All Products"
                                        : "Get unlimited access"}
                                </p>
                            </div>
                        </Link>
                        {/* category section  */}
                        <div className="uppercase text-[#9AA5B5] text-[12px] font-semibold mt-[40px] ">
                            Categories
                        </div>
                        {/*--- map category --- */}
                        <div className="flex flex-col  mt-[24px]">
                            {totalProduct &&
                                totalProduct?.map(
                                    (
                                        {
                                            id,
                                            title,
                                            Icon,
                                            url,
                                            totalNumber,
                                        }: any,
                                        i: any
                                    ) => (
                                        <Link
                                            href={`/${url}`}
                                            passHref
                                            key={id}
                                        >
                                            <div
                                                onMouseOver={() => {
                                                    mouseOver(id), setIndex(id);
                                                }}
                                                onMouseLeave={() => {
                                                    mouseLeave(id),
                                                        setIndex(id);
                                                }}
                                                onClick={toggleDrawer}
                                                className={classNames(
                                                    `${
                                                        totalNumber === 0
                                                            ? "hidden"
                                                            : "flex items-center justify-between last:mb-0 cursor-pointer pb-[26px] group"
                                                    } `
                                                )}
                                            >
                                                <div className="flex gap-[10px] items-center">
                                                    <Icon
                                                        width="15"
                                                        height="14"
                                                        stroke={`${
                                                            id === getIndex &&
                                                            iconColor === true
                                                                ? "#7266FC"
                                                                : "#3B415A"
                                                        }`}
                                                    />
                                                    <p className="text-[#252C48] font-medium text-[14px] tracking-[0.15%] group-hover:text-[#7266FC]">
                                                        {title}
                                                    </p>
                                                </div>
                                                <p className="group-hover:text-[#7266FC] text-[#252C48] font-medium text-[16px]">
                                                    {totalNumber}
                                                </p>
                                            </div>
                                        </Link>
                                    )
                                )}
                        </div>
                        {/* category section end */}

                        {user ? (
                            <div>
                                {/* profile section  */}
                                <div className="uppercase text-[#9AA5B5] text-[12px] font-semibold mt-[29px] ">
                                    profile
                                </div>
                                {/*--- map profile --- */}
                                <div className="flex flex-col gap-[26px] mt-[20px]">
                                    {profile.map(({ id, title, Icon, url }) => (
                                        <Link
                                            href={`/account/${url}`}
                                            passHref
                                            key={id}
                                        >
                                            <div
                                                key={id}
                                                onMouseOver={() => {
                                                    mouseOver(id), setIndex(id);
                                                }}
                                                onMouseLeave={() => {
                                                    mouseLeave(id),
                                                        setIndex(id);
                                                }}
                                                onClick={toggleDrawer}
                                                className="flex w-full flex-row items-center gap-[10px] group cursor-pointer"
                                            >
                                                <Icon
                                                    width="15"
                                                    height="14"
                                                    stroke={`${
                                                        id === getIndex &&
                                                        iconColor === true
                                                            ? "#7266FC"
                                                            : "#3B415A"
                                                    }`}
                                                />
                                                <div className="text-[#252C48] flex items-center justify-between font-medium text-[14px] w-[calc(100%-25px)] tracking-[0.15%] group-hover:text-[#7266FC]">
                                                    <div>{title}</div>
                                                    {isLimit &&
                                                        title ===
                                                            "Downloads" && (
                                                            <div className="text-sm">
                                                                {downloaded}/
                                                                {totalLimit}
                                                            </div>
                                                        )}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                {/* profile section end */}
                            </div>
                        ) : (
                            <div>
                                <div className="uppercase text-[#9AA5B5] text-[12px] font-semibold mt-[14px]">
                                    Menu
                                </div>
                                <div className="flex flex-col gap-[26px] mt-[24px]">
                                    {menu.map(({ id, title, Icon, url }) => (
                                        <Link href={`${url}`} passHref key={id}>
                                            <div
                                                key={id}
                                                onMouseOver={() => {
                                                    mouseOver(id), setIndex(id);
                                                }}
                                                onMouseLeave={() => {
                                                    mouseLeave(id),
                                                        setIndex(id);
                                                }}
                                                onClick={toggleDrawer}
                                                className="flex flex-row items-center gap-[10px] group cursor-pointer"
                                            >
                                                <Icon
                                                    width="15"
                                                    height="14"
                                                    stroke={`${
                                                        id === getIndex &&
                                                        iconColor === true
                                                            ? "#7266FC"
                                                            : "#3B415A"
                                                    }`}
                                                />
                                                <p className="text-[#252C48] font-medium text-[14px] tracking-[0.15%] group-hover:text-[#7266FC]">
                                                    {title}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-[40px]">
                            <div className="text-[#9AA5B5] text-[12px] font-semibold mb-[24px]">
                                CONNECT WITH US
                            </div>
                            <div className="flex gap-[20px]">
                                {socialData.map((item, index) => (
                                    <div key={index}>
                                        <img
                                            src={item.img}
                                            alt=""
                                            className="w-[18px] h-[18px] cursor-pointer"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>
        </>
    );
};

export default MobileDrawer;
