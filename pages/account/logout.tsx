import { deleteCookie } from "cookies-next";
import { GetServerSideProps } from "next";
import React from "react";

function LogoutPage() {
    return <></>;
}

export default LogoutPage;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    deleteCookie("auth", { req, res });

    return {
        redirect: {
            permanent: false,
            destination: "/signin",
        },
        props: {},
    };
};
