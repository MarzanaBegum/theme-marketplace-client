import React from "react";
import { GetPaymentContext } from "../../context/PaymentContext";
import CreateAccount from "./CreateAccount";
import PaymentProgress from "./PaymentProgress";
import SelectPaymentMethod from "./SelectPaymentMethod";
import SubscriptionSummary from "./SubscriptionSummary";
import ProductSummary from "./ProductSummary";
import PaymentWithoutAccount from "./PaymentWithoutAccount";
import { useAtom } from "jotai";
import { USER_STATE } from "../../state";
import Link from "next/link";
import { useRouter } from "next/router";
import Meta from "../Shared/Meta";

function PaymentPageWrapper() {
    const [state] = GetPaymentContext();
    const [user] = useAtom(USER_STATE);

    const router = useRouter();
    const { type, id } = router.query;

    return (
        <div>
            <div className="bg-[#EFF3FB] py-10 sm:py-[60px] xl:py-[80px]">
                <div className="container">
                    <div className="flex gap-4 flex-col md:flex-row-reverse md:items-start md:gap-6">
                        {state.subscription && (
                            <SubscriptionSummary data={state.subscription} />
                        )}
                        {state.product && (
                            <ProductSummary data={state.product} />
                        )}

                        <div className=" 3xl:w-[calc(100%-524px)] md:w-[calc(100%-279px)] lg:w-[calc(100%-344px)] 2xl:w-[calc(100%-488px)] xl:w-[calc(100%-404px)] ">
                            <div className="flex items-center gap-2">
                                <img
                                    onClick={() => router.back()}
                                    className="max-md:hidden cursor-pointer"
                                    src="/icons/arrow-left.svg"
                                    alt=""
                                />

                                <div className="text-lg sm:text-2xl md:text-xl lg:text-2xl leading-[1.5] text-neutral font-medium xl:font-semibold">
                                    Secure Checkout
                                </div>
                            </div>
                            <div className="pt-4"></div>

                            <div className="bg-white p-[10px] md:p-[20px_10px] lg:p-5 sm:p-5 rounded-md">
                                <div className="">
                                    {!user && (
                                        <PaymentProgress progress={state.tab} />
                                    )}
                                </div>
                                <div>
                                    {user ? (
                                        <SelectPaymentMethod />
                                    ) : (
                                        <>
                                            {state.tab === 1 && (
                                                <CreateAccount />
                                            )}
                                            {state.tab === 2 && (
                                                <PaymentWithoutAccount />
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentPageWrapper;
