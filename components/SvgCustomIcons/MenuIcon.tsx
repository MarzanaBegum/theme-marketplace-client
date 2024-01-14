import React from "react";
import CustomIcon, { IconType } from "./CustomIcon";

const MenuIcon = (props: IconType) => {
    return (
        <CustomIcon
            {...props}
            svg={({ stroke, color, width, height }) => (
                <svg
                    width="21"
                    height="17"
                    viewBox="0 0 21 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1.75 1.625H19.75"
                        stroke={stroke}
                        strokeWidth="2.19375"
                        strokeLinecap="round"
                    />
                    <path
                        d="M1.75 8.625H19.75"
                        stroke={stroke}
                        strokeWidth="2.19375"
                        strokeLinecap="round"
                    />
                    <path
                        d="M1.75 15.625H19.75"
                        stroke={stroke}
                        strokeWidth="2.19375"
                        strokeLinecap="round"
                    />
                </svg>
            )}
        ></CustomIcon>
    );
};

export default MenuIcon;
