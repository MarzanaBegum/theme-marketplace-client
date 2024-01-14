import Link from "next/link";
import React, { useEffect, useState } from "react";
import FilterWrapper from "../Shared/FilterWrapper";
import Pagination from "../Shared/Pagination";
import ProductCard from "./ProductCard";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import ProductQuery from "../../api-call/ProductQuery";
import useProductListQuery, {
    PRODUCT_LIST_KEY,
} from "../../api-call/useProductListQuery";
import LoadingAnimation from "../SvgCustomIcons/LoadingAnimation";

function AllProductPage() {
    const router = useRouter();
    const query = router.query;

    const { data: productData, isLoading } = useQuery(
        [PRODUCT_LIST_KEY],
        useProductListQuery()
    );

    const [type, setType] = useState("all");

    return (
        <div>
            {!("search" in query) && (
                <div className=" p-[40px_20px] sm:py-[60px] lg:py-[80px] bg-[#EFF3FB] text-center">
                    <div className="text-lg leading-[27px] tracking-[.15%] font-medium text-[#252C48] sm:text-2xl sm:leading-[36px] sm:tracking-[.25%]">
                        {typeToString(type)}
                    </div>
                    <div className="pt-2"></div>
                    <div className="text-xs sm:text-sm sm:leading-[21px] px-[49px] sm:px-[130px] leading-[18px] tracking-[.25%] font-normal text-[#3B415A]">
                        Boost your workflow with our themes, Design Systems and
                        graphic assets
                    </div>
                </div>
            )}

            {productData ? (
                <FilterWrapper data={productData} typeStateUp={setType}>
                    {(data) => (
                        <div>
                            <Pagination
                                className={`pt-6 pb-10`}
                                itemsPerPage={20}
                                dataArr={data}
                            >
                                {(data) => (
                                    <div
                                        className={`grid grid-cols-1 transition-all duration-200 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 3xl:grid-cols-4 pb-[20px]`}
                                    >
                                        {data.map((v, i) => (
                                            <ProductCard key={i} product={v} />
                                        ))}
                                    </div>
                                )}
                            </Pagination>
                        </div>
                    )}
                </FilterWrapper>
            ) : isLoading ? (
                <div className="flex pt-10 items-center justify-center gap-3 min-h-[200px] lg:min-h-[400px] text-xl">
                    <LoadingAnimation color="#7266FC" />
                    Loading...
                </div>
            ) : (
                <div></div>
            )}
            <div className="pt-10"></div>
        </div>
    );
}

function typeToString(type: string) {
    switch (type) {
        case "all":
            return "All Products";
        case "theme":
            return "Themes";
        case "template":
            return "Templates";
        case "illustration":
            return "Illustrations";
        case "image":
            return "Images";
        case "icon":
            return "Icons";
        default:
            return "All Products";
    }
}

export default AllProductPage;
