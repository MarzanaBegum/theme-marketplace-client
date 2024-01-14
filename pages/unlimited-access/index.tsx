import React from "react";
import AllProductFeatureCard from "../../components/AllProductFeatureCard";
import ChooseUs from "../../components/ChooseUs";
import FreequentSection from "../../components/FreequentSection";
import HomeProductCard from "../../components/HomeProductCard";
import PrisingCard from "../../components/PrisingCard";
import HomeSlider from "../../components/Shared/HomeSlider";
import Layout from "../../components/Shared/Layout/Layout";
import HeroSection from "../../components/UnlimitedAccess/HeroSection";
import CreativeSubscription from "./CreativeSubscription";
import Meta from "../../components/Shared/Meta";
import PricingCard from "../../components/PricingCard";

const UnlimitedAccess = () => {
    return (
        <div className="w-[100%]">
            <Meta title="Unlimited Access - Download unlimited product for your creative business" />
            <Layout>
                <HeroSection />
                <CreativeSubscription />
                {/* <AllProductFeatureCard /> */}
                <HomeProductCard />
                <div id="pricing" className="flex flex-col-reverse sm:flex-col">
                    {/* pricing card section  */}
                    <PricingCard />
                    <div className="mt-[30px] sm:mt-0">
                        <ChooseUs />
                    </div>
                </div>
                <div className="sm:pt-[30px] 2xl:pt-0">
                    <FreequentSection wrapperClass="2xl:bg-[#F9F9FF]" />
                </div>
                <HomeSlider />
            </Layout>
        </div>
    );
};

export default UnlimitedAccess;
