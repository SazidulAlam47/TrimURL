/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router";
import SForm from "../../components/form/SForm";
import SInput from "../../components/form/SInput";
import SInputPassword from "../../components/form/SInputPassword";
import type { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schema/auth.schema";
import {
    useLoginWithEmailMutation,
    useLoginWithGoogleMutation,
} from "@/redux/api/authApi";
import { setToLocalStorage } from "@/utils/localStorage";
import { authKey } from "@/constants/auth.constant";
import googleLogo from "../../assets/google.svg";
import formatFirebaseError from "@/utils/formatFirebaseError";
import { googleLogin } from "@/firebase/firebase.action";
import { useAppDispatch } from "@/redux/hooks";
import { setIsLoggedIn } from "@/redux/features/authSlice";

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [loginWithEmail, { isLoading: isEmailLoading }] =
        useLoginWithEmailMutation();
    const [loginWithGoogle, { isLoading: isGoogleLoading }] =
        useLoginWithGoogleMutation();

    const handleGoogleLogin = async () => {
        try {
            const userInfo = await googleLogin();
            const idToken = await userInfo.user.getIdToken();

            const toastId = toast.loading("Logging in...");

            try {
                const res = await loginWithGoogle({ idToken }).unwrap();

                const token = res.accessToken;
                if (token) {
                    setToLocalStorage(authKey, token);
                    if (location.state) {
                        navigate(location.state);
                    } else {
                        navigate("/url-shortener");
                    }
                    toast.success("Login successful!", { id: toastId });
                    dispatch(setIsLoggedIn(true));
                }
            } catch (error: any) {
                toast.error(
                    error.message || error.data || "Something went wrong",
                    { id: toastId }
                );
            }
        } catch (error: any) {
            toast.error(formatFirebaseError(error.message));
        }
    };

    const handleEmailLogin = async (data: FieldValues) => {
        const toastId = toast.loading("Logging in...");

        try {
            const res = await loginWithEmail(data).unwrap();
            const token = res.accessToken;
            if (token) {
                setToLocalStorage(authKey, token);
                if (location.state) {
                    navigate(location.state);
                } else {
                    navigate("/url-shortener");
                }
                toast.success("Login successful!", { id: toastId });
                dispatch(setIsLoggedIn(true));
            }
        } catch (error: any) {
            toast.error(error.message || error.data || "Something went wrong", {
                id: toastId,
            });
        }
    };

    return (
        <section className="min-h-screen bg-linear-to-b from-blue-50 to-white py-20">
            <title>TrimURL - Login</title>
            <div className="container mx-auto px-4">
                <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-lg text-gray-600">
                            Sign in to your account to continue
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <SForm
                            onSubmit={handleEmailLogin}
                            resolver={zodResolver(loginSchema)}
                        >
                            <SInput
                                name="email"
                                label="Email"
                                placeholder="Enter your email"
                            />
                            <SInputPassword />
                            <Button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700"
                                disabled={isEmailLoading || isGoogleLoading}
                            >
                                Sign In
                            </Button>
                        </SForm>
                        <div className="text-center mt-2">
                            <Link
                                to="/forgot-password"
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Forgot password
                            </Link>
                        </div>
                        <Button
                            onClick={handleGoogleLogin}
                            variant="outline"
                            className="w-full mt-4 border-blue-600 text-blue-600 hover:bg-blue-50"
                            disabled={isEmailLoading || isGoogleLoading}
                        >
                            <img
                                src={googleLogo}
                                alt="G"
                                className="size-4 mr-2"
                            />
                            Sign in with Google
                        </Button>
                        <div className="text-center mt-4">
                            <span className="text-gray-600 text-sm">
                                Don't have an account?{" "}
                                <Link
                                    to="/register"
                                    className="text-blue-600 hover:underline font-medium"
                                >
                                    Create account
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
