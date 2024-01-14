import { useAtom } from "jotai";
import React from "react";
import { USER_STATE } from "../../state";
import moment from "moment";

function BillingFirstCard() {
    const [user] = useAtom(USER_STATE);
    const currentPlan = user?.userStore?.currentPlan;

    const totalDay = currentPlan
        ? getRemainingDate(currentPlan?.planStart, currentPlan?.planEnd)
        : 0;

    const leftDay = currentPlan
        ? Math.max(getRemainingDate(new Date(), currentPlan?.planEnd), 0)
        : 0;

    return (
        <div className="lg:w-[50%] border-[1px] border-[#9AA5B5] rounded-[6px] p-[16px_10px] lg:p-[30px]">
            <div className="mb-[10px] lg:mb-[20px]">
                <div className="flex gap-[8px] items-center mb-[12px]">
                    <h3 className="text-[18px] sm:text-[20px] lg:text-[24px] text-neutral font-semibold leading-[27px] sm:leading-[30px] lg:leading-[36px]">
                        {currentPlan?.planName || "No Plan"}
                    </h3>

                    <div className="flex items-center justify-center w-[85px] h-[30px] text-[14px] font-medium capitalize bg-brand/[10%] text-brand rounded-[6px]">
                        {currentPlan?.isTrial
                            ? "For Week"
                            : currentPlan?.interval || "None"}
                    </div>
                </div>
                <small className="text-[12px] text-neutral-shade leading-[15px] font-normal">
                    {currentPlan ? (
                        leftDay === 0 ? (
                            <span>
                                {currentPlan?.planName} plan expired, please
                                upgrade now
                            </span>
                        ) : (
                            <span>
                                {currentPlan?.planName} plan will be end after
                                <span className="ml-[2px]">
                                    {moment(currentPlan?.planEnd).format("LL")}
                                </span>
                                <span></span>
                            </span>
                        )
                    ) : (
                        <span>You haven't subscribe any plan yet</span>
                    )}
                </small>
            </div>

            <div className="flex flex-col gap-[12px]">
                <div className="flex items-center justify-between">
                    <div className="font-normal sm:font-semibold text-[10px] sm:text-[14px] text-[#676767] leading-[17px]">
                        {currentPlan ? (
                            leftDay === 0 ? (
                                <span className="text-error">Plan Expired</span>
                            ) : (
                                leftDay + " of " + totalDay + " days left"
                            )
                        ) : (
                            "NaN days left"
                        )}
                    </div>
                    <div className="flex items-center gap-[12px]">
                        <span className="text-[#000805] font-semibold text-[24px] leading-[36px]">
                            {`${currentPlan ? currentPlan.planPrice : 0}`}$
                        </span>
                        {currentPlan && !currentPlan.isTrial && (
                            <span className="text-neutral-shade font-medium text-[14px] leading-[24px]">
                                / Per{" "}
                                <span className="capitalize">
                                    {currentPlan?.interval}
                                </span>
                            </span>
                        )}
                    </div>
                </div>

                <div>
                    <div className="bg-surface-muted h-[6px] rounded-[6px] flex items-center">
                        <div
                            style={dateProgress(leftDay, totalDay)}
                            className="bg-brand rounded-[6px] h-[8px] "
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function dateProgress(remainingDay: number, overallDay: number) {
    return { width: `${(remainingDay / overallDay) * 100}%` };
}

export function getRemainingDate(startDate: Date, endDate: Date) {
    const startingDate = new Date(startDate);
    const endingDate = new Date(endDate);

    const difference = endingDate.getTime() - startingDate.getTime();
    return Math.round(difference / (1000 * 3600 * 24));
}

export default BillingFirstCard;
