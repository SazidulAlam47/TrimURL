import useUrlContext from "@/hooks/useUrlContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { BsCopy } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";

const CopyShortUrl = () => {
    const { shortLink, setShowCopy } = useUrlContext();
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        if (shortLink) {
            await navigator.clipboard.writeText(shortLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
    };

    return (
        <div className="w-full space-y-5">
            <Input
                value={shortLink}
                readOnly
                className="w-full bg-white/80 border-2 border-indigo-200 focus:border-indigo-400 transition"
            />
            <Button
                className="w-full bg-gradient-to-r from-indigo-500 to-blue-400 hover:from-indigo-600 hover:to-blue-500 text-white font-semibold shadow-lg py-2 text-lg transition cursor-pointer"
                onClick={handleCopy}
            >
                {copied ? (
                    <>
                        <GiCheckMark /> Copied!
                    </>
                ) : (
                    <>
                        <BsCopy /> Copy
                    </>
                )}
            </Button>
            <Button
                className="w-full bg-gradient-to-r from-indigo-400 to-blue-300 hover:from-indigo-500 hover:to-blue-400 text-white hover:text-white font-semibold shadow-lg py-2 text-lg transition cursor-pointer"
                variant="outline"
                onClick={() => setShowCopy(false)}
            >
                Shorten Another Link
            </Button>
        </div>
    );
};

export default CopyShortUrl;
