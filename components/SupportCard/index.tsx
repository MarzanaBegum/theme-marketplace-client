import React, { useState } from "react";
import { useRouter } from "next/router";

const SupportCard = ({ item }: any) => {
    const [ishover, setHover] = useState(false);
    const url = item.title.split(" ")[0].toLowerCase();
    const router = useRouter();

    const handleClick = () => {
        router.push(`/support/${url}`);
    };
    return (
        <div
            onMouseOver={() => {
                setHover(true);
            }}
            onMouseLeave={() => {
                setHover(false);
            }}
            onClick={handleClick}
            className="group bg-white hover:bg-[#7266FC] transition duration-600 cursor-pointer p-[20px] lg:py-[28px] lg:px-[24.5px] xl:px-[25.5px] 2xl:px-[38px] rounded-[6px]"
        >
            <item.Icon
                color={ishover === true ? "#FFFFFF" : "#252C48"}
                width="60px"
                height="60px"
                className="h-[40px] w-[40px] lg:w-[60px] lg:h-[60px] mx-auto"
            />
            <h2 className="text-[24px] leading-[36px] my-[16px] sm:text-[20px] sm:leading-[30px] font-medium 3xl:my-[24px] xl:text-[24px] xl:leading-[36px] xl:font-semibold text-neutral group-hover:text-white">
                {item.title}
            </h2>
            <p className="text-[12px] leading-[18px] sm:text-[14px] sm:leading-[21px] lg:leading-[20px] xl:text-[16px] xl:leading-[24px] font-normal text-neutral-muted group-hover:text-[#e7eaec]">
                {item.description}
            </p>
        </div>
    );
};

export default SupportCard;
