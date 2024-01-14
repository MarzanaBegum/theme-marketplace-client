import React from "react";

function WishCartHead({
    title,
    desc,
    bg,
}: {
    title: string;
    desc: string;
    bg?: string;
}) {
    return (
        <div>
            <div className={`${bg || "bg-neutral"} w-full `}>
                <div className="container py-10 sm:py-[60px] max-xs:px-5 lg:py-[80px] text-surface">
                    <div className="text-2xl xl:text-[40px] xl:leading-[60px] leading-9 font-medium sm:text-[32px] sm:leading-[42px]">
                        {title}
                    </div>
                    <div className="pt-2"></div>
                    <div className="text-xs xl:text-base xl:leading-6 leading-[18px] sm:text-sm sm:leading-[21px]">
                        {desc}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WishCartHead;
