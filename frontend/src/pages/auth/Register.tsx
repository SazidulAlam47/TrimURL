/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import SForm from "../../components/form/SForm";
import SInput from "../../components/form/SInput";
import SInputPassword from "../../components/form/SInputPassword";
import type { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import SFileUpload from "@/components/form/SFileUpload";
import { registerSchema } from "@/schema/auth.schema";
import {
    useLoginWithEmailMutation,
    useRegisterMutation,
} from "@/redux/api/authApi";
import { getUser } from "@/utils/user";
import { useEffect } from "react";
import type { IUser } from "@/types";
import { uploadImageToCloudinary } from "@/utils/cloudinaryUpload";
import { setToLocalStorage } from "@/utils/localStorage";
import { authKey } from "@/constants/auth.constant";

const Register = () => {
    const navigate = useNavigate();
    const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
    const [loginWithEmail, { isLoading: isLoginLoading }] =
        useLoginWithEmailMutation();

    const decodedUser = getUser();

    useEffect(() => {
        if (decodedUser) {
            navigate("/");
        }
    }, [decodedUser, navigate]);

    const handleRegister = async (data: FieldValues) => {
        const newUser: Omit<IUser, "_id"> = {
            name: data.name,
            email: data.email,
            password: data.password,
        };

        const toastId = toast.loading("Creating account...");
        try {
            if (data?.file) {
                newUser.profilePhoto = await uploadImageToCloudinary(data.file);
            }

            const registerRes = await register(newUser).unwrap();
            if (registerRes) {
                const loginRes = await loginWithEmail({
                    email: registerRes.email,
                    password: data.password,
                }).unwrap();
                const token = loginRes.accessToken;
                if (token) {
                    setToLocalStorage(authKey, token);
                    navigate("/");
                    toast.success("Login successful!", { id: toastId });
                }
            }
        } catch (error: any) {
            toast.error(error.message || error.data || "Something went wrong", {
                id: toastId,
            });
        }
    };

    return (
        <section className="min-h-screen bg-linear-to-b from-blue-50 to-white py-20">
            <title>TrimURL - Register</title>
            <div className="container mx-auto px-4">
                <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Create Account
                        </h1>
                        <p className="text-lg text-gray-600">
                            Join TrimURL and start shortening your links today
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <SForm
                            onSubmit={handleRegister}
                            resolver={zodResolver(registerSchema)}
                        >
                            <SInput
                                name="name"
                                label="Name"
                                placeholder="Enter your name"
                            />
                            <SInput
                                name="email"
                                label="Email"
                                placeholder="Enter your email"
                            />
                            <SInputPassword />
                            <SFileUpload label="Profile Picture" />
                            <Button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700"
                                disabled={isRegisterLoading || isLoginLoading}
                            >
                                Create Account
                            </Button>
                        </SForm>
                        <div className="text-center mt-4">
                            <span className="text-gray-600 text-sm">
                                Already have an account?{" "}
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

export default Register;
