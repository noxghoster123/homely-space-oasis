
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-estate-50 px-6">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-display font-bold text-estate-800 mb-2">404</h1>
        <p className="text-2xl text-estate-700 mb-8 font-display">Page Not Found</p>
        <p className="text-estate-600 mb-8">
          We couldn't find the page you're looking for. The page might have been moved, deleted, or never existed.
        </p>
        <Link to="/">
          <Button className="bg-estate-800 hover:bg-estate-700 text-white">
            <Home className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
