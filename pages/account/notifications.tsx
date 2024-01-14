import React, { useEffect, useState } from "react";
import getNotificationsQuery from "../../api-call/getNotificationsQuery";
import AccountNavbar from "../../components/Shared/AccountNavbar";
import Layout from "../../components/Shared/Layout/Layout";
import Pagination from "../../components/Shared/Pagination";
import WishCartHead from "../../components/WishCartPage/WishCartHead";
import { useQuery } from "react-query";
import moment from "moment";
import LoadingAnimation from "../../components/SvgCustomIcons/LoadingAnimation";
import { useAtom } from "jotai";
import { USER_STATE } from "../../state";
import Meta from "../../components/Shared/Meta";

function Notifications() {
    const [user] = useAtom(USER_STATE);

    const { data, isLoading, refetch } = useQuery(
        ["Get-notifications-data"],
        getNotificationsQuery(user?._id)
    );

    return (
        <Layout>
            <Meta title="Notifications - MyAccount" />

            <AccountNavbar />
            <div>
                <WishCartHead
                    title="Notifications"
                    desc="Manage your subcription and payment details."
                    bg="bg-neutral-muted"
                />
            </div>
            <div className="bg-[#EFF3FB]">
                <div className="pt-[40px] sm:pt-[60px] xl:pt-[80px]"></div>
                <div className="container ">
                    <Pagination
                        dataArr={data || []}
                        className="pt-5 lg:pt-[40px]"
                    >
                        {(data) => (
                            <div className=" lg:py-[30px]  lg:bg-white flex flex-col gap-4 sm:gap-6 lg:gap-0 lg:shadow-[0px_5px_15px_rgba(0,0,0,0.1)] ">
                                {data.length !== 0 ? (
                                    data.map((v: any, i) => (
                                        <div
                                            key={i}
                                            className="bg-white rounded-md h-auto p-4 lg:p-[30px] flex gap-5 "
                                            data-active="bg-surface-muted"
                                        >
                                            <div>
                                                <img
                                                    src="/icons/message-circle.svg"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="w-[calc(100%-44px)]">
                                                <div className="text-neutral font-medium text-sm sm:text-base leading-[1.5]">
                                                    {v?.title}
                                                </div>
                                                <div className="pt-2 xl:pt-4"></div>
                                                <div className="text-[#636973] lg:text-base font-normal text-sm leading-[1.5]">
                                                    {v?.description}
                                                </div>
                                                <div className="pt-4 lg:pt-[30px]"></div>
                                                <div className="text-xs lg:text-base text-[#3E444D] font-medium leading-[1.5]">
                                                    - ThemeHive Team
                                                </div>
                                                <div className="pt-1"></div>
                                                <div
                                                    data-active="text-brand"
                                                    className="  text-[10px] text-[#636973] leading-[1.5]"
                                                >
                                                    {moment(
                                                        v?.createdAt
                                                    ).fromNow()}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : isLoading ? (
                                    <div className="flex px-[20px] gap-3 item-center">
                                        <LoadingAnimation color="#7266FC" />
                                        <div>Loading...</div>
                                    </div>
                                ) : (
                                    <div className="flex gap-3 px-[20px] items-center">
                                        <img
                                            src="/icons/message-circle.svg"
                                            alt=""
                                        />
                                        <h2 className="text-xs lg:text-base text-[#3E444D] font-medium leading-[1.5]">
                                            No Notifications
                                        </h2>
                                    </div>
                                )}
                            </div>
                        )}
                    </Pagination>
                </div>
                <div className="pt-[40px] sm:pt-[60px] xl:pt-[80px]"></div>
            </div>
        </Layout>
    );
}

export default Notifications;
