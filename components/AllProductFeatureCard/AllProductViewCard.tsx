import React from "react";
import UnlimitedProductCard from "./UnlimitedProductCard";

const AllProductViewCard = () => {
    return (
        <div>
            <div className="container">
                <div
                    className={`grid grid-cols-1 transition-all duration-200 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4 sm:gap-6 `}
                >
                    {[...Array(4)].map((v, i) => (
                        <UnlimitedProductCard key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllProductViewCard;
