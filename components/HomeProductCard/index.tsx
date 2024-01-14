import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useState, useEffect, useMemo } from "react";
import HomeProductView from "../HomeProductView";
import ArrowTop from "../SvgCustomIcons/ArrowTop";
import ArrowTopRight from "../SvgCustomIcons/ArrowTopRight";
import { useQuery } from "react-query";
import ProductQuery from "../../api-call/ProductQuery";
import { api } from "../../api";
import Link from "next/link";
import useHomeProductQuery from "../../api-call/useHomeProductQuery";

const tabData = [
    {
        title: "All products",
        type: "all",
    },
    {
        title: "Themes",
        type: "theme",
    },
    {
        title: "Coded Templates",
        type: "template",
    },
    {
        title: "Icons",
        type: "icon",
    },
    {
        title: "Illustrations",
        type: "illustration",
    },
    {
        title: "|",
        type: "",
    },
    {
        title: "Images",
        type: "image",
    },
];

function HomeProductCard() {
    const [productType, setProductType] = useState("all");

    const { data, isLoading } = useHomeProductQuery(productType);

    const types = useMemo(() => ["all"].concat(data?.types || []), [data]);

    return (
        <div>
            <div className="relative">
                <div className="overflow-x-auto scrollbar-hide sm:container ">
                    <ul
                        className={`max-lg:mx-[20px] flex gap-6 transition-all duration-200 w-max sm:w-full sm:justify-center`}
                    >
                        {tabData.map((v, i) => (
                            <li
                                key={i}
                                onClick={() => setProductType(v?.type)}
                                className={classNames(
                                    `${
                                        v.type === productType
                                            ? "text-[#7266FC]"
                                            : "text-[#252C48]"
                                    } ${
                                        types && types?.includes(v.type)
                                            ? "block"
                                            : "hidden"
                                    } whitespace-nowrap inline-block py-4 lg:py-6 lg:text-base lg:leading-[19.2px] text-sm hover:text-brand leading-[18px] tracking-[.15%] font-medium transit cursor-pointer`
                                )}
                            >
                                {v.title}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-full sm:container">
                    <div
                        className={`border-b w-full transition-all duration-200 border-[rgba(0,0,0,.15)]`}
                    ></div>
                </div>
                <div className="pt-5 sm:pt-6 lg:pt-[30px] xl:pt-10 2xl:pt-14"></div>
                <HomeProductView
                    products={data?.products}
                    isLoading={isLoading}
                />
                <div className="pt-6 md:pt-8 lg:pt-14 "></div>

                <div className="flex justify-center">
                    <Link href={"/product"}>
                        <button className="flex group text-sm lg:text-base items-center font-semibold justify-center gap-2 p-[10px_24px] lg:p-[12px_30px] xl:p-[16px_32px] border border-[#9AA5B5] transition-all duration-200 hover:bg-brand rounded-md">
                            <div className="transition-all duration-200 group-hover:text-white text-neutral">
                                View All
                            </div>
                            <ArrowTopRight
                                className="w-5 h-5"
                                groupClassName="group-hover:stroke-white scale-[.9] stroke-neutral transition-all duration-200"
                            />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HomeProductCard;
