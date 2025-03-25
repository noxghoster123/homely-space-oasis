
import { Link } from "react-router-dom";

interface PropertyBreadcrumbProps {
  title: string;
}

export function PropertyBreadcrumb({ title }: PropertyBreadcrumbProps) {
  return (
    <div className="bg-estate-50 py-4 px-6 border-b border-estate-100">
      <div className="container mx-auto">
        <div className="flex items-center text-sm text-estate-500">
          <Link to="/" className="hover:text-estate-700">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/properties" className="hover:text-estate-700">Properties</Link>
          <span className="mx-2">/</span>
          <span className="text-estate-700">{title}</span>
        </div>
      </div>
    </div>
  );
}
