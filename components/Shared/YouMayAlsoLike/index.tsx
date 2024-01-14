import React from "react";
import ProductCard from "../../AllProductPage/ProductCard";
import ArrowTopRight from "../../SvgCustomIcons/ArrowTopRight";
import Link from "next/link";
import useProductsByType from "../../../api-call/useProductsByType";

type YMAL_TYPE = {
    productType: string;
    productId: string;
};

function YouMayAlsoLike({ productType, productId }: YMAL_TYPE) {
    const { data } = useProductsByType(productType, productId);
    if (!data || !data.length) return <></>;

    return (
        <div className="container">
            <div className="pt-[30px] sm:pt-[40px] lg:pt-[60px] 2xl:pt-[80px]"></div>
            <div>
                <div className="text-lg sm:text-2xl text-neutral leading-[1.5] font-medium lg:text-[32px] xl:text-[40px] lg:font-semibold">
                    You may also like
                </div>
            </div>
            <div className="pt-5 lg:pt-10"></div>
            <div className={` pt-6 pb-10`}>
                <div
                    className={`grid grid-cols-1 transition-all duration-200 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4 sm:gap-6`}
                >
                    {data.map((v, i) => (
                        <ProductCard key={i} product={v} />
                    ))}
                </div>
            </div>
            <div className="flex justify-center">
                <Link href={"/product?type=" + productType}>
                    <button className="flex group text-sm lg:text-base items-center font-semibold justify-center gap-2 p-[10px_24px] lg:p-[12px_30px] xl:p-[16px_32px] border border-[#9AA5B5] transition-all duration-200 hover:bg-brand rounded-md">
                        <div className="transition-all duration-200 group-hover:text-white text-neutral">
                            View All
                        </div>
                        <ArrowTopRight
                            className="max-sm:w-5 max-sm:h-5"
                            groupClassName="group-hover:stroke-white scale-[.9] sm:scale-1 stroke-neutral transition-all duration-200"
                        />
                    </button>
                </Link>
            </div>
            <div className="pt-[30px] sm:pt-[40px] lg:pt-[60px] 2xl:pt-[80px] "></div>
        </div>
    );
}

export default YouMayAlsoLike;
