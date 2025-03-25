
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const CtaSection = () => {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ 
          backgroundImage: "url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)" 
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-estate-900/80 z-10" />
      
      {/* Content */}
      <div className="container mx-auto relative z-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
            Ready to Find Your Perfect Property?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Let us help you navigate the real estate market and find the perfect property that meets all your requirements.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/properties">
              <Button className="bg-white text-estate-900 hover:bg-white/90 text-base px-8 py-6 h-auto">
                Browse Properties
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 text-base px-8 py-6 h-auto">
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
