import { NextPage } from "next";
import ChooseUs from "../ChooseUs";
import HeroSection from "../HeroSection";
import TemplateThemes from "./../TemplateThemes/index";
import PrisingCard from "./../PrisingCard/index";
import FreequentSection from "./../FreequentSection/index";
import ProductCard from "../AllProductPage/ProductCard";
import AllProductPage from "../AllProductPage";
import HomeProductCard from "../HomeProductCard";
import HomeProductView from "../HomeProductView";
import PricingCard from "../PricingCard";

const HomePage: NextPage = () => {
    return (
        <div className="w-[100%] mx-auto">
            <HeroSection />
            <TemplateThemes />
            <div className="3xl:mb-[80px] lg:mb-[40px] md:mb-[60px] mb-[40px]">
                <HomeProductCard />
            </div>
            <ChooseUs />
            <PricingCard />
            <FreequentSection wrapperClass="sm:bg-[#F9F9FF]" />
        </div>
    );
};

export default HomePage;
