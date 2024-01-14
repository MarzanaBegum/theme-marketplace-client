import React from "react";
import CustomIcon, { IconType } from "./CustomIcon";

const Logout = (props: IconType) => {
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
                        d="M11.25 2.25L14.25 2.25C14.6478 2.25 15.0294 2.40804 15.3107 2.68934C15.592 2.97064 15.75 3.35218 15.75 3.75L15.75 14.25C15.75 14.6478 15.592 15.0294 15.3107 15.3107C15.0294 15.592 14.6478 15.75 14.25 15.75L11.25 15.75"
                        stroke={stroke}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M6 5.25L2.25 9L6 12.75"
                        stroke={stroke}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M2.25 9L11.25 9"
                        stroke={stroke}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        ></CustomIcon>
    );
};

export default Logout;
