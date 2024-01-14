import React from "react";
import CustomIcon, { IconType } from "./CustomIcon";

const Notification = (props: IconType) => {
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
                        d="M13.5 6C13.5 4.80653 13.0259 3.66193 12.182 2.81802C11.3381 1.97411 10.1935 1.5 9 1.5C7.80653 1.5 6.66193 1.97411 5.81802 2.81802C4.97411 3.66193 4.5 4.80653 4.5 6C4.5 11.25 2.25 12.75 2.25 12.75H15.75C15.75 12.75 13.5 11.25 13.5 6Z"
                        stroke={stroke}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M10.2981 15.75C10.1663 15.9773 9.97701 16.166 9.74929 16.2971C9.52158 16.4283 9.26341 16.4973 9.00062 16.4973C8.73784 16.4973 8.47967 16.4283 8.25196 16.2971C8.02424 16.166 7.83498 15.9773 7.70312 15.75"
                        stroke={stroke}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        ></CustomIcon>
    );
};

export default Notification;
