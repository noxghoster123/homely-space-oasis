import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Mail, 
  Phone, 
  Heart, 
  Share, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Home,
  User,
  Map,
  Car,
  WifiIcon,
  Utensils,
  Tv,
  AirVent
} from "lucide-react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger,
  TooltipProvider 
} from "@/components/ui/tooltip";

const property = {
  id: 1,
  title: "Luxury Villa with Private Pool",
  address: "456 Estate Drive, Beverly Hills, CA",
  price: 2500000,
  description: "This stunning villa offers the perfect blend of luxury and comfort. Set in a prestigious neighborhood, the property features a spacious open floor plan with high ceilings, floor-to-ceiling windows providing abundant natural light, and premium finishes throughout. The gourmet kitchen is equipped with high-end appliances, custom cabinetry, and a large center island. The primary suite includes a spa-like bathroom and walk-in closet. Outside, enjoy the private pool, beautifully landscaped garden, and covered patio perfect for entertaining.",
  images: [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1600585153490-76fb20a32601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  ],
  beds: 5,
  baths: 4.5,
  sqft: 4200,
  yearBuilt: 2018,
  lotSize: "0.5 acres",
  type: "Villa",
  status: "For Sale",
  features: [
    "Private Pool",
    "Garden",
    "Outdoor Kitchen",
    "Double Garage",
    "Smart Home System",
    "Fireplace",
    "Wine Cellar",
    "Home Theater",
    "Gym",
    "High Ceilings"
  ],
  agent: {
    name: "Jennifer Morrison",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80",
    phone: "+1 (555) 123-4567",
    email: "jennifer@realestate.com"
  }
};

const amenityIcons = {
  "Private Pool": WifiIcon,
  "Garden": Utensils,
  "Outdoor Kitchen": Tv,
  "Double Garage": Car,
  "Smart Home System": AirVent,
  "Fireplace": Home,
  "Wine Cellar": User,
  "Home Theater": Map,
  "Gym": Bed,
  "High Ceilings": Bath
};

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [mainImage, setMainImage] = useState(property.images[0]);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Layout>
      {/* Breadcrumb Navigation */}
      <div className="bg-estate-50 py-4 px-6 border-b border-estate-100">
        <div className="container mx-auto">
          <div className="flex items-center text-sm text-estate-500">
            <Link to="/" className="hover:text-estate-700">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/properties" className="hover:text-estate-700">Properties</Link>
            <span className="mx-2">/</span>
            <span className="text-estate-700">{property.title}</span>
          </div>
        </div>
      </div>
      
      {/* Property Header */}
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
      
      {/* Property Images */}
      <section className="py-8 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-8">
              <div className="rounded-xl overflow-hidden aspect-[16/9] mb-4">
                <img 
                  src={mainImage} 
                  alt={property.title}
                  className="w-full h-full object-cover animate-scale-in"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {property.images.map((image, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "cursor-pointer rounded-lg overflow-hidden aspect-[4/3] transition-all",
                      mainImage === image ? "ring-2 ring-estate-800" : "opacity-80 hover:opacity-100"
                    )}
                    onClick={() => setMainImage(image)}
                  >
                    <img 
                      src={image} 
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Property Info */}
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
          </div>
        </div>
      </section>
      
      {/* Property Details Tabs */}
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
            </TabsList>
            
            <TabsContent value="overview" className="mt-0">
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
            </TabsContent>
            
            <TabsContent value="features" className="mt-0">
              <div className="bg-white rounded-xl p-6 border border-estate-100 shadow-subtle">
                <h3 className="text-xl font-display font-semibold text-estate-900 mb-6">Features & Amenities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {property.features.map((feature, index) => {
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
            </TabsContent>
            
            <TabsContent value="location" className="mt-0">
              <div className="bg-white rounded-xl p-6 border border-estate-100 shadow-subtle">
                <h3 className="text-xl font-display font-semibold text-estate-900 mb-4">Location</h3>
                <p className="text-estate-600 mb-6">
                  {property.address}
                </p>
                <div className="aspect-[16/9] bg-estate-100 rounded-lg flex items-center justify-center">
                  <Map className="h-12 w-12 text-estate-300" />
                  <span className="ml-4 text-estate-500 font-medium">Interactive Map (Coming Soon)</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default PropertyDetail;
