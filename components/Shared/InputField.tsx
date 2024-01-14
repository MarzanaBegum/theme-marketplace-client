import React, { InputHTMLAttributes } from "react";

type InputFieldType = {
    label?: string;
};

const InputField = React.forwardRef(
    (
        {
            label,
            className,
            ...props
        }: InputHTMLAttributes<HTMLInputElement> & InputFieldType,
        ref: React.LegacyRef<HTMLInputElement>
    ) => {
        return (
            <div className="w-full">
                <label
                    className="block text-neutral text-sm xl:text-base leading-[1.5] font-medium"
                    htmlFor=""
                >
                    {label}
                </label>
                <div className="pt-2"></div>
                <input
                    ref={ref}
                    className={`border   text-neutral leading-[1.5] xl:text-sm text-xs border-[#C8CBD0] focus:outline-none p-[15px_16px] rounded-md w-full ${className}`}
                    type="text"
                    {...props}
                />
            </div>
        );
    }
);

export default InputField;
