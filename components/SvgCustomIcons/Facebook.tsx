import React from "react";
import CustomIcon, { IconType } from "./CustomIcon";

const Facebook = (props: IconType) => {
    return (
        <CustomIcon
            {...props}
            svg={({ stroke, color, width, height }) => (
                <svg
                    width={width}
                    height={height}
                    viewBox="0 0 9 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.0625 0.127317V2.9678L6.61139 2.97219C5.47393 2.97219 5.25475 3.6 5.25475 4.51756V6.55024H7.96425L7.61281 9.72878H5.25475V18H2.42849V9.72878H0.0625V6.55024H2.42849V4.20585C2.42849 1.4839 3.85655 0 5.95008 0C6.94809 0 7.80931 0.087805 8.0625 0.127317Z"
                        fill={stroke}
                    />
                </svg>
            )}
        ></CustomIcon>
    );
};

export default Facebook;
