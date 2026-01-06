/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IShortUrl } from "@/types";
import { baseApi } from "../api/baseApi";

const urlApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createShortUrl: build.mutation<IShortUrl, any>({
            query: (data) => ({
                url: "/url-shortener",
                method: "POST",
                data,
            }),
            invalidatesTags: ["url"],
        }),
        getMyAllUrls: build.query<IShortUrl[], any>({
            query: () => ({
                url: "/url-shortener",
                method: "GET",
            }),
            providesTags: ["url"],
        }),
    }),
});

export const { useCreateShortUrlMutation, useGetMyAllUrlsQuery } = urlApi;
