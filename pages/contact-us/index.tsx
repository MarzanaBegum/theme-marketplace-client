import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Layout from "../../components/Shared/Layout/Layout";
import LoadingAnimation from "./../../components/LoadingAnimation/index";
import { toast } from "react-toastify";
import { api } from "../../api";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SelectDepartment from "../../components/SelectDepartment";
import { useQuery } from "react-query";
import { useAtom } from "jotai";
import { USER_STATE } from "../../state";
import classNames from "classnames";
import InputField from "../../components/Shared/InputField";
import Link from "next/link";
import Meta from "../../components/Shared/Meta";

const label = "text-[14px] lg:text-[16px] text-[#252C48] font-medium";

type InputType = {
    name: string;
    email: string;
    department: { value: string; label: string };
    subject: string;
    description: string;
};

const validationSchema = yup.object({
    name: yup
        .string()
        .min(2, "Must be 2 characters or more")
        .required("Name is required"),
    email: yup.string().email().required(),
    department: yup.object().required("Select a category"),
    subject: yup.string().required("Subject is required"),
    description: yup.string().required("Description is required"),
});

export default function ContactUsPage() {
    const [user] = useAtom(USER_STATE);
    const [error, setError] = useState("");
    const [buttonLoading, setButtonLoading] = useState(false);

    const [success, setSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<InputType>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            name: user ? user?.firstName + " " + user?.lastName : "",
            email: user?.email || "",
        },
    });

    const onSubmit = async (data: InputType) => {
        if (buttonLoading) return;
        setButtonLoading(true);
        setError("");
        try {
            await api.post("/contact-us", {
                ...data,
                department: data.department?.value,
                status: user?.userStore.currentPlan ? "active" : "inactive",
            });
            setButtonLoading(false);
            setSuccess(true);
        } catch (err: any) {
            setButtonLoading(false);
            const errMessage = err.response
                ? err.response.data.message
                : err.message;
            toast.error(errMessage);
            setError(errMessage);
        }
    };

    return (
        <Layout>
            <Meta title="Contact Us - ThemeHive" />
            <div className="bg-neutral text-surface w-[100%] py-[40px] sm:py-[60px] xl:py-[80px] xl:text-center">
                <div className="px-[20px] sm:px-[40px] md:px-[50px]">
                    <h2 className="mb-[8px] text-[24px] sm:text-[32px] xl:text-[40px] xl:leading-[60px] font-medium">
                        Contact us
                    </h2>
                    <h3 className="text-[12px] leading-[18px] sm:text-[14px] sm:leading-[21px] xl:text-[16px] xl:leading-[24px] font-normal">
                        We encourage to share your ideas and improvement with
                        us.
                    </h3>
                </div>
            </div>
            <div className="bg-surface-muted">
                <div className="px-[20px] sm:px-[40px] md:px-[50px] lg:px-[125px] xl:px-[213px] 2xl:px-[365px] 3xl:px-[444px] py-[40px] sm:py-[60px] lg:py-[40px] xl:py-[80px]">
                    <div className="max-w-[1032px] mx-auto px-[10px] py-[16px] sm:p-[20px] lg:px-[52px] lg:py-[50px] 2xl:p-[40px] bg-[#FFFFFF] rounded-[6px]">
                        {success && (
                            <div className="flex py-10 justify-center items-center 2xl:py-[60px] flex-col">
                                <img
                                    src="/icons/email-tick.svg"
                                    width={100}
                                    alt=""
                                />
                                <div className="pt-3 md:pt-10"></div>
                                <h1 className="text-center text-xl text-neutral md:text-[40px]">
                                    Thanks for contacting us
                                </h1>
                                <div className="pt-1 md:pt-5"></div>

                                <p className="text-center w-[80%] text-sm md:text-base">
                                    We have receive your message. We'll reach
                                    you out soon
                                </p>
                                <div className="pt-10"></div>
                                <Link href={"/"}>
                                    <button className="p-[9px_16px] h-[56px] w-[200px] rounded bg-brand hover:bg-brand-dark transition-all duration-200 text-white">
                                        Back to Home
                                    </button>
                                </Link>
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col gap-4 lg:gap-6"
                            style={{ display: success ? "none" : "flex" }}
                        >
                            <div
                                className={classNames(
                                    user?._id ? "hidden" : "block"
                                )}
                            >
                                <InputField
                                    {...register("name")}
                                    placeholder="Gregg"
                                    label="Name"
                                    className={`${
                                        errors.name
                                            ? "!border-error text-error"
                                            : "focus:border-brand"
                                    }`}
                                />
                                {errors.name && (
                                    <p className="mt-2 text-sm first-letter:capitalize text-error">
                                        {errors.name?.message?.toString()}
                                    </p>
                                )}
                            </div>
                            <div
                                className={classNames(
                                    user?._id ? "hidden" : "block"
                                )}
                            >
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
                                {errors.email && (
                                    <p className="mt-2 text-sm first-letter:capitalize text-error">
                                        {errors.email?.message?.toString()}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className={label} htmlFor="department">
                                    Select department
                                </label>
                                <Controller
                                    name="department"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({
                                        field: { onChange, value, name, ref },
                                    }) => (
                                        <SelectDepartment
                                            sendError={errors.department}
                                            value={value}
                                            onChange={onChange}
                                        />
                                    )}
                                />
                                {errors.department && (
                                    <p className="mt-2 text-sm first-letter:capitalize text-error">
                                        {errors.department?.message?.toString()}
                                    </p>
                                )}
                            </div>
                            <div>
                                <InputField
                                    placeholder="Theme licence"
                                    label="Subject"
                                    {...register("subject")}
                                    className={`${
                                        errors.subject
                                            ? "!border-error text-error"
                                            : "focus:border-brand"
                                    }`}
                                />
                                {errors.subject && (
                                    <p className="mt-2 text-sm first-letter:capitalize text-error">
                                        {errors.subject?.message?.toString()}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="description">Description</label>
                                <textarea
                                    {...register("description", {
                                        required: true,
                                    })}
                                    cols={7}
                                    rows={7}
                                    placeholder="Write a description here"
                                    className={`${
                                        errors.description
                                            ? "!border-error text-error"
                                            : "focus:border-brand"
                                    } w-[100%] mt-2 py-[15px] px-[16px] text-[12px] lg:text-[14px] text-neutral font-normal rounded-[6px] border border-[#C8CBD0] outline-none`}
                                />
                                {errors.description && (
                                    <p className="mt-2 text-sm first-letter:capitalize text-error">
                                        {errors.description?.message?.toString()}
                                    </p>
                                )}
                            </div>
                            {error && (
                                <p className="mt-2 text-sm first-letter:capitalize text-error">
                                    {error}
                                </p>
                            )}
                            <button
                                type="submit"
                                className="w-[100%] h-[48px] xl:h-[56px] text-[12px] md:text-[16px] font-medium 2xl:font-bold cursor-pointer rounded-[6px] bg-[#7266FC] hover:bg-brand-dark transition-all duration-200 text-[#FFFFFF]"
                            >
                                {buttonLoading ? (
                                    <span className="flex items-center justify-center">
                                        <LoadingAnimation color="white" />
                                    </span>
                                ) : (
                                    "Send message"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
