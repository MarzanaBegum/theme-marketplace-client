import React from "react";
import CustomIcon, { IconType } from "./CustomIcon";

const Linkin = (props: IconType) => {
    return (
        <CustomIcon
            {...props}
            svg={({ stroke, color, width, height }) => (
                <svg
                    width={width}
                    height={height}
                    viewBox="0 0 19 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.5313 18H14.8328V11.7007C14.8328 9.97365 14.1766 9.00849 12.8096 9.00849C11.3225 9.00849 10.5455 10.0129 10.5455 11.7007V18H6.98125V6H10.5455V7.6164C10.5455 7.6164 11.6172 5.63338 14.1637 5.63338C16.709 5.63338 18.5313 7.1877 18.5313 10.4023V18ZM2.7291 4.4287C1.51504 4.4287 0.53125 3.43719 0.53125 2.21435C0.53125 0.991508 1.51504 0 2.7291 0C3.94316 0 4.92637 0.991508 4.92637 2.21435C4.92637 3.43719 3.94316 4.4287 2.7291 4.4287ZM0.888672 18H4.60527V6H0.888672V18Z"
                        fill={stroke}
                    />
                </svg>
            )}
        ></CustomIcon>
    );
};

export default Linkin;
