import React from "react";
import CustomIcon, { IconType } from "./CustomIcon";

const InfoIcon = (props: IconType) => {
    return (
        <CustomIcon
            {...props}
            svg={({ className, groupClassName }) => (
                <svg
                    width={16}
                    height={16}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g
                        clipPath="url(#a)"
                        stroke="#9AA5B5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M8.003 14.665a6.667 6.667 0 1 0 0-13.333 6.667 6.667 0 0 0 0 13.333ZM8 10.667V8" />
                        <path d="M8 5.332h.006" strokeWidth={2} />
                    </g>
                    <defs>
                        <clipPath id="a">
                            <path fill="none" d="M0 0h16v16H0z" />
                        </clipPath>
                    </defs>
                </svg>
            )}
        ></CustomIcon>
    );
};

export default InfoIcon;
