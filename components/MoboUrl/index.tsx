import React from "react";
import { moboUrlLeft, moboRightUrl } from "../../utils/constant";
import Link from "next/link";

const MoboUrl = () => {
    return (
        <div className="md:hidden w-[100%] ">
            <div className="flex justify-between">
                <div className="">
                    <ul className="flex flex-col gap-[24px]">
                        {moboUrlLeft.map((item, i) => (
                            <Link href={item.url} key={"kopal_kharap" + i}>
                                <li
                                    key={item.id}
                                    className="font-medium text-[14px] tracking-[0.15%] cursor-pointer hover:text-[#7266FC]"
                                >
                                    {item.title}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </div>
                <div>
                    <ul className="flex flex-col gap-[24px]">
                        {moboRightUrl.map((item, i) => (
                            <Link key={"jibon_" + i} href={item.url}>
                                <li className="font-medium text-[14px] tracking-[0.15%] cursor-pointer hover:text-[#7266FC]">
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

export default MoboUrl;
