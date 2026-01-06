import Features from "./sections/Features/Features";
import Hero from "./sections/Hero/Hero";
import HowItWorks from "./sections/HowItWorks/HowItWorks";
import Stats from "./sections/Stats/Stats";

const Home = () => {
    return (
        <>
            <title>Trim URL</title>
            <Hero />
            <Features />
            <HowItWorks />
            <Stats />
        </>
    );
};

export default Home;
