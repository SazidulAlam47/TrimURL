import { z } from "zod";

export const createShortUrlSchema = z.object({
    url: z
        .string()
        .min(1, "Please Enter your link")
        .url("Please Enter a valid link"),
});
