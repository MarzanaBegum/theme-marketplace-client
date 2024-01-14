import { NextPage } from "next";
import { useState } from "react";
import { pageUrl } from "../../utils/constant";
import { Linkin, Facebook, Instragram, Twitter } from "../SvgCustomIcons";
import MoboUrl from "../MoboUrl";
import Link from "next/link";

const listUrl = [
    {
        id: 1,
        title: "Home",
        url: "/",
    },
    {
        id: 2,
        title: "Products",
        url: "/product",
    },
    {
        id: 3,
        title: "Pricing",
        url: "/unlimited-access",
    },
];

const socialICon = [
    {
        id: 1,
        url: "#",
        Icon: Linkin,
    },
    {
        id: 2,
        url: "#",
        Icon: Facebook,
    },
    {
        id: 3,
        url: "#",
        Icon: Instragram,
    },
    {
        id: 4,
        url: "#",
        Icon: Twitter,
    },
];

const FooterSocial: NextPage = () => {
    const [iconColor, setIconColor] = useState(false);
    const year = new Date().getFullYear();
    // console.log(year, "year...");
    const [getIndex, setIndex] = useState<any>({});
    const mouseOver = (id: number) => {
        if (id) setIconColor(true);
    };
    const mouseLeave = (id: number) => {
        if (id) setIconColor(false);
    };
    return (
        <div className="w-[100%] 2xl:mt-[76px] lg:mt-[32px] mt-[24px]">
            <div className="flex flex-col-reverse items-center justify-between lg:flex-row">
                <div className="hidden lg:block lg:w-[174px]">
                    <Link href={"/"}>
                        <img
                            src="/logo/logo-icon.svg"
                            alt="brand logo"
                            className="w-[61px] h-[38.53px] hidden self-start lg:block "
                        />
                    </Link>
                </div>

                <div className="hidden md:block">
                    <ul className="flex flex-row lg:gap-[40px] gap-[20px]">
                        {listUrl.map((item, i) => (
                            <Link
                                href={item.url}
                                passHref
                                key={"chokher_nojor" + i}
                            >
                                <li className="text-white font-normal text-[14px] lg:text-[16px] 2xl:text-[18px] cursor-pointer hover:text-[#7266FC]">
                                    {item.title}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>

                <MoboUrl />

                <hr className=" w-full bg-[#575050] opacity-10 mt-[24px] mb-[24px] lg:hidden" />
                {/* social icon  */}
                <div className="flex  gap-[34px]">
                    {socialICon.map(({ id, Icon, url }, i) => (
                        <ul key={"merapyar" + i}>
                            <li
                                onMouseOver={() => {
                                    mouseOver(id), setIndex(id);
                                }}
                                onMouseLeave={() => {
                                    mouseLeave(id), setIndex(id);
                                }}
                                className="flex cursor-pointer"
                            >
                                <Icon
                                    width="18"
                                    height="18"
                                    stroke={`${
                                        id === getIndex && iconColor === true
                                            ? "#7266FC"
                                            : "#FFFFFF"
                                    }`}
                                />
                            </li>
                        </ul>
                    ))}
                </div>
            </div>

            {/* hr line  */}
            <hr className=" w-full bg-[#575050] opacity-10 2xl:mt-[34px] mt-[32px] 2xl:mb-[20px] mb-[30px] hidden lg:block" />
            {/* footer bottom section  */}
            <div className="flex flex-col-reverse justify-between lg:flex-row">
                <p className="text-[white] text-[12px] xl:text-[16px] font-medium text-center">
                    © {year} ThemeHive. All right reserved
                </p>
                <hr className=" w-full bg-[#575050] opacity-10 mt-[24px] mb-[24px] lg:hidden" />
                <div className="mt-[28px] lg:mt-0 hidden md:block">
                    <ul className="flex gap-[16px] lg:gap-[40px] justify-center">
                        {pageUrl.map((item, index) => (
                            <Link href={item.url} key={"dukhimanus" + index}>
                                <li className="cursor-pointer text-[white] hover:text-[#7266FC] text-[14px] lg:text-[16px]">
                                    {item.title}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default FooterSocial;
