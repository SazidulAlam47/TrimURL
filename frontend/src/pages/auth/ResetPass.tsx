/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import SForm from "../../components/form/SForm";
import SInput from "../../components/form/SInput";
import type { FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearchParams } from "react-router";
import { useEffect } from "react";
import { toast } from "sonner";
import { resetPasswordSchema } from "@/schema/auth.schema";
import { useResetPasswordMutation } from "@/redux/api/authApi";

const ResetPass = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [resetPassword, { isLoading }] = useResetPasswordMutation();

    const id = searchParams.get("id");
    const token = searchParams.get("token");

    useEffect(() => {
        if (!id || !token) {
            navigate("/login");
        }
    }, [id, token, navigate]);

    const handleResetPassword = async (data: FieldValues) => {
        const toastId = toast.loading("Resetting password...");
        try {
            const resetPasswordData = {
                token,
                data: {
                    id,
                    password: data.password,
                },
            };
            await resetPassword(resetPasswordData).unwrap();
            toast.success("Password reset successfully!", { id: toastId });
            navigate("/login");
        } catch (error: any) {
            toast.error(error.message || error.data || "Something went wrong", {
                id: toastId,
            });
        }
    };

    return (
        <section className="min-h-screen bg-linear-to-b from-blue-50 to-white py-20">
            <title>TrimURL - Reset Password</title>
            <div className="container mx-auto px-4">
                <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Reset Password
                        </h1>
                        <p className="text-lg text-gray-600">
                            Enter your new password below
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <SForm
                            onSubmit={handleResetPassword}
                            resolver={zodResolver(resetPasswordSchema)}
                        >
                            <SInput
                                name="password"
                                type="password"
                                label="New Password"
                                placeholder="Enter your new password"
                            />
                            <SInput
                                name="confirmPassword"
                                type="password"
                                label="Confirm Password"
                                placeholder="Confirm your new password"
                            />
                            <Button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700"
                                disabled={isLoading}
                            >
                                Reset Password
                            </Button>
                        </SForm>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResetPass;
