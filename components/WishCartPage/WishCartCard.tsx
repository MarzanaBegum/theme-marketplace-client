import React, { useState } from "react";
import RatingStar from "../Shared/RatingStar";
import { ProductType } from "../../api-call/useProductListQuery";
import { useRatingsData } from "../ProductViewComponent/ProductViewHeader";
import { API_URL, api } from "../../api";
import { useAtom } from "jotai";
import { USER_STATE } from "../../state";
import LoadingAnimation from "../LoadingAnimation";
import Link from "next/link";
import CrossIcon from "../../components/CustomIcons/CrossIcon";

import { motion } from "framer-motion";
import { useQueryClient } from "react-query";
import _ from "lodash";
import HeartIcon from "../SvgCustomIcons/HeartIcon";

function WishCartCard({ data, refetch }: { data: ProductType; refetch: any }) {
    const { rating, totalRating } = useRatingsData(data);
    const [user, setUser] = useAtom(USER_STATE);

    const [loading, setLoading] = useState(false);

    const handleWishlistRemove = async () => {
        if (loading) return;
        setLoading(true);
        try {
            await api.delete(`/user-store/${user?.userStore._id}/wishlist`, {
                data: { productId: data._id },
            });
            await refetch();

            user &&
                setUser({
                    ...user,
                    userStore: {
                        ...user?.userStore,
                        wishList: _.without(
                            user?.userStore.wishList || [],
                            data._id
                        ),
                    },
                });

            setLoading(false);
        } catch (err: any) {
            const errMessage = err.response
                ? err.response.data.message
                : err.message;
            setLoading(false);
        }
    };

    return (
        <Link
            href={`/product/${data._id}`}
            className="lg:w-full lg:p-5 group hover lg:hover:bg-brand transit rounded-md overflow-hidden sm:w-[calc(100%/2-12px)] relative lg:flex  bg-white lg:justify-between"
        >
            <div className="lg:flex">
                <div className="w-full h-[190px] lg:w-[160px]  lg:h-[140px]">
                    <img
                        src={data?.files?.thumbnail}
                        className="object-cover w-full rounded h-full"
                        alt=""
                    />
                </div>
                <div className="p-[10px] lg:py-[11px] lg:pl-4  pb-5">
                    <div className="flex items-center justify-between">
                        <div className="text-sm transit lg:group-hover:text-white font-medium leading-6 text-neutral lg:text-base lg:leading-[19.2px] capitalize">
                            {data?.type}
                        </div>
                    </div>
                    <div className="pt-2 lg:pt-1"></div>
                    <div className="text-lg lg:text-xl transit lg:group-hover:text-white lg:leading-[30px] leading-[27px] text-[#252C48] font-medium capitalize">
                        {data?.title}
                    </div>
                    <div className="pt-2 lg:pt-4"></div>

                    <div>
                        <div className="flex items-center gap-[13px]">
                            {data.softwares?.map((v, i) => (
                                <div key={"product_icon_" + i}>
                                    <img
                                        className="w-4 h-4 lg:w-6 lg:h-6"
                                        src={`${API_URL}/softwares/${v}.png`}
                                        alt=""
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mt-1">
                            <RatingStar
                                width={17}
                                height={17}
                                rating={rating}
                            />
                            <div className="text-sm transit lg:group-hover:text-white leading-[20px]">
                                {totalRating}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleWishlistRemove();
                    }}
                    className="absolute w-10 h-10 rounded-full flex justify-center top-[10px] right-[10px] items-center bg-white shadow-[2px_2px_8px_rgba(0,0,0,0.06)] lg:hidden"
                >
                    {loading ? (
                        <LoadingAnimation color="#7266FC" />
                    ) : (
                        <HeartIcon
                            className="scale-90"
                            color={"#7266FC"}
                            stroke={"#7266FC"}
                        />
                    )}
                </div>
            </div>
            <div className="flex flex-col items-end justify-between max-lg:hidden">
                {loading ? (
                    <div>
                        <LoadingAnimation
                            groupClassName="md:group-hover:fill-white"
                            color="#7266FC"
                        />
                    </div>
                ) : (
                    <motion.div
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            handleWishlistRemove();
                        }}
                        whileHover={{ scale: 1.3 }}
                        transition={{ duration: 0.2 }}
                        whileTap={{ scale: 0.7 }}
                    >
                        {/* <CrossIcon groupClassName="lg:group-hover:stroke-white transit" />
                         */}
                        <HeartIcon
                            color={"#7266FC"}
                            stroke={"#7266FC"}
                            groupClassName="lg:group-hover:stroke-white lg:group-hover:fill-white transit"
                        />
                    </motion.div>
                )}

                <a
                    href={`/product/${data?._id}`}
                    className="text-xl hidden font-semibold cursor-pointer text-brand"
                >
                    Download
                </a>
                <div></div>
            </div>
        </Link>
    );
}

export default WishCartCard;
