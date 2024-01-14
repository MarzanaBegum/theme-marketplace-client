import Link from "next/link";
import React from "react";

function ProductViewDetails({ data }: any) {
    return (
        <div className="bg-white rounded-md p-[10px] sm:p-[20px]">
            <div>
                <div className="text-lg leading-[1.5] font-medium text-neutral sm:text-xl xl:text-2xl ">
                    Related Product
                </div>
                <div className="pt-2"></div>
                <div className="text-sm sm:text-sm xl:text-base leading-[1.5] text-brand ">
                    {data?.categories?.map((v: any, i: number) => (
                        <Link
                            key={"categories_" + i}
                            href={`/product?category=${v}`}
                        >
                            <span className="hover:underline transit">{v}</span>
                            {", "}
                        </Link>
                    ))}
                </div>
                <div className="pt-5 sm:pt-6"></div>
                <div className="text-lg font-medium xl:text-2xl leading-[1.5] text-neutral sm:text-xl">
                    Tags
                </div>
                <div className="pt-2"></div>
                <div>
                    <div className="flex flex-wrap gap-4">
                        {data?.tags?.map((v: any, i: number) => (
                            <Link key={"tags_" + i} href={`/product`}>
                                <div className="border hover:text-brand hover:border-brand transit border-neutral p-[8px_20px] rounded-md text-xs text-neutral sm:text-sm xl:text-base">
                                    {v}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="pt-5 sm:pt-6"></div>
                <div className="text-lg sm:text-xl xl:text-2xl font-medium leading-[1.5] text-neutral">
                    Description
                </div>
                <div className="pt-2"></div>
                <div className="text-sm xl:text-base leading-[1.5] text-neutral">
                    {data?.description}
                </div>

                {/* Features area  */}
                {data?.features &&
                    data?.features.map((v: any, i: any) => (
                        <div key={i}>
                            <div className="pt-5 sm:pt-6"></div>
                            <div className="text-lg font-medium leading-[1.5] text-neutral sm:text-xl xl:text-2xl capitalize">
                                {v?.heading}
                            </div>
                            <div className="pt-2"></div>
                            <div>
                                <ul className="flex flex-col gap-2 list-inside">
                                    {v?.list.map((v: any, j: any) => (
                                        <li
                                            key={j}
                                            className="before:content-['\2022_\00a0_\00a0_\00a0'] xl:text-base capitalize before:relative before:left-[5px] text-brand text-sm leading-[1.5]"
                                        >
                                            {v}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default ProductViewDetails;
