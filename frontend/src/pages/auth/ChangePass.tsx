/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import SForm from "../../components/form/SForm";
import SInput from "../../components/form/SInput";
import type { FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { changePasswordSchema } from "@/schema/auth.schema";
import { useChangePasswordMutation } from "@/redux/api/authApi";

const ChangePass = () => {
    const navigate = useNavigate();

    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const handleChangePassword = async (data: FieldValues) => {
        const toastId = toast.loading("Changing password...");
        try {
            await changePassword(data).unwrap();
            toast.success("Password changed successfully!", { id: toastId });
            navigate("/");
        } catch (error: any) {
            toast.error(error.message || error.data || "Something went wrong", {
                id: toastId,
            });
        }
    };

    return (
        <section className="min-h-screen bg-linear-to-b from-blue-50 to-white py-20">
            <title>TrimURL - Change Password</title>
            <div className="container mx-auto px-4">
                <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Change Password
                        </h1>
                        <p className="text-lg text-gray-600">
                            Update your account password
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <SForm
                            onSubmit={handleChangePassword}
                            resolver={zodResolver(changePasswordSchema)}
                        >
                            <SInput
                                name="oldPassword"
                                type="password"
                                label="Old Password"
                                placeholder="Enter your old password"
                            />
                            <SInput
                                name="newPassword"
                                type="password"
                                label="New Password"
                                placeholder="Enter your new password"
                            />
                            <Button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700"
                                disabled={isLoading}
                            >
                                Change Password
                            </Button>
                        </SForm>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChangePass;
