import {
    Elements,
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import React, { useState } from "react";
import { STRIPE_PUBLISHER_KEY } from "../BillingPage/PaymentMethodForm";
import LoadingAnimation from "../SvgCustomIcons/LoadingAnimation";
import Button from "../Shared/Button";
import InputCheckbox from "../Shared/InputCheckbox";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { GetPaymentContext } from "../../context/PaymentContext";
import PreviousPaymentMethod from "./PreviousPaymentMethod";
import { useRouter } from "next/router";
import CompletePayment from "../../utils/CompletePayment";
import { useAtom } from "jotai";
import { USER_STATE } from "../../state";
import { api } from "../../api";
import { usePriceServices } from "./ProductSummary";
import { useUserQuery } from "../Shared/ProtectedRoutes";
import useSingleDownloadedProduct from "../../api-call/useSingleDownloadedProduct";
import Link from "next/link";

function SelectPaymentMethod() {
    const [methodType, setMethodType] = useState<"card" | "paypal">("card");
    const [state] = GetPaymentContext();
    return (
        <div>
            <div className="flex flex-col gap-4 xl:gap-5 2xl:gap-6">
                <div className="text-xl sm:text-2xl text-neutral font-medium leading-[1.5]">
                    Select payment method
                </div>
                <div onChange={(e: any) => setMethodType(e.target.value)}>
                    <label
                        htmlFor="credit-card"
                        className="flex items-center justify-between p-[8px_10px] cursor-pointer rounded"
                        style={{
                            backgroundColor:
                                methodType === "card" ? "#F1F0FF" : "#fff",
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <input
                                className="w-[14px] h-[14px] xl:w-[18px] xl:h-[18px]"
                                id="credit-card"
                                type="radio"
                                value="card"
                                readOnly
                                checked={methodType === "card"}
                            />
                            <img src="/icons/card-border.svg" alt="" />
                            <div className="text-sm leading-[1.5] font-medium text-neutral xl:text-base">
                                Pay by credit card
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <img src="/icons/visa-border.svg" alt="" />
                            <img src="/icons/mastercard-border.svg" alt="" />
                        </div>
                    </label>
                    <div className=""></div>
                    <label
                        htmlFor="paypal"
                        className="flex hidden items-center justify-between p-[8px_10px] cursor-pointer rounded"
                        style={{
                            backgroundColor:
                                methodType === "paypal" ? "#F1F0FF" : "#fff",
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <input
                                className="w-[14px] h-[14px] xl:w-[18px] xl:h-[18px]"
                                id="paypal"
                                type="radio"
                                value="paypal"
                                readOnly
                                checked={methodType === "paypal"}
                            />
                            <img src="/icons/paypal-border.svg" alt="" />
                            <div className="text-sm xl:text-base leading-[1.5] font-medium text-neutral">
                                Paypal
                            </div>
                        </div>
                    </label>
                </div>
                <div>
                    {methodType === "card" && (
                        <>
                            {state.clientSecret && <PaymentMethodForm />}
                            {state.paymentMethod && (
                                <PreviousPaymentMethod
                                    data={state.paymentMethod}
                                />
                            )}
                            {!state.clientSecret && !state.paymentMethod && (
                                <div className="flex items-center gap-3">
                                    <LoadingAnimation />
                                    <div>Loading...</div>
                                </div>
                            )}
                        </>
                    )}
                    {methodType === "paypal" && (
                        <PayPalScriptProvider options={{ "client-id": "test" }}>
                            <PaypalMethod />
                        </PayPalScriptProvider>
                    )}
                </div>
            </div>
        </div>
    );
}

function PaypalMethod() {
    return (
        <>
            <div className="text-xs text-neutral-muted">
                In order to complete your transaction, we will transfer you over
                to PayPal's secure servers.
            </div>
            <div className="pt-[20px]"></div>
            <Button className="!text-sm flex items-center h-[50px] justify-center gap-[10px]">
                Pay Now
            </Button>
            <div className="pt-4"></div>
            <div className="text-sm !font-normal text-[#9AA5B5]">
                By continuing,you agree to ThemeHive{" "}
                <span className="text-brand">Terms of Services</span> and{" "}
                <span className="text-brand">Privacy policy</span>
            </div>
        </>
    );
}

const stripePromise = loadStripe(STRIPE_PUBLISHER_KEY);

function PaymentMethodForm() {
    const [state] = GetPaymentContext();

    const options: StripeElementsOptions = {
        clientSecret: state.clientSecret,
        loader: "never",

        appearance: {
            theme: "stripe",
            variables: {
                borderRadius: "6px",
                colorText: "#252C48",
                colorTextPlaceholder: "#A0A4AB",
                focusBoxShadow: "none",
                focusOutline: "#7266FC",
                colorPrimary: "#7266FC",
                spacingGridRow: "20px",
                spacingUnit: "5px",
                fontSmooth: "always",
                colorDanger: "#FF000D",
                colorDangerText: "#FF000D",
            },
        },
    };

    return (
        <>
            {state.clientSecret ? (
                <Elements stripe={stripePromise} options={options}>
                    <PaymentForm />
                </Elements>
            ) : (
                <div className="flex items-center gap-2">
                    <LoadingAnimation color="#7266FC" />
                    <div>Loading Payment Method...</div>
                </div>
            )}
        </>
    );
}

function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loadingButton, setLoadingButton] = useState<boolean>(false);
    const router = useRouter();
    const { type, interval, id, license }: any = router.query;
    const [state] = GetPaymentContext();
    const [user] = useAtom(USER_STATE);

    const [saveMethod, setSaveMethod] = useState(true);
    const { refetch } = useUserQuery(user?._id);
    const { filterService, totalPrice, findSupport } = usePriceServices();

    const { data: previousDownload } = useSingleDownloadedProduct(
        state?.user?._id,
        id
    );

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoadingButton(true);
        try {
            if (!stripe || !elements)
                throw new Error("Stripe or elements not found");

            const { error, setupIntent } = await stripe.confirmSetup({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/account/billing`,
                    payment_method_data: {
                        billing_details: {
                            name: "Hello World",
                            email: "rashediq6al@gmail.com",
                        },
                    },
                },

                redirect: "if_required",
            });

            if (error) throw new Error(error.message);

            if (type === "subscription") {
                let amount = state?.subscription?.price[interval];
                amount = amount ? Number(amount) || 0 : 0;
                amount = amount * 100;
                if (amount > 0) {
                    const res = await CompletePayment({
                        amount,
                        customer: user?.userStore?.customerId || "",
                        payment_method: `${setupIntent?.payment_method}`,
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
                    isTrial: !!state?.subscription?.isTrial,
                    priceId: state?.subscription?._id,
                    interval,
                };
                const {
                    data: { plan },
                } = await api.post("/plans", apiObj);

                await api.post("/billing", {
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
                        customer: state.customer,
                        payment_method: `${setupIntent?.payment_method}`,
                    });
                }
                const supportEnd = new Date();
                supportEnd.setDate(
                    supportEnd.getDate() + (findSupport?.day || 0)
                );
                const apiObj = {
                    userId: user?._id,
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
                await api.post("/billing", {
                    userId: state?.user?._id,
                    downloadProduct: downloadProduct._id,
                    amount: totalPrice,
                });
            }

            if (!saveMethod) {
                await api.delete(
                    `/payments/customer/${state.customer}/payment-method`
                );
            }

            await api.post(`/notifications`, {
                userId: state.user?._id,
                title: "Payment successful",
                description: "You have just made a payment!",
            });

            refetch();
            await router.push({
                pathname: "/payment/success",
                query: { type, id },
            });
            setLoadingButton(false);
        } catch (err: any) {
            setLoadingButton(false);
            setErrorMsg(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="pt-5"></div>

            <PaymentElement
                options={{
                    terms: {
                        card: "never",
                    },
                }}
            />

            <div className="pt-2 xl:pt-3"></div>
            {errorMsg && <div className="text-error text-sm">{errorMsg}</div>}
            <div className="pt-2 xl:pt-3"></div>

            <InputCheckbox
                checked={saveMethod}
                onChange={(e) => {
                    setSaveMethod(!saveMethod);
                }}
                text="Securely save this card for my later purchase."
            />
            <div className="pt-4 xl:pt-5"></div>
            <Button className="!text-sm flex items-center h-[50px] justify-center gap-[10px]">
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
                    <span className="text-brand">Terms of Services</span> and{" "}
                </Link>
                <Link href={"/privacy-policy"}>
                    <span className="text-brand">Privacy policy</span>
                </Link>
            </div>
        </form>
    );
}

export default SelectPaymentMethod;
