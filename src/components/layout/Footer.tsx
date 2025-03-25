
import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-estate-50 border-t border-estate-100 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-estate-800 flex items-center justify-center">
                <span className="text-white font-display font-bold">RE</span>
              </div>
              <span className="font-display font-semibold text-xl tracking-tight text-estate-900">RealEstate</span>
            </Link>
            <p className="text-estate-600 text-sm">
              Premium real estate services with a focus on luxury properties in the most desirable locations.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-estate-500 hover:text-estate-800 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-estate-500 hover:text-estate-800 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-estate-500 hover:text-estate-800 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-estate-500 hover:text-estate-800 transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display font-semibold text-estate-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-estate-600 hover:text-estate-800 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-estate-600 hover:text-estate-800 transition-colors text-sm">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-estate-600 hover:text-estate-800 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-estate-600 hover:text-estate-800 transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-estate-600 hover:text-estate-800 transition-colors text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-estate-900 mb-4">Property Types</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties?type=apartment" className="text-estate-600 hover:text-estate-800 transition-colors text-sm">
                  Apartments
                </Link>
              </li>
              <li>
                <Link to="/properties?type=house" className="text-estate-600 hover:text-estate-800 transition-colors text-sm">
                  Houses
                </Link>
              </li>
              <li>
                <Link to="/properties?type=villa" className="text-estate-600 hover:text-estate-800 transition-colors text-sm">
                  Villas
                </Link>
              </li>
              <li>
                <Link to="/properties?type=commercial" className="text-estate-600 hover:text-estate-800 transition-colors text-sm">
                  Commercial
                </Link>
              </li>
              <li>
                <Link to="/properties?type=land" className="text-estate-600 hover:text-estate-800 transition-colors text-sm">
                  Land
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-estate-900 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-estate-500 mr-2 mt-0.5" />
                <span className="text-estate-600 text-sm">123 Estate Street, City, Country</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-estate-500 mr-2" />
                <span className="text-estate-600 text-sm">+1 234 567 890</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-estate-500 mr-2" />
                <span className="text-estate-600 text-sm">contact@realestate.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-estate-100 pt-8 mt-8 text-center">
          <p className="text-estate-500 text-sm">
            © {new Date().getFullYear()} RealEstate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
