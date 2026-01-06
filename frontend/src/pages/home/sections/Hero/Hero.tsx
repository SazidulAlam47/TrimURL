import { Button } from "@/components/ui/button";
import { getUser } from "@/utils/user";
import { Link } from "react-router";

const Hero = () => {
    const user = getUser();

    return (
        <section className="bg-linear-to-b from-blue-50 to-white py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                        Shorten Your URLs,{" "}
                        <span className="text-blue-600">
                            Amplify Your Reach
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Transform long, unwieldy links into short, memorable
                        URLs. Track performance, manage links, and share with
                        confidence.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {user ? (
                            <Link to="/url-shortener">
                                <Button
                                    size="lg"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
                                >
                                    Shorten Your URL
                                </Button>
                            </Link>
                        ) : (
                            <>
                                <Link to="/register">
                                    <Button
                                        size="lg"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
                                    >
                                        Get Started Free
                                    </Button>
                                </Link>
                                <Link to="/login">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="px-8 py-6 text-lg"
                                    >
                                        Sign In
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
