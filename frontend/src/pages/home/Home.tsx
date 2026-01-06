import Features from "./sections/Features/Features";
import Hero from "./sections/Hero/Hero";
import HowItWorks from "./sections/HowItWorks/HowItWorks";
import Stats from "./sections/Stats/Stats";

const Home = () => {
    return (
        <>
            <Hero />
            <Features />
            <HowItWorks />
            <Stats />
        </>
    );
};

export default Home;
