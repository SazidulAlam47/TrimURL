/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ILogin, IUser } from "../../types";
import { baseApi } from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        loginWithEmail: build.mutation<ILogin, any>({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                data,
            }),
            invalidatesTags: ["me", "url"],
        }),
        loginWithGoogle: build.mutation<ILogin, any>({
            query: (data) => ({
                url: "/auth/login-google",
                method: "POST",
                data,
            }),
            invalidatesTags: ["me", "url"],
        }),
        register: build.mutation<IUser, any>({
            query: (data) => ({
                url: "/auth/register",
                method: "POST",
                data,
            }),
            invalidatesTags: ["me", "url"],
        }),
        changePassword: build.mutation({
            query: (data) => ({
                url: "/auth/change-password",
                method: "POST",
                data,
            }),
            invalidatesTags: ["me"],
        }),
        forgotPassword: build.mutation({
            query: (data) => ({
                url: "/auth/forget-password",
                method: "POST",
                data,
            }),
        }),
        resetPassword: build.mutation({
            query: (args) => ({
                url: "/auth/reset-password",
                method: "POST",
                data: args.data,
                headers: {
                    Authorization: `Bearer ${args.token}`,
                },
            }),
        }),
        setPassword: build.mutation({
            query: (data) => ({
                url: "/auth/set-password",
                method: "POST",
                data,
            }),
            invalidatesTags: ["me"],
        }),
    }),
});

export const {
    useLoginWithEmailMutation,
    useLoginWithGoogleMutation,
    useChangePasswordMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useRegisterMutation,
    useSetPasswordMutation,
} = authApi;
