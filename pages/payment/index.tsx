import React from "react";
import PaymentPageWrapper from "../../components/PaymentPage";
import Layout from "../../components/Shared/Layout/Layout";
import PaymentContext from "../../context/PaymentContext";
import { GetServerSideProps } from "next";
import { api } from "../../api";
import { ProductType } from "../../api-call/useProductListQuery";

function PaymentPage({
    product,
    subscription,
}: {
    product: ProductType;
    subscription: any;
}) {
    return (
        <Layout>
            <PaymentContext product={product} subscription={subscription}>
                <PaymentPageWrapper />
            </PaymentContext>
        </Layout>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    try {
        const { id, type, interval, license, services }: any = query;

        // constant TODO:CONSTANT
        const arr = ["product", "subscription"];
        const licenses = ["personal", "commercial", "buyout"];
        const intervals = ["monthly", "annually"];

        if (!id || !type || !arr.includes(type)) throw new Error();

        if (type === "product") {
            if (!licenses.includes(license)) throw new Error();
            const serviceArr = services ? [].concat(services) : [];
            if (serviceArr.length) {
                const checkServices = serviceArr.map((v) => Number(v));
                if (checkServices.includes(NaN)) throw new Error();
            }
        }

        if (type === "subscription") {
            if (!intervals.includes(interval)) throw new Error();
        }

        let subscription = undefined;
        let product = undefined;
        if (type === "subscription") {
            const { data: subscriptionData } = await api.get(`/pricings/${id}`);
            subscription = subscriptionData;
        }

        if (type === "product") {
            const { data: productData } = await api.get(
                `/products/single/${id}`
            );
            product = productData;
        }
        return {
            props: {
                product: product || "",
                subscription: subscription || "",
            },
        };
    } catch (err) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
};

export default PaymentPage;
