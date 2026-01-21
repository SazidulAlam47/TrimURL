import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { BsCopy } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import type { RootState } from "@/redux/store";
import { setShowCopy } from "@/redux/features/urlSlice";
import { Label } from "./ui/label";

const CopyShortUrl = () => {
    const shortLink = useAppSelector((state: RootState) => state.url.shortLink);
    const dispatch = useAppDispatch();
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        if (shortLink) {
            await navigator.clipboard.writeText(shortLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
    };

    return (
        <div className="w-full space-y-4 md:space-y-6">
            <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                    Your shortened URL:
                </Label>
                <Input
                    value={shortLink}
                    readOnly
                    className="w-full text-base bg-blue-50 border-blue-200"
                />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
                <Button
                    className="flex-1 h-10 md:h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base"
                    onClick={handleCopy}
                >
                    {copied ? (
                        <>
                            <GiCheckMark className="mr-2" /> Copied!
                        </>
                    ) : (
                        <>
                            <BsCopy className="mr-2" /> Copy Link
                        </>
                    )}
                </Button>
                <Button
                    className="flex-1 h-10 md:h-11 font-semibold text-base"
                    variant="outline"
                    onClick={() => dispatch(setShowCopy(false))}
                >
                    Create Another
                </Button>
            </div>
        </div>
    );
};

export default CopyShortUrl;
