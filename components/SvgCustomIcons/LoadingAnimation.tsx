import React from "react";
import CustomIcon, { IconType } from "./CustomIcon";

const LoadingAnimation = (props: IconType) => {
    return (
        <CustomIcon
            {...props}
            svg={({ width, height, className, color }) => (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                        display: "block",
                        shapeRendering: "auto",
                    }}
                    width={width}
                    height={height}
                    className={className}
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid"
                    {...props}
                >
                    <circle
                        cx={50}
                        cy={50}
                        r={32}
                        strokeWidth={8}
                        stroke={color}
                        strokeDasharray="50.26548245743669 50.26548245743669"
                        fill="none"
                        strokeLinecap="round"
                    >
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            repeatCount="indefinite"
                            dur="1s"
                            keyTimes="0;1"
                            values="0 50 50;360 50 50"
                        />
                    </circle>
                </svg>
            )}
        ></CustomIcon>
    );
};

export default LoadingAnimation;
