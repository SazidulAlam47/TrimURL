import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import ErrorMessage from "./ErrorMessage";
import { createShortUrlSchema } from "@/schema/url.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import useUrlContext from "@/hooks/useUrlContext";
import type { TApiResponse } from "@/types/api.type";
import toast from "react-hot-toast";

type Inputs = {
    url: string;
};

const ShortForm = () => {
    const { setShortLink, setShowCopy } = useUrlContext();
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
                setShortLink(shortLink);
                setShowCopy(true);
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <form className="w-full space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-1.5">
                <Input
                    placeholder="Enter the link here"
                    className="w-full bg-white/80 border-2 border-indigo-200 focus:border-indigo-400 transition"
                    {...register("url")}
                />
                <ErrorMessage message={errors.url?.message} />
            </div>
            <Button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-500 to-blue-400 hover:from-indigo-600 hover:to-blue-500 text-white font-semibold shadow-lg py-2 text-lg transition cursor-pointer"
            >
                Shorten URL
            </Button>
        </form>
    );
};

export default ShortForm;
