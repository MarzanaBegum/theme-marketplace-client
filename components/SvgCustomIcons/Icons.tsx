import React from "react";
import CustomIcon, { IconType } from "./CustomIcon";

const Icons = (props: IconType) => {
    return (
        <CustomIcon
            {...props}
            svg={({ stroke, color, width, height, groupClassName }) => (
                <svg
                    width={width}
                    height={height}
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0.7375 10.5735C0.7375 9.08845 1.94139 7.88456 3.42647 7.88456H6.11544V10.5735C6.11544 12.0586 4.91155 13.2625 3.42647 13.2625C1.94139 13.2625 0.7375 12.0586 0.7375 10.5735ZM10.5735 7.88456C12.0586 7.88456 13.2625 9.08845 13.2625 10.5735C13.2625 12.0586 12.0586 13.2625 10.5735 13.2625C9.08845 13.2625 7.88456 12.0586 7.88456 10.5735V7.88456H10.5735ZM13.2625 3.42647C13.2625 4.91155 12.0586 6.11544 10.5735 6.11544H7.88456V3.42647C7.88456 1.94139 9.08845 0.7375 10.5735 0.7375C12.0586 0.7375 13.2625 1.94139 13.2625 3.42647ZM3.42647 6.11544C1.94139 6.11544 0.7375 4.91155 0.7375 3.42647C0.7375 1.94139 1.94139 0.7375 3.42647 0.7375C4.91155 0.7375 6.11544 1.94139 6.11544 3.42647V6.11544H3.42647Z"
                        className={groupClassName}
                        stroke={stroke}
                        strokeWidth="0.975"
                    />
                </svg>
            )}
        ></CustomIcon>
    );
};

export default Icons;
