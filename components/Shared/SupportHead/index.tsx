import React, { useState } from "react";
import { useRouter } from "next/router";

function SupportHead({
    title,
    description,
    data,
}: {
    title: string;
    description: string;
    data?: any;
}) {
    const [searchData, setSearchData] = useState("");
    const router = useRouter();
    const path = router.asPath.split("/")[2];
    const searchResult = data?.filter((v: any) =>
        v.title.toLowerCase().includes(searchData.toLocaleLowerCase())
    );
    console.log(path, "path))))))))))");
    return (
        <div>
            <div className="bg-neutral text-surface w-[100%] py-[40px] sm:py-[60px] xl:py-[80px] md:text-center">
                <div className="container">
                    <h2 className="mb-[8px] text-[24px] leading-[36px] sm:text-[32px] sm:leading-[42px] xl:text-[40px] xl:leading-[60px] font-medium">
                        {title}
                    </h2>
                    <h3 className="text-[12px] leading-[18px] mb-[20px] sm:mb-[24px] sm:text-[14px] sm:leading-[21px] xl:mb-[20px] xl:text-[16px] xl:leading-[24px] font-normal">
                        {description}
                    </h3>
                    <div className="flex border border-[#DDE2E4] px-[18px] sm:px-[18.25px] lg:px-[19px] w-[100%] md:w-[558px] lg:w-[519px] xl:w-[650px] mx-auto items-center h-[48px] lg:h-[54px] gap-[10px] rounded-[6px] text-[#9AA5B5] text-[14px] md:leading-[20px] lg:leading-[24px] font-normal relative">
                        <img
                            src="/img/search-icon.svg"
                            alt="searchIcon"
                            className="w-[18px] h-[18px]"
                        />
                        <input
                            type="text"
                            value={searchData}
                            onChange={(e: any) => setSearchData(e.target.value)}
                            className="bg-transparent outline-none w-[100%]"
                            name="search"
                            placeholder="Search here..."
                        />
                        {searchData !== "" && (
                            <div className="w-[100%] h-auto bg-white absolute rounded-[6px] top-[48px] lg:top-[53px] 3xl:top-[55px] right-0">
                                <div className="flex flex-col items-start gap-[15px] mt-2 mb-2">
                                    {searchResult?.map(
                                        (item: any, i: number) => (
                                            <div
                                                onClick={() =>
                                                    setSearchData("")
                                                }
                                                key={i}
                                                className="px-6 cursor-pointer hover:text-[#7266FC]"
                                            >
                                                {path !== undefined ? (
                                                    <a
                                                        href={`/support/${path}${item.url}`}
                                                    >
                                                        {item.title}
                                                    </a>
                                                ) : (
                                                    <a
                                                        href={`/support/${item.rootUrl}`}
                                                    >
                                                        {item.title}
                                                    </a>
                                                )}
                                            </div>
                                        )
                                    )}
                                    {searchResult?.length === 0 && (
                                        <p className="px-6">
                                            No result found !
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SupportHead;
