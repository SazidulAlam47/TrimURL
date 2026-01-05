import type { ReactNode } from "react";
import { useState } from "react";
import { UrlContext } from "./url.context";

const UrlProvider = ({ children }: { children: ReactNode }) => {
    const [shortLink, setShortLink] = useState("");
    const [showCopy, setShowCopy] = useState(false);

    const value = {
        shortLink,
        setShortLink,
        showCopy,
        setShowCopy,
    };

    return <UrlContext.Provider value={value}>{children}</UrlContext.Provider>;
};

export default UrlProvider;
