import React from "react";
import CustomIcon, { IconType } from "./CustomIcon";

const FreeImgIcon = (props: IconType) => {
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
                        d="M0.5 11.3955V1.925C0.5 1.55221 0.793145 1.25 1.15476 1.25H14.8452C15.2069 1.25 15.5 1.55221 15.5 1.925V9.92273M0.5 11.3955V14.075C0.5 14.4478 0.793145 14.75 1.15476 14.75H3.19841M0.5 11.3955L2.74907 9.28145C3.00243 9.04331 3.39109 9.04698 3.64016 9.28988L6.13492 11.7227M6.13492 11.7227L3.19841 14.75M6.13492 11.7227L11.2275 6.47275C11.4832 6.20915 11.8978 6.20915 12.1535 6.47275L15.5 9.92273M3.19841 14.75H14.8452C15.2069 14.75 15.5 14.4478 15.5 14.075V9.92273M9.70635 5.09537C9.70635 6.0443 8.96016 6.81355 8.03968 6.81355C7.11921 6.81355 6.37302 6.0443 6.37302 5.09537C6.37302 4.14645 7.11921 3.37719 8.03968 3.37719C8.96016 3.37719 9.70635 4.14645 9.70635 5.09537Z"
                        stroke={stroke}
                        strokeWidth="0.975"
                    />
                </svg>
            )}
        ></CustomIcon>
    );
};

export default FreeImgIcon;
