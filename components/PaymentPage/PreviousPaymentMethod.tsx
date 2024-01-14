import React, { useState } from "react";
import Button from "../Shared/Button";
import LoadingAnimation from "../SvgCustomIcons/LoadingAnimation";
import {
    GetPaymentContext,
    PaymentMethodDataType,
} from "../../context/PaymentContext";
import PaymentMethodModal from "../BillingPage/PaymentMethodModal";
import { api } from "../../api";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import CompletePayment from "../../utils/CompletePayment";
import { usePriceServices } from "./ProductSummary";
import { useUserQuery } from "../Shared/ProtectedRoutes";
import useSingleDownloadedProduct from "../../api-call/useSingleDownloadedProduct";
import Link from "next/link";

function PreviousPaymentMethod({ data }: { data: PaymentMethodDataType }) {
    const [loadingButton, setLoadingButton] = useState(false);
    const [modal, setModal] = useState(false);
    const router = useRouter();
    const [state, dispatch] = GetPaymentContext();
    const { type, interval, id, license }: any = router.query;
    const { refetch } = useUserQuery(state.user?._id);
    const { totalPrice, filterService, findSupport } = usePriceServices();

    const { data: previousDownload } = useSingleDownloadedProduct(
        state?.user?._id,
        id
    );

    const onSubmit = async () => {
        if (loadingButton) return;
        setLoadingButton(true);
        try {
            if (type === "subscription") {
                let amount = state?.subscription?.price[interval];
                amount = amount ? Number(amount) || 0 : 0;
                amount = amount * 100;
                if (amount > 0) {
                    const res = await CompletePayment({
                        amount,
                        customer: data.customer,
                        payment_method: data.id,
                    });
                }
                const endDate = new Date();
                endDate.setDate(
                    endDate.getDate() +
                        (state?.subscription?.isTrial
                            ? 7
                            : interval == "monthly"
                            ? 30
                            : 365)
                );
                const apiObj = {
                    userId: state?.user?._id,
                    planPrice: String(amount / 100),
                    planName: state.subscription?.title,
                    planStart: new Date(),
                    planEnd: endDate,
                    downloadLimit: 10,
                    priceId: state?.subscription?._id,
                    isTrial: !!state?.subscription?.isTrial,
                    interval,
                };
                const {
                    data: { plan },
                } = await api.post("/plans", apiObj);

                const test = await api.post("/billing", {
                    userId: state?.user?._id,
                    plan: plan?._id,
                    amount: String(amount / 100),
                });

                await api.put(`/user-store/${state.user?.userStore?._id}`, {
                    freebieUse: true,
                });
            }

            if (type === "product") {
                if (totalPrice > 0) {
                    await CompletePayment({
                        amount: totalPrice * 100,
                        customer: data.customer,
                        payment_method: data.id,
                    });
                }
                const supportEnd = new Date();
                supportEnd.setDate(
                    supportEnd.getDate() + (findSupport?.day || 0)
                );
                const apiObj = {
                    userId: state?.user?._id,
                    productId: id,
                    license,
                    services: filterService,
                    support: findSupport && {
                        ...findSupport,
                        start: new Date(),
                        end: supportEnd,
                    },
                };
                let downloadProduct: any;
                if (previousDownload) {
                    const { data: dp2 } = await api.put(
                        "/products/download/data",
                        apiObj
                    );
                    downloadProduct = dp2;
                } else {
                    const { data: dp1 } = await api.post(
                        "/products/download/data",
                        apiObj
                    );
                    downloadProduct = dp1;
                }
                const test = await api.post("/billing", {
                    userId: state?.user?._id,
                    downloadProduct: downloadProduct?._id,
                    amount: totalPrice,
                });
            }
            refetch();

            await api.post(`/notifications`, {
                userId: state.user?._id,
                title: "Payment successful",
                description: "You have just made a payment!",
            });

            await router.push({
                pathname: "/payment/success",
                query: { type, id },
            });
            setLoadingButton(false);
        } catch (err: any) {
            setLoadingButton(false);
            const errMessage = err.response
                ? err.response.data.message
                : err.message;
            toast.error(errMessage);
        }
    };

    return (
        <>
            <div className="">
                <div className="flex items-center justify-between">
                    <div className="flex gap-[8px] lg:gap-[18px]">
                        {data.card.brand === "visa" ? (
                            <div className="w-fit p-[16px_20px] rounded-[6px] border-[1px] border-[#9AA5B5]">
                                <img
                                    src="/icons/visa_icon.svg"
                                    alt=""
                                    width="50px"
                                    height="16px"
                                />
                            </div>
                        ) : (
                            <div className="w-fit p-[16px_20px] rounded-[6px] border-[1px] border-[#9AA5B5]">
                                <div className="font-black tracking-wider text-brand leading-[1]">
                                    CARD
                                </div>
                            </div>
                        )}
                        <div className="flex flex-col">
                            <span className="text-neutral text-[10px] lg:text-[14px] leading-[18px] lg:leading-[24px] lg:mb-[6px] font-normal lg:font-medium">
                                <span className="capitalize">
                                    {data.card.brand}
                                </span>{" "}
                                ending in {data.card.last4}
                            </span>
                            <span className="text-neutral-shade text-[10px] lg:text-[12px] leading-[18px] font-normal">
                                Expiry {data.card.exp_month} /{" "}
                                {data.card.exp_year}
                            </span>
                        </div>
                    </div>
                    <div
                        onClick={() => setModal(!modal)}
                        className="text-[14px]  leading-[24px] w-[80px] text-center p-[8px_16px] rounded-[6px]  hover:border-brand transition duration-300 hover:bg-brand text-brand hover:text-white lg:font-medium cursor-pointer"
                    >
                        Update
                    </div>
                </div>
                <div className="pt-6 xl:pt-8"></div>
                <Button
                    onClick={onSubmit}
                    className="!text-sm flex items-center h-[50px] justify-center gap-[10px]"
                >
                    {loadingButton ? (
                        <>
                            <LoadingAnimation color="#fff" />
                            <div>Loading</div>
                        </>
                    ) : (
                        `Pay Now`
                    )}
                </Button>
                <div className="pt-4"></div>
                <div className="text-sm !font-normal text-[#9AA5B5]">
                    By continuing,you agree to ThemeHive{" "}
                    <Link href={"/terms-condition"}>
                        <span className="text-brand">Terms of Services</span>{" "}
                        and{" "}
                    </Link>
                    <Link href={"/privacy-policy"}>
                        <span className="text-brand">Privacy policy</span>
                    </Link>
                </div>
            </div>
            <PaymentMethodModal
                type="update"
                handleModal={() => setModal(!modal)}
                modalOpen={modal}
                onCompleted={async () => {
                    try {
                        const { data: paymentMethodData } = await api.get(
                            `/payments/customer/${state.customer}/payment-method`
                        );

                        dispatch({
                            type: "paymentMethod",
                            value: paymentMethodData,
                        });
                    } catch (err) {
                        toast.error(
                            "Something went wrong, To update payment method"
                        );
                    }
                }}
            />
        </>
    );
}

export default PreviousPaymentMethod;
