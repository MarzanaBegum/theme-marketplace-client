import React from "react";
import HeartIcon from "../SvgCustomIcons/HeartIcon";
import { useQuery } from "react-query";
import usePricingQuery from "../../api-call/usePricingQuery";
import { useAtom } from "jotai";
import { USER_STATE } from "../../state";
import { useUserQuery } from "../Shared/ProtectedRoutes";
import { useRouter } from "next/router";
import { api } from "../../api";
import { toast } from "react-toastify";
import Link from "next/link";
import _ from "lodash";

function ProductViewUnpaid({ type }: { type: "plan" | "download" | boolean }) {
    const [user, setUser] = useAtom(USER_STATE);
    const { refetch } = useUserQuery(user?._id);

    const { data } = useQuery(["Get pricing data"], {
        ...usePricingQuery(),
        select: (d) => {
            return d
                ? d.find((v: any) =>
                      user
                          ? user.userStore.freebieUse
                              ? !v.isTrial
                              : v.isTrial
                          : v.isTrial
                  ) || undefined
                : undefined;
        },
    });

    const router = useRouter();
    const path = router.asPath;
    const productId = path.split("/")[2];

    const isExist = user?.userStore?.wishList?.includes(productId);

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
                                productId
                            ),
                        },
                    });
                await api.delete(
                    `/user-store/${user?.userStore?._id}/wishlist`,
                    {
                        data: {
                            productId,
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
                            wishList: user.userStore.wishList.concat(productId),
                        },
                    });
                await api.put(`/user-store/${user?.userStore?._id}/wishlist`, {
                    productId,
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

    if (!data) return <></>;

    return (
        <div className="bg-white rounded-md p-[10px] sm:p-5 w-full">
            <div className="flex justify-between items-center">
                <div className="text-[20px] sm:text-2xl leading-[1.5] font-bold text-neutral">
                    Want to download this item?
                </div>
                {user && (
                    <div onClick={handleWishlist} className="cursor-pointer">
                        <HeartIcon
                            color={isExist ? "#7266FC" : "none"}
                            stroke={isExist ? "#7266FC" : "#252C48"}
                        />
                    </div>
                )}
            </div>
            <div className="pt-2 "></div>
            <div className="text-xs text-brand  ">
                Get started with all the benefits of a premium ThemeHive
                subscription -{" "}
                {data.isTrial
                    ? "FREE for 7 days"
                    : `${data.price.monthly}$ for 30 days`}
                :
            </div>
            <div className="pt-4"></div>
            <div className="flex flex-col gap-3">
                {data?.features.map((v: any, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                        <img
                            className="w-6"
                            src={
                                v.isValid
                                    ? "/images/Checkmark.svg"
                                    : "/images/Closemark.svg"
                            }
                            alt=""
                        />
                        <div className="text-neutral-muted font-medium text-sm">
                            {v.text}
                        </div>
                    </div>
                ))}
            </div>
            <div className="pt-[30px]"></div>
            <div className="text-xs text-center w-[80%] mx-auto">
                {type ? (
                    <>
                        {type === "download" && (
                            <span className="text-error font-bold">
                                Your download limit in Trial subscription has
                                been expired, please upgrade now
                            </span>
                        )}
                        {type === "plan" && (
                            <span className="text-error font-bold">
                                Your plan has been expired, please upgrade now
                            </span>
                        )}
                    </>
                ) : (
                    "Unlimited Downloads for your creative works & more!"
                )}
            </div>
            <div className="pt-4"></div>
            <Link
                href={`/payment?type=subscription&id=${data._id}&interval=monthly`}
            >
                <button className="text-sm transition-all duration-200 hover:bg-brand-dark w-full rounded-md text-white bg-brand h-[48px]">
                    {data.isTrial
                        ? "Start 7-day Free Trial"
                        : `${data.title} - ${data.price.monthly}$ for 30 days`}
                </button>
            </Link>
        </div>
    );
}

export default ProductViewUnpaid;
