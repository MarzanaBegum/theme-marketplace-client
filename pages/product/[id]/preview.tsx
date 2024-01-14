import React, { useEffect, useState } from "react";
import TopHeader from "../../../components/ProductPreviewPage/TopHeader";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { api } from "../../../api";
import { ProductType } from "../../../api-call/useProductListQuery";
import LoadingAnimation from "../../../components/LoadingAnimation";
import Meta from "../../../components/Shared/Meta";

function ProductPreview({ data }: { data: ProductType }) {
    const [tab, setTab] = useState("100%");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        return () => {
            setLoading(true);
        };
    }, []);

    return (
        <div className="flex w-full h-screen flex-col">
            <Meta title={data?.title} />

            <TopHeader setTab={setTab} tab={tab} title={data.title} />
            <div className="h-[calc(100%-60px)] flex justify-center">
                <iframe
                    onLoad={(e) => {
                        setLoading(false);
                    }}
                    style={{ maxWidth: tab }}
                    className="w-full h-full"
                    src={data.liveLink}
                ></iframe>
                {loading && (
                    <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 left-1/2 ">
                        <LoadingAnimation
                            height={50}
                            width={50}
                            color="#7266FC"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { id } = query;
    try {
        const { data } = await api.get(`/products/single/${id}`);

        return {
            props: { data: data || {} },
        };
    } catch (err) {
        return {
            redirect: {
                permanent: false,
                destination: "/product/" + id,
            },
        };
    }
};

export default ProductPreview;
