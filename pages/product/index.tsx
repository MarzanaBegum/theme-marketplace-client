import React from "react";
import AllProductPage from "../../components/AllProductPage";
import Layout from "../../components/Shared/Layout/Layout";
import Meta from "../../components/Shared/Meta";

function AllProduct() {
    return (
        <Layout>
            <Meta title="Products" />
            <AllProductPage />
        </Layout>
    );
}

export default AllProduct;
