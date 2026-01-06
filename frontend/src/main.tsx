import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import { Toaster } from "sonner";
import router from "./routes/routes";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ReduxProvider store={store}>
            <RouterProvider router={router} />
            <Toaster position="top-center" />
        </ReduxProvider>
    </StrictMode>
);
