import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

const ErrorPage = () => {
    return (
        <>
            <Header />
            <section className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-linear-to-b from-blue-50 to-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="mb-8">
                            <h1 className="text-9xl font-bold text-blue-600 mb-4">
                                404
                            </h1>
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                Page Not Found
                            </h2>
                            <p className="text-xl text-gray-600 mb-8">
                                We couldn't find the page you're looking for.
                                The link might be broken or the page may have
                                been removed.
                            </p>
                        </div>
                        <Link to="/">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
                                Go to Home
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default ErrorPage;
