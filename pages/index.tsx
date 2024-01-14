import HomePage from "../components/HomePage";
import HomeSlider from "../components/Shared/HomeSlider";
import Layout from "../components/Shared/Layout/Layout";
import Meta from "../components/Shared/Meta";

export default function Home() {
    return (
        <Layout>
            <Meta title="Home Page - Theme Marketplace" />
            <HomePage />
            <HomeSlider />
        </Layout>
    );
}
