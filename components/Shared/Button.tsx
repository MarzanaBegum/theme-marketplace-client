import React, { ButtonHTMLAttributes } from "react";

function Button({
    children,
    className,
    ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={`h-[48px] w-full rounded-md text-xs font-medium bg-brand hover:bg-brand-dark transition-all duration-200 text-white ${className}`}
            {...rest}
        >
            {children}
        </button>
    );
}

export default Button;
