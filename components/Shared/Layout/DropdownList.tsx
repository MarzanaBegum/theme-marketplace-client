import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function DropdownList({ data, dropdown }: any) {
    const router = useRouter();

    function checkArea(str: string) {
        return router.asPath.includes(str);
    }

    return (
        <div>
            {data?.map(({ Icon, id, title, url, totalNumber }: any) => (
                <Link
                    href={`/${url}`}
                    onClick={() => {
                        dropdown(false);
                    }}
                    passHref
                    key={id}
                >
                    <div
                        key={id}
                        aria-disabled={checkArea(url)}
                        className="mb-[20px] aria-disabled:border-l-[#7266FC] last:mb-0 group border-l-[4px] border-[#fff] rounded-r-full hover:border-l-[#7266FC] pl-[6px] pr-[16px]"
                    >
                        <div
                            className={classNames(
                                `${
                                    totalNumber === 0
                                        ? "hidden"
                                        : "flex items-center justify-between group-aria-disabled:bg-[#eeecf7bb] last:mb-0 cursor-pointer hover:bg-[#eeecf7bb] py-[10px] px-[10px] rounded-[6px] group"
                                } `
                            )}
                        >
                            <div className="flex gap-[14px] items-center">
                                <Icon
                                    width="20"
                                    height="18"
                                    stroke="#3B415A"
                                    groupClassName="group-hover:stroke-[#7266FC] group-aria-disabled:stroke-[#7266FC]"
                                />
                                <p className="text-[16px] group-aria-disabled:text-[#7266FC] text-[#252C48] font-medium group-hover:text-[#7266FC]">
                                    {title}
                                </p>
                            </div>
                            <p className="group-hover:text-[#7266FC] text-[#252C48] font-medium text-[16px]">
                                {totalNumber}
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default DropdownList;
