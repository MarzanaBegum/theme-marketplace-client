import React, { useState } from "react";
import usePaymentMethod from "../../api-call/usePaymentMethod";
import LoadingAnimation from "../SvgCustomIcons/LoadingAnimation";
import PaymentMethodModal from "../BillingPage/PaymentMethodModal";

function BillingSecondCard() {
    const { isLoading, data, refetch } = usePaymentMethod();

    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<"add" | "update">("add");

    const handleAddPayment = () => {
        setModalType("add");
        setModalOpen(!modalOpen);
    };
    const handleUpdatePayment = () => {
        setModalType("update");
        setModalOpen(!modalOpen);
    };

    return (
        <>
            {data ? (
                <div className="lg:w-[50%] flex flex-col border-[1px] border-[#9AA5B5] rounded-[6px] p-[16px_10px] lg:p-[30px] lg:flex lg:flex-col lg:justify-between">
                    <div className="mb-[16px] sm:mb-[10px] lg:mb-[32px]">
                        <h2 className="text-[18px] sm:text-[20px] lg:text-[24px] text-neutral font-semibold leading-[27px] sm:leading-[30px] lg:leading-[36px] mb-[8px]">
                            Payment method
                        </h2>
                        <small className="text-[12px] text-neutral-shade font-normal leading-[21px] lg:leading-[15px]">
                            Change how you pay for your plan.
                        </small>
                    </div>
                    {/* Selected Payment Method */}
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
                                <span className="text-neutral first-letter:uppercase text-[10px] lg:text-[14px] leading-[18px] lg:leading-[24px] lg:mb-[6px] font-normal lg:font-medium">
                                    {data.card.brand} ending in{" "}
                                    {data.card.last4}
                                </span>
                                <span className="text-neutral-shade text-[10px] lg:text-[12px] leading-[18px] font-normal">
                                    Expiry {data.card.exp_month} /{" "}
                                    {data.card.exp_year}
                                </span>
                            </div>
                        </div>
                        <div
                            onClick={handleUpdatePayment}
                            className="text-[14px] leading-[24px] p-[12px_16px] rounded-[6px] border-[1px] border-[#9AA5B5] hover:border-brand transition duration-500 hover:bg-brand text-brand hover:text-white lg:font-medium cursor-pointer"
                        >
                            Edit
                        </div>
                    </div>
                    {/* Selected Payment Method */}
                </div>
            ) : isLoading ? (
                <div className=" lg:w-[50%] border-[1px] border-[#9AA5B5] rounded-[6px] p-[16px_10px] lg:p-[30px]">
                    <div className="mb-[16px] sm:mb-[10px] lg:mb-[32px]">
                        <h2 className="text-[18px] sm:text-[20px] lg:text-[24px] text-neutral font-semibold leading-[27px] sm:leading-[30px] lg:leading-[36px] mb-[8px]">
                            Payment method
                        </h2>
                        <div className="flex items-center gap-3">
                            <LoadingAnimation />
                            <div>Loading...</div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className=" lg:w-[50%] border-[1px] border-[#9AA5B5] rounded-[6px] p-[16px_10px] lg:p-[30px]">
                    <div className="mb-[16px] sm:mb-[10px] lg:mb-[32px]">
                        <h2 className="text-[18px] sm:text-[20px] lg:text-[24px] text-neutral font-semibold leading-[27px] sm:leading-[30px] lg:leading-[36px] mb-[8px]">
                            Payment method
                        </h2>
                        <small className="text-[12px] text-neutral-shade font-normal leading-[21px] lg:leading-[15px]">
                            No payment method added yet!
                        </small>
                    </div>
                    {/* Add New Payment Button */}
                    <div
                        onClick={handleAddPayment}
                        className="flex justify-center gap-[8px] items-center max-sm:w-full p-[15px] sm:p-[15px_59px] lg:p-[12px_16px] border-[1px] border-brand transition duration-500 group hover:bg-brand rounded-[6px] cursor-pointer w-fit"
                    >
                        <p className="text-brand text-[14px] sm:text-[16px] group-hover:text-white font-medium leading-[24px]">
                            Add new payment method
                        </p>
                    </div>
                    {/* Add New Payment Button End */}
                </div>
            )}
            <PaymentMethodModal
                type={modalType}
                modalOpen={modalOpen}
                handleModal={() => {
                    setModalOpen(!modalOpen);
                }}
                onCompleted={() => refetch()}
            />
        </>
    );
}

export default BillingSecondCard;
