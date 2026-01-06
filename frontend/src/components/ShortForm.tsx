import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import ErrorMessage from "./ErrorMessage";
import { createShortUrlSchema } from "@/schema/url.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import type { TApiResponse } from "@/types";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { setShortLink, setShowCopy } from "@/redux/features/urlSlice";

type Inputs = {
    url: string;
};

const ShortForm = () => {
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({ resolver: zodResolver(createShortUrlSchema) });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const res = await axios.post(import.meta.env.VITE_API_URL, data);
            const result = res.data as TApiResponse;

            const shortLink = result?.data?.shortUrl;

            if (shortLink) {
                dispatch(setShortLink(shortLink));
                dispatch(setShowCopy(true));
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
                <Input
                    placeholder="Enter your long URL here..."
                    className="w-full h-12 text-base"
                    {...register("url")}
                />
                <ErrorMessage message={errors.url?.message} />
            </div>
            <Button
                type="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg"
            >
                Shorten URL
            </Button>
        </form>
    );
};

export default ShortForm;
