import React from "react";
import ProductViewHeader from "../../../components/ProductViewComponent/ProductViewHeader";
import ProductViewLeft from "../../../components/ProductViewComponent/ProductViewLeft";
import ProductViewRight from "../../../components/ProductViewComponent/ProductViewRight";
import Layout from "../../../components/Shared/Layout/Layout";
import YouMayAlsoLike from "../../../components/Shared/YouMayAlsoLike";
import { useQuery } from "react-query";
import useSingleProductQuery from "../../../api-call/useSingleProductQuery";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { api } from "../../../api";
import Meta from "../../../components/Shared/Meta";
import { getCookie } from "cookies-next";
import { decryptData } from "../../../utils/hashdata";

function ProductView({ data: defaultData }: { data: any }) {
    const router = useRouter();
    const path = router.asPath;
    const productId = path.split("/")[2];
    const { data, refetch } = useQuery(["single-product-get", productId], {
        ...useSingleProductQuery(productId),
        initialData: defaultData,
    });

    return (
        <Layout>
            <Meta title={data?.title} />
            <div className="bg-[#EFF3FB]">
                <div className="container py-[40px] sm:pt-[60px] lg:pt-[80px]">
                    <div>
                        <ProductViewHeader data={data} />
                    </div>
                    <div className="pt-5 lg:pt-[30px]"></div>
                    <div className="flex flex-col lg:flex-row-reverse lg:justify-between">
                        <ProductViewRight data={data} refetch={refetch} />
                        <div className="pt-5 lg:pt-[30px]"></div>

                        <ProductViewLeft data={data} refetch={refetch} />
                    </div>
                </div>
            </div>
            <div>
                <YouMayAlsoLike
                    productType={data?.type}
                    productId={productId}
                />
            </div>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async ({
    query,
    req,
    res,
}) => {
    const { id } = query;
    const user: any = getCookie("auth", { req, res });
    try {
        if (!id) throw new Error();
        const { data } = await api.get(`/products/single/${id}`);
        if (data.buyout) {
            if (!user) throw new Error();
            const { id } = decryptData(user);
            if (!id) throw new Error();
            if (data.buyout !== id) throw new Error();
        }
        return {
            props: { data: data || {} },
        };
    } catch (err: any) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
};

export default ProductView;
