import React from "react";
import CustomIcon, { IconType } from "./CustomIcon";

const WishIcon = (props: IconType) => {
    return (
        <CustomIcon
            {...props}
            svg={({ stroke, color, width, height }) => (
                <svg
                    width="24"
                    height="21"
                    viewBox="0 0 24 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M20.8382 2.61183C20.3274 2.10083 19.721 1.69547 19.0535 1.41891C18.3861 1.14235 17.6707 1 16.9482 1C16.2257 1 15.5103 1.14235 14.8428 1.41891C14.1754 1.69547 13.5689 2.10083 13.0582 2.61183L11.9982 3.67183L10.9382 2.61183C9.90647 1.58013 8.5072 1.00053 7.04817 1.00053C5.58913 1.00053 4.18986 1.58013 3.15817 2.61183C2.12647 3.64352 1.54688 5.04279 1.54688 6.50183C1.54687 7.96086 2.12647 9.36013 3.15817 10.3918L4.21817 11.4518L11.9982 19.2318L19.7782 11.4518L20.8382 10.3918C21.3492 9.88107 21.7545 9.27464 22.0311 8.60718C22.3076 7.93972 22.45 7.22431 22.45 6.50183C22.45 5.77934 22.3076 5.06393 22.0311 4.39647C21.7545 3.72901 21.3492 3.12258 20.8382 2.61183V2.61183Z"
                        stroke={stroke}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        ></CustomIcon>
    );
};

export default WishIcon;
