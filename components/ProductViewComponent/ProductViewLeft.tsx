import React from "react";
import ProductViewComment from "./ProductViewComment";
import ProductViewReview from "./ProductViewReview";
import ProductViewDetails from "./ProductViewDetails";
import { useAtom } from "jotai";
import { USER_STATE } from "../../state";

function ProductViewRight({ data, refetch }: any) {
    const [user] = useAtom(USER_STATE);
    const reverseImages = data?.files?.images;

    const newReverseImages = reverseImages ? [...reverseImages].reverse() : [];

    return (
        <div className=" lg:w-[calc(100%-404px)] xl:w-[calc(100%-474px)] 2xl:w-[calc(100%-624px)]">
            {/* left description  */}

            <div>
                <div className="mb-[16px] sm:mb-[24] 2xl:mb-[28px]">
                    <img
                        className="object-cover w-full rounded-[6px]"
                        src={data?.files?.thumbnail}
                        alt=""
                    />
                </div>
                <div className="flex flex-col gap-[16px] sm:gap-[24px] 2xl:gap-[28px]">
                    {newReverseImages?.map((item: any, i: number) => (
                        <div key={i}>
                            <img
                                src={item}
                                alt="More images"
                                className="w-full rounded-[6px]"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="lg:hidden">
                <div className="pt-4"></div>
                <ProductViewDetails data={data} />
            </div>
            {user && <div className="pt-4"></div>}

            <ProductViewComment data={data} refetch={refetch} />

            <div className="pt-4"></div>

            <ProductViewReview data={data} />
        </div>
    );
}

export default ProductViewRight;
