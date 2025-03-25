
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { 
  MapPin, Phone, Mail, Globe, Star, Calendar, Home, User, MessageSquare, 
  Facebook, Twitter, Instagram, Linkedin, Clock, CheckCircle
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock data for agency
const mockAgency = {
  id: 1,
  name: "Elite Real Estate Group",
  logo: "https://via.placeholder.com/150",
  cover: "https://via.placeholder.com/1200x400",
  rating: 4.8,
  reviews: 127,
  description: "Elite Real Estate Group is a premier real estate agency specializing in luxury properties across major cities. With over 15 years of experience, our team of expert agents provides personalized service to help clients find their dream homes or investment properties.",
  location: "123 Madison Avenue, New York, NY 10016",
  phone: "+1 (212) 456-7890",
  email: "info@eliterealestate.com",
  website: "www.eliterealestate.com",
  founded: "2008",
  agents: 24,
  properties: 48,
  subscription: "premium",
  operatingHours: "Monday to Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed",
  socialMedia: {
    facebook: "https://facebook.com/eliterealestate",
    twitter: "https://twitter.com/eliterealestate",
    instagram: "https://instagram.com/eliterealestate",
    linkedin: "https://linkedin.com/company/eliterealestate",
  },
  specializations: ["Luxury Properties", "Commercial Real Estate", "Investment Properties", "Residential Homes"],
  agents: [
    {
      id: 101,
      name: "Sarah Johnson",
      image: "https://via.placeholder.com/100",
      title: "Senior Agent",
      properties: 12,
    },
    {
      id: 102,
      name: "Michael Chen",
      image: "https://via.placeholder.com/100",
      title: "Luxury Property Specialist",
      properties: 9,
    },
    {
      id: 103,
      name: "Emily Rodriguez",
      image: "https://via.placeholder.com/100",
      title: "Commercial Agent",
      properties: 7,
    },
    {
      id: 104,
      name: "David Kim",
      image: "https://via.placeholder.com/100",
      title: "Investment Advisor",
      properties: 11,
    },
  ],
  properties: [
    {
      id: 201,
      title: "Luxury Penthouse with Skyline Views",
      image: "https://via.placeholder.com/300x200",
      price: "$2,450,000",
      beds: 3,
      baths: 3.5,
      sqft: 2100,
      location: "Manhattan, NY",
    },
    {
      id: 202,
      title: "Modern Condo in Downtown",
      image: "https://via.placeholder.com/300x200",
      price: "$985,000",
      beds: 2,
      baths: 2,
      sqft: 1500,
      location: "Brooklyn, NY",
    },
    {
      id: 203,
      title: "Waterfront Estate with Private Dock",
      image: "https://via.placeholder.com/300x200",
      price: "$4,750,000",
      beds: 5,
      baths: 4.5,
      sqft: 4200,
      location: "Hamptons, NY",
    },
    {
      id: 204,
      title: "Renovated Brownstone Townhouse",
      image: "https://via.placeholder.com/300x200",
      price: "$3,200,000",
      beds: 4,
      baths: 3,
      sqft: 3000,
      location: "Upper East Side, NY",
    },
  ]
};

const AgencyDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [messageText, setMessageText] = useState("");
  
  // In a real app, you would fetch the agency data based on the ID
  const agency = mockAgency;
  
  const handleSendMessage = () => {
    if (!messageText.trim()) {
      toast({
        title: "Message is empty",
        description: "Please enter a message to send.",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would send the message to your backend
    console.log("Sending message to agency:", messageText);
    
    toast({
      title: "Message sent",
      description: "The agency will respond to you shortly.",
    });
    
    setMessageText("");
  };

  const handleScheduleTour = () => {
    toast({
      title: "Tour request sent",
      description: "A representative will contact you to schedule a visit.",
    });
  };

  return (
    <Layout>
      {/* Cover Image */}
      <div className="relative h-64 md:h-80 bg-estate-100 overflow-hidden">
        <img 
          src={agency.cover} 
          alt={`${agency.name} cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Agency Header */}
          <div className="relative -mt-20 mb-8">
            <div className="bg-white rounded-xl shadow-subtle p-6">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="relative md:w-32 md:h-32 w-24 h-24 rounded-xl overflow-hidden border-4 border-white shadow-md -mt-16">
                  <img 
                    src={agency.logo} 
                    alt={`${agency.name} logo`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-display font-bold text-estate-900">{agency.name}</h1>
                      <div className="flex items-center mt-2">
                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                        <span className="ml-1 text-estate-800 font-medium">{agency.rating}</span>
                        <span className="ml-1 text-estate-500">({agency.reviews} reviews)</span>
                        <span className={`ml-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          agency.subscription === 'golden' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : agency.subscription === 'premium' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {agency.subscription.charAt(0).toUpperCase() + agency.subscription.slice(1)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={handleScheduleTour}>
                        <Calendar className="mr-2 h-4 w-4" />
                        Schedule Tour
                      </Button>
                      <Button>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Contact Agency
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="about">
                <TabsList className="w-full bg-white shadow-subtle rounded-t-xl border border-estate-100">
                  <TabsTrigger value="about" className="flex-1">About</TabsTrigger>
                  <TabsTrigger value="properties" className="flex-1">Properties</TabsTrigger>
                  <TabsTrigger value="agents" className="flex-1">Agents</TabsTrigger>
                  <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
                </TabsList>
                
                {/* About Tab */}
                <TabsContent value="about" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold text-estate-900 mb-4">About {agency.name}</h2>
                      <p className="text-estate-700 mb-6">{agency.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-4">
                          <div className="flex items-start space-x-3">
                            <MapPin className="w-5 h-5 text-estate-500 mt-0.5" />
                            <div>
                              <h3 className="font-medium text-estate-800">Address</h3>
                              <p className="text-estate-600">{agency.location}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3">
                            <Phone className="w-5 h-5 text-estate-500 mt-0.5" />
                            <div>
                              <h3 className="font-medium text-estate-800">Phone</h3>
                              <p className="text-estate-600">{agency.phone}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3">
                            <Mail className="w-5 h-5 text-estate-500 mt-0.5" />
                            <div>
                              <h3 className="font-medium text-estate-800">Email</h3>
                              <p className="text-estate-600">{agency.email}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3">
                            <Globe className="w-5 h-5 text-estate-500 mt-0.5" />
                            <div>
                              <h3 className="font-medium text-estate-800">Website</h3>
                              <p className="text-estate-600">{agency.website}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-start space-x-3">
                            <Clock className="w-5 h-5 text-estate-500 mt-0.5" />
                            <div>
                              <h3 className="font-medium text-estate-800">Operating Hours</h3>
                              <p className="text-estate-600 whitespace-pre-line">{agency.operatingHours}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3">
                            <Home className="w-5 h-5 text-estate-500 mt-0.5" />
                            <div>
                              <h3 className="font-medium text-estate-800">Properties</h3>
                              <p className="text-estate-600">{agency.properties} Active Listings</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3">
                            <User className="w-5 h-5 text-estate-500 mt-0.5" />
                            <div>
                              <h3 className="font-medium text-estate-800">Agents</h3>
                              <p className="text-estate-600">{agency.agents.length} Expert Agents</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-8">
                        <h3 className="font-medium text-estate-800 mb-3">Specializations</h3>
                        <div className="flex flex-wrap gap-2">
                          {agency.specializations.map((spec, index) => (
                            <span 
                              key={index} 
                              className="inline-flex items-center px-3 py-1 rounded-full bg-estate-100 text-estate-800 text-sm"
                            >
                              <CheckCircle className="w-4 h-4 mr-1 text-estate-500" />
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-estate-800 mb-3">Social Media</h3>
                        <div className="flex gap-4">
                          <a href={agency.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-estate-600 hover:text-estate-900">
                            <Facebook className="w-5 h-5" />
                          </a>
                          <a href={agency.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-estate-600 hover:text-estate-900">
                            <Twitter className="w-5 h-5" />
                          </a>
                          <a href={agency.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-estate-600 hover:text-estate-900">
                            <Instagram className="w-5 h-5" />
                          </a>
                          <a href={agency.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="text-estate-600 hover:text-estate-900">
                            <Linkedin className="w-5 h-5" />
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Properties Tab */}
                <TabsContent value="properties" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-estate-900">Properties by {agency.name}</h2>
                        <Button variant="outline" size="sm" asChild>
                          <Link to="/properties">View All</Link>
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {agency.properties.map((property) => (
                          <Link to={`/properties/${property.id}`} key={property.id} className="group">
                            <div className="bg-white border border-estate-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                              <div className="aspect-video relative overflow-hidden">
                                <img 
                                  src={property.image} 
                                  alt={property.title}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-3 left-3 bg-estate-900/80 text-white px-3 py-1 rounded-md text-sm font-medium">
                                  {property.price}
                                </div>
                              </div>
                              
                              <div className="p-4">
                                <h3 className="font-medium text-estate-800 group-hover:text-estate-600 transition-colors">{property.title}</h3>
                                <p className="text-estate-500 text-sm mt-1 flex items-center">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {property.location}
                                </p>
                                
                                <div className="flex items-center justify-between mt-4 text-sm text-estate-600">
                                  <span>{property.beds} beds</span>
                                  <span>{property.baths} baths</span>
                                  <span>{property.sqft} sqft</span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Agents Tab */}
                <TabsContent value="agents" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold text-estate-900 mb-6">Meet Our Agents</h2>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
                        {agency.agents.map((agent) => (
                          <div key={agent.id} className="bg-white border border-estate-100 rounded-xl overflow-hidden shadow-sm flex flex-col sm:flex-row">
                            <div className="sm:w-1/3 overflow-hidden">
                              <img 
                                src={agent.image} 
                                alt={agent.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            <div className="p-4 sm:w-2/3">
                              <h3 className="font-medium text-estate-800">{agent.name}</h3>
                              <p className="text-estate-500 text-sm">{agent.title}</p>
                              
                              <div className="flex items-center mt-3 text-sm text-estate-600">
                                <Home className="w-4 h-4 mr-1 text-estate-500" />
                                <span>{agent.properties} Properties</span>
                              </div>
                              
                              <div className="mt-4 flex space-x-2">
                                <Button size="sm" variant="outline" asChild>
                                  <Link to={`/agent/profile/${agent.id}`}>View Profile</Link>
                                </Button>
                                <Button size="sm">Contact</Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Reviews Tab */}
                <TabsContent value="reviews" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold text-estate-900 mb-4">Customer Reviews</h2>
                      
                      <div className="bg-estate-50 p-4 rounded-lg mb-6">
                        <div className="flex items-center mb-3">
                          <Star className="h-10 w-10 text-yellow-500 fill-yellow-500" />
                          <div className="ml-2">
                            <div className="text-3xl font-bold text-estate-900">{agency.rating}</div>
                            <div className="text-estate-600 text-sm">{agency.reviews} reviews</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-5 w-5 ${i < Math.floor(agency.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-estate-300'}`} />
                            ))}
                          </div>
                          <Button className="ml-auto" size="sm">Write a Review</Button>
                        </div>
                      </div>
                      
                      {/* Reviews would go here, using mock data or fetched from backend */}
                      <div className="text-center py-6 text-estate-600">
                        Sign in to view and write reviews for this agency.
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Right Column - Contact Form */}
            <div>
              <Card className="sticky top-20">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-estate-900 mb-4">Contact {agency.name}</h2>
                  
                  <Textarea
                    placeholder="Type your message here..."
                    className="min-h-[120px] mb-4"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                  />
                  
                  <Button className="w-full" onClick={handleSendMessage}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                  
                  <div className="mt-6 pt-6 border-t border-estate-100">
                    <h3 className="font-medium text-estate-800 mb-3">Contact Information</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center text-estate-600">
                        <Phone className="w-4 h-4 mr-3 text-estate-500" />
                        <span>{agency.phone}</span>
                      </div>
                      
                      <div className="flex items-center text-estate-600">
                        <Mail className="w-4 h-4 mr-3 text-estate-500" />
                        <span>{agency.email}</span>
                      </div>
                      
                      <div className="flex items-center text-estate-600">
                        <Globe className="w-4 h-4 mr-3 text-estate-500" />
                        <span>{agency.website}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AgencyDetail;
