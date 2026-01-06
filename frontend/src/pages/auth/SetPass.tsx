/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import SForm from "../../components/form/SForm";
import SInput from "../../components/form/SInput";
import type { FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { setPasswordSchema } from "@/schema/auth.schema";
import { useSetPasswordMutation } from "@/redux/api/authApi";

const SetPass = () => {
    const navigate = useNavigate();

    const [setPassword, { isLoading }] = useSetPasswordMutation();

    const handleSetPassword = async (data: FieldValues) => {
        const toastId = toast.loading("Setting new password...");
        try {
            await setPassword(data).unwrap();
            toast.success("Password set successfully!", { id: toastId });
            navigate("/");
        } catch (error: any) {
            toast.error(error.message || error.data || "Something went wrong", {
                id: toastId,
            });
        }
    };

    return (
        <section className="min-h-screen bg-linear-to-b from-blue-50 to-white py-20">
            <title>TrimURL - Set Password</title>
            <div className="container mx-auto px-4">
                <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Set Password
                        </h1>
                        <p className="text-lg text-gray-600">
                            Create a new password for your account
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <SForm
                            onSubmit={handleSetPassword}
                            resolver={zodResolver(setPasswordSchema)}
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
                                Set Password
                            </Button>
                        </SForm>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SetPass;
