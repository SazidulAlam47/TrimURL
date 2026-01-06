import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

type LoaderProps = {
    className?: string;
};

const Loader = ({ className }: LoaderProps) => {
    return (
        <div
            className={cn(
                "min-h-[calc(100dvh-190px)]  flex justify-center items-center bg-linear-to-b from-blue-50 to-white",
                className
            )}
        >
            <Spinner className="size-10 text-blue-600" />
        </div>
    );
};

export default Loader;
