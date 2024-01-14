import React from "react";
import Layout from "../../../components/Shared/Layout/Layout";
import YouMayAlsoLike from "../../../components/Shared/YouMayAlsoLike";
import { useQuery } from "react-query";
import useSingleProductQuery from "./../../../api-call/useSingleProductQuery";
import { useRouter } from "next/router";

const iconList = ["xd", "figma", "invision", "sketch"];

function ProductPreview() {
    const router = useRouter();
    // const [user] = useAtom(USER_STATE);
    const path = router.asPath;
    const productId = path.split("/")[3];
    const { data } = useQuery(
        ["single product"],
        useSingleProductQuery(productId)
    );

    return (
        <Layout>
            <div className="pt-10"></div>
            <div>
                <div className="container ">
                    <div>
                        <iframe
                            width="100%"
                            height="1240"
                            src="https://www.mojomarketplace.com/"
                            title="preview template"
                        ></iframe>
                    </div>
                    <div className="pt-10"></div>
                    <div>
                        <div className="text-lg sm:text-[32px] leading-[1.5] text-center font-medium text-neutral xl:text-[40px] capitalize">
                            {data?.title}
                        </div>
                        <div className="pt-2"></div>

                        <div className="text-xs xl:text-base sm:text-sm leading-[1.5] text-center">
                            Big library of predefined for this website
                        </div>
                        <div className="pt-4"></div>
                        <div className="flex items-center justify-center gap-5">
                            {data?.softwares.map((v: any, i: any) => (
                                <div key={i}>
                                    <img
                                        className="w-5 h-5"
                                        src={`/icons/${v}.svg`}
                                        alt=""
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="pt-4"></div>
                        <div className="flex items-center">
                            <button className="w-full mx-auto max-w-[400px] h-[48px] bg-brand text-white text-sm rounded-md font-semibold hover:bg-brand-dark ">
                                Download
                            </button>
                        </div>
                    </div>
                    <div className="pt-10 sm:pt-[60px]"></div>
                    <div>
                        <img
                            className="w-full"
                            src="/img/preview-section-one.png"
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <div className="pt-5 xl:pt-10"></div>
            <div className="bg-[#EFF3FB] py-5 sm:py-[40px]">
                <img
                    className="w-full"
                    src="/img/preview-section-two.png"
                    alt=""
                />
            </div>

            <div></div>
            <div className="pt-10"></div>
        </Layout>
    );
}

export default ProductPreview;
