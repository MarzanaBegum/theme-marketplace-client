import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Shared/Button";
import InputField from "../Shared/InputField";
import InputPassword from "../Shared/InputPassword";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { GetPaymentContext } from "../../context/PaymentContext";
import LoadingAnimation from "../SvgCustomIcons/LoadingAnimation";
import { api } from "../../api";
import ContinueWithGoogle, {
    GoogleLoginData,
    GoogleLoginType,
} from "../AuthPage/ContinueWithGoogle";
import { SignupInput } from "../SignupForm";
import { useRouter } from "next/router";
import handleGoogleLogin from "../AuthPage/GoogleLoginFunction";
import Link from "next/link";
import Meta from "../Shared/Meta";

const schema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required(),
    password: yup
        .string()
        .required()
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
    confirm_password: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords does not match")
        .required(),
});

function CreateAccount() {
    const router = useRouter();

    const [state, dispatch] = GetPaymentContext();
    const [error, setError] = useState<string>("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupInput>({
        resolver: yupResolver(schema),
    });

    const [loadingButton, setLoadingButton] = useState(false);

    const handleFormSubmit = async (data: SignupInput) => {
        setLoadingButton(true);
        setError("");
        try {
            const res = await api.post("/payments/customer/check", {
                email: data.email,
            });
            await createCustomerIntent(data);
            setLoadingButton(false);
        } catch (err: any) {
            setError(err?.response ? err.response.data.message : err.message);
            console.log(err);
            setLoadingButton(false);
        }
    };

    const handleGoogleSubmit: GoogleLoginType = async (
        data,
        setGoogleLoading
    ) => {
        try {
            setError("");
            if (!data) throw new Error();
            const res = await api.post("/payments/customer/check", {
                email: data.email,
                googleAuth: true,
            });
            const { login } = res.data;
            if (login) {
                await handleGoogleLogin(setError, router.asPath)(
                    data,
                    setGoogleLoading
                );
            } else {
                await createCustomerIntent(data);
            }

            setGoogleLoading(false);
        } catch (err: any) {
            setError(err?.response ? err.response.data.message : err.message);
            setGoogleLoading(false);
        }
    };

    const createCustomerIntent = async (
        data: SignupInput | GoogleLoginData,
        customer_id?: string
    ) => {
        try {
            let customerId = customer_id;
            if (!customerId) {
                const resCustomer = await api.post("/payments/customer", {
                    name: `${data.firstName} ${data.lastName}`,
                    email: data.email,
                });
                customerId = resCustomer.data.id;
            }

            dispatch({ type: "customer", value: customerId });
            const resIntent = await api.post("/payments/intent", {
                customer: customerId,
            });
            const clientSecret = resIntent.data.client_secret;
            dispatch({ type: "clientSecret", value: clientSecret });
            dispatch({ type: "user", value: data });
            dispatch({ type: "tab", value: 2 });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Meta title="Create Account - Checkout Page" />
            <ContinueWithGoogle onGoogleLogin={handleGoogleSubmit} />
            {error && (
                <div className="w-[100%] mt-[10px] flex items-center py-[8px] md:py-[15px] pl-[15px] pr-[14px] rounded-[4px] min-h-[48px] bg-[#FFE5E7]">
                    <img
                        src="/img/alert-icon.svg"
                        alt="alert icon"
                        className="w-[18.33px] h-[18.33px] mr-[9px]"
                    />
                    <h3 className="text-[13px] font-normal leading-[18px] text-[#252C48]">
                        {error}
                    </h3>
                </div>
            )}
            <div className="pt-6"></div>
            <div className="flex items-center">
                <div className="border-b border-[#00000026] w-1/2"></div>
                <div className="text-sm px-[10px] text-[#9AA5B5] font-medium">
                    OR
                </div>
                <div className="border-b border-[#00000026] w-1/2"></div>
            </div>
            <div className="pt-6"></div>
            <div>
                <form
                    onSubmit={handleSubmit(handleFormSubmit)}
                    className="flex flex-col gap-4 xl:gap-5 2xl:gap-6"
                >
                    <div className="flex flex-col gap-4 xl:gap-5 2xl:gap-6 sm:flex-row sm:gap-6">
                        <div className="md:w-1/2">
                            <InputField
                                placeholder="Gregg"
                                label="First Name"
                                className={`${
                                    errors.firstName
                                        ? "!border-error text-error"
                                        : "focus:border-brand"
                                }`}
                                {...register("firstName")}
                            />
                            <p className="first-letter:capitalize text-error text-sm mt-2">
                                {errors.firstName?.message?.toString()}
                            </p>
                        </div>
                        <div className="md:w-1/2">
                            <InputField
                                {...register("lastName")}
                                placeholder="Micky"
                                label="Last Name"
                                className={`${
                                    errors.lastName
                                        ? "!border-error text-error"
                                        : "focus:border-brand"
                                }`}
                            />
                            <p className="first-letter:capitalize text-error text-sm mt-2">
                                {errors.lastName?.message?.toString()}
                            </p>
                        </div>
                    </div>
                    <div>
                        <InputField
                            placeholder="digitalgregg@gmail.com"
                            label="Your Email"
                            {...register("email")}
                            className={`${
                                errors.email
                                    ? "!border-error text-error"
                                    : "focus:border-brand"
                            }`}
                        />
                        <p className="first-letter:capitalize text-error text-sm mt-2">
                            {errors.email?.message?.toString()}
                        </p>
                    </div>
                    <div>
                        <InputPassword
                            {...register("password")}
                            placeholder="*********"
                            label="Password"
                            className={`${
                                errors.password
                                    ? "!border-error text-error"
                                    : "focus:border-brand"
                            }`}
                        />
                        <p className="first-letter:capitalize text-error text-sm mt-2">
                            {errors.password?.message?.toString()}
                        </p>
                    </div>
                    <div>
                        <InputPassword
                            {...register("confirm_password")}
                            placeholder="*********"
                            label="Confirm Password"
                            className={`${
                                errors.confirm_password
                                    ? "!border-error text-error"
                                    : "focus:border-brand"
                            }`}
                        />
                        <p className="first-letter:capitalize text-error text-sm mt-2">
                            {errors.confirm_password?.message?.toString()}
                        </p>
                    </div>
                    <Button className="!text-sm mt-1 flex items-center justify-center gap-[10px]">
                        {loadingButton ? (
                            <>
                                <LoadingAnimation color="#fff" />
                                <div>Loading...</div>
                            </>
                        ) : (
                            "Continue"
                        )}
                    </Button>
                </form>
                <div className="pt-4"></div>
                <div className="text-sm !font-normal text-[#9AA5B5]">
                    By continuing,you agree to ThemeHive{" "}
                    <Link href={"terms-condition"}>
                        <span className="text-brand">Terms of Services</span>{" "}
                        and{" "}
                    </Link>
                    <Link href={"/privacy-policy"}>
                        <span className="text-brand">Privacy policy</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CreateAccount;
