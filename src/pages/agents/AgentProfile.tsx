
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  MapPin, Phone, Mail, Calendar, MessageSquare, Home, Star, 
  Facebook, Twitter, Instagram, Linkedin
} from "lucide-react";

// Mock agent data
const mockAgent = {
  id: 101,
  name: "Sarah Johnson",
  title: "Senior Real Estate Agent",
  image: "https://via.placeholder.com/300",
  cover: "https://via.placeholder.com/1200x400",
  bio: "With over 10 years of experience in luxury real estate, Sarah has helped hundreds of clients find their dream homes. Specializing in high-end properties and waterfront estates, she brings unparalleled expertise and a personalized approach to every transaction.",
  phone: "+1 (212) 555-7890",
  email: "sarah.johnson@eliterealestate.com",
  location: "New York, NY",
  agency: {
    id: 1,
    name: "Elite Real Estate Group",
    logo: "https://via.placeholder.com/100"
  },
  rating: 4.9,
  reviews: 87,
  experience: "10+ years",
  languages: ["English", "Spanish", "French"],
  certifications: ["Certified Luxury Home Marketing Specialist", "Accredited Buyer's Representative", "Certified Residential Specialist"],
  socialMedia: {
    facebook: "https://facebook.com/sarahjohnson",
    twitter: "https://twitter.com/sarahjohnson",
    instagram: "https://instagram.com/sarahjohnson",
    linkedin: "https://linkedin.com/in/sarahjohnson",
  },
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
    }
  ],
  recentSales: [
    {
      id: 301,
      title: "Luxury Condo on Park Avenue",
      image: "https://via.placeholder.com/300x200",
      price: "$3,200,000",
      date: "2 months ago",
    },
    {
      id: 302,
      title: "Brownstone in Brooklyn Heights",
      image: "https://via.placeholder.com/300x200",
      price: "$2,800,000",
      date: "3 months ago",
    }
  ]
};

const AgentProfile = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [messageText, setMessageText] = useState("");
  
  // In a real app, you would fetch agent data based on ID
  const agent = mockAgent;
  
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
    console.log("Sending message to agent:", messageText);
    
    toast({
      title: "Message sent",
      description: "The agent will respond to you shortly.",
    });
    
    setMessageText("");
  };

  const handleScheduleCall = () => {
    toast({
      title: "Call request sent",
      description: "The agent will contact you to schedule a call.",
    });
  };

  return (
    <Layout>
      {/* Cover Image */}
      <div className="relative h-64 md:h-80 bg-estate-100 overflow-hidden">
        <img 
          src={agent.cover} 
          alt={`${agent.name} cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Agent Profile Header */}
          <div className="relative -mt-20 mb-8">
            <div className="bg-white rounded-xl shadow-subtle p-6">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="relative md:w-32 md:h-32 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md -mt-16">
                  <img 
                    src={agent.image} 
                    alt={`${agent.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-display font-bold text-estate-900">{agent.name}</h1>
                      <p className="text-estate-600">{agent.title}</p>
                      <div className="flex items-center mt-2">
                        <Link to={`/agencies/${agent.agency.id}`} className="flex items-center text-estate-600 hover:text-estate-900">
                          <img src={agent.agency.logo} alt={agent.agency.name} className="w-5 h-5 mr-2" />
                          {agent.agency.name}
                        </Link>
                        <span className="mx-2">•</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="ml-1 text-estate-800 font-medium">{agent.rating}</span>
                          <span className="ml-1 text-estate-500">({agent.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={handleScheduleCall}>
                        <Phone className="mr-2 h-4 w-4" />
                        Schedule Call
                      </Button>
                      <Button>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
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
                  <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
                </TabsList>
                
                {/* About Tab */}
                <TabsContent value="about" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold text-estate-900 mb-4">About {agent.name}</h2>
                      <p className="text-estate-700 mb-6">{agent.bio}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="space-y-4">
                          <div className="flex items-start space-x-3">
                            <MapPin className="w-5 h-5 text-estate-500 mt-0.5" />
                            <div>
                              <h3 className="font-medium text-estate-800">Location</h3>
                              <p className="text-estate-600">{agent.location}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3">
                            <Phone className="w-5 h-5 text-estate-500 mt-0.5" />
                            <div>
                              <h3 className="font-medium text-estate-800">Phone</h3>
                              <p className="text-estate-600">{agent.phone}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3">
                            <Mail className="w-5 h-5 text-estate-500 mt-0.5" />
                            <div>
                              <h3 className="font-medium text-estate-800">Email</h3>
                              <p className="text-estate-600">{agent.email}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-start space-x-3">
                            <Calendar className="w-5 h-5 text-estate-500 mt-0.5" />
                            <div>
                              <h3 className="font-medium text-estate-800">Experience</h3>
                              <p className="text-estate-600">{agent.experience}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3">
                            <Home className="w-5 h-5 text-estate-500 mt-0.5" />
                            <div>
                              <h3 className="font-medium text-estate-800">Properties</h3>
                              <p className="text-estate-600">{agent.properties.length} Active Listings</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-8">
                        <h3 className="font-medium text-estate-800 mb-3">Languages</h3>
                        <div className="flex flex-wrap gap-2">
                          {agent.languages.map((language, index) => (
                            <span 
                              key={index} 
                              className="inline-flex items-center px-3 py-1 rounded-full bg-estate-100 text-estate-800 text-sm"
                            >
                              {language}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-8">
                        <h3 className="font-medium text-estate-800 mb-3">Certifications</h3>
                        <ul className="list-disc list-inside text-estate-700 space-y-1">
                          {agent.certifications.map((cert, index) => (
                            <li key={index}>{cert}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-estate-800 mb-3">Connect</h3>
                        <div className="flex gap-4">
                          <a href={agent.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-estate-600 hover:text-estate-900">
                            <Facebook className="w-5 h-5" />
                          </a>
                          <a href={agent.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-estate-600 hover:text-estate-900">
                            <Twitter className="w-5 h-5" />
                          </a>
                          <a href={agent.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-estate-600 hover:text-estate-900">
                            <Instagram className="w-5 h-5" />
                          </a>
                          <a href={agent.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="text-estate-600 hover:text-estate-900">
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
                      <h2 className="text-xl font-semibold text-estate-900 mb-6">Properties by {agent.name}</h2>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {agent.properties.map((property) => (
                          <Link key={property.id} to={`/properties/${property.id}`} className="group">
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
                      
                      <div className="mt-8">
                        <h2 className="text-xl font-semibold text-estate-900 mb-6">Recent Sales</h2>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {agent.recentSales.map((property) => (
                            <div key={property.id} className="bg-white border border-estate-100 rounded-xl overflow-hidden shadow-sm">
                              <div className="aspect-video relative overflow-hidden">
                                <img 
                                  src={property.image} 
                                  alt={property.title}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                  <div className="bg-white/90 px-4 py-2 rounded text-estate-900 font-medium">
                                    Sold for {property.price}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="p-4">
                                <h3 className="font-medium text-estate-800">{property.title}</h3>
                                <p className="text-estate-500 text-sm mt-1">Sold {property.date}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Reviews Tab */}
                <TabsContent value="reviews" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold text-estate-900 mb-4">Client Reviews</h2>
                      
                      <div className="bg-estate-50 p-4 rounded-lg mb-6">
                        <div className="flex items-center mb-3">
                          <Star className="h-10 w-10 text-yellow-500 fill-yellow-500" />
                          <div className="ml-2">
                            <div className="text-3xl font-bold text-estate-900">{agent.rating}</div>
                            <div className="text-estate-600 text-sm">{agent.reviews} reviews</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-5 w-5 ${i < Math.floor(agent.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-estate-300'}`} />
                            ))}
                          </div>
                          <Button className="ml-auto" size="sm">Write a Review</Button>
                        </div>
                      </div>
                      
                      {/* Reviews would go here, using mock data or fetched from backend */}
                      <div className="text-center py-6 text-estate-600">
                        Sign in to view and write reviews for this agent.
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
                  <h2 className="text-xl font-semibold text-estate-900 mb-4">Contact {agent.name}</h2>
                  
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
                        <span>{agent.phone}</span>
                      </div>
                      
                      <div className="flex items-center text-estate-600">
                        <Mail className="w-4 h-4 mr-3 text-estate-500" />
                        <span>{agent.email}</span>
                      </div>
                      
                      <div className="flex items-center text-estate-600">
                        <MapPin className="w-4 h-4 mr-3 text-estate-500" />
                        <span>{agent.location}</span>
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

export default AgentProfile;
