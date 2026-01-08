import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Copy, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import type { IShortUrl } from "@/types";
import { GiCheckMark } from "react-icons/gi";
import truncateUrl from "@/utils/truncateUrl";
import DeleteUrlModal from "./DeleteUrlModal";

interface UrlTableRowProps {
    url: IShortUrl;
}

const UrlTableRow = ({ url }: UrlTableRowProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        if (url.shortUrl) {
            await navigator.clipboard.writeText(url.shortUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
    };

    return (
        <TableRow>
            <TableCell>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <a
                                href={url.originalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline flex items-center gap-1"
                            >
                                {truncateUrl(url.originalUrl)}
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p className="max-w-xs break-all">
                                {url.originalUrl}
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </TableCell>
            <TableCell className="font-mono">{url.shortId}</TableCell>
            <TableCell>
                <div className="flex items-center gap-2">
                    <a
                        href={url.shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        {url.shortUrl}
                    </a>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopy}
                        className="h-7 w-7 p-0"
                    >
                        {copied ? (
                            <>
                                <GiCheckMark />
                            </>
                        ) : (
                            <>
                                <Copy />
                            </>
                        )}
                    </Button>
                </div>
            </TableCell>
            <TableCell className="text-center font-semibold">
                {url.clicks}
            </TableCell>
            <TableCell>
                {format(new Date(url.createdAt), "MMM dd, yyyy")}
            </TableCell>
            <TableCell className="text-center">
                <DeleteUrlModal url={url} />
            </TableCell>
        </TableRow>
    );
};

export default UrlTableRow;
