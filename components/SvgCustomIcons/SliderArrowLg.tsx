import React from "react";
import CustomIcon, { IconType } from "./CustomIcon";

const SliderArrowLg = (props: IconType) => {
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
                    <mask
                        id="a"
                        style={{
                            maskType: "alpha",
                        }}
                        maskUnits="userSpaceOnUse"
                        x={0}
                        y={0}
                        width={25}
                        height={24}
                    >
                        <path
                            transform="rotate(180 24.14 24)"
                            fill="#D9D9D9"
                            d="M24.141 24h24v24h-24z"
                            className={groupClassName}
                        />
                    </mask>
                    <g mask="url(#a)">
                        <path
                            d="m16.598 2 1.8 1.775L10.056 12l8.342 8.225-1.8 1.775L6.455 12 16.598 2Z"
                            fill="#7266FC"
                            className={groupClassName}
                        />
                    </g>
                </svg>
            )}
        ></CustomIcon>
    );
};

export default SliderArrowLg;
