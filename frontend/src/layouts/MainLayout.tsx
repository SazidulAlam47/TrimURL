import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { setIsLoggedIn } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { getUser } from "@/utils/user";
import { Outlet } from "react-router";

const MainLayout = () => {
    const user = getUser();
    const dispatch = useAppDispatch();
    dispatch(setIsLoggedIn(!!user));
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default MainLayout;
