import React from "react";
import CustomIcon, { IconType } from "./CustomIcon";

const PlayIcon = (props: IconType) => {
    return (
        <CustomIcon
            {...props}
            svg={({ className, groupClassName }) => (
                <svg
                    width="19"
                    height="18"
                    viewBox="0 0 19 18"
                    fill="none"
                    className={`${className} ${groupClassName}`}
                    stroke="#000000"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M9.5 16.5C13.6421 16.5 17 13.1421 17 9C17 4.85786 13.6421 1.5 9.5 1.5C5.35786 1.5 2 4.85786 2 9C2 13.1421 5.35786 16.5 9.5 16.5Z"
                        stroke="#7266FC"
                        className={groupClassName}
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M8 6L12.5 9L8 12V6Z"
                        stroke="#7266FC"
                        strokeWidth="1.4"
                        className={groupClassName}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        ></CustomIcon>
    );
};

export default PlayIcon;
