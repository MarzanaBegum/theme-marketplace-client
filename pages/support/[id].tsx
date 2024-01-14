import React, { useState } from "react";
import Layout from "../../components/Shared/Layout/Layout";
import SupportData from "../../components/SupportData";
import {
    supportData,
    licenseData,
    accountData,
    copyrightData,
    TechnicalData,
    buyingData,
} from "../../utils/constant";
import { useRouter } from "next/router";
import Meta from "../../components/Shared/Meta";

function SupportViewPage() {
    const router = useRouter();
    const path = router.asPath.split("/")[2];
    const dynamicData = () => {
        switch (path) {
            case "license":
                return licenseData;
            case "account":
                return accountData;
            case "copyright":
                return copyrightData;
            case "technical":
                return TechnicalData;
            case "buying":
                return buyingData;
            default:
                return supportData;
        }
    };

    return (
        <>
            <Meta title={`${path} - support`} />
            <Layout>
                <SupportData data={dynamicData()} />
            </Layout>
        </>
    );
}

export default SupportViewPage;
