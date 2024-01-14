import React from "react";
import CustomIcon, { IconType } from "./CustomIcon";

const ArrowTopRight = (props: IconType) => {
    return (
        <CustomIcon
            {...props}
            svg={({ groupClassName, className }) => (
                <svg
                    width={25}
                    height={24}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={className}
                >
                    <path
                        d="m7.5 17 10-10M7.5 7h10v10"
                        stroke="#252C48"
                        strokeWidth={2}
                        className={groupClassName}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        ></CustomIcon>
    );
};

export default ArrowTopRight;
