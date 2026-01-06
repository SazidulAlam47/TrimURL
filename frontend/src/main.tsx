import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import UrlProvider from "./Providers/url.provider";
import { Toaster } from "react-hot-toast";
import router from "./routes/routes";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <UrlProvider>
            <RouterProvider router={router} />
            <Toaster />
        </UrlProvider>
    </StrictMode>
);
