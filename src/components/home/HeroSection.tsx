
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Home, Building, MapPin, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

export const HeroSection = () => {
  const [searchType, setSearchType] = useState<'buy' | 'rent'>('buy');

  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ 
          backgroundImage: "url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)",
          transform: "scale(1.05)" 
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-estate-900/80 to-estate-900/30 z-10" />
      
      {/* Content */}
      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6">
            Find Your Dream Home With Ease
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">
            Discover the perfect property from our extensive collection of premium listings curated just for you.
          </p>
          
          {/* Search Box */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-elevation p-4 md:p-6">
            {/* Tabs */}
            <div className="flex space-x-2 mb-6">
              <Button
                type="button"
                variant={searchType === 'buy' ? 'default' : 'outline'}
                className={cn(
                  "transition-all",
                  searchType === 'buy' 
                    ? "bg-estate-800 hover:bg-estate-700 text-white" 
                    : "text-estate-600 hover:text-estate-900"
                )}
                onClick={() => setSearchType('buy')}
              >
                Buy
              </Button>
              <Button
                type="button"
                variant={searchType === 'rent' ? 'default' : 'outline'}
                className={cn(
                  "transition-all",
                  searchType === 'rent' 
                    ? "bg-estate-800 hover:bg-estate-700 text-white" 
                    : "text-estate-600 hover:text-estate-900"
                )}
                onClick={() => setSearchType('rent')}
              >
                Rent
              </Button>
            </div>
            
            {/* Search Form */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2 bg-estate-50 p-3 rounded-lg border border-estate-100">
                <MapPin className="h-5 w-5 text-estate-500" />
                <input
                  type="text"
                  placeholder="Location"
                  className="bg-transparent w-full focus:outline-none text-estate-900 placeholder:text-estate-400"
                />
              </div>
              
              <div className="flex items-center space-x-2 bg-estate-50 p-3 rounded-lg border border-estate-100">
                <Home className="h-5 w-5 text-estate-500" />
                <select
                  className="bg-transparent w-full focus:outline-none text-estate-900 appearance-none cursor-pointer"
                >
                  <option value="">Property Type</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="commercial">Commercial</option>
                  <option value="land">Land</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2 bg-estate-50 p-3 rounded-lg border border-estate-100">
                <DollarSign className="h-5 w-5 text-estate-500" />
                <select
                  className="bg-transparent w-full focus:outline-none text-estate-900 appearance-none cursor-pointer"
                >
                  <option value="">Price Range</option>
                  <option value="0-100000">$0 - $100,000</option>
                  <option value="100000-300000">$100,000 - $300,000</option>
                  <option value="300000-500000">$300,000 - $500,000</option>
                  <option value="500000-1000000">$500,000 - $1,000,000</option>
                  <option value="1000000+">$1,000,000+</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button className="bg-estate-800 hover:bg-estate-700 text-white px-8 py-2 h-12">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
