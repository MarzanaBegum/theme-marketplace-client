import React from "react";

const ToggleButton = ({
    toggle,
    handleToggle,
    className,
    labelClass,
}: {
    toggle: boolean;
    handleToggle: () => void;
    className?: string;
    labelClass?: string;
}) => {
    return (
        <>
            <label
                className={`relative w-[48px] h-[24px]  inline-block cursor-pointer ${labelClass}`}
            >
                <input type="checkbox" className="w-0 h-0 opacity-0 input" />
                <span
                    className={`absolute top-0 left-0 right-0 bottom-0 bg-[#7266FC] transition-all duration-300 before:absolute before:content-[''] before:h-[18px] before:w-[18px] before:bottom-[3px] before:left-[4px] before:transition-all before:duration-300 before:bg-[#F8F8F8] before:rounded-full rounded-[23px] ${
                        toggle && "before:translate-x-[23px]"
                    } ${className} `}
                    onClick={handleToggle}
                />
            </label>
        </>
    );
};

export default ToggleButton;
