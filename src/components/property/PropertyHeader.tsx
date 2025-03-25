
import { Heart, Home, MapPin, Share } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PropertyHeaderProps {
  property: {
    title: string;
    address: string;
    type: string;
    status: string;
    price: number;
  };
}

export function PropertyHeader({ property }: PropertyHeaderProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <section className="py-8 px-6 bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-estate-900 mb-2">
              {property.title}
            </h1>
            <div className="flex items-center text-estate-600 mb-2">
              <MapPin className="h-4 w-4 mr-2" />
              {property.address}
            </div>
            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center bg-estate-100 px-3 py-1 rounded-full text-sm font-medium text-estate-800">
                <Home className="h-4 w-4 mr-1" />
                {property.type}
              </span>
              <span className="inline-flex items-center bg-estate-800 px-3 py-1 rounded-full text-sm font-medium text-white">
                {property.status}
              </span>
            </div>
          </div>
          <div className="flex flex-col md:items-end">
            <div className="text-3xl font-display font-bold text-estate-900 mb-2">
              ${property.price.toLocaleString()}
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="icon"
                className={cn(
                  "rounded-full border-estate-200",
                  isFavorite ? "text-red-500 bg-red-50" : "text-estate-500 hover:text-estate-700"
                )}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={cn("h-5 w-5", isFavorite ? "fill-current" : "")} />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-estate-200 text-estate-500 hover:text-estate-700">
                <Share className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
