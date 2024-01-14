import React from "react";
import CustomIcon, { IconType } from "./CustomIcon";

const HeartIcon = (props: IconType) => {
    return (
        <CustomIcon
            {...props}
            svg={({
                groupClassName,
                className,
                stroke,
                color,
                width,
                height,
            }) => (
                <svg
                    width={24}
                    height={24}
                    fill={color}
                    xmlns="http://www.w3.org/2000/svg"
                    className={className}
                >
                    <path
                        d="M20.838 4.612a5.5 5.5 0 0 0-7.78 0l-1.06 1.06-1.06-1.06a5.501 5.501 0 0 0-7.78 7.78l1.06 1.06 7.78 7.78 7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78v0Z"
                        stroke={stroke ? stroke : "#252C48"}
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

export default HeartIcon;
