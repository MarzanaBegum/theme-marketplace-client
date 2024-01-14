import React, { HTMLInputTypeAttribute, useState } from "react";

type InputPasswordType = {
    label?: string;
};

const InputPassword = React.forwardRef(
    (
        {
            label,
            className,
            ...props
        }: React.InputHTMLAttributes<HTMLInputElement> & InputPasswordType,
        ref: React.LegacyRef<HTMLInputElement>
    ) => {
        const [open, setOpen] = useState(false);
        return (
            <div>
                <label
                    className="block text-neutral xl:text-base text-sm leading-[1.5] font-semibold"
                    htmlFor=""
                >
                    {label}
                </label>
                <div className="pt-2"></div>
                <div className="relative">
                    <input
                        ref={ref}
                        {...props}
                        className={`border text-neutral xl:text-sm text-xs border-[#C8CBD0] focus:outline-none p-[15px_16px] rounded-md w-full ${className}`}
                        type={open ? "text" : "password"}
                    />
                    <img
                        onClick={() => setOpen(!open)}
                        className="w-5 h-5 cursor-pointer absolute top-[14px] xl:top-[16px] right-4 "
                        src={open ? "/img/visible.svg" : "/img/invisible.svg"}
                        alt=""
                    />
                </div>
            </div>
        );
    }
);

export default InputPassword;
