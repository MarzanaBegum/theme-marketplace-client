import Link from "next/link";
import React from "react";

function ContactCardBottom({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <div className="">
            <div className="bg-[#F9F9FF] sm:bg-white rounded-[6px] max-w-[1543px] mx-auto">
                <div className="px-[15.5px] py-[20px] sm:py-[24px] lg:py-[40px] 2xl:py-[32px] 3xl:py-[47px] text-center">
                    <h1 className="text-[24px] sm:text-[32px] lg:text-[24px] font-medium leading-[36px] tracking-[0.25%] text-[#252C48] ">
                        {title}
                    </h1>
                    <p className="text-[#667085] font-normal text-[12px] sm:text-[14px] sm:leading-[21px] leading-[18px] mt-[8px] mb-[20px] sm:mb-[39px] lg:mb-[30px] xl:mb-[24px] 2xl:mb-[32px] xl:text-[16px] xl:leading-[24px]">
                        {description}
                    </p>
                    <Link href="/contact-us">
                        <button className="bg-[#7266FC] w-[152px] sm:w-[164px] lg:w-[174px] xl:h-[56px]  hover:bg-[#473bc7] h-[48px] rounded-[6px] text-[12px] sm:text-[14px] text-white lg:text-[16px]">
                            Contact
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ContactCardBottom;
