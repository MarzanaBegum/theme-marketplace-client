import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import LoadingAnimation from "../SvgCustomIcons/LoadingAnimation";

type Input = {
    email: string;
};
const schema = yup.object({
    email: yup.string().email().required("Enter a valid email address"),
});

const SubscribeNewsLetter = ({ status, message, onValidated }: any) => {
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Input>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: Input) => {
        try {
            await onValidated({ EMAIL: data.email });
            reset();
            toast.success("Thank you for subscribing!");
        } catch (err: any) {
            console.log(err);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="2xl:w-[642px] w-[100%] xs:w-[335px] sm:w-[493px] h-[48px] rounded-[6px] bg-[#FFFFFF] flex justify-between mx-auto">
                    <input
                        {...register("email")}
                        placeholder="example@gmail.com"
                        className="w-full h-full outline-0 text-neutral text-[16px] font-normal rounded-[6px] px-[27px]"
                    />
                    <button
                        type="submit"
                        className="w-[140px] h-[48px] rounded-[4px] bg-[#7266FC] text-[16px] text-white font-normal hover:bg-[#443ab9] cursor-pointerz"
                    >
                        {status === "sending" ? (
                            <span className="flex items-center justify-center">
                                <LoadingAnimation color="white" />
                            </span>
                        ) : (
                            "Subscribe"
                        )}
                    </button>
                </div>
                {errors.email && (
                    <div className="2xl:w-[642px] w-[100%] xs:w-[335px] sm:w-[493px] mx-auto">
                        <p className="my-2 text-sm text-left first-letter:capitalize text-error">
                            {errors.email?.message?.toString()}
                        </p>
                    </div>
                )}
            </form>
        </div>
    );
};
export default SubscribeNewsLetter;
