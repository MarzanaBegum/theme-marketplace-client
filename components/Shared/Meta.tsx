import React from "react";
import Head from "next/head";

type MetaType = {
    title: string;
    description?: string;
};

function Meta({ title, description }: MetaType) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
        </Head>
    );
}

export default Meta;
