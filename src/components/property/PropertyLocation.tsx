
import { Map } from "lucide-react";

interface PropertyLocationProps {
  address: string;
}

export function PropertyLocation({ address }: PropertyLocationProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-estate-100 shadow-subtle">
      <h3 className="text-xl font-display font-semibold text-estate-900 mb-4">Location</h3>
      <p className="text-estate-600 mb-6">
        {address}
      </p>
      <div className="aspect-[16/9] bg-estate-100 rounded-lg flex items-center justify-center">
        <Map className="h-12 w-12 text-estate-300" />
        <span className="ml-4 text-estate-500 font-medium">Interactive Map (Coming Soon)</span>
      </div>
    </div>
  );
}
