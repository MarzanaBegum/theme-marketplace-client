import React, { useState } from "react";
import ContactCardBottom from "../ContactCardBottom";
import SupportHead from "../Shared/SupportHead";

function SupportData({ data }: any) {
    const [getId, setGetId] = useState(0);
    return (
        <div>
            <SupportHead
                data={data}
                title={data[0]?.head_title}
                description={data[0]?.head_description}
            />
            <div className="bg-surface-muted">
                <div className="container py-[40px] sm:py-[60px] lg:py-[40px] xl:py-[80px]">
                    <div className="max-w-[1283.21px]">
                        <div className="mb-[20px] sm:mb-[24px] px-[20px]">
                            <ul className="flex flex-col gap-[12px] sm:gap-[16px] lg:gap-[12px] 2xl:gap-[16px] list-disc">
                                {data.map((item: any) => (
                                    <div key={item.id}>
                                        <li
                                            onMouseOver={() => {
                                                setGetId(item.id);
                                            }}
                                            onMouseLeave={() => {
                                                setGetId(item.id);
                                            }}
                                            className={`${
                                                getId === item.id &&
                                                "hover:text-[#7266FC]"
                                            } cursor-pointer text-[20px] leaing-[30px] sm:text-[24px] sm:leading-[36px] lg:text-[20px] lg:leading-[30px] font-medium xl:text-[24px] xl:leading-[36px] text-neutral xl:font-semibold`}
                                        >
                                            <a href={item.url}>{item.title}</a>
                                        </li>
                                    </div>
                                ))}
                            </ul>
                        </div>
                        <a
                            href=""
                            className="text-[20px] leading-[30px] underline font-medium text-brand"
                        >
                            See more article
                        </a>
                        <p className="my-[20px] sm:my-[24px] lg:mt-[30px] lg:mb-[34px] xl:mt-[20px] 2xl:mt-[24px] text-[14px] leading-[20px] xl:text-[16px] xl:leading-[24px] font-normal">
                            {data[0]?.article_des}
                        </p>
                        <div className="mb-[40px] sm:mb-[24px] lg:mb-[40px]">
                            <ul className="flex flex-col gap-[20px] sm:gap-[24px] lg:gap-[16px] xl:gap-[24px] list-decimal list-inside">
                                {data.map((item: any) => (
                                    <div key={item.id} id={item.wrapId}>
                                        <li className="text-[20px] leading-[30px] mb-[16px] sm:text-[24px] sm:leaing-[36px] lg:text-[20px] lg:leading-[30px] font-medium xl:text-[24px] xl:leading-[36px] text-neutral xl:font-semibold">
                                            {item.title}
                                        </li>
                                        <p className="text-[14px] leading-[20px] xl:text-[16px] xl:leading-[24px] font-normal text-neutral-muted">
                                            {item.description}
                                        </p>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <ContactCardBottom
                        title="If you can’t find your answer, Contact us here"
                        description="Can’t find the answer you’re looking for? Please chat to our
            friendly team."
                    />
                </div>
            </div>
        </div>
    );
}

export default SupportData;
