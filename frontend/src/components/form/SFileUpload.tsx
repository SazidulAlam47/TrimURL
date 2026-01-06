import { useController, useFormContext } from "react-hook-form";
import SFormError from "./SFormError";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

type SFileUploadProps = {
    label?: string;
    className?: string;
};

const SFileUpload = ({ label, className }: SFileUploadProps) => {
    const { control, setValue } = useFormContext();

    const {
        field: { name },
        fieldState: { error },
    } = useController({
        name: "file",
        control,
    });

    return (
        <div className={cn("space-y-1", className)}>
            <div className="mb-2">
                <Label htmlFor={name} className="text-gray-900">
                    {label}
                </Label>
            </div>
            <input
                id={name}
                name={name}
                type="file"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        setValue("file", file);
                    }
                }}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 file-input"
            />
            <SFormError error={error} />
        </div>
    );
};

export default SFileUpload;
