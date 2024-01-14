import React from "react";
import CustomIcon, { IconType } from "./CustomIcon";

const IllustrateIcon = (props: IconType) => {
    return (
        <CustomIcon
            {...props}
            svg={({ stroke, color, width, height, groupClassName }) => (
                <svg
                    width={width}
                    height={height}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1.25 1.25L11.0375 3.6125L12.05 8.675L8.675 12.05L3.6125 11.0375L1.25 1.25ZM1.25 1.25L6.37055 6.37055M8 12.725L12.725 8L14.75 10.025L10.025 14.75L8 12.725ZM8.675 7.325C8.675 8.07058 8.07058 8.675 7.325 8.675C6.57942 8.675 5.975 8.07058 5.975 7.325C5.975 6.57942 6.57942 5.975 7.325 5.975C8.07058 5.975 8.675 6.57942 8.675 7.325Z"
                        stroke={stroke}
                        strokeWidth="0.975"
                        className={groupClassName}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        ></CustomIcon>
    );
};

export default IllustrateIcon;
