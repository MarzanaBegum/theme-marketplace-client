import React, { useEffect, useMemo, useState } from "react";
import InputRating from "../Shared/InputRating";
import RatingStar from "../Shared/RatingStar";
import ReviewItemModal from "./ReviewItemModal";
import { USER_STATE } from "../../state";
import { useAtom } from "jotai";
import { api } from "../../api";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "react-toastify";
import { decryptData } from "../../utils/hashdata";
import LoadingAnimation from "../LoadingAnimation";
import useFileSize from "../../api-call/useFileSize";

function DownloadItemCard({ data, refetch, rootData }: any) {
    const [rating, setRating] = useState(0);
    const [user] = useAtom(USER_STATE);
    const { data: size } = useFileSize(data?._id);
    const router = useRouter();

    const isRated = useMemo(
        () => data?.ratings?.find((v: any) => v.user == user?._id),
        [data]
    );

    const findRootData = useMemo(
        () => rootData?.find((v: any) => v?.productId?._id === data._id),
        [rootData]
    );

    const license = findRootData?.license;

    const licenseUrl = data?.licenses[license]?.pdf;

    const downloadLicense = () => {
        licenseUrl && router.push(licenseUrl);
    };

    const [downloadLoading, setDownloadLoading] = useState(false);

    const downloadFile = async () => {
        if (downloadLoading) return;
        setDownloadLoading(true);
        try {
            const { data: liveLinkData } = await api.post(
                "/products/source/download",
                {
                    productId: data._id,
                    userId: user?._id,
                }
            );
            const link = decryptData(liveLinkData);
            if (!link) throw new Error("Source file not found");
            await router.push(link);

            refetch();
            setDownloadLoading(false);
        } catch (err: any) {
            const errMessage = err.response
                ? err.response.data.message
                : err.message;
            setDownloadLoading(false);
            toast.error(errMessage);
        }
    };

    return (
        <>
            <div className="bg-white rounded-md">
                <div className="flex flex-col lg:flex-row">
                    <img
                        onClick={() => router.push(`/product/${data._id}`)}
                        className="w-[100%] cursor-pointer rounded-t xs:w-[335px] xs:h-[220px] sm:w-[288px] object-cover md:w-[322px] lg:w-[140px] lg:h-[100px] lg:pl-5 lg:pt-5"
                        src={data?.files?.thumbnail}
                        alt=""
                    />

                    <div className="p-[10px] lg:pt-5">
                        <Link href={`/product/${data._id}`}>
                            <div className="text-sm cursor-pointer sm:text-base leading-[1.5] font-semibold text-neutral line-clamp-1 ">
                                {data?.title}
                            </div>
                        </Link>
                        <div className="pt-[8px]"></div>

                        <div className="text-xs sm:text-sm 2xl:text-base leading-[1.5]">
                            File size : {size?.toFixed(2) || 0} MB
                        </div>
                        <div className="pt-[8px]"></div>

                        <div className="flex items-center gap-2 text-xs  sm:text-sm 2xl:text-base">
                            Rate this item:
                            {isRated ? (
                                <RatingStar
                                    rating={isRated.rating}
                                    className="gap-1 [&>img]:w-4 [&>img]:h-4"
                                />
                            ) : (
                                <div className="cursor-pointer">
                                    <InputRating
                                        value={rating}
                                        onChange={(v) => setRating(v)}
                                        className="gap-1 [&>img]:w-4 [&>img]:h-4"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-[10px] lg:p-5">
                    <div className="pt-[0px] border-b border-[#0000001A]"></div>
                    <div className="pt-4"></div>
                    <div className="flex items-center justify-between">
                        <div className="text-xs first-letter:uppercase 2xl:text-base leading-[1.5] sm:text-sm">
                            {findRootData?.license} license
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={downloadFile}
                                className="p-[10px] lg:p-[12px] hover:bg-brand-dark transition-all duration-200 bg-brand rounded-md "
                            >
                                {downloadLoading ? (
                                    <div className="w-[25px]">
                                        <LoadingAnimation color="#fff" />
                                    </div>
                                ) : (
                                    <img src="/icons/download.svg" alt="" />
                                )}
                            </button>
                            <button
                                onClick={downloadLicense}
                                className="p-[12px_24px]   sm:p-[10px_14px] hover:bg-brand transition-all duration-200  lg:p-[12px_24px] text-sm sm:text-base font-medium text-white bg-neutral rounded-md"
                            >
                                License
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ReviewItemModal
                modalOpen={rating ? true : false}
                handleModal={() => setRating(0)}
                rating={rating}
                setRating={setRating}
                refetch={refetch}
                data={data}
            />
        </>
    );
}

const getFileSize = async (url: string): Promise<number> => {
    if (!url) return 0;
    try {
        const { data } = await api.post("/bucket-store/file/size", { url });
        return data ? data / 1024 / 1024 : 0;
    } catch (err) {
        return 0;
    }
};

export default DownloadItemCard;
