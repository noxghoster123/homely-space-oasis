
import { 
  AirVent, Bed, Bath, Car, Home, Map, Square, 
  Tv, User, Utensils, WifiIcon 
} from "lucide-react";

export const property = {
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

export const amenityIcons = {
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
