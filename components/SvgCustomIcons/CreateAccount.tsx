import React from "react";
import CustomIcon, { IconType } from "./CustomIcon";

const CreateAccount = (props: IconType) => {
    return (
        <CustomIcon
            {...props}
            svg={({ stroke, color, width, height }) => (
                <svg
                    width={width}
                    height={height}
                    viewBox="0 0 20 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M15 17V15.3333C15 14.4493 14.6313 13.6014 13.9749 12.9763C13.3185 12.3512 12.4283 12 11.5 12H4.5C3.57174 12 2.6815 12.3512 2.02513 12.9763C1.36875 13.6014 1 14.4493 1 15.3333V17"
                        stroke={stroke}
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M7.5 8C9.433 8 11 6.433 11 4.5C11 2.567 9.433 1 7.5 1C5.567 1 4 2.567 4 4.5C4 6.433 5.567 8 7.5 8Z"
                        stroke={stroke}
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M15.75 5V10.5"
                        stroke={stroke}
                        strokeWidth="1.28333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M18.5 7.75H13"
                        stroke="#3B415A"
                        strokeWidth="1.28333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        ></CustomIcon>
    );
};

export default CreateAccount;
