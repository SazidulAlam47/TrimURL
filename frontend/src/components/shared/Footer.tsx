import { Link } from "react-router";

const Footer = () => {
    return (
        <footer className="bg-gray-100 border-t">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center gap-4 py-6 md:flex-row md:justify-between">
                    <Link to="/" className="flex items-center">
                        <span className="text-xl font-bold text-blue-600">
                            TrimURL
                        </span>
                    </Link>
                    <div className="flex flex-wrap gap-6 justify-center">
                        <Link
                            to="#"
                            className="text-gray-700 hover:text-blue-600 transition-colors text-sm"
                        >
                            About
                        </Link>
                        <Link
                            to="#"
                            className="text-gray-700 hover:text-blue-600 transition-colors text-sm"
                        >
                            Contact
                        </Link>
                    </div>
                </div>
                <div className="border-t border-gray-300">
                    <p className="text-center text-gray-600 text-sm py-4">
                        © {new Date().getFullYear()} TrimURL. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
