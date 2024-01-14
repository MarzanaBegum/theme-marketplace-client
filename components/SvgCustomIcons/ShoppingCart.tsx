import React from "react";
import CustomIcon, { IconType } from "./CustomIcon";

const PlayIcon = (props: IconType) => {
    return (
        <CustomIcon
            {...props}
            svg={({ className, groupClassName }) => (
                <svg
                    width={17}
                    height={16}
                    fill="none"
                    className={className}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M7.839 14.665a.667.667 0 1 0 0-1.333.667.667 0 0 0 0 1.333ZM12.503 14.665a.667.667 0 1 0 0-1.333.667.667 0 0 0 0 1.333ZM1.836 2H4.26l1.624 8.331c.056.287.208.544.43.727.22.183.498.28.783.275h5.89c.285.006.562-.092.784-.275a1.25 1.25 0 0 0 .429-.727l.97-5.22H4.865"
                        stroke="#fff"
                        className={groupClassName}
                        strokeWidth={1.4}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        ></CustomIcon>
    );
};

export default PlayIcon;
