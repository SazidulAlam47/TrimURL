import { Link2 } from "lucide-react";
import ShortForm from "../../components/ShortForm";
import CopyShortUrl from "../../components/CopyShortUrl";
import type { RootState } from "@/redux/store";
import { useAppSelector } from "@/redux/hooks";

const UrlShort = () => {
    const showCopy = useAppSelector((state: RootState) => state.url.showCopy);
    return (
        <section className="min-h-screen bg-linear-to-b from-blue-50 to-white py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                            <Link2 className="w-8 h-8 text-blue-600" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Shorten Your URL
                        </h1>
                        <p className="text-xl text-gray-600">
                            Paste your long URL below and get a short, shareable
                            link instantly.
                        </p>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        {showCopy ? <CopyShortUrl /> : <ShortForm />}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UrlShort;
