import React, { useEffect, useMemo } from "react";
import FilterWrapper from "../Shared/FilterWrapper";
import Pagination from "../Shared/Pagination";
import DownloadItemCard from "./DownloadItemCard";
import useDownloadProducts from "../../api-call/useDownloadProducts";
import LoadingAnimation from "../SvgCustomIcons/LoadingAnimation";
import Link from "next/link";

function MyDownloadsPage() {
    const { data: rootData, refetch, isLoading } = useDownloadProducts();

    const productData = useMemo(
        () => rootData?.map((v) => v.productId),
        [rootData]
    );
    return (
        <div>
            <div className="w-full bg-neutral-muted">
                <div className="container py-10 sm:py-[60px] lg:py-[80px] text-surface">
                    <div className="text-2xl xl:text-[40px] xl:leading-[60px] leading-9 font-medium sm:text-[32px] sm:leading-[42px]">
                        My Downloads
                    </div>
                    <div className="pt-2"></div>
                    <div className="text-xs xl:text-base xl:leading-6 leading-[18px] sm:text-sm sm:leading-[21px]">
                        Check when items from your lists drop in price
                    </div>
                </div>
            </div>
            <div className="bg-[#EFF3FB] pb-[50px]">
                {productData ? (
                    <FilterWrapper data={productData}>
                        {(data) => (
                            <div>
                                <Pagination
                                    className={`pt-6 pb-10`}
                                    itemsPerPage={10}
                                    dataArr={data}
                                >
                                    {(data) => (
                                        <div
                                            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6  pb-4`}
                                        >
                                            {data.map((v, i) => (
                                                <DownloadItemCard
                                                    key={i}
                                                    data={v}
                                                    refetch={refetch}
                                                    rootData={rootData}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </Pagination>
                            </div>
                        )}
                    </FilterWrapper>
                ) : isLoading ? (
                    <div className="flex gap-4 bg-surface-muted items-center h-[400px] lg:h-[500px] justify-center">
                        <LoadingAnimation
                            width={32}
                            height={32}
                            color="#7266FC"
                        />
                        <div className="text-2xl text-neutral-muted font-medium">
                            Loading...
                        </div>
                    </div>
                ) : (
                    <div className="flex bg-surface-muted flex-col items-center justify-center h-[400px] lg:h-[500px]">
                        <img
                            src="/icons/nowishlist.png"
                            alt=""
                            className=" w-[300] lg:w-[500px]"
                        />
                        <div>No downloads found</div>
                        <div>
                            <Link href={"/product"}>
                                <button className="bg-brand transit text-white font-medium w-[200px] h-[48px] rounded mt-[20px] hover:bg-brand-dark">
                                    Explore products
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyDownloadsPage;
