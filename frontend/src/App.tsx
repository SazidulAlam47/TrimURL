import { IoIosLink } from "react-icons/io";
import ShortForm from "./components/ShortForm";
import CopyShortUrl from "./components/CopyShortUrl";
import useUrlContext from "./hooks/useUrlContext";

const App = () => {
    const { showCopy } = useUrlContext();
    return (
        <div className="min-h-[100dvh] flex items-center justify-center bg-gradient-to-br from-indigo-400 via-blue-200 to-pink-100">
            <div className="relative m-3 p-4 sm:p-6 md:p-8 bg-white/70 backdrop-blur-md shadow-2xl rounded-2xl w-full max-w-lg flex flex-col items-center border border-white/40">
                {/* Link Icon */}
                <div className="mb-4 bg-indigo-100 rounded-full p-3 shadow-md">
                    <IoIosLink className="size-8 text-indigo-600" />
                </div>
                <h1 className="text-3xl md:text-4xl text-center font-extrabold mb-2 text-indigo-700 drop-shadow">
                    Simple URL Shortener
                </h1>
                <p className="text-gray-600 mb-8 text-center text-md md:text-lg font-medium">
                    Paste your long URL below and get a short, shareable link
                    instantly.
                </p>
                {showCopy ? <CopyShortUrl /> : <ShortForm />}
                <div className="mt-4 sm:mt-6 md:mt-8 text-xs text-gray-400 text-center">
                    Find the source code in{" "}
                    <a
                        href="https://github.com/SazidulAlam47/Simple-URL-Shortener-Server"
                        target="_blank"
                        className="font-semibold text-indigo-500"
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </div>
    );
};

export default App;
