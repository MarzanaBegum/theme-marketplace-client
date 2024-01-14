import React from "react";
import CustomIcon, { IconType } from "./CustomIcon";

const CodeIcon = (props: IconType) => {
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
                        className={groupClassName}
                        d="M0.5 4.60787V14.1409C0.5 14.4773 0.772721 14.75 1.10914 14.75H14.8909C15.2273 14.75 15.5 14.4773 15.5 14.1409V4.60787M0.5 4.60787V1.85914C0.5 1.52272 0.77272 1.25 1.10914 1.25H14.8909C15.2273 1.25 15.5 1.52272 15.5 1.85914V4.60787M0.5 4.60787H15.5M10.4497 2.9632H13.9925M5.701 7.76015L3.28894 9.47335L5.701 11.5292M10.4497 7.76015L13.0879 9.47335L10.4497 11.5292M9.69598 6.38959L6.60553 12.7627"
                        stroke={stroke}
                        strokeWidth="0.975"
                        strokeLinecap="round"
                    />
                </svg>
            )}
        ></CustomIcon>
    );
};

export default CodeIcon;
