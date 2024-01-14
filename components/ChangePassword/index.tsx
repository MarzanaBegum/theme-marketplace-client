import React, { useState } from "react";
import { useForm } from "react-hook-form";
import LoadingAnimation from "./../LoadingAnimation/index";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { api } from "../../api";
import InputPassword from "../Shared/InputPassword";
import { useAtom } from "jotai";
import { USER_STATE } from "../../state";
import { useQuery } from "react-query";

type ChangePasswordInput = {
    old_password: string;
    new_password: string;
    confirm_new_password: string;
};

const validationSchema = yup.object({
    old_password: yup.string().required(),
    new_password: yup
        .string()
        .required()
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        ),
    confirm_new_password: yup
        .string()
        .oneOf([yup.ref("new_password")], "Passwords does not match")
        .required(),
});
export default function ChangePassword() {
    const [buttonLoading, setButtonLoading] = useState(false);
    const [error, setError] = useState("");
    const [user] = useAtom(USER_STATE);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ChangePasswordInput>({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data: ChangePasswordInput) => {
        if (buttonLoading) return;
        setButtonLoading(true);
        setError("");
        try {
            const { confirm_new_password, ...rest } = data;
            await api.put(`/users/change-password/${user?._id}`, {
                ...rest,
            });

            await api.post(`/notifications`, {
                userId: user?._id,
                title: "Password changed",
                description: "You have changed your password !",
            });

            setButtonLoading(false);
            toast.success("Password changed successfully!");
            reset();
        } catch (err: any) {
            const errMessage = err.response
                ? err.response.data.message
                : err.message;
            setButtonLoading(false);
            setError(errMessage);
        }
    };

    if (user?.googleAuth) return <></>;

    return (
        <div className="bg-surface h-full w-[335px] sm:w-[600px] md:w-[668px] lg:w-[453px] xl:w-[528px] 2xl:w-[708px] 3xl:w-[768px] py-[16px] px-[10px] lg:p-[20px] rounded-[6px]">
            <h2 className="text-[20px] leading-[30px] font-medium lg:text-[24px] lg:leading-[36px] lg:font-semibold text-neutral">
                Change password
            </h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-[16px] lg:mt-[24px] flex flex-col gap-4 xl:gap-5 2xl:gap-6"
            >
                <div>
                    <InputPassword
                        {...register("old_password")}
                        placeholder="*********"
                        label="Old Password"
                        className={`${
                            errors.old_password
                                ? "!border-error text-error"
                                : "focus:border-brand"
                        }`}
                    />
                    {errors.old_password && (
                        <p className="mt-2 text-sm first-letter:capitalize text-error">
                            {errors.old_password?.message?.toString()}
                        </p>
                    )}
                </div>
                <div>
                    <InputPassword
                        {...register("new_password")}
                        placeholder="*********"
                        label="New Password"
                        className={`${
                            errors.new_password
                                ? "!border-error text-error"
                                : "focus:border-brand"
                        }`}
                    />
                    {errors.new_password && (
                        <p className="mt-2 text-sm first-letter:capitalize text-error">
                            {errors.new_password?.message?.toString()}
                        </p>
                    )}
                </div>
                <div>
                    <InputPassword
                        {...register("confirm_new_password")}
                        placeholder="*********"
                        label="Confirm new password"
                        className={`${
                            errors.confirm_new_password
                                ? "!border-error text-error"
                                : "focus:border-brand"
                        }`}
                    />
                    {errors.confirm_new_password && (
                        <p className="mt-2 text-sm first-letter:capitalize text-error">
                            {errors.confirm_new_password?.message?.toString()}
                        </p>
                    )}
                </div>
                {error && (
                    <h3 className="text-error text-[14px] leading-[18px] text-normal">
                        {error}
                    </h3>
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
                        "Change password"
                    )}
                </button>
            </form>
        </div>
    );
}
