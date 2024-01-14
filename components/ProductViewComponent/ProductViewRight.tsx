import React from "react";
import ProductViewDetails from "./ProductViewDetails";
import ProductViewUnpaid from "./ProductViewUnpaid";
import ProductViewPaid from "./ProductViewPaid";

import usePlanAvailable, { usePlanExpired } from "../../hooks/usePlanAvailable";
import { useDownloadLeft } from "../Shared/Layout/Header";
import { useRouter } from "next/router";

function ProductViewRight({ data, refetch }: any) {
    const router = useRouter();
    const { id } = router.query;
    const { limitOver } = useDownloadLeft(id as string);

    const isPlan = usePlanAvailable();

    const isExpired = usePlanExpired();

    return (
        <div className="max-w-[480px] mx-auto lg:mx-0 lg:max-w-[380px] xl:max-w-[450px] 2xl:max-w-[600px] w-full">
            {/* Download Icon  */}
            {!limitOver && isPlan ? (
                <ProductViewPaid data={data} productRefetch={refetch} />
            ) : (
                <ProductViewUnpaid
                    type={
                        (limitOver && "download") ||
                        (!isPlan && (isExpired ? "plan" : false))
                    }
                />
            )}

            {/* Want this item? */}

            <div className="pt-5 max-lg:hidden"></div>
            <div className="max-lg:hidden">
                <ProductViewDetails data={data} />
            </div>
        </div>
    );
}

export default ProductViewRight;
