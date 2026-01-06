import { Card, CardContent } from "@/components/ui/card";
import { statsData } from "@/constants/home.constant";

const Stats = () => {
    return (
        <section className="py-20 bg-blue-600">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Trusted by Thousands
                    </h2>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Join our growing community of users who trust TrimURL
                        for their link shortening needs
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
                    {statsData.map((stat, index) => (
                        <Card
                            key={index}
                            className="bg-white/10 backdrop-blur-sm border-white/20"
                        >
                            <CardContent className="p-8 text-center">
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-lg text-blue-100">
                                    {stat.label}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
