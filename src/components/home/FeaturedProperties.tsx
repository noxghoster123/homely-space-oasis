
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bed, Bath, Square, MapPin, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for featured properties
const properties = [
  {
    id: 1,
    title: "Modern Apartment with Ocean View",
    address: "123 Coastal Avenue, Seaside, CA",
    price: 750000,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    beds: 3,
    baths: 2,
    sqft: 1800,
    type: "Apartment",
    featured: true
  },
  {
    id: 2,
    title: "Luxury Villa with Private Pool",
    address: "456 Estate Drive, Beverly Hills, CA",
    price: 2500000,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80",
    beds: 5,
    baths: 4.5,
    sqft: 4200,
    type: "Villa",
    featured: true
  },
  {
    id: 3,
    title: "Cozy Suburban Family Home",
    address: "789 Maple Street, Springfield, IL",
    price: 450000,
    image: "https://images.unsplash.com/photo-1598228723793-52759bba239c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    beds: 4,
    baths: 2.5,
    sqft: 2400,
    type: "House",
    featured: true
  },
  {
    id: 4,
    title: "Downtown Penthouse Loft",
    address: "101 Skyline Tower, Chicago, IL",
    price: 1200000,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    beds: 2,
    baths: 2,
    sqft: 1600,
    type: "Penthouse",
    featured: true
  }
];

export const FeaturedProperties = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(propId => propId !== id) 
        : [...prev, id]
    );
  };

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-estate-900 mb-3">
              Featured Properties
            </h2>
            <p className="text-estate-600 max-w-2xl">
              Handpicked premium properties that match your lifestyle and preferences.
            </p>
          </div>
          <Link to="/properties">
            <Button variant="link" className="text-estate-800 font-medium group mt-4 md:mt-0">
              View All Properties 
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {properties.map((property) => (
            <div 
              key={property.id} 
              className="property-card group"
            >
              {/* Property Image */}
              <div className="relative overflow-hidden aspect-[4/3]">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 z-10">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-9 w-9 rounded-full backdrop-blur-sm",
                      favorites.includes(property.id)
                        ? "bg-white/80 text-red-500"
                        : "bg-black/20 text-white hover:bg-white/80 hover:text-estate-900"
                    )}
                    onClick={() => toggleFavorite(property.id)}
                  >
                    <Heart 
                      className={cn(
                        "h-5 w-5 transition-all",
                        favorites.includes(property.id) ? "fill-current" : ""
                      )} 
                    />
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium text-estate-800">
                    {property.type}
                  </span>
                </div>
              </div>

              {/* Property Details */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-display font-semibold text-lg text-estate-900 line-clamp-1">
                    {property.title}
                  </h3>
                </div>
                <div className="flex items-center text-estate-500 mb-3">
                  <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="text-sm truncate">{property.address}</span>
                </div>
                
                <div className="flex items-center justify-between py-3 border-y border-estate-100">
                  <div className="flex items-center text-estate-600">
                    <Bed className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.beds} Beds</span>
                  </div>
                  <div className="flex items-center text-estate-600">
                    <Bath className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.baths} Baths</span>
                  </div>
                  <div className="flex items-center text-estate-600">
                    <Square className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.sqft} sqft</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="font-display font-bold text-estate-900 text-lg">
                    ${property.price.toLocaleString()}
                  </div>
                  <Link to={`/properties/${property.id}`}>
                    <Button variant="outline" size="sm" className="text-estate-800 border-estate-200 hover:bg-estate-50">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
