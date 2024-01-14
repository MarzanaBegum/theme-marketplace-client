import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import HeartIcon from "../SvgCustomIcons/HeartIcon";
import InfoIcon from "../SvgCustomIcons/InfoIcon";
import ShoppingCart from "../SvgCustomIcons/ShoppingCart";
import { useRouter } from "next/router";
import { api } from "./../../api/index";
import { useAtom } from "jotai";
import { USER_STATE } from "../../state";
import { toast } from "react-toastify";
import { useUserQuery } from "../Shared/ProtectedRoutes";
import _ from "lodash";
import { ProductType } from "../../api-call/useProductListQuery";
import { AnimatePresence, motion } from "framer-motion";
import { productSupportData } from "../../data/fixed";
import usePaymentMethod from "../../api-call/usePaymentMethod";
import useSingleDownloadedProduct from "../../api-call/useSingleDownloadedProduct";
import LicenseItem from "./LicenseItem";
import { getRemainingDate } from "../BillingPageComponent/BillingFirstCard";
import ReviewItemModal from "../MyDownloadsPage/ReviewItemModal";
import { useQuery } from "react-query";
import RatingStar from "../Shared/RatingStar";
import InputRating from "../Shared/InputRating";
import LoadingAnimation from "../LoadingAnimation";
import CompletePayment from "../../utils/CompletePayment";
import { decryptData } from "../../utils/hashdata";
import { Tooltip } from "react-tooltip";

type FormType = {
    license: LicenseType;
    services: number[];
    support: number;
};

type LicenseType = "personal" | "commercial" | "buyout";

function ProductViewPaid({
    data,
    productRefetch,
}: {
    data: ProductType;
    productRefetch: any;
}) {
    const [user, setUser] = useAtom(USER_STATE);
    const { refetch } = useUserQuery(user?._id);
    const [rating, setRating] = useState(0);

    const router = useRouter();
    const path = router.asPath;
    const productId = path.split("/")[2];

    const isRated = useMemo(
        () => data?.ratings?.find((v: any) => v?.user?._id == user?._id),
        [data]
    );

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

    const { data: paymentMethod } = usePaymentMethod();

    const { data: downloadProduct, refetch: refetchDownload } =
        useSingleDownloadedProduct();

    const isDownloaded = !!downloadProduct?.isDownloaded;

    const filterDownloadedService =
        downloadProduct?.services?.map((v: any) => v.text) || [];

    const filterServices = data?.services?.filter(
        (v) => !filterDownloadedService.includes(v.text)
    );

    const supportLeft = useSupportLeft(
        downloadProduct?.support?.start,
        downloadProduct?.support?.end
    );

    const filterSupport = productSupportData.filter((v) =>
        !supportLeft ? v : v.text !== downloadProduct?.support?.text
    );

    const [openLicense, setOpenLicense] = useState(false);

    const [form, setForm] = useState<FormType>({
        license: "personal",
        services: [],
        support: NaN,
    });

    const totalPrice = useMemo(() => {
        const licensePrice =
            downloadProduct?.license == form.license
                ? 0
                : data?.licenses[form.license]?.price;
        const servicePriceArr = filterServices?.filter((v, i) =>
            form.services.includes(i)
        );
        let servicePrice = 0;
        servicePriceArr?.forEach((v) => {
            servicePrice += v.price;
        });
        let supportPrice = 0;

        const findSupport = filterSupport.find((v, i) => i == form.support);
        if (findSupport) {
            supportPrice = findSupport?.price;
        }

        return Number(licensePrice) + servicePrice + supportPrice;
    }, [form, data]);

    useEffect(() => {
        setOpenLicense(downloadProduct ? false : true);

        downloadProduct &&
            setForm((s) => ({
                ...s,
                license: downloadProduct?.license as any,
            }));
    }, [downloadProduct]);

    const [downloadLoading, setDownloadLoading] = useState(false);

    const handleDownload = async () => {
        if (downloadLoading) return;
        setDownloadLoading(true);
        try {
            const { data: liveLinkData } = await api.post(
                "/products/source/download",
                {
                    productId,
                    userId: user?._id,
                    license: form.license,
                }
            );
            const link = decryptData(liveLinkData);
            if (!link) throw new Error("Source file not found");
            await router.push(link);
            refetch();
            refetchDownload();
            setDownloadLoading(false);
        } catch (err: any) {
            const errMessage = err.response
                ? err.response.data.message
                : err.message;
            toast.error(errMessage);
            setDownloadLoading(false);
        }
    };

    const downloadLicense = () => {
        router.push(
            data?.licenses[downloadProduct?.license as LicenseType].pdf
        );
    };

    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const oneClickCheckout = async () => {
        if (checkoutLoading) return;
        setCheckoutLoading(true);
        try {
            if (!totalPrice || !paymentMethod)
                throw new Error("Required data not found");

            await CompletePayment({
                amount: totalPrice * 100,
                customer: paymentMethod.customer,
                payment_method: paymentMethod.id,
            });

            // support
            const findSupport = filterSupport?.find(
                (v, i) => i == form.support
            );
            const supportEnd = new Date();
            supportEnd?.setDate(supportEnd.getDate() + (findSupport?.day || 0));

            // service
            const findFilterSupport = filterServices?.filter((v, i) =>
                form.services.includes(i)
            );

            // license
            const findLicense = form.license;

            // req api obj
            const apiObj = {
                userId: user?._id,
                productId,
                license: findLicense,
                services: findFilterSupport,
                support: findSupport && {
                    ...findSupport,
                    start: new Date(),
                    end: supportEnd,
                },
            };

            let response: any;

            if (downloadProduct) {
                const { data: dp2 } = await api.put(
                    "/products/download/data",
                    apiObj
                );
                response = dp2;
            } else {
                const { data: dp1 } = await api.post(
                    "/products/download/data",
                    apiObj
                );
                response = dp1;
            }

            await api.post("/billing", {
                userId: user?._id,
                downloadProduct: response?._id,
                amount: totalPrice,
            });

            await api.post(`/notifications`, {
                userId: user?._id,
                title: "Payment successful",
                description: "You have just made a payment!",
            });

            setForm((s) => ({
                ...s,
                services: [],
                support: NaN,
            }));
            refetch();
            refetchDownload();
            productRefetch();
            toast.success("Payment successful");
            setCheckoutLoading(false);
        } catch (err: any) {
            const errMessage = err.response
                ? err.response.data.message
                : err.message;
            toast.error(errMessage);
            setCheckoutLoading(false);
            console.log(err);
        }
    };

    return (
        <div className="bg-white rounded-md p-[10px] sm:p-5 w-full">
            <div className="flex items-center justify-between">
                <div className="text-xl leading-[30px] font-medium text-neutral sm:text-2xl capitalize">
                    {data?.type}
                </div>
                <div onClick={handleWishlist} className="cursor-pointer">
                    <HeartIcon
                        color={isExist ? "#7266FC" : "none"}
                        stroke={isExist ? "#7266FC" : "#252C48"}
                        className="group"
                        groupClassName={
                            isExist
                                ? ""
                                : "group-hover:stroke-[#7266FC] transit"
                        }
                    />
                </div>
            </div>
            {/* already downloaded  */}
            {downloadProduct?.license && (
                <div>
                    <div className="pt-5"></div>

                    <div className="text-xl leading-[30px] font-medium text-[#252C48]">
                        Licenses
                    </div>
                    <div className="pt-2"></div>

                    <div className="text-sm leading-[21px] font-medium text-[#252C48]">
                        <div>
                            You currently have a {downloadProduct.license}{" "}
                            license for this item.{" "}
                            <span
                                onClick={downloadLicense}
                                className="text-brand cursor-pointer"
                            >
                                Download
                            </span>
                        </div>
                        <div className="pt-1"></div>
                        {downloadProduct.license === "buyout" ? (
                            <div>You have own all rights to this item</div>
                        ) : (
                            <div>
                                Do you want to own all rights to this item?{" "}
                                <span
                                    className="text-brand cursor-pointer"
                                    onClick={() => setOpenLicense(!openLicense)}
                                >
                                    Buy Another License
                                </span>
                            </div>
                        )}
                    </div>
                    {downloadProduct.license !== "buyout" && (
                        <div
                            className="text-brand text-sm mt-3 cursor-pointer"
                            onClick={() => {
                                setOpenLicense(!openLicense);
                            }}
                        >
                            View more licenses
                        </div>
                    )}
                    {/* <div className="pt-[20px]"></div> */}
                </div>
            )}

            <AnimatePresence initial={false}>
                {openLicense && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "fit-content" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-5"></div>

                        <div className="text-lg font-medium leading-6 sm:text-xl sm:leading-[1.5] text-neutral">
                            Choose a license
                        </div>
                        <div className="pt-[10px]"></div>
                        <div>
                            {downloadProduct?.license != "personal" && (
                                <LicenseItem
                                    name="Personal license"
                                    desc="Get 3 months of support"
                                    price={data?.licenses?.personal?.price}
                                    active={form.license === "personal"}
                                    onClick={() => {
                                        if (
                                            downloadProduct?.license &&
                                            form.license === "personal"
                                        ) {
                                            setForm((v) => ({
                                                ...v,
                                                license:
                                                    downloadProduct?.license as any,
                                            }));
                                        } else {
                                            setForm((v) => ({
                                                ...v,
                                                license: "personal",
                                            }));
                                        }
                                    }}
                                />
                            )}
                            {downloadProduct?.license != "commercial" && (
                                <LicenseItem
                                    name="Commercial license"
                                    desc="Get 6 months of support"
                                    price={data?.licenses?.commercial?.price}
                                    active={form.license === "commercial"}
                                    onClick={() => {
                                        if (
                                            downloadProduct?.license &&
                                            form.license === "commercial"
                                        ) {
                                            setForm((v) => ({
                                                ...v,
                                                license:
                                                    downloadProduct?.license as any,
                                            }));
                                        } else {
                                            setForm((v) => ({
                                                ...v,
                                                license: "commercial",
                                            }));
                                        }
                                    }}
                                />
                            )}

                            {downloadProduct?.license != "buyout" && (
                                <LicenseItem
                                    name="Buyout license"
                                    desc="Get 12 months of support"
                                    price={data?.licenses?.buyout?.price}
                                    active={form.license === "buyout"}
                                    onClick={() => {
                                        if (
                                            downloadProduct?.license &&
                                            form.license === "buyout"
                                        ) {
                                            setForm((v) => ({
                                                ...v,
                                                license:
                                                    downloadProduct?.license as any,
                                            }));
                                        } else {
                                            setForm((v) => ({
                                                ...v,
                                                license: "buyout",
                                            }));
                                        }
                                    }}
                                />
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="pt-[20px]"></div>
            {/* Popular service  */}

            {data?.services?.length && (
                <div>
                    <div className="text-xl leading-[30px] font-semibold text-neutral sm:text-2xl">
                        Popular Service
                    </div>
                    <div className="pt-4"></div>
                    <div className="flex flex-col gap-[10px] sm:gap-3">
                        {downloadProduct?.services.map((v, i) => (
                            <label
                                key={i}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center flex-grow gap-2">
                                    <input
                                        onChange={() => {}}
                                        className="h-[15px] !opacity-70 w-[15px] sm:w-4 sm:h-4"
                                        type="checkbox"
                                        checked
                                    />
                                    <div className=" w-[calc(100%-42px)] text-xs  text-[#252C48] sm:text-sm leading-[1.5]">
                                        {v.text}
                                    </div>
                                </div>
                                <div className="text-sm leading-[21px] font-medium">
                                    {/* {`$ ${v.price}`} */}
                                    Paid
                                </div>
                            </label>
                        ))}
                        {filterServices?.map((v, i) => (
                            <label
                                key={i}
                                className="flex cursor-pointer group items-center justify-between"
                            >
                                <div className="flex  items-center flex-grow gap-2">
                                    <input
                                        onClick={() => {
                                            let services = form.services;
                                            const isCheck =
                                                services.includes(i);
                                            if (isCheck) {
                                                services = _.without(
                                                    [...services],
                                                    i
                                                );
                                            } else {
                                                services.push(i);
                                            }

                                            setForm((s) => ({
                                                ...s,
                                                services,
                                            }));
                                        }}
                                        className="h-[15px] group-hover:border-brand transit w-[15px] sm:w-4 sm:h-4"
                                        type="checkbox"
                                        onChange={() => {}}
                                        checked={
                                            form.services.includes(i)
                                                ? true
                                                : false
                                        }
                                    />
                                    <div className=" w-[calc(100%-42px)] transit group-hover:text-brand text-xs  text-[#252C48] sm:text-sm leading-[1.5]">
                                        {v.text}
                                    </div>
                                </div>
                                <div className="text-sm group-hover:text-brand transit leading-[21px] font-medium">
                                    {`$${v.price}`}
                                </div>
                            </label>
                        ))}
                    </div>
                    <div className="pt-6"></div>
                </div>
            )}

            <div>
                <div className="flex items-center justify-between">
                    <div className="text-xl leading-[30px] font-semibold text-neutral sm:text-2xl">
                        Support
                    </div>
                    {supportLeft !== undefined && (
                        <div className="text-sm">
                            {supportLeft} day left{" "}
                            {supportLeft === 0 && ",Please renew"}
                        </div>
                    )}
                </div>
                <div className="pt-4"></div>
                <div className="flex flex-col gap-[10px] sm:gap-3">
                    {supportLeft
                        ? downloadProduct?.support && (
                              <label className="flex items-center justify-between">
                                  <div className="flex items-center flex-grow gap-2">
                                      <input
                                          onChange={() => {}}
                                          className="h-[15px] accent-brand !opacity-70 w-[15px] sm:w-4 sm:h-4"
                                          type="radio"
                                          checked
                                      />
                                      <div className=" w-[calc(100%-42px)] text-xs  text-[#252C48] sm:text-sm leading-[1.5]">
                                          {downloadProduct?.support.text}
                                      </div>
                                  </div>
                                  <div className="text-sm leading-[21px] font-medium">
                                      {/* {`$ ${downloadProduct?.support.price}`} */}
                                      Paid
                                  </div>
                              </label>
                          )
                        : ""}
                    {filterSupport?.map((v, i) => (
                        <label
                            key={i}
                            className="flex group cursor-pointer items-center justify-between"
                        >
                            <div className="flex items-center flex-grow gap-2">
                                <input
                                    onClick={() => {
                                        setForm((s) => ({
                                            ...s,
                                            support:
                                                form.support === i ? NaN : i,
                                        }));
                                    }}
                                    onChange={() => {}}
                                    className="h-[15px] accent-brand group-hover:border-brand transit w-[15px] sm:w-4 sm:h-4"
                                    type="radio"
                                    checked={form.support === i}
                                />
                                <div className=" group-hover:text-brand transit w-[calc(100%-42px)] text-xs  text-[#252C48] sm:text-sm leading-[1.5]">
                                    {v.text}
                                </div>
                            </div>
                            <div className="text-sm group-hover:text-brand transit leading-[21px] font-medium">
                                {`$${v.price}`}
                            </div>
                        </label>
                    ))}
                </div>
                <div className="pt-4"></div>
                <div className="text-brand cursor-pointer text-sm leading-[21px]">
                    <span id="support-work">How does support work?</span>
                </div>
                <Tooltip
                    content={"Currently there's nothing"}
                    anchorId={"support-work"}
                    place="bottom"
                    className="max-w-[400px] text-xs"
                />
            </div>

            <AnimatePresence initial={false}>
                {totalPrice > 0 && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "fit-content" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="pt-[30px]"></div>
                        <div className="flex items-center justify-between text-xl font-medium">
                            <div className="text-neutral">Total:</div>
                            <div className="text-brand">${totalPrice}</div>
                        </div>
                        <div className="pt-4"></div>
                        <div>
                            <button
                                onClick={oneClickCheckout}
                                disabled={paymentMethod ? false : true}
                                className="w-full flex transit disabled:bg-[#9AA5B5]  justify-center items-center text-sm gap-[5px] enabled:cursor-pointer group enabled:hover:bg-[#473EAE] rounded-md h-[48px] font-medium bg-brand text-white"
                            >
                                {checkoutLoading ? (
                                    <LoadingAnimation color="#fff" />
                                ) : (
                                    <>
                                        <ShoppingCart groupClassName="text-white" />
                                        1-Click Checkout
                                    </>
                                )}
                            </button>
                            <div className="pt-4"></div>
                            <Link
                                href={{
                                    pathname: "/payment",
                                    query: {
                                        id: productId,
                                        type: "product",
                                        services: form.services,
                                        support: form.support,
                                        license: form.license,
                                    },
                                }}
                            >
                                <button className="h-[48px] transit text-sm font-medium text-brand border w-full rounded-md hover:bg-brand hover:text-white border-brand">
                                    Proceed to Payment
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="pt-[30px]"></div>
            <div className="bg-[#EFF3FB] px-[10px] py-5 rounded-md">
                <div className="text-sm leading-[21px] text-center">
                    This is item is included in your Individual -{" "}
                    {user?.userStore?.currentPlan?.planName || "Trial"}{" "}
                    subscription!
                </div>
                <div className="pt-4"></div>
                <button
                    onClick={handleDownload}
                    disabled={!!totalPrice}
                    className="h-[48px] disabled:bg-[#9AA5B5] transit hover:bg-[#473EAE] text-sm bg-brand rounded-md text-white w-full"
                >
                    {downloadLoading ? (
                        <LoadingAnimation color="#fff" />
                    ) : isDownloaded ? (
                        "Download Again"
                    ) : (
                        "Download"
                    )}
                </button>
            </div>

            {isDownloaded && (
                <div className="pt-[10px] sm:pt-5 flex items-center justify-between">
                    <div className="text-sm lg:text-base text-[#252C48]">
                        Rate this item:
                    </div>
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
            )}

            <ReviewItemModal
                modalOpen={rating ? true : false}
                handleModal={() => setRating(0)}
                rating={rating}
                setRating={setRating}
                refetch={productRefetch}
                data={data}
            />
        </div>
    );
}

export const useSupportLeft = (start?: string, end?: string) => {
    if (!start || !end) return undefined;
    return Math.max(getRemainingDate(new Date(), new Date(end)), 0);
};

export default ProductViewPaid;
