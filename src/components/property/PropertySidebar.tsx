
import { Bath, Bed, Calendar, Mail, Phone, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PropertySidebarProps {
  property: {
    beds: number;
    baths: number;
    sqft: number;
    agent: {
      name: string;
      image: string;
      phone: string;
      email: string;
    };
  };
}

export function PropertySidebar({ property }: PropertySidebarProps) {
  return (
    <div className="lg:col-span-4 mt-6 lg:mt-0">
      <div className="bg-estate-50 rounded-xl p-6 border border-estate-100 shadow-subtle">
        {/* Property Features */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 bg-white rounded-lg">
            <Bed className="h-5 w-5 mx-auto text-estate-700 mb-1" />
            <div className="text-estate-900 font-semibold">{property.beds}</div>
            <div className="text-estate-500 text-xs">Bedrooms</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <Bath className="h-5 w-5 mx-auto text-estate-700 mb-1" />
            <div className="text-estate-900 font-semibold">{property.baths}</div>
            <div className="text-estate-500 text-xs">Bathrooms</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg">
            <Square className="h-5 w-5 mx-auto text-estate-700 mb-1" />
            <div className="text-estate-900 font-semibold">{property.sqft}</div>
            <div className="text-estate-500 text-xs">Sq Ft</div>
          </div>
        </div>
        
        {/* Agent Info */}
        <div className="border-t border-estate-200 pt-6 mb-6">
          <h3 className="text-lg font-display font-semibold text-estate-900 mb-4">Listing Agent</h3>
          <div className="flex items-center">
            <img 
              src={property.agent.image} 
              alt={property.agent.name}
              className="w-14 h-14 rounded-full object-cover mr-4"
            />
            <div>
              <div className="font-medium text-estate-900">{property.agent.name}</div>
              <div className="text-estate-500 text-sm">Real Estate Agent</div>
            </div>
          </div>
        </div>
        
        {/* Contact Agent */}
        <div>
          <Button className="w-full mb-3 bg-estate-800 hover:bg-estate-700 h-11">
            <Mail className="h-4 w-4 mr-2" />
            Email Agent
          </Button>
          <Button variant="outline" className="w-full mb-6 border-estate-200 text-estate-700 h-11">
            <Phone className="h-4 w-4 mr-2" />
            Call Agent
          </Button>
          <Button variant="outline" className="w-full border-estate-200 text-estate-700 h-11">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule a Tour
          </Button>
        </div>
      </div>
    </div>
  );
}
