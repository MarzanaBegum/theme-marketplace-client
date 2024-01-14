import React from "react";
import CustomIcon, { IconType } from "./CustomIcon";

const SliderArrow = (props: IconType) => {
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
                    <path
                        d="M15.996 12a1.992 1.992 0 0 1-.585 1.414l-5.294 5.293-1.414-1.414L13.996 12 8.703 6.707l1.414-1.414 5.293 5.293A1.994 1.994 0 0 1 15.996 12Z"
                        fill="#fff"
                        className={groupClassName}
                    />
                </svg>
            )}
        ></CustomIcon>
    );
};

export default SliderArrow;
