import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { USER_STATE } from "../../state";
import Link from "next/link";

function SubscriptionSummary({ data }: { data: any }) {
    const router = useRouter();
    const { interval }: any = router.query;
    const [user] = useAtom(USER_STATE);

    useEffect(() => {
        if (data?.isTrial && user) {
            if (user.userStore.freebieUse) {
                router.push("/");
            }
        }
    });

    return (
        <div className="md:w-[255px] 2xl:w-[464px] lg:w-[320px] xl:w-[380px]   3xl:w-[500px]">
            <div className="text-lg block  sm:text-2xl leading-[1.5] text-neutral font-medium xl:font-semibold md:text-xl lg:text-2xl">
                <div className="flex items-center gap-2">
                    <img
                        onClick={() => router.back()}
                        className="md:hidden cursor-pointer"
                        src="/icons/arrow-left.svg"
                        alt=""
                    />
                    Subscription summary
                </div>
            </div>
            <div className="pt-4"></div>

            {/* <div className="pt-6"></div> */}
            <div className="bg-white p-[10px] py-6 xl:p-5 xl:py-8 sm:py-7   xl:text-base sm:p-5 md:p-[20px_10px] rounded-md">
                <p className="font-bold lg:text-[24px] md:text-[20px] text-[18px]">
                    {data?.title}
                </p>
                <h1 className="md:py-[20px] pb-[16px] lg:text-[56px] md:text-[40px] text-[32px] font-semibold flex items-center gap-[8px]">
                    ${data?.price[interval]}
                    <span className="font-medium capitalize md:text-[16px] text-[14px]">
                        / {data?.isTrial ? "Week Only" : interval}
                    </span>
                </h1>

                <p className="text-[#252C48] group-hover:text-white md:text-[18px] lg:text-[20px] font-bold mb-[19px] sm:mb-[25px]">
                    Everything in {data?.title}:
                </p>

                <div className="flex flex-col gap-4">
                    {data?.features.map((v: any, i: number) => (
                        <div key={i} className="flex items-center gap-2">
                            <img
                                className="w-6 h-6 sm:w-8 sm:h-8"
                                src={
                                    v.isValid
                                        ? "/images/Checkmark.svg"
                                        : "/images/Closemark.svg"
                                }
                                alt=""
                            />
                            <div className="text-sm text-neutral leading-[1.5]  font-medium xl:text-[16px]">
                                {v.text}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SubscriptionSummary;
