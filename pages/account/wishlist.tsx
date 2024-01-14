import React, { useState } from "react";
import useWishlistQuery from "../../api-call/useWishlistQuery";
import Layout from "../../components/Shared/Layout/Layout";
import Pagination from "../../components/Shared/Pagination";
import SortBySelect from "../../components/WishCartPage/SortBySelect";
import WishCartCard from "../../components/WishCartPage/WishCartCard";
import WishCartHead from "../../components/WishCartPage/WishCartHead";
import LoadingAnimation from "../../components/SvgCustomIcons/LoadingAnimation";
import Meta from "../../components/Shared/Meta";

const sortOption = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
];

function Wishlist() {
    const [filter, setFilter] = useState(sortOption[0].value);

    const { data, refetch, isLoading } = useWishlistQuery(filter);

    return (
        <Layout>
            <div>
                <Meta title="Wishlist - MyAccount" />
                <WishCartHead
                    title="My Wishlist"
                    desc={`${data?.length || 0} Items in your wishlist`}
                />

                {data ? (
                    <div className="bg-[#EFF3FB] max-xs:px-[10px] pb-4">
                        <div className="pt-10"></div>
                        <div className="container">
                            <div className="flex items-center justify-between gap-4">
                                <SortBySelect
                                    options={sortOption}
                                    onChange={(v: any) => setFilter(v.value)}
                                    defaultValue={sortOption[0]}
                                />
                            </div>
                        </div>
                        <div className="pt-5"></div>

                        <div className="container">
                            <Pagination className="pt-6 pb-10" dataArr={data}>
                                {(data) => (
                                    <div className="flex max-sm:flex-col sm:flex-wrap gap-[18px] sm:">
                                        {data.map((v, i) => (
                                            <WishCartCard
                                                key={"wishlist_" + i}
                                                data={v}
                                                refetch={refetch}
                                            />
                                        ))}
                                    </div>
                                )}
                            </Pagination>
                        </div>
                        <div className="pt-10"></div>
                    </div>
                ) : isLoading ? (
                    <div className="flex gap-4 bg-surface-muted items-center h-[400px] lg:h-[500px] justify-center">
                        <LoadingAnimation
                            width={32}
                            height={32}
                            color="#7266FC"
                        />
                        <div className="text-2xl text-neutral-muted font-medium">
                            Loading...
                        </div>
                    </div>
                ) : (
                    <div className="flex bg-surface-muted flex-col items-center justify-center h-[400px] lg:h-[500px]">
                        <img
                            src="/icons/nowishlist.png"
                            alt=""
                            className=" w-[300px] lg:w-[500px]"
                        />
                        <div>Nothing at wishlist</div>
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default Wishlist;
