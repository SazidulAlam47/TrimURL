/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteMyUrlByIdMutation } from "@/redux/api/urlApi";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { IShortUrl } from "@/types";
import { Trash2 } from "lucide-react";
import truncateUrl from "@/utils/truncateUrl";

interface DeleteUrlModalProps {
    url: IShortUrl;
}

const DeleteUrlModal = ({ url }: DeleteUrlModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [deleteUrl, { isLoading }] = useDeleteMyUrlByIdMutation();

    const handleDelete = async () => {
        const toastId = toast.loading("Deleting URL...");

        try {
            await deleteUrl(url._id).unwrap();

            toast.success("URL deleted successfully!", {
                id: toastId,
            });
            setIsOpen(false);
        } catch (error: any) {
            toast.error(error.message || error.data || "Something went wrong", {
                id: toastId,
            });
        }
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure you want to delete this URL?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the
                        <p className="mt-2">shortened URL:</p>
                        <p className=" font-semibold text-gray-900">
                            {url.shortUrl}
                        </p>
                        <p className="mt-2">Original URL:</p>
                        <p className=" font-semibold text-gray-900">
                            {truncateUrl(url.originalUrl, 55)}
                        </p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isLoading}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        {isLoading ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteUrlModal;
