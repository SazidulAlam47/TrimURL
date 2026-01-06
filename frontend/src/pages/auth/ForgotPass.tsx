/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import SForm from "../../components/form/SForm";
import SInput from "../../components/form/SInput";
import type { FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { forgotPasswordSchema } from "@/schema/auth.schema";
import { useForgotPasswordMutation } from "@/redux/api/authApi";
import { getUser } from "@/utils/user";
import { useEffect } from "react";

const ForgotPass = () => {
    const navigate = useNavigate();
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

    const decodedUser = getUser();

    useEffect(() => {
        if (decodedUser) {
            navigate("/");
        }
    }, [decodedUser, navigate]);

    const handleForgotPassword = async (data: FieldValues) => {
        const toastId = toast.loading("Sending reset email...");

        try {
            await forgotPassword(data).unwrap();

            toast.success("Password reset email sent successfully!", {
                id: toastId,
            });
            navigate("/login");
        } catch (error: any) {
            toast.error(error.message || error.data || "Something went wrong", {
                id: toastId,
            });
        }
    };

    return (
        <section className="min-h-screen bg-linear-to-b from-blue-50 to-white py-20">
            <title>TrimURL - Forgot Password</title>
            <div className="container mx-auto px-4">
                <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Forgot Password
                        </h1>
                        <p className="text-lg text-gray-600">
                            Enter your email to receive a password reset link
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <SForm
                            onSubmit={handleForgotPassword}
                            resolver={zodResolver(forgotPasswordSchema)}
                        >
                            <SInput
                                name="email"
                                label="Email"
                                placeholder="Enter your email"
                            />
                            <Button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700"
                                disabled={isLoading}
                            >
                                Send Reset Link
                            </Button>
                        </SForm>
                        <div className="text-center mt-4">
                            <span className="text-gray-600 text-sm">
                                Remember your password?{" "}
                                <Link
                                    to="/login"
                                    className="text-blue-600 hover:underline font-medium"
                                >
                                    Sign in
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ForgotPass;
