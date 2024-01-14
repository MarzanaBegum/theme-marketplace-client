import React, { useState } from "react";
import HomeProductView from "../HomeProductView";
import ArrowTop from "../SvgCustomIcons/ArrowTop";
import AllProductViewCard from "./AllProductViewCard";
const tabData = [
    {
        title: "All products",
        link: "/",
    },
    {
        title: "Themes",
        link: "/",
    },
    {
        title: "Coded Templates",
        link: "/",
    },
    {
        title: "Icons",
        link: "/",
    },
    {
        title: "Illustrations",
        link: "/",
    },
    {
        title: "|",
        link: "/",
    },
    {
        title: "Images",
        link: "/",
    },
];

function AllProductFeatureCard() {
    const [cartColor, setCarColor] = useState(false);
    return (
        <div>
            <div className="relative px-[20px]">
                <div className="overflow-x-auto scrollbar-hide sm:container ">
                    <ul
                        className={`max-lg:mx-[20px] flex gap-6 transition-all duration-200 w-max`}
                    >
                        {tabData.map((v, i) => (
                            <li
                                key={i}
                                className="inline-block py-4 lg:py-6 lg:text-base lg:leading-[19.2px] text-sm leading-[18px] tracking-[.15%] font-medium cursor-pointer"
                                style={{
                                    color: i == 1 ? "#7266FC" : "#252C48",
                                }}
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
                <div className="py-5"></div>
                <AllProductViewCard />
                <div className="w-[100%] flex justify-center 3xl:mt-[70px] 2xl:mt-[60px] lg:mt-[30px] md:mt-[24px] mb-[20px]">
                    <button
                        onMouseOver={() => setCarColor(true)}
                        onMouseLeave={() => setCarColor(false)}
                        className="w-[139px] h-[40px] rounded-[4px] border border-[#9AA5B5]  mt-[25px]  flex justify-center items-center gap-[5px] text-[16px] text-[#252C48] font-semibold hover:bg-[#7266FC] hover:text-white"
                    >
                        View All
                        <span>
                            <ArrowTop
                                stroke={
                                    cartColor === true ? "white" : "#252C48"
                                }
                                width="24"
                                height="24"
                            />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AllProductFeatureCard;
