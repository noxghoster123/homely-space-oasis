
import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Home, Star, Search } from "lucide-react";

// Mock data for agencies
const mockAgencies = [
  {
    id: 1,
    name: "Elite Real Estate Group",
    logo: "https://via.placeholder.com/80",
    rating: 4.8,
    reviews: 127,
    location: "New York, NY",
    phone: "+1 (212) 456-7890",
    properties: 48,
    subscription: "premium",
  },
  {
    id: 2,
    name: "Urban Housing Solutions",
    logo: "https://via.placeholder.com/80",
    rating: 4.5,
    reviews: 93,
    location: "San Francisco, CA",
    phone: "+1 (415) 789-0123",
    properties: 36,
    subscription: "standard",
  },
  {
    id: 3,
    name: "Golden Gate Properties",
    logo: "https://via.placeholder.com/80",
    rating: 4.9,
    reviews: 215,
    location: "Miami, FL",
    phone: "+1 (305) 234-5678",
    properties: 72,
    subscription: "golden",
  },
  {
    id: 4,
    name: "Cityscape Realty",
    logo: "https://via.placeholder.com/80",
    rating: 4.3,
    reviews: 64,
    location: "Chicago, IL",
    phone: "+1 (312) 345-6789",
    properties: 29,
    subscription: "standard",
  },
  {
    id: 5,
    name: "Metropolitan Homes",
    logo: "https://via.placeholder.com/80",
    rating: 4.6,
    reviews: 108,
    location: "Boston, MA",
    phone: "+1 (617) 234-5678",
    properties: 42,
    subscription: "premium",
  },
];

const AgencyList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [agencies, setAgencies] = useState(mockAgencies);

  const filteredAgencies = agencies.filter(agency =>
    agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agency.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-display font-bold text-estate-900 mb-6">Find Real Estate Agencies</h1>
          
          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-subtle p-6 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-estate-400" />
              <Input
                type="search"
                placeholder="Search agencies by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          {/* Results */}
          <div className="space-y-6">
            {filteredAgencies.length > 0 ? (
              filteredAgencies.map((agency) => (
                <Card key={agency.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="p-6 flex items-center justify-center md:w-1/5 bg-estate-50 border-b md:border-b-0 md:border-r border-estate-100">
                        <div className="text-center">
                          <img 
                            src={agency.logo} 
                            alt={`${agency.name} logo`} 
                            className="w-20 h-20 rounded-full mx-auto mb-2"
                          />
                          <div className="flex items-center justify-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-estate-800 font-medium ml-1">{agency.rating}</span>
                            <span className="text-estate-500 text-sm ml-1">({agency.reviews})</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6 flex-1">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                          <div>
                            <h3 className="text-xl font-semibold text-estate-900">{agency.name}</h3>
                            
                            <div className="mt-3 space-y-2">
                              <div className="flex items-center text-estate-600">
                                <MapPin className="h-4 w-4 mr-2 text-estate-500" />
                                <span>{agency.location}</span>
                              </div>
                              <div className="flex items-center text-estate-600">
                                <Phone className="h-4 w-4 mr-2 text-estate-500" />
                                <span>{agency.phone}</span>
                              </div>
                              <div className="flex items-center text-estate-600">
                                <Home className="h-4 w-4 mr-2 text-estate-500" />
                                <span>{agency.properties} Properties</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 md:mt-0">
                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              agency.subscription === 'golden' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : agency.subscription === 'premium' 
                                ? 'bg-purple-100 text-purple-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {agency.subscription.charAt(0).toUpperCase() + agency.subscription.slice(1)}
                            </div>
                            
                            <Button className="mt-3 w-full" asChild>
                              <Link to={`/agencies/${agency.id}`}>View Agency</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-estate-800">No agencies found</h3>
                <p className="text-estate-600 mt-2">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AgencyList;
