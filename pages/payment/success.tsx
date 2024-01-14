import Link from "next/link";
import React from "react";

import Header from "../../components/Shared/Layout/Header";
import { GetServerSideProps } from "next";
import Meta from "../../components/Shared/Meta";

function PaymentSuccessPage({ id, type }: { id: string; type: string }) {
    const urlRef = type == "product" ? "/product/" + id : "/";

    return (
        <>
            <Header />
            <Meta title="Payment Successful" />
            <div>
                <div className=" bg-white flex flex-col justify-center items-center">
                    <div className="my-[100px]">
                        <div className="flex w-[100%] justify-center">
                            <img
                                src="/imgs/success-payment.jpg"
                                alt="paymentSuccess"
                                className="xs:h-[200px]  md:h-[250px]"
                            />
                        </div>
                        <div className="mx-auto xs:w-[335px] sm:w-[433px] xl:w-[511px]">
                            <h2 className="text-brand font-bold xs:text-[24px] xs:leading-[33px] lg:text-[28px] lg:leading-[38px] xl:text-[40px] xl:leading-[54px] text-center xs:mt-[23px] xs:mb-[19px] lg:mt-[40px] lg:mb-[16px]">
                                Payment Successful
                            </h2>
                            <p className="text-[#4F4F4F] font-normal xs:text-[14px] xs:leading-[150%] lg:text-[16px] lg:leading-[22px] xl:text-[18px] xl:leading-[25px] text-center xs:mb-[30px] lg:mb-[40px]">
                                Your payment at{" "}
                                <Link href={"/"}>
                                    <span className="text-brand cursor-pointer">
                                        ThemeHive
                                    </span>{" "}
                                </Link>
                                was successful. We will send you more
                                information on your email.
                            </p>
                            <div className="text-center">
                                <Link href={urlRef}>
                                    <button className="bg-brand mb-[5px] text-[#FFFFFF] xs:w-[190px] xs:h-[44px] lg:w-[220px] lg:h-[48px] xl:w-[230px] rounded-[4px] xs:text-[14px] lg:text-[18px] font-semibold cursor-pointer">
                                        Go Back to{" "}
                                        {type === "product"
                                            ? "Product"
                                            : "Home"}
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { id, type } = query;
    return {
        props: {
            id,
            type,
        },
    };
};

export default PaymentSuccessPage;
