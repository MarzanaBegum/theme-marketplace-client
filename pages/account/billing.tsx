import Link from "next/link";
import AccountNavbar from "../../components/Shared/AccountNavbar";
import Layout from "../../components/Shared/Layout/Layout";
import WishCartHead from "../../components/WishCartPage/WishCartHead";
import BillingHistoryTable from "../../components/BillingPageComponent/BillingHistoryTable";
import BillingFirstCard from "../../components/BillingPageComponent/BillingFirstCard";
import BillingSecondCard from "../../components/BillingPageComponent/BillingSecondCard";
import Meta from "../../components/Shared/Meta";

const Billing = () => {
    return (
        <Layout>
            <Meta title="Billing Details - MyAccount" />
            <AccountNavbar />
            <div>
                <WishCartHead
                    title="Billing"
                    desc="Manage your billing information"
                    bg="bg-neutral-muted"
                />
            </div>
            <div>
                <div className="bg-[#E7E7E7] p-[40px_0px]">
                    <div className="container">
                        <div className=" rounded-[6px] flex flex-col gap-[24px]">
                            <div className="bg-white p-[16px_10px] sm:p-[20px] lg:p-[30px] rounded-[6px]">
                                {/* Billing Details Heading */}
                                <div className="flex gap-[16px] items-center justify-between sm:justify-start mb-[24px]">
                                    <h2 className="text-neutral text-[18px] sm:text-[24px] leading-[27px] sm:leading-[36px] font-semibold">
                                        Billing Details
                                    </h2>
                                    {/* Upgrade Plan Button */}
                                    <Link
                                        href="/unlimited-access#pricing"
                                        className="p-[9.5px_16px] lg:p-[12px_16px] bg-[#7266FC] transition duration-500 hover:bg-[#574dc4] rounded-[6px] flex justify-center gap-[8px] items-center cursor-pointer"
                                    >
                                        <p className="text-white text-[12px] sm:text-[14px] md:text-[16px] font-medium leading-[18px] sm:leading-[21px]">
                                            Upgrade Plan
                                        </p>
                                        <img
                                            src="/images/arrow-up-right-white.svg"
                                            className="w-[24px] h-[24px]"
                                            alt=""
                                        />
                                    </Link>
                                    {/* Upgrade Plan Button End */}
                                </div>
                                {/* Billing Details Heading End */}

                                {/* Billing Details Section */}
                                <div className="flex flex-col lg:flex-row gap-[24px]">
                                    {/* First Item */}
                                    <BillingFirstCard />
                                    {/* First Item End*/}

                                    {/* Second Item */}
                                    <BillingSecondCard />
                                    {/* Second Item End */}
                                </div>
                                {/* Billing Details Section End */}
                            </div>

                            <div className="bg-white max-lg:p-[20px] lg:p-[30px] rounded-[6px]">
                                {/* Billing History & Invoice Heading */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between lg:mb-[30px] mb-[24px]">
                                    <div>
                                        <h2 className="text-neutral text-[18px] sm:text-[24px] leading-[27px] sm:leading-[36px] font-semibold mb-[8px]">
                                            Billing history and invoices
                                        </h2>
                                        <small className="inline-block text-[14px] sm:text-[16px] text-neutral-shade leading-[21px] sm:leading-[24px] font-normal mb-[16px]">
                                            Manage Your billing and payment
                                            details
                                        </small>
                                    </div>
                                    <div className="max-sm:w-full hidden p-[15px] sm:p-[15px_56.5px] lg:p-[8px_16px] text-center rounded-[6px] bg-[#C8CBD0] text-[#f2f2f2] font-medium text-[14px] sm:text-[16px] leading-[21px] sm:leading-[24px] cursor-pointer">
                                        Download
                                    </div>
                                </div>
                                {/* Billing History & Invoice Heading End */}

                                {/* Billing History & Invoice Table */}
                                <BillingHistoryTable />
                                {/* Billing History & Invoice Table End */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Billing;
