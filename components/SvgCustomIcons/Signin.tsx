import React from "react";
import CustomIcon, { IconType } from "./CustomIcon";

const Signin = (props: IconType) => {
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
                        d="M16 17V15.3333C16 14.4493 15.6313 13.6014 14.9749 12.9763C14.3185 12.3512 13.4283 12 12.5 12H5.5C4.57174 12 3.6815 12.3512 3.02513 12.9763C2.36875 13.6014 2 14.4493 2 15.3333V17"
                        stroke={stroke}
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M8.5 8C10.433 8 12 6.433 12 4.5C12 2.567 10.433 1 8.5 1C6.567 1 5 2.567 5 4.5C5 6.433 6.567 8 8.5 8Z"
                        stroke="#3B415A"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        ></CustomIcon>
    );
};

export default Signin;
