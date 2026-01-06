import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { Outlet } from "react-router";

const MainLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default MainLayout;
