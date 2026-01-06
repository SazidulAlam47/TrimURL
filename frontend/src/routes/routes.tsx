import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/home/Home";
import UrlShort from "@/pages/url-short/UrlShort";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "url-shortener",
                element: <UrlShort />,
            },
        ],
    },
]);

export default router;
