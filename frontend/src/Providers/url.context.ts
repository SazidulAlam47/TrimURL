import { createContext, type Dispatch, type SetStateAction } from "react";

export type TUrlContext = {
    shortLink: string;
    setShortLink: Dispatch<SetStateAction<string>>;
    showCopy: boolean;
    setShowCopy: Dispatch<SetStateAction<boolean>>;
};

export const UrlContext = createContext<TUrlContext>({
    shortLink: "",
    setShortLink: () => {},
    showCopy: false,
    setShowCopy: () => {},
});
