import { Badge } from "@/components/ui/badge";
import { stepsData } from "@/constants/home.constant";

const HowItWorks = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        How It Works
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Get started with TrimURL in three simple steps
                    </p>
                </div>
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {stepsData.map((step, index) => (
                            <div key={index} className="relative">
                                <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                                    <Badge className="mb-4 text-lg px-4 py-2 bg-blue-600">
                                        {step.number}
                                    </Badge>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 text-base">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
