
import { Key, Home, MapPin, TrendingUp, Clock, Building, Users } from "lucide-react";

const features = [
  {
    title: "Find Your Dream Home",
    description: "Browse through thousands of listings to find the perfect home that fits your lifestyle and budget.",
    icon: Home,
  },
  {
    title: "Premium Locations",
    description: "Discover properties in the most desirable neighborhoods and emerging areas with high growth potential.",
    icon: MapPin,
  },
  {
    title: "Real-Time Market Insights",
    description: "Get access to real-time market data and trends to make informed investment decisions.",
    icon: TrendingUp,
  },
  {
    title: "Fast & Efficient Process",
    description: "Our streamlined processes ensure quick transactions and minimal paperwork.",
    icon: Clock,
  },
  {
    title: "All Property Types",
    description: "From luxury apartments to family homes, commercial spaces to raw land - we have it all.",
    icon: Building,
  },
  {
    title: "Expert Guidance",
    description: "Our experienced agents provide personalized assistance throughout your real estate journey.",
    icon: Users,
  },
];

export const FeatureHighlights = () => {
  return (
    <section className="py-20 px-6 bg-estate-50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-estate-900 mb-4">
            Why Choose Our Platform
          </h2>
          <p className="text-estate-600">
            We make finding and investing in real estate simple, efficient, and rewarding with our 
            comprehensive suite of tools and services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-subtle border border-estate-100 hover:shadow-card transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-estate-100 flex items-center justify-center mb-5">
                <feature.icon className="h-6 w-6 text-estate-800" />
              </div>
              <h3 className="font-display font-semibold text-xl text-estate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-estate-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
