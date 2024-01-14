import React from "react";
import CustomIcon, { IconType } from "./CustomIcon";

const CrossIcon = (props: IconType) => {
    return (
        <CustomIcon
            {...props}
            svg={({ color, width, height, className, groupClassName }) => (
                <svg
                    width={width}
                    height={height}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M18 6L6 18"
                        stroke="#252C48"
                        strokeWidth={2}
                        className={groupClassName}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M6 6L18 18"
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

export default CrossIcon;
