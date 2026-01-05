import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import UrlProvider from "./Providers/url.provider.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <UrlProvider>
            <App />
            <Toaster />
        </UrlProvider>
    </StrictMode>
);
