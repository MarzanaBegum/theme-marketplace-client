import React from "react";
import CustomIcon, { IconType } from "./CustomIcon";

const CartIcon = (props: IconType) => {
    return (
        <CustomIcon
            {...props}
            svg={({ stroke, color, width, height }) => (
                <svg
                    width="22"
                    height="16"
                    viewBox="0 0 22 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1 1H4.63636L7.07273 13.497C7.15586 13.9267 7.38355 14.3127 7.71595 14.5874C8.04835 14.8621 8.46427 15.0081 8.89091 14.9997H17.7273C18.1539 15.0081 18.5698 14.8621 18.9022 14.5874C19.2346 14.3127 19.4623 13.9267 19.5455 13.497L21 5.66655H5.54545"
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

export default CartIcon;
