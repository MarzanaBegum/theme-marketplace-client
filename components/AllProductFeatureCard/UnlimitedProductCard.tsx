import React from "react";

const iconList = ["xd", "figma", "invision", "sketch"];

function UnlimitedProductCard() {
    return (
        <div className="bg-[#F8F8F8] p-5 rounded-md">
            <div className="text-sm leading-[18px] tracking-[.15%] sm:text-base sm:leading-[27px] font-medium text-center">
                E-commerce Wireframe Kit
            </div>
            <div>
                <div className="py-10">
                    <img
                        src="/imgs/product-img.svg"
                        className="w-full max-h-[225px] h-full object-cover"
                        alt=""
                    />
                </div>
            </div>
            <div className="flex items-center justify-between">
                <button className="w-[90px] h-[40px] rounded-md text-xs sm:text-sm sm:leading-[21px] leading-[18px] tracking-[1.25%] text-[#252C48] bg-white font-medium">
                    Preview
                </button>
                <div className="text-base leading-[40px] font-semibold">
                    $499.00
                </div>
            </div>
            <div className="pt-5 border-b border-[rgba(0,0,0,.15)]"></div>
            <div className="pt-4"></div>
            <div className="flex items-center justify-center gap-5">
                {iconList.map((v, i) => (
                    <div key={i}>
                        <img src={`/icons/${v}.svg`} alt="" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UnlimitedProductCard;
