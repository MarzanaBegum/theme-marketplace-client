import Link from "next/link";
import React, { useState } from "react";
import { ProductType } from "../../api-call/useProductListQuery";
import HeartIcon from "../SvgCustomIcons/HeartIcon";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { USER_STATE } from "../../state";
import { API_URL, api } from "../../api";
import { toast } from "react-toastify";
import { useUserQuery } from "../Shared/ProtectedRoutes";
import _ from "lodash";

function ProductCard({ product }: { product: ProductType }) {
    const [user, setUser] = useAtom(USER_STATE);

    const isExist = user?.userStore?.wishList?.includes(product._id);

    const { refetch } = useUserQuery();

    const handleWishlist = async () => {
        try {
            if (isExist) {
                user &&
                    setUser({
                        ...user,
                        userStore: {
                            ...user?.userStore,
                            wishList: _.without(
                                user.userStore.wishList || [],
                                product._id
                            ),
                        },
                    });
                await api.delete(
                    `/user-store/${user?.userStore?._id}/wishlist`,
                    {
                        data: {
                            productId: product._id,
                        },
                    }
                );
                await refetch();
            } else {
                user &&
                    setUser({
                        ...user,
                        userStore: {
                            ...user?.userStore,
                            wishList: user.userStore.wishList.concat(
                                product._id
                            ),
                        },
                    });
                await api.put(`/user-store/${user?.userStore?._id}/wishlist`, {
                    productId: product._id,
                });
                await refetch();
            }
        } catch (err: any) {
            console.log(err);
            const errMessage = err.response
                ? err.response.data.message
                : err.message;
            toast.error(errMessage);
        }
    };

    return (
        <div className="bg-[#F8F8F8] transition-all duration-200 group lg:hover:bg-brand p-5 rounded-md">
            <div className="text-sm transition-all duration-200 lg:group-hover:text-white leading-[18px] tracking-[.15%] sm:text-base sm:leading-[27px] font-medium text-center w-[100%] truncate ">
                {product?.title}
            </div>
            <div>
                <div className="py-10">
                    <img
                        src={product?.files?.thumbnail}
                        className="w-full h-[225px] sm:h-[190px] lg:h-[214px] xl:h-[162px] 2xl:h-[214px] 3xl:h-[260px] object-cover"
                        alt=""
                    />
                </div>
            </div>
            <div className="flex items-center justify-between">
                <Link href={`/product/${product?._id}`}>
                    <button
                        className={`w-[90px] h-[40px] rounded-md text-xs sm:text-sm sm:leading-[21px] leading-[18px] tracking-[1.25%] text-[#252C48] bg-white hover:bg-[#dfdcdc] font-medium`}
                    >
                        Preview
                    </button>
                </Link>
                {user && (
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        initial={false}
                        onClick={handleWishlist}
                        className="cursor-pointer"
                    >
                        <HeartIcon
                            color={isExist ? "#7266FC" : "none"}
                            stroke={isExist ? "#7266FC" : "#828282"}
                            groupClassName={
                                isExist
                                    ? "lg:group-hover:stroke-white lg:group-hover:fill-white"
                                    : "lg:group-hover:stroke-white"
                            }
                        />
                    </motion.div>
                )}

                {/* <div className="text-base transition-all duration-200 group-hover:text-white leading-[40px] font-semibold">
            $499.00
          </div> */}
            </div>
            <div className="pt-5 border-b border-[rgba(0,0,0,.15)]"></div>
            <div className="pt-4"></div>
            <div className="flex items-center justify-center gap-5">
                {product?.softwares?.map((v, i) => (
                    <div key={i}>
                        <img
                            className="w-6 h-6"
                            src={`${API_URL}/softwares/${v}.png`}
                            alt=""
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductCard;
