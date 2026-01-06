import { Controller } from "react-hook-form";
import SFormError from "./SFormError";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type SInputProps = {
    type?: string;
    placeholder?: string;
    name: string;
    label?: string;
    disabled?: boolean;
    className?: string;
};

const SInput = ({
    type = "text",
    placeholder,
    name,
    label,
    disabled = false,
    className,
}: SInputProps) => {
    return (
        <Controller
            name={name}
            render={({ field, fieldState: { error } }) => (
                <div className={className}>
                    <div className="mb-2">
                        <Label htmlFor={name} className="text-gray-900">
                            {label}
                        </Label>
                    </div>
                    <Input
                        {...field}
                        id={name}
                        type={type}
                        placeholder={placeholder || ""}
                        disabled={disabled}
                        className={error ? "border-red-500" : ""}
                    />
                    <SFormError error={error} />
                </div>
            )}
        />
    );
};

export default SInput;
