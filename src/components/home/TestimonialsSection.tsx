
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock testimonial data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "First-time Homebuyer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    testimonial: "Working with RealEstate was the best decision we made. They helped us find our dream home within our budget and made the entire process seamless and stress-free.",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    position: "Property Investor",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    testimonial: "As someone who invests in multiple properties, I value efficiency and expertise. RealEstate delivers both. Their market insights have helped me make strategic investments with excellent returns.",
  },
  {
    id: 3,
    name: "Emily Chang",
    position: "Luxury Home Seller",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    testimonial: "When it came time to sell my luxury property, RealEstate's marketing strategy and network of qualified buyers resulted in a sale above asking price in just two weeks. Truly impressive!",
  },
];

export const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 px-6 bg-white overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-estate-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-estate-600">
            Don't just take our word for it. Hear from the people who have found their perfect properties with us.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Quote Icon */}
          <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 text-estate-100">
            <Quote className="h-24 w-24" />
          </div>

          {/* Testimonial Slider */}
          <div className="relative overflow-hidden py-10">
            <div 
              className="transition-transform duration-500 ease-out flex"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="w-full flex-shrink-0 px-6 md:px-10"
                >
                  <div className="bg-estate-50 rounded-2xl p-8 md:p-10 shadow-subtle border border-estate-100">
                    <p className="text-estate-700 text-lg italic mb-8">
                      "{testimonial.testimonial}"
                    </p>
                    <div className="flex items-center">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-display font-semibold text-estate-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-estate-500">
                          {testimonial.position}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center mt-8 space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="h-10 w-10 rounded-full border-estate-200 text-estate-700 hover:bg-estate-100 hover:text-estate-900"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            {testimonials.map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "h-3 w-3 rounded-full p-0 mx-1",
                  activeIndex === index
                    ? "bg-estate-800"
                    : "bg-estate-200 hover:bg-estate-300"
                )}
              />
            ))}
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="h-10 w-10 rounded-full border-estate-200 text-estate-700 hover:bg-estate-100 hover:text-estate-900"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
