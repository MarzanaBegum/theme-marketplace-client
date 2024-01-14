import React from "react";
import CustomIcon, { IconType } from "./CustomIcon";

const Pricing = (props: IconType) => {
    return (
        <CustomIcon
            {...props}
            svg={({ stroke, color, width, height }) => (
                <svg
                    width={width}
                    height={height}
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M9 1.5L9 16.5"
                        stroke={stroke}
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M12.75 3.75H7.125C6.42881 3.75 5.76113 4.02656 5.26884 4.51884C4.77656 5.01113 4.5 5.67881 4.5 6.375C4.5 7.07119 4.77656 7.73887 5.26884 8.23116C5.76113 8.72344 6.42881 9 7.125 9H10.875C11.5712 9 12.2389 9.27656 12.7312 9.76884C13.2234 10.2611 13.5 10.9288 13.5 11.625C13.5 12.3212 13.2234 12.9889 12.7312 13.4812C12.2389 13.9734 11.5712 14.25 10.875 14.25H4.5"
                        stroke={stroke}
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        ></CustomIcon>
    );
};

export default Pricing;
