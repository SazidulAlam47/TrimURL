/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetMyAllUrlsQuery } from "@/redux/api/urlApi";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import UrlTableRow from "./UrlTableRow";
import Loader from "@/components/Loader";
import { Link } from "react-router";

const MyUrls = () => {
    const { data: urls, isLoading } = useGetMyAllUrlsQuery({});

    if (isLoading) {
        return <Loader />;
    }

    return (
        <section className="min-h-screen bg-linear-to-b from-blue-50 to-white py-20">
            <title>TrimURL - My URLs</title>
            <div className="container mx-auto px-4">
                <div className="mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            My URLs
                        </h1>
                        <p className="text-lg text-gray-600">
                            Manage your shortened URLs
                        </p>
                    </div>
                    {!urls || !urls.length ? null : (
                        <div>
                            <Link to="/url-shortener">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white mt-4">
                                    Create New Short URL
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                {urls && urls.length ? (
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden py-2 px-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="font-semibold">
                                        Original URL
                                    </TableHead>
                                    <TableHead className="font-semibold">
                                        Short Code
                                    </TableHead>
                                    <TableHead className="font-semibold">
                                        Short URL
                                    </TableHead>
                                    <TableHead className="font-semibold text-center">
                                        Clicks
                                    </TableHead>
                                    <TableHead className="font-semibold">
                                        Created Date
                                    </TableHead>
                                    <TableHead className="font-semibold text-center">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {urls.map((url: any) => (
                                    <UrlTableRow key={url._id} url={url} />
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                        <p className="text-xl text-gray-600">
                            No URLs found. Create your first shortened URL!
                        </p>
                        <Link to="/url-shortener">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white mt-4">
                                Create Short URL
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default MyUrls;
