import React, { useState } from "react";
import { useQuery } from "react-query";
import useBillingQuery, {
    BillingHistoryType,
} from "../../api-call/useBillingQuery";
import moment from "moment";
import { api } from "../../api";
import LoadingAnimation from "../LoadingAnimation";
import { useAtom } from "jotai";
import { USER_STATE } from "../../state";
import LoadingAnimation2 from "../SvgCustomIcons/LoadingAnimation";

function BillingHistoryTable() {
    const [user] = useAtom(USER_STATE);

    const { data, isLoading } = useBillingQuery(user?._id);

    return (
        <div className="border-[1px] border-[#9AA5B5] rounded-[6px]">
            <table className="min-w-full">
                <thead className="border-b-[#9AA5B5] border-b-[1px]">
                    <tr>
                        <th className="font-medium text-[14px] leading-[21px] sm:text-[16px] text-neutral py-[18px] pl-[22px] text-left">
                            Invoice No
                        </th>
                        <th className="max-lg:hidden text-left font-medium text-[16px] text-neutral py-[18px]">
                            Billing date
                        </th>
                        <th className="max-lg:hidden text-left font-medium text-[16px] text-neutral py-[18px]">
                            Status
                        </th>
                        <th className="max-lg:hidden text-left font-medium text-[16px] text-neutral py-[18px]">
                            Amount
                        </th>
                        <th className="hidden xl:block text-left font-medium text-[16px] text-neutral py-[18px]">
                            Plan
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length ? (
                        data.map((item: any, i: any) => (
                            <TableItem item={item} key={i} />
                        ))
                    ) : isLoading ? (
                        <tr className="border-b-[#9AA5B5] border-b-[1px] last:border-0">
                            <td className="py-[18px] pl-[22px] font-normal text-[14px] leading-[21px] sm:text-[16px] text-neutral flex items-center gap-3">
                                <LoadingAnimation2 />
                                <div>Loading...</div>
                            </td>
                        </tr>
                    ) : (
                        <tr className="border-b-[#9AA5B5] border-b-[1px] last:border-0">
                            <td className="py-[18px] pl-[22px] font-normal text-[14px] leading-[21px] sm:text-[16px] text-neutral">
                                No data found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

function TableItem({ item }: { item: BillingHistoryType }) {
    const [loading, setLoading] = useState(false);
    // download invoice
    const handleDownload = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const res = await api.get(`/billing/download/${item._id}`, {
                responseType: "blob",
            });
            const href = URL.createObjectURL(res.data);
            const link = document.createElement("a");
            link.href = href;

            link.setAttribute("download", `invoice#${item._id}.pdf`);

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
            setLoading(false);
        } catch (err: any) {
            console.log(err);
            setLoading(false);
        }
    };

    return (
        <tr className="border-b-[#9AA5B5] border-b-[1px] last:border-0">
            <td className="py-[18px] pl-[22px] font-normal text-[14px] leading-[21px] sm:text-[16px] text-neutral">
                {`Invoice#${item.invoice_no}`}
            </td>
            <td className="max-lg:hidden py-[18px] font-normal text-[16px] text-neutral">
                {moment(item.createdAt).format("DD MMM YYYY")}
            </td>
            <td className="max-lg:hidden py-[18px] font-normal text-[16px] text-neutral">
                <span className="text-[16px] p-[10px_16px] rounded-[6px] text-[#13CE66] bg-[#13CE66]/10 capitalize">
                    {item.status}
                </span>
            </td>
            <td className="max-lg:hidden py-[18px] font-normal text-[16px] text-neutral">
                USD ${`${item.amount}`}
            </td>
            <td className="hidden xl:block py-[18px] font-normal text-[16px] text-neutral">
                {item?.plan ? item?.plan?.planName : "None"}
            </td>
            <td
                onClick={handleDownload}
                className="p-[10px] font-normal text-[14px] sm:text-[16px] text-brand text-center sm:text-right lg:text-center cursor-pointer hover:underline"
            >
                {loading ? <LoadingAnimation color="#7266FC" /> : "Download"}
            </td>
        </tr>
    );
}

export default BillingHistoryTable;
