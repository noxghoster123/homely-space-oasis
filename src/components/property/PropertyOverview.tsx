
import { Home } from "lucide-react";

interface PropertyOverviewProps {
  property: {
    description: string;
    type: string;
    yearBuilt: number;
    lotSize: string;
    status: string;
  };
}

export function PropertyOverview({ property }: PropertyOverviewProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-estate-100 shadow-subtle">
      <h3 className="text-xl font-display font-semibold text-estate-900 mb-4">Property Description</h3>
      <p className="text-estate-600 mb-8 leading-relaxed">
        {property.description}
      </p>
      
      <h3 className="text-xl font-display font-semibold text-estate-900 mb-4">Property Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex justify-between p-3 bg-estate-50 rounded-lg">
          <span className="text-estate-700">Property Type</span>
          <span className="font-medium text-estate-900">{property.type}</span>
        </div>
        <div className="flex justify-between p-3 bg-estate-50 rounded-lg">
          <span className="text-estate-700">Year Built</span>
          <span className="font-medium text-estate-900">{property.yearBuilt}</span>
        </div>
        <div className="flex justify-between p-3 bg-estate-50 rounded-lg">
          <span className="text-estate-700">Lot Size</span>
          <span className="font-medium text-estate-900">{property.lotSize}</span>
        </div>
        <div className="flex justify-between p-3 bg-estate-50 rounded-lg">
          <span className="text-estate-700">Status</span>
          <span className="font-medium text-estate-900">{property.status}</span>
        </div>
      </div>
    </div>
  );
}
