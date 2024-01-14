import React, { InputHTMLAttributes } from "react";

type InputCheckboxType = {
    text: string;
} & InputHTMLAttributes<HTMLInputElement>;

function InputCheckbox({ text, ...rest }: InputCheckboxType) {
    const random = Math.floor(Math.random() * 899999 + 100000).toString();
    return (
        <div className="flex items-center gap-[10px]">
            <input
                {...rest}
                id={random}
                className="text-base h-4 w-4"
                type="checkbox"
            />
            <label
                htmlFor={random}
                className="text-xs leading-[1.5] font-normal text-brand"
            >
                {text}
            </label>
        </div>
    );
}

export default InputCheckbox;
