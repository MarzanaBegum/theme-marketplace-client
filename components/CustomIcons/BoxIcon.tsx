import React from "react";
import CustomIcon, { IconType } from "./CustomIcon";

const BoxIcon = (props: IconType) => {
    return (
        <CustomIcon
            {...props}
            svg={({ color, width, height, className, groupClassName }) => (
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {className !== "active" ? (
                        <rect
                            x="0.75"
                            y="0.75"
                            className={groupClassName}
                            width="16.5"
                            height="16.5"
                            rx="1.25"
                            stroke="#B8C0CC"
                            strokeWidth="1.5"
                        ></rect>
                    ) : (
                        <>
                            <rect
                                width="18"
                                height="18"
                                rx="2.25"
                                fill="#7266FC"
                            />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M15.2932 4.23289C15.5788 4.53291 15.5671 5.00764 15.2671 5.29323L6.60045 13.5432C6.45245 13.6841 6.25337 13.7585 6.04925 13.7492C5.84512 13.7399 5.65362 13.6478 5.51903 13.494L2.1857 9.68632C1.91286 9.37466 1.94433 8.90083 2.256 8.62799C2.56766 8.35516 3.04149 8.38663 3.31432 8.6983L6.1326 11.9176L14.2329 4.20677C14.5329 3.92118 15.0076 3.93287 15.2932 4.23289Z"
                                fill="white"
                            />
                        </>
                    )}
                </svg>
            )}
        ></CustomIcon>
    );
};

export default BoxIcon;
