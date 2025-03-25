
import { Home } from "lucide-react";

interface PropertyFeaturesProps {
  features: string[];
  amenityIcons: Record<string, React.ElementType>;
}

export function PropertyFeatures({ features, amenityIcons }: PropertyFeaturesProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-estate-100 shadow-subtle">
      <h3 className="text-xl font-display font-semibold text-estate-900 mb-6">Features & Amenities</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {features.map((feature, index) => {
          const IconComponent = amenityIcons[feature as keyof typeof amenityIcons] || Home;
          return (
            <div key={index} className="flex items-center p-3 bg-estate-50 rounded-lg">
              <div className="w-8 h-8 rounded-md bg-estate-100 flex items-center justify-center mr-3">
                <IconComponent className="h-4 w-4 text-estate-700" />
              </div>
              <span className="text-estate-800">{feature}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
