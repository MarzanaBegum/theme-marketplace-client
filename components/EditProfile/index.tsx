import React, { useState } from "react";
import { useForm } from "react-hook-form";
import LoadingAnimation from "./../LoadingAnimation/index";
import { toast } from "react-toastify";
import { api } from "../../api";
import { useQuery } from "react-query";
import { useAtom } from "jotai";
import InputField from "../Shared/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { USER_STATE } from "../../state";
import { useUserQuery } from "../Shared/ProtectedRoutes";
import imageCompression from "browser-image-compression";

type UpdateInput = {
    firstName: string;
    lastName: string;
    email: string;
};

const schema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
});
export default function EditProfile() {
    const [user] = useAtom(USER_STATE);
    const { refetch } = useUserQuery();
    const [buttonLoading, setButtonLoading] = useState(false);
    const [error, setError] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateInput>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: user?.email,
            firstName: user?.firstName,
            lastName: user?.lastName,
        },
    });

    const onSubmit = async (data: UpdateInput) => {
        if (buttonLoading) return;
        setButtonLoading(true);
        setError("");
        try {
            await api.put(`/users/${user?._id}`, data);
            await api.post(`/notifications`, {
                userId: user?._id,
                title: "Account details updated",
                description: "You have just updated your account details!",
            });
            setButtonLoading(false);
            refetch();
            toast.success("User updated successfully");
        } catch (err: any) {
            setButtonLoading(false);
            setError(err?.response?.data?.message);
        }
    };

    const changeProfilePic = async (file: File) => {
        try {
            const compressImg = await imageCompression(file, {
                maxSizeMB: 1,
                maxWidthOrHeight: 200,
                useWebWorker: true,
            });

            const formData = new FormData();
            formData.append("file", compressImg, file.name);

            const { data } = await api.post("/bucket-store/upload", formData);
            await api.put("/users/" + user?._id, { profile: data.location });

            await api.post(`/notifications`, {
                userId: user?._id,
                title: "Profile photo updated",
                description: "You have just updated your profile photo!",
            });
            refetch();
            toast.success("Profile updated successfully");
        } catch (err: any) {
            const errMessage = err.response
                ? err.response.data.message
                : err.message;
            toast.error(errMessage);
        }
    };

    return (
        <div className="bg-surface h-auto w-[335px] sm:w-[600px] md:w-[668px] lg:w-[453px] xl:w-[528px] 2xl:w-[708px] 3xl:w-[768px] py-[16px] px-[10px] lg:p-[20px] rounded-[6px]">
            <h2 className="text-[20px] leading-[30px] mb-[16px] font-medium lg:text-[24px] lg:leading-[36px] lg:mb-[24px] lg:font-semibold text-neutral">
                Edit profile
                {/* <label className="text-sm font-medium ml-3 text-brand hover:text-brand-dark transit cursor-pointer">
                    Change Picture
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                            const files = e.target.files;
                            if (files?.length) {
                                changeProfilePic(files[0]);
                            }
                        }}
                        onClick={(e) => {
                            e.currentTarget.value = "";
                        }}
                    />
                </label> */}
            </h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-[16px] xl:gap-[20px] 2xl:gap-[24px]"
            >
                <div className="">
                    <InputField
                        {...register("firstName")}
                        placeholder="Gregg"
                        label="First Name"
                        className={`${
                            errors.firstName
                                ? "!border-error text-error"
                                : "focus:border-brand"
                        }`}
                    />
                    {errors.firstName && (
                        <p className="mt-2 text-sm first-letter:capitalize text-error">
                            {errors.firstName?.message?.toString()}
                        </p>
                    )}
                </div>
                <div className="w-[100%]">
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
                    {errors.lastName && (
                        <p className="mt-2 text-sm first-letter:capitalize text-error">
                            {errors.lastName?.message?.toString()}
                        </p>
                    )}
                </div>
                <div>
                    <InputField
                        placeholder="digitalgregg@gmail.com"
                        label="Your Email"
                        {...register("email")}
                        readOnly
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
                {error && (
                    <p className="mt-2 text-sm first-letter:capitalize text-error">
                        {error}
                    </p>
                )}
                <button
                    type="submit"
                    className="w-[100%] h-[40px] text-[14px] font-medium lg:w-[220px] lg:h-[56px] lg:text-[16px] lg:font-semibold cursor-pointer rounded-[6px] bg-[#7266FC] hover:bg-brand-dark transition-all duration-200 text-surface"
                >
                    {buttonLoading ? (
                        <span className="flex items-center justify-center">
                            <LoadingAnimation color="white" />
                        </span>
                    ) : (
                        "Update profile"
                    )}
                </button>
            </form>
        </div>
    );
}
