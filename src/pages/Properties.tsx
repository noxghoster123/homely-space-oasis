
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Square, MapPin, Heart, Filter, ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// Mock properties data
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
  },
  {
    id: 5,
    title: "Riverside Cottage with Garden",
    address: "234 River Lane, Portland, OR",
    price: 595000,
    image: "https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    beds: 3,
    baths: 2,
    sqft: 1700,
    type: "House",
    featured: false
  },
  {
    id: 6,
    title: "Modern Office Building",
    address: "567 Business Park, Austin, TX",
    price: 1850000,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    beds: 0,
    baths: 4,
    sqft: 5000,
    type: "Commercial",
    featured: false
  },
];

const Properties = () => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [filtersExpanded, setFiltersExpanded] = useState(false);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(propId => propId !== id) 
        : [...prev, id]
    );
  };

  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-estate-800 py-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 animate-fade-in">
              Find Your Perfect Property
            </h1>
            <p className="text-white/80 text-lg mb-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
              Browse our exclusive collection of premium properties available for sale and rent.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="container mx-auto">
          {/* Search and Filters */}
          <div className="mb-10 bg-white rounded-xl shadow-subtle p-6 border border-estate-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-estate-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search properties by location, name, or features..."
                  className="w-full pl-10 pr-4 py-2 border border-estate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-estate-400"
                />
              </div>
              <Button 
                variant="outline" 
                className="flex items-center md:self-stretch gap-2 border-estate-200"
                onClick={() => setFiltersExpanded(!filtersExpanded)}
              >
                <Filter className="h-4 w-4" />
                Filters
                <ChevronDown className={cn(
                  "h-4 w-4 transition-transform",
                  filtersExpanded ? "rotate-180" : ""
                )} />
              </Button>
            </div>

            {/* Expandable Filters */}
            <div className={cn(
              "grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-300 overflow-hidden",
              filtersExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            )}>
              {/* Property Type Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-estate-700">Property Type</label>
                <select className="w-full p-2 border border-estate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-estate-400">
                  <option value="">All Types</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="villa">Villa</option>
                  <option value="commercial">Commercial</option>
                  <option value="land">Land</option>
                </select>
              </div>
              
              {/* Price Range Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-estate-700">Price Range</label>
                <select className="w-full p-2 border border-estate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-estate-400">
                  <option value="">Any Price</option>
                  <option value="0-100000">$0 - $100,000</option>
                  <option value="100000-300000">$100,000 - $300,000</option>
                  <option value="300000-500000">$300,000 - $500,000</option>
                  <option value="500000-1000000">$500,000 - $1,000,000</option>
                  <option value="1000000+">$1,000,000+</option>
                </select>
              </div>
              
              {/* Bedrooms Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-estate-700">Bedrooms</label>
                <select className="w-full p-2 border border-estate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-estate-400">
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>
            </div>
          </div>

          {/* Property Listings */}
          <div className="mb-8">
            <h2 className="text-2xl font-display font-semibold text-estate-900 mb-6">
              Available Properties <span className="text-estate-500 text-lg font-normal">({properties.length})</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {properties.map((property) => (
                <div 
                  key={property.id} 
                  className="property-card group animate-fade-in"
                  style={{ animationDelay: `${property.id * 50}ms` }}
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

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <nav className="inline-flex rounded-md shadow-sm -space-x-px">
              <Button disabled variant="outline" className="rounded-l-md border-estate-200">
                Previous
              </Button>
              <Button variant="outline" className="border-estate-200 bg-estate-100">
                1
              </Button>
              <Button variant="outline" className="border-estate-200">
                2
              </Button>
              <Button variant="outline" className="border-estate-200">
                3
              </Button>
              <Button variant="outline" className="rounded-r-md border-estate-200">
                Next
              </Button>
            </nav>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Properties;
