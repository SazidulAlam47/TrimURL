/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "./ui/button";
import { createShortUrlSchema } from "@/schema/url.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { setShortLink, setShowCopy } from "@/redux/features/urlSlice";
import SForm from "./form/SForm";
import SInput from "./form/SInput";
import type { FieldValues } from "react-hook-form";
import { useCreateShortUrlMutation } from "@/redux/api/urlApi";

const ShortForm = () => {
    const dispatch = useAppDispatch();
    const [createShortUrl, { isLoading }] = useCreateShortUrlMutation();

    const onSubmit = async (data: FieldValues) => {
        const toastId = toast.loading("Shortening URL...");

        try {
            const res = await createShortUrl(data).unwrap();

            const shortLink = res?.shortUrl;

            if (shortLink) {
                dispatch(setShortLink(shortLink));
                dispatch(setShowCopy(true));
                toast.success("URL shortened successfully!", { id: toastId });
            } else {
                toast.error("Something went wrong", { id: toastId });
            }
        } catch (error: any) {
            toast.error(error.message || error.data || "Something went wrong", {
                id: toastId,
            });
        }
    };

    return (
        <SForm
            onSubmit={onSubmit}
            resolver={zodResolver(createShortUrlSchema)}
            className="w-full space-y-6"
        >
            <SInput
                name="url"
                placeholder="Enter your long URL here..."
                className="text-base"
            />
            <Button
                type="submit"
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg"
                disabled={isLoading}
            >
                Shorten URL
            </Button>
        </SForm>
    );
};

export default ShortForm;
