import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/home/Home";
import UrlShort from "@/pages/url-short/UrlShort";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ForgotPass from "@/pages/auth/ForgotPass";
import ResetPass from "@/pages/auth/ResetPass";
import ChangePass from "@/pages/auth/ChangePass";
import SetPass from "@/pages/auth/SetPass";
import { createBrowserRouter } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "@/pages/error-page/ErrorPage";
import MyUrls from "@/pages/my-urls/MyUrls";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/forgot-password",
                element: <ForgotPass />,
            },
            {
                path: "/change-password",
                element: <ChangePass />,
            },
            {
                path: "/set-password",
                element: <SetPass />,
            },
            {
                path: "url-shortener",
                element: (
                    <ProtectedRoute>
                        <UrlShort />
                    </ProtectedRoute>
                ),
            },
            {
                path: "my-urls",
                element: (
                    <ProtectedRoute>
                        <MyUrls />
                    </ProtectedRoute>
                ),
            },
        ],
    },
    {
        path: "/reset-password",
        element: <ResetPass />,
    },
]);

export default router;
