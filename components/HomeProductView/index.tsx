import React from "react";
import ProductCard from "../AllProductPage/ProductCard";
import { useQuery } from "react-query";
import ProductQuery from "../../api-call/ProductQuery";
import LoadingAnimation from "../SvgCustomIcons/LoadingAnimation";

const HomeProductView = ({ products, isLoading }: any) => {
    return (
        <div>
            <div className="container">
                <div
                    className={`grid grid-cols-1 transition-all duration-200 sm:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-4 sm:gap-6 `}
                >
                    {products && products.length > 0 ? (
                        products
                            ?.slice(0, 10)
                            .map((v: any, i: any) => (
                                <ProductCard key={i} product={v} />
                            ))
                    ) : isLoading ? (
                        <div className="flex gap-[10px] item-center">
                            <LoadingAnimation color="#7266FC" />
                            <div className="text-[#7266FC] text-[16px] font-medium">
                                loading...
                            </div>
                        </div>
                    ) : (
                        <div className="text-black text-[16px] font-medium">
                            No Product Found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomeProductView;
