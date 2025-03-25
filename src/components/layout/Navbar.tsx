
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, User, Bell, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/properties" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/80 backdrop-blur-sm shadow-subtle" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between py-4">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-estate-900 transition-opacity hover:opacity-80"
          >
            <div className="h-10 w-10 rounded-full bg-estate-800 flex items-center justify-center">
              <span className="text-white font-display font-bold">RE</span>
            </div>
            <span className="font-display font-semibold text-xl tracking-tight">RealEstate</span>
          </Link>

          {/* Desktop Navigation */}
          <div className={cn("hidden lg:flex items-center space-x-1")}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "px-4 py-2 rounded-md font-medium transition-colors duration-200",
                  location.pathname === link.path
                    ? "text-estate-800 bg-estate-100"
                    : "text-estate-700 hover:text-estate-900 hover:bg-estate-50"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-estate-700 hover:text-estate-900 hover:bg-estate-50">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-estate-700 hover:text-estate-900 hover:bg-estate-50">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-estate-700 hover:text-estate-900 hover:bg-estate-50">
              <Bell className="h-5 w-5" />
            </Button>
            <Button className="bg-estate-800 hover:bg-estate-700 text-white">
              <User className="h-4 w-4 mr-2" /> Sign In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-estate-700 hover:text-estate-900 hover:bg-estate-50">
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-estate-700 hover:text-estate-900 hover:bg-estate-50"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobile && (
        <div
          className={cn(
            "fixed inset-0 bg-white z-40 flex flex-col px-6 pt-20 transform transition-transform duration-300 ease-in-out",
            menuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "px-4 py-3 rounded-md font-medium text-lg transition-colors",
                  location.pathname === link.path
                    ? "text-estate-800 bg-estate-100"
                    : "text-estate-700 hover:text-estate-900 hover:bg-estate-50"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="mt-auto mb-10 flex flex-col space-y-3 pt-6">
            <Button variant="outline" className="w-full justify-start">
              <Heart className="h-4 w-4 mr-2" /> Favorites
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Bell className="h-4 w-4 mr-2" /> Notifications
            </Button>
            <Button className="w-full bg-estate-800 hover:bg-estate-700">
              <User className="h-4 w-4 mr-2" /> Sign In
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
