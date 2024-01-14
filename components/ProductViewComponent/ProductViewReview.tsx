import React from "react";
import Pagination from "../Shared/Pagination";
import RatingStar from "../Shared/RatingStar";
import moment from "moment";

function ProductViewReview({ data }: any) {
    const getRatings = data?.ratings;
    const sortRatings = getRatings?.sort((a: any, b: any) =>
        a.createdAt > b.createdAt ? -1 : 1
    );

    return (
        <>
            {data?.ratings?.length > 0 && (
                <div
                    id="reviews"
                    className="p-[20px_10px] sm:p-5 bg-white rounded-md"
                >
                    <div>
                        <div className="text-[#252C48] font-medium text-lg leading-[1.5] sm:text-2xl">
                            {data?.ratings?.length} Reviews for this product
                        </div>
                    </div>

                    <Pagination className="pt-5" dataArr={sortRatings}>
                        {(data) => (
                            <div>
                                {data.map((v: any, i: number) => (
                                    <div
                                        key={i}
                                        className="border-b pt-5 border-[#252C4826] pb-4"
                                    >
                                        <div className="text-lg leading-[1.5] font-medium sm:text-xl capitalize">
                                            {` ${v?.user?.firstName} ${v?.user?.lastName}`}
                                            <span className="text-xs pl-[10px] font-normal">
                                                {moment(v?.createdAt).fromNow()}
                                            </span>
                                        </div>
                                        <RatingStar
                                            className="[&>img]:h-6 [&>img]:w-6 py-2"
                                            rating={v?.rating}
                                        />
                                        <div className="text-sm">{v?.text}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Pagination>
                </div>
            )}
        </>
    );
}

export default ProductViewReview;
