import { UrlContext } from "@/Providers/url.context";
import { useContext } from "react";

const useUrlContext = () => {
    return useContext(UrlContext);
};

export default useUrlContext;
