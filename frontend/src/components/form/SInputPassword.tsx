import { Controller } from "react-hook-form";
import SFormError from "./SFormError";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type SInputPasswordProps = {
    disabled?: boolean;
    className?: string;
};

const SInputPassword = ({
    disabled = false,
    className,
}: SInputPasswordProps) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <Controller
            name="password"
            render={({ field, fieldState: { error } }) => (
                <div className={className}>
                    <div className="mb-2">
                        <Label htmlFor="password" className="text-gray-900">
                            Password
                        </Label>
                    </div>
                    <div className="relative">
                        <Input
                            {...field}
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            disabled={disabled}
                            className={error ? "border-red-500" : ""}
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5 text-gray-500" />
                            ) : (
                                <Eye className="h-5 w-5 text-gray-500" />
                            )}
                        </button>
                    </div>
                    <SFormError error={error} />
                </div>
            )}
        />
    );
};

export default SInputPassword;
