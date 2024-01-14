import {
    Elements,
    useStripe,
    useElements,
    PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import React, { ReactNode, useState } from "react";
import Button from "../Shared/Button";
import LoadingAnimation from "../SvgCustomIcons/LoadingAnimation";
import { PSType } from "./PaymentMethodModal";
import { useAtom } from "jotai";
import { ClientSecretState, USER_STATE } from "../../state";
import { api } from "../../api";
import Link from "next/link";

export const STRIPE_PUBLISHER_KEY =
    "pk_test_51LpbnJLpSmU6gOZ7D4ARj7x0qx27TiEswjs0pgt1UtH5P3lhkfBtcJcDUufn0ONqbsu7UwIF8FSd78o7q6uK7IUU0048KjfyYa";

const stripePromise = loadStripe(STRIPE_PUBLISHER_KEY);

type MethodFormType = {
    onCompleted?: (v: any) => any;
} & PSType;

function PaymentMethodForm({
    type,
    onCompleted,
    clientSecret,
}: MethodFormType & { clientSecret: string }) {
    const options: StripeElementsOptions = {
        clientSecret,
        loader: "auto",

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
            <Elements stripe={stripePromise} options={options}>
                <PaymentForm type={type} onCompleted={onCompleted} />
            </Elements>
        </>
    );
}

function PaymentForm({ type, onCompleted }: MethodFormType) {
    const stripe = useStripe();
    const elements = useElements();

    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loadingButton, setLoadingButton] = useState<boolean>(false);
    const [clientSecret, setClientSecret] = useAtom(ClientSecretState);

    const [user] = useAtom(USER_STATE);

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
            onCompleted && (await onCompleted(setupIntent));

            await api.post(`/notifications`, {
                userId: user?._id,
                title: `Payment method ${type == "add" ? "added" : "updated"}`,
                description: `You have just ${
                    type == "add" ? "added" : "updated"
                } your account details!`,
            });

            setLoadingButton(false);
            setClientSecret(undefined);
        } catch (err: any) {
            setLoadingButton(false);
            setErrorMsg(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="text-xl sm:text-2xl text-neutral font-medium leading-[1.5]">
                <span className="capitalize">{type}</span> payment method
            </div>
            <div className="pt-5"></div>

            <PaymentElement
                options={{
                    terms: {
                        card: "never",
                    },
                }}
            />

            {/* <div className="flex flex-col gap-4 xl:gap-5 2xl:gap-6">
                <InputField
                    placeholder="Gregg Micky"
                    label="Name on Card"
                    className="!text-sm !leading-[1] font-normal h-[49px] placeholder:text-[#A0A4AB]"
                />
                <InputFieldWrapper label="Card Number">
                    <CardNumberElement  />
                    <CardImage />
                </InputFieldWrapper>
                <div className="flex gap-5">
                    <InputFieldWrapper label="Expiration Date">
                        <CardExpiryElement />
                    </InputFieldWrapper>
                    <InputFieldWrapper label="CVC">
                        <CardCvcElement />
                    </InputFieldWrapper>
                </div>
            </div> */}

            <div className="pt-2 xl:pt-3"></div>
            {errorMsg && <div className="text-error text-sm">{errorMsg}</div>}
            <div className="pt-4 xl:pt-5"></div>
            <Button className="!text-sm flex items-center h-[50px] justify-center gap-[10px]">
                {loadingButton ? (
                    <>
                        <LoadingAnimation color="#fff" />
                        <div>Loading</div>
                    </>
                ) : (
                    `${type == "add" ? "Save" : "Update"} Payment Method`
                )}
            </Button>
            <div className="pt-4"></div>
            <div className="text-sm !font-normal text-[#9AA5B5]">
                By continuing,you agree to ThemeHive{" "}
                <Link href={"/terms-condition"}>
                    <span className="text-brand">Terms of Services</span>
                </Link>{" "}
                and{" "}
                <Link href={"/privacy-policy"}>
                    <span className="text-brand">Privacy policy</span>
                </Link>
            </div>
        </form>
    );
}

export default PaymentMethodForm;
