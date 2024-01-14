import React from "react";
import MyDownloadsPage from "../../components/MyDownloadsPage";
import AccountNavbar from "../../components/Shared/AccountNavbar";
import Layout from "../../components/Shared/Layout/Layout";
import Meta from "../../components/Shared/Meta";

function MyDownloads() {
    return (
        <Layout>
            <Meta title="Downloads - MyAccount" />
            <AccountNavbar />
            <MyDownloadsPage />
        </Layout>
    );
}

export default MyDownloads;
