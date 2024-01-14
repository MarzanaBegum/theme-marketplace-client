import { useRouter } from "next/router";
import React from "react";
import { ProductType } from "../../api-call/useProductListQuery";
import { GetPaymentContext } from "../../context/PaymentContext";
import { productSupportData } from "../../data/fixed";
import useSingleDownloadedProduct from "../../api-call/useSingleDownloadedProduct";
import { useAtom } from "jotai";
import { USER_STATE } from "../../state";
import { useSupportLeft } from "../ProductViewComponent/ProductViewPaid";
import Link from "next/link";

type ProductQueryType = {
    id: string;
    license: "personal" | "commercial" | "buyout";
    services: any;
    support: string;
};

function ProductSummary({ data }: { data: ProductType }) {
    const { totalPrice } = usePriceServices();
    const router = useRouter();
    const [user] = useAtom(USER_STATE);
    let { license, support, id, services } = router.query as ProductQueryType;

    const { data: downloadProduct } = useSingleDownloadedProduct(user?._id, id);

    const supportLeft = useSupportLeft(
        downloadProduct?.support?.start,
        downloadProduct?.support?.end
    );

    const filterDownloadedService =
        downloadProduct?.services?.map((v: any) => v.text) || [];

    const newFilterServices = data?.services?.filter(
        (v) => !filterDownloadedService.includes(v.text)
    );

    const filterServices = newFilterServices?.filter((v, i) =>
        services?.includes(i.toString())
    );

    const newFilterSupport = productSupportData.filter((v) =>
        !supportLeft ? v : v.text !== downloadProduct?.support?.text
    );

    const filterSupport = newFilterSupport.find(
        (v, i) => `${support}` === `${i}`
    );

    const licensePrice =
        downloadProduct?.license !== license
            ? license
                ? Number(data?.licenses[license]?.price) || 0
                : 0
            : "Paid";

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
                    Product summary{" "}
                </div>
            </div>
            <div className="pt-4"></div>

            <div className="bg-white p-[10px] xl:p-5  sm:p-5 md:p-[20px_10px] rounded-md">
                <div className="flex">
                    <div className="w-[50px] h-[50px]">
                        <img
                            src={data?.files?.thumbnail}
                            alt="image"
                            className="w-full h-full rounded"
                        />
                    </div>
                    <div className="w-[calc(100%-50px)] pl-2">
                        <div className="truncate font-medium">
                            {data?.title}
                        </div>
                        <div className="flex text-sm justify-between items-center">
                            <div className="first-letter:uppercase">
                                {license} license
                            </div>
                            <div className="font-semibold">${licensePrice}</div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-[.1px] bg-slate-300 mt-5"></div>
                <div className="py-5">
                    <div className="font-bold text-sm">Services</div>
                    <div className="pt-2"></div>
                    <div className="flex flex-col gap-4">
                        {filterServices?.length ? (
                            filterServices?.map((v, i) => (
                                <div
                                    className="text-sm flex items-center justify-between "
                                    key={i}
                                >
                                    <div>{v.text}</div>
                                    <div className="font-semibold">
                                        ${v.price}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-sm">No service selected</div>
                        )}
                    </div>
                    <div className="pt-5"></div>

                    <div className="font-bold text-sm">Support</div>
                    <div className="pt-2"></div>
                    {filterSupport ? (
                        <div className="text-sm flex items-center justify-between">
                            <div>{filterSupport.text}</div>
                            <div className="font-semibold">
                                ${filterSupport.price}
                            </div>
                        </div>
                    ) : (
                        <div className="text-sm">No support selected</div>
                    )}
                </div>

                <div className="w-full h-[.1px] bg-slate-300 mb-5"></div>
                <div className="flex font-bold justify-between items-center">
                    <div>Total</div>
                    <div>${totalPrice}</div>
                </div>
            </div>
        </div>
    );
}

export const usePriceServices = () => {
    const [state] = GetPaymentContext();
    const data: ProductType = state.product;
    const router = useRouter();
    let { license, services, support, id } = router.query as ProductQueryType;

    const [user] = useAtom(USER_STATE);
    const { data: downloadProduct } = useSingleDownloadedProduct(user?._id, id);

    const filterDownloadedService =
        downloadProduct?.services?.map((v: any) => v.text) || [];

    const newFilterServices = data?.services?.filter(
        (v) => !filterDownloadedService.includes(v.text)
    );

    services = services ? [].concat(services) : [];

    const filterService =
        newFilterServices?.filter((v, i) => services.includes(i.toString())) ||
        [];

    const licensePrice =
        downloadProduct?.license !== license
            ? license
                ? Number(data?.licenses[license]?.price) || 0
                : 0
            : 0;

    const servicePrice = filterService
        .map((v) => v.price)
        .reduce((a, b) => a + b, 0);

    const supportLeft = useSupportLeft(
        downloadProduct?.support?.start,
        downloadProduct?.support?.end
    );

    let supportPrice = 0;
    const newFilterSupport = productSupportData?.filter((v) =>
        !supportLeft ? v : v.text !== downloadProduct?.support?.text
    );
    const findSupport = newFilterSupport.find((v, i) => `${i}` == support);
    if (findSupport) {
        supportPrice = findSupport?.price;
    }

    const totalPrice = licensePrice + servicePrice + supportPrice;

    return { totalPrice, filterService, findSupport };
};

export default ProductSummary;
