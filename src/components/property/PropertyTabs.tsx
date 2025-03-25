
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Home, Map } from "lucide-react";
import { PropertyOverview } from "./PropertyOverview";
import { PropertyFeatures } from "./PropertyFeatures";
import { PropertyLocation } from "./PropertyLocation";
import { MortgageCalculator } from "./MortgageCalculator";

interface PropertyTabsProps {
  property: {
    description: string;
    type: string;
    yearBuilt: number;
    lotSize: string;
    status: string;
    features: string[];
    address: string;
    price: number;
  };
  amenityIcons: Record<string, React.ElementType>;
}

export function PropertyTabs({ property, amenityIcons }: PropertyTabsProps) {
  return (
    <section className="py-12 px-6 bg-estate-50">
      <div className="container mx-auto">
        <Tabs defaultValue="overview">
          <TabsList className="w-full justify-start mb-8 bg-white border border-estate-100 p-1 rounded-lg">
            <TabsTrigger value="overview" className="text-sm rounded-md data-[state=active]:bg-estate-800 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="features" className="text-sm rounded-md data-[state=active]:bg-estate-800 data-[state=active]:text-white">
              Features & Amenities
            </TabsTrigger>
            <TabsTrigger value="location" className="text-sm rounded-md data-[state=active]:bg-estate-800 data-[state=active]:text-white">
              Location
            </TabsTrigger>
            <TabsTrigger value="calculator" className="text-sm rounded-md data-[state=active]:bg-estate-800 data-[state=active]:text-white">
              <Calculator className="h-4 w-4 mr-1" />
              Mortgage
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-0">
            <PropertyOverview property={property} />
          </TabsContent>
          
          <TabsContent value="features" className="mt-0">
            <PropertyFeatures features={property.features} amenityIcons={amenityIcons} />
          </TabsContent>
          
          <TabsContent value="location" className="mt-0">
            <PropertyLocation address={property.address} />
          </TabsContent>

          <TabsContent value="calculator" className="mt-0">
            <div className="bg-white rounded-xl p-6 border border-estate-100 shadow-subtle">
              <div className="max-w-lg mx-auto">
                <MortgageCalculator propertyPrice={property.price} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
